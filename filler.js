/**
 * Filler v1.0.0
 * Fill <select> from a remote source.
 * by Arthur Corenzan <arthur@corenzan.com>
 * more on github.com/haggen/filler
 */
;(function($, undefined) {

  function Filler(input, config) {
    this.input = $(input);
    this.config = $.extend({
      url: '',
      method: 'GET'
    }, config);
  }

  Filler.prototype = {
    map: function(response) {
      return $.map(response, function(label) {
        return [[label, label]]; // jQuery#map make it flat, so we add more depth
      });
    },

    push: function(label, value) {
      this.input.append('<option value="' + (value || label) + '">' + label + '</option>');
    },

    load: function() {
      var self = this;

      this.input.html('').trigger('loading');

      $.ajax(this.config).done(function(response) {
        $.each(self.map(response), function(index, value) {
          if(typeof value === 'string') {
            value = [value, value];
          }

          self.push.apply(self, value);
        });

        self.input.trigger('loaded');
      });
    }
  };

  this.Filler = Filler;

  $.fn.filler = function(config) {
    return new Filler(this, config);
  };

})(window.jQuery);
