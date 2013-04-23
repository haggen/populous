# Filler

> Fill `<select>` from a remote source.

## Usage by example

index.html
```html
<select data-source="/options.json">
```

options.json
```javascript
['Banana', 'Apple', 'Grape', 'Cranberry']
```

script.js
```javascript
$('select').filler();
```

Now your select will have 4 `<option>`s: Banana, Apple, Grape and Cranberry.

## Settings

### Mapping the response

You can provide a `map` function to tell how do we handle the response.

```javascript
$('select').filler(function(response) {
  //...
});
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

### JSONP

You can enable JSONP simply by appending `?callback=?` at the end of the source URL:

```
<select data-source="/options.json?callback=?"></select>
```
