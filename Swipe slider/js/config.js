'use strict';

requirejs.config({
    baseUrl: 'js/slider'
});

// ------------------------
// SLIDE ANIMATION
// ------------------------
(function() {
    require(['slider-slide'], function() {
        (new SliderSlide()).init({
            images: [
                'img/image-1.jpg',
                'img/image-2.jpg',
                'img/image-3.jpg',
                'img/image-4.jpg'
            ],
            mode: 'automanual',
            sliderNode: document.body.querySelector('.slide-automanual'),
            swipeSpeed: 500,
            swipeDelay: 3000
        });

        (new SliderSlide()).init({
            images: [
                'img/image-1.jpg',
                'img/image-2.jpg',
                'img/image-3.jpg',
                'img/image-4.jpg'
            ],
            mode: 'manual',
            sliderNode: document.body.querySelector('.slide-manual'),
            swipeSpeed: 500,
            swipeDelay: 3000
        });

        (new SliderSlide()).init({
            images: [
                'img/image-1.jpg',
                'img/image-2.jpg',
                'img/image-3.jpg',
                'img/image-4.jpg'
            ],
            mode: 'auto',
            sliderNode: document.body.querySelector('.slide-auto'),
            swipeSpeed: 500,
            swipeDelay: 3000
        });
    });
})();

// ------------------------
// FADE ANIMATION
// ------------------------
(function() {
    require(['slider-fade'], function() {
        (new SliderFade()).init({
            images: [
                'img/image-1.jpg',
                'img/image-2.jpg',
                'img/image-3.jpg',
                'img/image-4.jpg'
            ],
            mode: 'automanual',
            sliderNode: document.body.querySelector('.fade-automanual'),
            swipeSpeed: 500,
            swipeDelay: 3000
        });

        (new SliderFade()).init({
            images: [
                'img/image-1.jpg',
                'img/image-2.jpg',
                'img/image-3.jpg',
                'img/image-4.jpg'
            ],
            mode: 'manual',
            sliderNode: document.body.querySelector('.fade-manual'),
            swipeSpeed: 500,
            swipeDelay: 3000
        });

        (new SliderFade()).init({
            images: [
                'img/image-1.jpg',
                'img/image-2.jpg',
                'img/image-3.jpg',
                'img/image-4.jpg'
            ],
            mode: 'auto',
            sliderNode: document.body.querySelector('.fade-auto'),
            swipeSpeed: 500,
            swipeDelay: 3000
        });
    });
})();