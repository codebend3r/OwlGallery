CS.initSlider = function () {

    console.log('Init Owl Gallery');

    $('.slides').owlgallery({
        child: '.image-slide',
        galleryWidth: 1000,
        galleryHeight: 563,
        enableTweener: true,
        autoLoadTweener: true
    });

};

