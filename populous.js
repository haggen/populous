/**
 * Populous v1.2.0
 * Populates a `<select>` with a remote JSON.
 * by Arthur Corenzan <arthur@corenzan.com>
 * more on //github.io/haggen/populous
 */
;(function($, undefined) {

  $.valHooks._select = $.valHooks.select;

  $.valHooks.select = {
    get: function(element) {
      return $.valHooks._select.get(element);
    },

    set: function(element, value) {
      element = $(element);

      if(element.data('loading')) {
        element.on('loaded.valhook', function() {
          $.valHooks._select.set(element[0], value);
          element.off('loaded.valhook');
        });
      } else {
        $.valHooks._select.set(element[0], value);
      }
    }
  };

  var Populous = function(element, config) {
    this.element = $(element);

    this.config = $.extend({
      url: '',
      method: 'GET'
    }, config);
  };

  Populous.prototype = {
    map: function(response) {
      return $.map(response, function(label) {
        return [[label, label]]; // jQuery#map make it flat, so we add depth
      });
    },

    push: function(label, value) {
      this.element.append('<option value="' + (value || label) + '">' + label + '</option>');
    },

    load: function() {
      var self = this;

      // Clear, trigger event and flag it
      this.element.html('').trigger('loading').data('loading', true);

      $.ajax(this.config).done(function(response) {
        $.each(self.map(response), function(index, value) {
          if(typeof value === 'string') {
            value = [value, value];
          }

          self.push.apply(self, value);
        });

        self.element.trigger('loaded').data('loading', false);
      }).fail(function() {
        console.error(arguments);
      });
    },

    on: function() {
      this.element.on.apply(this.element, arguments);
    }

    val: function() {
      this.element.val.apply(this.element, arguments);
    }
  };

  this.Populous = Populous;

  $.fn.populous = function(config) {
    return new Populous(this, config);
  };

})(window.jQuery);
