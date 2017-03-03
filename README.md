# Google Review Widget

A javascript widget plugin that pulls up to 5 Google business reviews 

Inspired by: https://wordpress.org/plugins/google-places-reviews/

## How to use

#### Requirement

Google Maps Javascript API and the Places Library
```html
<script src="https://maps.googleapis.com/maps/api/js?key=API_KEY&libraries=places"></script>
```

#### HTML

```html
<div id="review_widget">
</div>
```

#### Javascript

```js
$GrwJS.init({
target:'#review_widget',
placeid:'ChIJpcanZ0L2wokRoWs8p9gEJcM', //Google place ID
theme:'dark', //dark or light
numOfWords: 20 ////max number of words for each review. default:20
});
```
Google Place ID can be found here: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder

## Browser compatibility

- All mordern browsers, including IE9 and above

