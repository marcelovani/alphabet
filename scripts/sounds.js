/*
 *  Alphabet
 */

function Sound(language, person) {
  //this.howl = new Howl();
  this.isFor = {};
  this.spoken = {};
  this.effect = {};
  this.language = language;
  this.person = person;
}

Sound.prototype.playIsFor = function(media) {
  this.isFor = new Howl({
    urls: ['./sounds/' + this.language + '/' + this.person + '/is_for.mp3'],
    autoplay: false,
    onend: function () {
    },
  });

  return this.isFor;
}

Sound.prototype.playEffect = function(media) {
  this.effect = new Howl({
    urls: ['./sounds/effects/' + media['effect']],
    autoplay: false,
    onend: function () {
    },
  });

  return this.effect;
}

Sound.prototype.playWord = function(media) {
  this.spoken = new Howl({
    urls: ['./sounds/' + this.language + '/' + this.person + '/' + media['spoken']],
    autoplay: false,
    onend: function () {
    },
    onloaderror: function () {
    }
  });

  return this.spoken;
}


