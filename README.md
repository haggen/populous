# Populous.js

> Populates a `<select>` with a remote JSON.

## Usage by example:

Your HTML file:
```html
<select>
```

Your JSON, say `/options.json`:
```javascript
['Banana', 'Apple', 'Grape', 'Cranberry']
```

Your JavaScript:
```javascript
var dropdown;

dropdown = $('select').populous({
  url: '/options.json'
});
```

And finally, you'll have to load it:
```javascript
dropdown.load();
```

Bam! Your `<select>` now has 4 options: `Banana`, `Apple`, `Grape` and `Cranberry`.

## Configuration:

### Mapping the response

Populous use a `map` function to handle the response.

```javascript
dropdown.map = function(response) {
  return [];
};
```

The resulting array may comprise arrays (pairs of label and value) or strings (that will be used as both).

Below is the default `map` function.

```javascript
function(response) {
  return $.map(response, function(label) {
    return [[label, label]]; // jQuery#map make it flat, so we add depth
  });
}
```

### AJAX

The hash you provide when calling the plugin accepts the same values of [jQuery AJAX settings](http://api.jquery.com/jQuery.ajax/#jQuery-ajax-settings).

```
$('select').populous({
  url: '/basket',
  method: 'POST',
  data: {all: 'fruits'}
});
```

## API

### Events and states

There are 2 new events being fired - `loading` and `loaded` - that happens, respectively, right before and after the request that populates the `<select>`.

```javascript
$('select').on('loading', function() {
  $(this).attr('disabled', true);
});

$('select').on('loaded', function() {
  $(this).attr('disabled', false);
});
```

Also, there's a data property being set to flag when it's loading.

```javascript
if($('select').data('loading')) {
  alert('Wait!');
} else {
  alert('Ready!');
}
```

### Updating value

Populous does a little patch to allow jQuery's standard method `val` to seamlessly update the `<select>` even when it isn't finished loading.

```javascript
dropdown.load();
dropdown.val('Hey!'); //=> Will update when finish loading.
```
