/*
 *  Alphabet
 */

function Settings() {

};

(function ($) {
  'use strict';

$(document).ready(function () {

    $('#select-language').change(function () {

      switch (this.value) {
        case 'en-GB':
          var options = [
            {val : 'joshua', text: 'Joshua'},
            {val : 'lisa', text: 'Lisa'}
          ];
          break;

        case 'pt-BR':
          var options = [
            {val : 'marcelo', text: 'Macelo'},
            {val : 'bruna', text: 'Bruna'}
          ];
          break;

        case 'es-ES':
          var options = [
            {val : 'juan', text: 'Juan'},
            {val : 'salma', text: 'Salma'}
          ];
          break;
      }
      // Clear options.
      $('#select-person').find('option').remove();
      // Populate persons.
      $(options).each(function() {
        $('#select-person').append($("<option>").attr('value',this.val).text(this.text));
      });
      $('#select-person').change();
    });

    $('.close-settings-button').touchstart(function () {
      // Save settings.
    });
  });

})(jQuery);
