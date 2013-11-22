# Populous.js

> Populates a `<select>` with a remote JSON.

## Usage by example:

Your HTML file:
```html
<select data-source-url="/options.json">
```

Your JSON:
```javascript
["Banana", "Apple", "Grape", "Cranberry"]
```

Your JavaScript:
```javascript
$('select').populous('load');
```

Bam! Your `<select>` now has 4 options: `Banana`, `Apple`, `Grape` and `Cranberry`.

## Configuration

You can customize the options by providing a hash when calling the plugin:

```javascript
$('select').populous({...});
```

### AJAX

To configure the AJAX request, set a `source` key with [jQuery AJAX settings](http://api.jquery.com/jQuery.ajax/#jQuery-ajax-settings):

```javascript
$('select').populous({
  source: {
    url: '/basket',
    method: 'POST',
    data: {all: 'fruits'}
  }
});
```

Note that, by default, the method is set to `GET`, and the URL can be set using the attribute `data-source-url` on the `<select>` element.

### Mapping the response

Populous use a `map` function to handle the response.

```javascript
function(response) {
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

You can provide your own map function:

```javascript
$('select').populous({
  map: function(response) {
    // ...
  }
});
```

## API

### Events and states

There are 2 new events being fired - `loading` and `loaded` - that happens, respectively, right before the AJAX request and right after the `<select>` is populated with its response.

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
$('select').populous('load');
$('select').val('Hey!'); //=> Will update when finish loading.
```

## License

This project is licensed under [Creative Commons Attribution-ShareAlike 3.0 Unported](http://creativecommons.org/licenses/by-sa/3.0/).

## Contribution

1. Fork it
2. Change it
3. Commit with brief yet meaningful description
4. Send pull request

Also, you could report an issue, help to fix or simply comment in one.
