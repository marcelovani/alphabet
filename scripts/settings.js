/*
 *  Alphabet
 */

function Settings() {

  $('.close-settings-button').touchstart(function () {
    // Save settings.
  });

  $('input:radio').change(
    function () {
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

}
