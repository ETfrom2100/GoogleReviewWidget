# Google Review Widget
A javascript widget plugin that pulls up to 5 Google business reviews 
## How to use

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
});```

## Browser compatibility

- All mordern browsers, including IE9 and above

