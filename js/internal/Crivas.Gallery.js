CS.initGallery = function () {

	$('img').imagesLoaded(function() {

		$('ul.gallery-container-1').owlgallery({
			child: 'li.slides',
			galleryWidth: 1000,
			galleryHeight: 563,
			enableTweener: true,
			autoLoadTweener: true,
			animationType: Owl.animationTypes.SLIDE,
			responsiveMode: Owl.responsiveMode.ONLYRESIZEWHENSMALLER
		});

		$('div.gallery-container-2').owlgallery({
			child: 'div.slides',
			cycleTime: 3000,
			animationTime: 1000,
			galleryWidth: 1000,
			galleryHeight: 563,
			enableTweener: true,
            autoLoadTweener: true,
			animationType: Owl.animationTypes.FADE,
			responsiveMode: Owl.responsiveMode.ONLYRESIZEWHENSMALLER
		});

		$('div.gallery-container-3').owlgallery({
			child: 'img.image-slide',
			cycleTime: 4500,
			animationTime: 1000,
			galleryWidth: 1000,
			galleryHeight: 563,
			enableTweener: true,
            autoLoadTweener: true,
			autoPlay: false,
			responsiveMode: Owl.responsiveMode.ONLYRESIZEWHENSMALLER,
			paginationElement: '.pagination',
			navElement: '.nav'
		});

	});

};

