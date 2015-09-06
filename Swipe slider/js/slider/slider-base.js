'use strict';

function cancelBubbling(e) {
    e.stopPropagation();
    e.preventDefault();
}

function SliderBase() {
    this.currentImage = null;
    this.nextImage = null;
    this.interval = null;
    this.startClientX = null;
    this.swipeNext = null;
    this.tapeNode = null;

    this.setup = function() {
        this.checkConfig();
        this.appendTape();
        this.setMode();
    };

    this.checkConfig = function() {
        if (!this.config.images || !this.config.images.length) throw ('Images is not found');
        if (this.config.images.length < 2) throw ('Images count must be from 2 to ∞');
        if (!this.config.sliderNode) throw ('Slider node is not fount');
        if (!(/^auto|manual|automanual$/).test(this.config.mode)) throw ('Incorrect swipe mode. Allowed auto, manual, automanual');

        this.config.mode = this.config.mode || 'auto';
        this.config.swipeSpeed = this.config.swipeSpeed && this.config.swipeSpeed > 100 ? this.config.swipeSpeed : 500;
        this.config.swipeDelay = this.config.swipeDelay && this.config.swipeDelay > 500 ? this.config.swipeDelay : 3000;
    };

    this.appendTape = function() {
        this.tapeNode = document.createElement('figure');
        this.tapeNode.className = 'slider-tape';
        this.fillTape();
        this.config.sliderNode.appendChild(this.tapeNode);
    };
    this.fillTape = function() {
        for (var i = 0; i < 2; i++) this.appendImage(i);
        this.currentImage = this.tapeNode.childNodes[0];
        this.currentImage.style.display = 'block';
        this.nextImage = this.tapeNode.childNodes[1];

        // simulating new thread for loading a rest of images
        setTimeout(function() {
            for (var i = 2, length = this.config.images.length; i < length; i++) this.appendImage(i);
        }.bind(this), 0);
    };

    this.appendImage = function(index) {
        var image = document.createElement('img');

        image.src = this.config.images[index];
        image.style.left = '0px';
        image.style.display = 'none';
        this.tapeNode.appendChild(image);
    };
    this.getNextImage = function(image) {
        return image.nextElementSibling ? image.nextElementSibling : image.parentNode.childNodes[0];
    };
    this.getPrevImage = function(image) {
        return image.previousElementSibling ? image.previousElementSibling : image.parentNode.childNodes[image.parentNode.childNodes.length - 1];
    };
    this.setNextImage = function() {
        this.nextImage = this.swipeNext ? this.getNextImage(this.currentImage) : this.getPrevImage(this.currentImage);
    };

    this.setMode = function() {
        this.swipeNext = true;

        switch (this.config.mode) {
            case 'auto':
                this.setAutoMode();
                break;
            case 'manual':
                this.setManualMode();
                break;
            case 'automanual':
            default:
                this.setAutoManualMode();
                break;
        }
    };
    this.setAutoMode = function() {
        this.interval = setInterval(function() {
            this.animateSwiping();
        }.bind(this), this.config.swipeDelay);
    };
    this.setManualMode = function() {
        this.tapeNode.addEventListener('mousedown', this.getStartClientXPosition.bind(this), false);
        this.tapeNode.addEventListener('mousemove', this.dragImages.bind(this), false);
        this.tapeNode.addEventListener('touchstart', this.getStartClientXPosition.bind(this), false);
        this.tapeNode.addEventListener('touchmove', this.dragImages.bind(this), false);
    };
    this.setAutoManualMode = function() {
        this.setAutoMode();
        this.setManualMode();
        this.tapeNode.addEventListener('mouseover', this.stopAutoSwiping.bind(this), false);
        this.tapeNode.addEventListener('mouseout', this.startAutoSwiping.bind(this), false);
        this.tapeNode.addEventListener('touchstart', this.stopAutoSwiping.bind(this), false);
        this.tapeNode.addEventListener('touchend', this.startAutoSwiping.bind(this), false);
    };

    this.animateSwiping = function() {
        if (!this.checkEndSwiping()) return;
        this.setImages();

        // simulating delay for guaranteed transition setting
        setTimeout(function() {
            this.swipeImages();
            this.swipeNext = true;
        }.bind(this), 20);
    };
    this.dragImages = function(e) {
        var endClientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;

        cancelBubbling(e);
        if (!this.startClientX) return;
        this.swipeNext = endClientX < this.startClientX;

        if (endClientX == this.startClientX || (!this.swipeNext && endClientX - this.startClientX < 20) || (this.swipeNext && this.startClientX - endClientX < 20))
            return;

        this.animateSwiping();
        this.startClientX = null;
        this.tapeNode.removeEventListener('mousemove');
        this.tapeNode.removeEventListener('touchmove');
    };
    this.getStartClientXPosition = function(e) {
        cancelBubbling(e);
        this.startClientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    };
    this.startAutoSwiping = function(e) {
        cancelBubbling(e);
        this.setAutoMode();
    };
    this.stopAutoSwiping = function(e) {
        cancelBubbling(e);
        clearInterval(this.interval);
    };
    this.switchImagesOrder = function() {
        this.currentImage.style.display = 'none';
        this.currentImage = this.nextImage;
        this.setNextImage();
    };
    this.checkEndSwiping = function() {};
    this.setImages = function() {};
    this.swipeImages = function() {};
}