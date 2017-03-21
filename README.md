# Google Review Widget

A javascript widget plugin that pulls up to 5 Google business reviews 

Inspired by: https://wordpress.org/plugins/google-places-reviews/

[Demo](https://etfrom2100.github.io/google-review-widget/demo.html)

## How to use

#### Installation

Include files

```html
<link  href="/path/to/grw-styles.css" rel="stylesheet">
<script src="https://maps.googleapis.com/maps/api/js?key=API_KEY&libraries=places"></script><!--Google Maps Javascript API and the Places Library -->
<script src="/path/to/grw.min.js"></script>

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
numOfWords: 20 //max number of words for each review. default:20,
horizontal:true, //display reviews in a horizontal slider if true; otherwise, display reviews vertically; true as default 
autoScroll:true, //automatically scroll the reivew horizontally; horizontal has to be set to true; false as default
scrollInterval:8 //an interval on how often to scroll the review horizontally; default: 8s
});
```
Google Place ID can be found here: 

https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder

## Browser compatibility

- All mordern browsers, including IE9 and above

