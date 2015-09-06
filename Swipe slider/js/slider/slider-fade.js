'use strict';

define([
    'slider-base'
], function() {
    SliderFade.prototype = new SliderBase();
});

function SliderFade() {
    this.init = function(config) {
        this.config = config;
        this.setup();
    };
    this.checkEndSwiping = function() {
        return this.nextImage.style.opacity == 1 || this.nextImage.style.display == 'none';
    };
    this.setImages = function() {
        if (this.currentImage.style.opacity == 0 && this.nextImage.style.opacity == 1) {
            this.switchImagesOrder();
        } else if (!this.swipeNext) {
            this.setNextImage();
        }

        this.nextImage.style.opacity = 0;
        this.nextImage.style.display = 'block';
    };
    this.swipeImages = function() {
        var transition = 'opacity ' + this.config.swipeSpeed + 'ms ease';

        this.nextImage.style.transition = transition;
        this.nextImage.style.opacity = 1;
        this.currentImage.style.transition = transition;
        this.currentImage.style.opacity = 0;
    };
}