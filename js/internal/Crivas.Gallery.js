CS.initGallery = function () {

	$('img').imagesLoaded(function() {

		$('.gallery-container-1').owlgallery({
			child: 'li.slides',
			galleryWidth: 1000,
			galleryHeight: 563,
            relativeAutoLoadPath: '/js/vendor/'
		});

		$('.gallery-container-2').owlgallery({
			child: 'div.slides',
			cycleTime: 1500,
			animationTime: 1000,
			galleryWidth: 1000,
			galleryHeight: 563,
			enableTweener: true,
            autoLoadTweener: true,
			animationType: Owl.animationTypes.FADE,
			responsiveMode: Owl.responsiveMode.ONLYRESIZEWHENSMALLER,
            relativeAutoLoadPath: '/js/vendor/'
		});

		$('.gallery-container-3').owlgallery({
			child: 'img.image-slide',
			animationTime: 1000,
			galleryWidth: 1000,
			galleryHeight: 563,
			enableTweener: true,
            autoLoadTweener: true,
			autoPlay: false,
			responsiveMode: Owl.responsiveMode.ONLYRESIZEWHENSMALLER,
			paginationElement: '.pagination',
			navElement: '.nav',
            relativeAutoLoadPath: '/js/vendor/'
		});

        $('.gallery-container-4').owlgallery({
            child: 'li.slides',
            cycleTime: 1500,
            animationTime: 1000,
            galleryWidth: 1000,
            galleryHeight: 563,
            enableTweener: true,
            autoLoadTweener: true,
            autoPlay: false,
            animationType: Owl.animationTypes.SLIDE,
            responsiveMode: Owl.responsiveMode.ONLYRESIZEWHENSMALLER,
            showThumbnails: true,
            relativeAutoLoadPath: '/js/vendor/'
        });

	});

};

