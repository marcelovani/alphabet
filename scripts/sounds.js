/*
 *  Alphabet
 */

function Sound(language, person) {
  //this.howl = new Howl();
  this.isFor = {};
  this.spoken = {};
  this.effect = {};
  this.alphabet = {};
  this.language = language;
  this.person = person;
}

Sound.prototype.stopAll = function() {
  if (typeof this.isFor.stop === "function") {
    this.isFor.unload();
  }

  if (typeof this.spoken.stop === "function") {
    this.spoken.unload();
  }

  if (typeof this.effect.stop === "function") {
    this.effect.unload();
  }
}

Sound.prototype.setAlphabet = function(json) {
  var sprite = json.language[this.language].voice[this.person].sprite;
  this.alphabet = new Howl({
    urls: ['./sounds/' + this.language + '/' + this.person + '/alphabet.mp3'],
    sprite: sprite,
    autoplay: false,
    loop: false,
    onend: function () {},
    onloaderror: function () {
      console.log('Not found ' + sprite)
    }
  });
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


