/*
 *  Alphabet
 */

 /**
  *
  */
function Game(obj) {
  this.game = {};
  this.mainController = obj;
  this.soundController = new Sound(this.mainController.language, this.mainController.person);
  this.soundController.setAlphabet(this.mainController.alphabetJson);
}

Game.prototype.picture = function(character) {
  var mediaMap = this.mainController.mediaMapJson.language[this.mainController.language].voice[this.mainController.person][character.toLowerCase()];
  if (typeof mediaMap == 'undefined') {
    return false;
  }

  var media = mediaMap[Math.floor(Math.random() * mediaMap.length)];

  $('#picture .preview img').attr('src', './images/pictures/' + media['picture']); 
  $('#picture .caption').html(media['word']);

  var isFor = this.soundController.playIsFor(media);
  var effect = this.soundController.playEffect(media);
  var spoken = this.soundController.playWord(media);

  // Speak work after saying: is for.
  isFor._onend[0] = function () {
    spoken.play();
  };

  // Play effect after saying the word.
  spoken._onend[0] = function () {
    effect.play();
  };
  // In case of error loading the sound, move on.
  spoken._onloaderror[0] = function () {
    effect.play();
  };

  if (character_touched != '') {
    isFor.play();
  }

  return this.picture;
};

Game.prototype.setCharacters = function(type) {
  // Clean buttons.
  $('.character').remove();

  switch (type) {
    case 'letters':
      var chars = (function () {
        var output = [];
        for (var i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++)
          output.push(String.fromCharCode(i));
        return output;
      })();
      break;

    case 'numbers':
      var chars = (function () {
        var output = [];
        for (var i = 0; i <= 19; i++)
          output.push(String(i));
        for (var i = 2; i <= 9; i++)
          output.push(String(i) + '0');
        return output;
      })();
      break;
  }

  var i = 0;
  $.each(chars, function (b, val) {
    // Change background colors.
    if (i <= 5) {
      i++;
    }
    else {
      i = 1;
    }

    var html = '<a href="#picture" data-rel="character" data-transition="flip" class="character-wrapper"><span class="character ' + val + ' c' + i + ' outline">' + val + '</span></a>';
    $('#play').append(html);
  });

  // Listener for clicks on characters.
  $('#play .character').touchstart(function (i) {
    $(this).hide().fadeIn('fast', function () {
      character_touched = this.innerHTML;
    });
  });
};

Game.prototype.run = function() {
  var game = this;

  // Hide image, letter and word before page is shown.
  $("#picture").on("pagebeforeshow", function(event) {
    $('#picture .preview img').attr('src', './images/pictures/no-image.jpg'); 
    $('#picture .big-letter').html('');
    $('#picture .caption').html('');
  });

  // Show image and play sounds when page shows.
  $("#picture").on("pageshow", function(event) {
    // Override onend().
    game.soundController.alphabet._onend[0] = function () {
      if (character_touched != '') {
        var picture = game.picture(character_touched);
        if (picture != false) {
          $('#picture .big-letter').html(character_touched);
          character_touched = '';
        }
      }
    }
    game.soundController.alphabet.play(character_touched.toLowerCase(), function () {
    });

  });

  $('#picture img').touchstart(function () {
      //effect.play();
  });

  $('#picture .caption').touchstart(function () {
    //if (game.soundController.spoken.playing() == false) {
    game.soundController.spoken.play();
  });

  $('#picture .big-letter').touchstart(function () {
    //if (game.soundController.spoken.playing() == false) {
    var character = $('#picture .big-letter').html();
    game.soundController.alphabet.play(character.toLowerCase());
  });

  // Picture preview close.
  $('#picture .back-button').touchstart(function () {
      game.soundController.stopAll();
  });
};

(function ($) {
  'use strict';

  var init = function () {
    $(document).ready(function () {
      var main = new Main();

      if (localStorage.alphabet_person) {
        main.setPerson(localStorage.alphabet_person);
      }
      else {
        main.setPerson('marc');
      }

      if (localStorage.alphabet_language) {
        main.setLanguage(localStorage.alphabet_language);
      }
      else {
        main.setLanguage('pt-BR');
      }

      var game = new Game(main);
      if (localStorage.alphabet_characters) {
        game.setCharacters(localStorage.alphabet_characters);
      }
      else {
        game.setCharacters('letters');
      }

      game.run();
    });
  };

  init();

})(jQuery);
