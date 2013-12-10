CS.initSlider = function () {

    console.log('Init Owl Gallery');

    $('.slides').owlgallery({
        child: 'li',
	    animationType: Owl.animationTypes.FADE,
        galleryWidth: 1000,
        galleryHeight: 563,
        enableTweener: true
    });

};

