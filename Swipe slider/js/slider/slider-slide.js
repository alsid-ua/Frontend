'use strict';

define([
    'slider-base'
], function() {
    SliderSlide.prototype = new SliderBase();
});

function SliderSlide() {
    this.init = function(config) {
        this.config = config;
        this.setup();
    };
    this.checkEndSwiping = function() {
        return this.nextImage.style.left == '0px';
    };
    this.setImages = function() {
        if (this.nextImage.style.display == 'block' && this.nextImage.style.left == '0px') {
            this.switchImagesOrder();
        } else if (!this.swipeNext) {
            this.setNextImage();
        }

        this.nextImage.style.left = (this.swipeNext ? this.currentImage.clientWidth : -this.currentImage.clientWidth) + 'px';
        this.nextImage.style.display = 'block';
    };
    this.swipeImages = function() {
        var transition = 'left ' + this.config.swipeSpeed + 'ms ease';

        this.nextImage.style.transition = transition;
        this.nextImage.style.left = '0px';
        this.currentImage.style.transition = transition;
        this.currentImage.style.left = (this.swipeNext ? -this.currentImage.clientWidth : this.currentImage.clientWidth) + 'px';
    };
}