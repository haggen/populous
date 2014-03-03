// Populous-2.1.3 by <arthur@corenzan.com>
// Populates a `<select>` with a remote JSON
// more on github.com/haggen/populous
;(function($) {

  'use strict';

  var hook;

  this.Populous = function(element) {
    this.initialize(element);
  };

  Populous.options = {
    source: {
      url: '',
      method: 'GET'
    },

    map: function(response) {
      return $.map(response, function(label) {
        return [[label, label]]; // jQuery#map make it flat, so we add depth
      });
    }
  };

  Populous.prototype = {

    initialize: function(element) {
      this.element = $(element);
      this.options = $.extend({}, Populous.options);

      this.options.source.url = this.element.attr('data-source-url') || '';

      this.element.on('loaded', function() {
        var that = $(this);

        if(that.data('value')) {
          that.val(that.data('value')).removeData('value');
        }
      });
    },

    configure: function(options) {
      this.options = $.extend(this.options, options);
    },

    push: function(label, value) {
      this.element.append('<option value="' + (value || label) + '">' + label + '</option>');
    },

    load: function() {
      var that = this;

      // Trigger event and flag it
      that.element.trigger('loading').data('loading', true);

      $.ajax(that.options.source).done(function(response) {
        that.element.html('');

        $.each(that.options.map(response), function(index, value) {
          if(typeof value === 'string') {
            value = [value, value];
          }

          that.push.apply(that, value);
        });

        // Done, trigger event and remove flag
        that.element.trigger('loaded').data('loading', false);

      }).fail(function() {
        console.error(arguments);
      });
    }
  };

  hook = $.valHooks.select.set;

  Populous.hook = function(element, value) {
    element = $(element);

    if(element.data('loading')) {
      element.data('value', value);
    } else {
      hook(element[0], value);
    }
  };

  // Patch jQuery's value set hook to work with Populous
  $.valHooks.select.set = Populous.hook;

  // Plugin API
  //
  // $(...).populoud();
  // $(...).populoud({...});
  // $(...).populoud('load');
  $.fn.populous = function() {
    var args, mixed;

    args = [].slice.call(arguments);
    mixed = args.shift();

    return this.each(function() {
      var that, data;

      that = $(this);
      data = that.data('populous');

      if(!data) {
        data = new Populous(this);
        that.data('populous', data);
      }

      if(typeof mixed === 'string') {
        data[mixed].apply(data, args);
      } else if(mixed) {
        data.configure(mixed);
      }
    });
  };

})(this.jQuery);