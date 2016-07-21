/*
 *  Alphabet
 */

function Settings() {

};

(function ($) {
  'use strict';

  $('#settings input:radio').change(
    function () {
          console.log('1');
      switch (this.name) {
        case 'language':
          set_language(this.value);
          break;

        case 'voice':
          set_voice(this.value);
          break;

        case 'characters':
          set_characters(this.value);
          break;
      }
    }
  );

  $('.close-settings-button').touchstart(function () {
    // Save settings.
  });

})(jQuery);
