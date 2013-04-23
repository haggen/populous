# Filler

> Fill `<select>` from a remote source.

## Usage by example

index.html
```html
<select>
```

options.json
```javascript
['Banana', 'Apple', 'Grape', 'Cranberry']
```

script.js
```javascript
var select = $('select').filler({
  url: '/options.json'
}); //=> returns a Filler object

select.load();
```

Now your select will have 4 `<option>`: Banana, Apple, Grape and Cranberry.

## Settings

### Mapping the response

You can provide a `map` function to tell how do we handle the response.

```javascript
select.map = function(response) {
  return [];
};
```

The default function is:

```javascript
function(response) {
  return $.map(response, function(label, index) {
    return [label, index];
  });
}
```

The function must return an array. Each element of the array can be a either another array or a string. In case of strings, they'll be used as both label and value of the options. In case of array, the first element will be the label and the second the value.

### AJAX

You can customize the AJAX settings by providing the new values in configuration hash:

```
$('select').filler({
  url: '/basket',
  method: 'POST',
  data: {q: 'fruits'}
});
```

### Events

There are 2 new events being fired - `loading` and `loaded` - that happens, respectively, right before and after the request.

```javascript
select.on('loading', function() {
  $(this).attr('disabled', true);
});

select.on('loaded', function() {
  $(this).attr('disabled', false);
});

select.load();
```
