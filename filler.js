/**
 * Filler v1.0.0
 * Fill <select> from a remote source.
 * by Arthur Corenzan <arthur@corenzan.com>
 * more on github.com/haggen/filler
 */
;(function($, undefined) {

  function Filler(input, map) {
    this.input = $(input);
    this.source = input.data('source');

    if(map && map.call) {
      this.map = map;
    }

    this.load();
  }

  Filler.prototype = {
    map: function(response) {
      return $.map(response, function(label, index) {
        return [label, index];
      });
    },

    push: function(label, value) {
      this.input.append('<option value="' + (value || label) + '">' + label + '</option>');
    },

    clear: function() {
      this.input.html('');
    },

    load: function() {
      var self = this;

      this.input.trigger('loading');
      this.clear();

      $.getJSON(this.source, function(response) {
        $.each(self.map(response), function(value) {
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

  $.fn.filler = function(map) {
    return new Filler(this, map);
  };

})(window.jQuery);
