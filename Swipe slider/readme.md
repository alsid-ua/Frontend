# Swipe slider

Animation slider with "Slide" and "Fade in" animation types.

### Example of configurational object for swipe slider:

    var config = {
	// arbitrary number of images
	images: [
		'http://example.com/image-1.jpg',
		'http://example.com/image-2.jpg',
		'http://example.com/image-3.jpg',
		'http://example.com/image-4.jpg'
	],
	// possible values: 'auto', 'manual', 'automanual'
	mode: 'auto',
	// arbitrary interger (miliseconds)
	swipeSpeed: 500,
	// arbitrary interger (miliseconds). This is used in 'auto' and 'automanual' modes
	swipeDelay: 3000
    };
	
### Explanation:

* ***images*** — Array of images that will represent slides of Swipe slider. Possible number of images: from 2 to ?.
* ***mode*** — String
* ***auto*** — slides will be changed automatically. User can not interact with slider.
* ***manual*** — only user should be able to change slides by making swipe gesture by mouse or by finger (on touch devices).
* ***automanual*** — both of two previous. Slides are changed automatically and user is able to change them manually.
* ***swipeSpeed*** — the speed of animation.
* ***swipeDelay*** — delay between slides change in automatical swipe mode. Ignored in 'manual' mode.