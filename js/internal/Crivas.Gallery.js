CS.initSlider = function () {

    console.log('Init Owl Gallery');

    $('ul.gallery-container-1').owlgallery({
        child: 'li',
        galleryWidth: 1000,
        galleryHeight: 563,
        enableTweener: true
    });

	$('div.gallery-container-2').owlgallery({
		child: 'li',
		galleryWidth: 1000,
		galleryHeight: 563,
		enableTweener: true
	});

	$('div.gallery-container-3').owlgallery({
		child: 'li',
		galleryWidth: 1000,
		galleryHeight: 563,
		enableTweener: true
	});

};

