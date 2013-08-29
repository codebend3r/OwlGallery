
var Crivas = {};

Crivas.animationTypes = {};
Crivas.animationTypes.SLIDE = "slide";
Crivas.animationTypes.FADE = "fade";

Crivas.direction = {};
Crivas.direction.FORWARD = "forward";
Crivas.direction.BACKWARD = "backward";

$.fn.crivasslider = function (options) {

  var settings = $.extend({
    // These are the defaults.
    cycleTime: 3000,
    animationTime: 350,
    paginationElement: null,
    animationType: Crivas.animationTypes.FADE,
    direction: Crivas.direction.FORWARD,
    child: null //will automatically find img tags
  }, options);

	var $this = this,
	$imageList = [],
	$paginationButtonList = [],
	imgWidth = null,
	imgHeight = null,
	loopBack = false,
	currentSlide,
  prevSlide,
  currentPaginationButton,
  prevPaginationButton,
  firstImage,
  lastImage,
  numberOfPics = 0,
  cycleTimer = null,
  currentID,
  prevID,
  currentSlideNum,
  containerClassName = 'crivas-container',
  imageClassName = 'crivas-image',
  paginationClass = 'crivas-pagination-button';

  /**
   Get a new list of images and starts cycle again

   @method initCycle
   **/
  var initCycle = function () {

    console.log('CrivasGallery.initCycle');

    if (settings.direction !== Crivas.direction.FORWARD && settings.direction !== Crivas.direction.BACKWARD) {
      throw Error("direction option is not set to valid option 'forward' or 'backwards'. Defaulting to 'forward'");
      settings.direction = Crivas.direction.FORWARD;
    }

    if (settings.animationType !== Crivas.animationTypes.FADE && settings.animationType !== Crivas.animationTypes.SLIDE) {
      throw Error("animationType option is not set to a valid option 'fade' or 'slide'. Defaulting to 'fade'");
      settings.animationType = Crivas.animationTypes.FADE;
    }

    $this.addClass(containerClassName);
    $this.css({
      overflow: 'hidden',
      zIndex: 1
		});

    var kids, $paginationContainer, paginationButtonItem, id = 0;

    settings.child !== null ? kids = $(settings.child) : kids = $this.children('img');

    $paginationContainer = $(settings.paginationElement);
    paginationButtonItem = $paginationContainer.children('li');

    // clear the list items
    $paginationContainer.html('');

    kids.each(function () {

      var child = $(this);

      imgWidth = Math.max(child.width(), imgWidth);
      imgHeight = Math.max(child.height(), imgHeight);

      // if child is an img tag
      if (child.is('img')) {

        child.addClass(imageClassName);
        child.css({
	        position: 'absolute',
	        zIndex: 0
        });

        var paginationCopy = paginationButtonItem.clone();

        paginationCopy.attr('buttonID', id);
        paginationCopy.addClass(paginationClass);

				//add a new list item on every loop
        $paginationContainer.append(paginationCopy);

        id += 1;

      } else {

        throw Error("Can not find img tags please use the child property to pass in a valid img selector.");

      }

    });

    $imageList = $('.'+ imageClassName);
    $paginationButtonList = $('.' + paginationClass);
    $paginationButtonList.bind('click', paginationClick);
    numberOfPics = $imageList.length - 1;
    firstImage = $imageList[ 0 ];
    lastImage = $imageList[ numberOfPics ];

    if (settings.direction == Crivas.direction.FORWARD) {

      currentSlideNum = 0;

      if (settings.animationType.FADE) {
        showBottomImage(false);
      } else {
	      initSlides();
      }

    } else {

      currentSlideNum = numberOfPics + 1;

      if (settings.animationType.FADE) {
        showTopImage(false);
      } else {
	      initSlides();
      }

    }

    // clear any intervals currently running
    killTimer();

    // start cycling through images
	  startTimer();

  };

  /**
   Cycles through the next image in the array.
   If it's the last image in array it will reset back to the first one.

   @method cycleImages
   **/
  var cycleImages = function () {

	  //console.log('CrivasGallery.cycleImages', currentSlideNum);

	  if (settings.direction == Crivas.direction.FORWARD) {

		  // going forward
		  if (currentSlideNum >= numberOfPics) {

			  currentSlideNum = 0;

			  // define prevSlide and currentSlide
			  setCurrentSlide(currentSlideNum);

			  if (settings.animationType.FADE) {
				  showBottomImage(true);
			  } else {
				  resetImageSlides();
			  }

		  } else {

			  // increment current slide #
			  currentSlideNum += 1;

				// define prevSlide and currentSlide
			  setCurrentSlide(currentSlideNum);

			  if (settings.animationType.FADE) {

				  // if going forward fade in each image on top
				  $(currentSlide).fadeIn(settings.animationTime);

			  } else {

				  slideForward();

			  }

		  }

	  } else {

		  // going backwards
		  if (currentSlideNum <= 1) {

			  currentSlideNum = numberOfPics + 1;

				// define prevSlide and currentSlide
			  setCurrentSlide(currentSlideNum);

			  if (settings.animationType.FADE) {
				  showBottomImage(true);
			  } else {
				  resetImageSlides();
			  }

		  } else {

			  // decrement current slide #
			  currentSlideNum -= 1;

				// define prevSlide and currentSlide
			  setCurrentSlide(currentSlideNum);

			  if (settings.animationType.FADE) {

				  // if going backwards fade out each image to reveal the image under
				  $(currentSlide).fadeOut(settings.animationTime);

			  } else {

				  slideBackward();

			  }

		  }

	  }

  };

  var slideForward = function() {

	  // move offscreen to the left
	  if (loopBack) {

		  // take the last image and move it offscreen, only happens once
		  $(firstImage).show();
		  $(firstImage).css({ left: 0 });
		  $(firstImage).animate({
			  left: 0 - imgWidth
		  }, settings.animationTime, function () {
			  $(firstImage).hide();
		  });

		  loopBack = false;

	  } else {

		  // when not looping back
		  $(prevSlide).show();
		  $(prevSlide).css({ left: 0 });
		  $(prevSlide).animate({
			  left: 0 - imgWidth
		  }, settings.animationTime, function () {
			  $(prevSlide).hide();
		  });

	  }

	  // move the current slide in from the right
	  $(currentSlide).show();
	  $(currentSlide).css({ left: imgWidth });
	  $(currentSlide).animate({
		  left: 0
	  }, settings.animationTime);

  };

  var slideBackward = function() {

	  // move offscreen to the left
	  if (loopBack) {

		  // take the last image and move it offscreen, only happens once
		  $(firstImage).show();
		  $(firstImage).css({ left: 0 });
		  $(firstImage).animate({
			  left: 0 + imgWidth
		  }, settings.animationTime, function () {
			  $(firstImage).hide();
		  });

		  loopBack = false;

	  } else {

		  // when not looping back
		  $(prevSlide).show();
		  $(prevSlide).css({ left: 0 });
		  $(prevSlide).animate({
			  left: 0 + imgWidth
		  }, settings.animationTime, function () {
			  $(prevSlide).hide();
		  });

	  }

	  // move the current slide in from the right
	  $(currentSlide).show();
	  $(currentSlide).css({ left: 0 - imgWidth });
	  $(currentSlide).animate({
		  left: 0
	  }, settings.animationTime);

  };

  ///////////////////////////////
  // FADE ANIMATION METHODS
  ///////////////////////////////

  /**
   Cycles through the whole image array and show and/or reposition every image

   @method initSlides
   **/
  var initSlides = function () {

	  if (settings.animationType.FADE) {
		  $.each($imageList, function () {
			  $(this).show();
		  });
	  } else {
		  $.each($imageList, function () {
			  $(this).hide();
			  $(this).css({left: imgWidth + 100});
		  });
		  $(firstImage).show();
		  $(firstImage).css({left:0});
	  }

  };

  /**
   Hide all images and fade in the top image

   @method showTopImage
   **/
  var showTopImage = function (fade) {

	  $.each($imageList, function () {
		  $(this).hide();
	  });

	  $(firstImage).show();
	  $(lastImage).show();

	  if (fade) {
		  $(lastImage).hide();
		  $(lastImage).fadeIn(settings.animationTime, showAll);
    }

  };

  /**
   Hide all images and fade out the top image

   @method showBottomImage
   **/
  var showBottomImage = function (fade) {

	  $.each($imageList, function () {
		  $(this).hide();
	  });

	  $(firstImage).show();

	  if (fade) {
		  $(lastImage).show();
		  $(lastImage).fadeOut(settings.animationTime);
    }

  };

	/**
	 reset the image positions when animationType is set to 'slide'
	 set loopBack to true
	 @method resetImageSlides
	 **/
  var resetImageSlides = function() {

	  $.each($imageList, function () {
		  $(this).hide();
		  $(this).css({left: imgWidth + 100});
	  });

	  $(lastImage).show();
	  $(lastImage).css({ left: 0 });
	  $(lastImage).animate({
		  left: 0 - imgWidth
	  }, settings.animationTime, function () {
		  $(prevSlide).hide();
	  });

	  $(firstImage).show();
	  $(firstImage).css({ left: imgWidth });
	  $(firstImage).animate({
		  left: 0
	  }, settings.animationTime);

	  loopBack = true;

  };

	/**
	 adds the current class to the currently showing image slide and corresponding pagination button
	 @method setCurrentSlide
	 **/
	var setCurrentSlide = function (i) {

		if ( typeof(i) !== 'number' ) throw Error('variable i is not a number. Type of i is' + typeof(i));

		currentSlideNum = Number(i);

		// select current slide from list array
		prevSlide = currentSlide || $imageList[ 0 ];
		currentSlide = $imageList[ currentSlideNum ];

		if ($(prevSlide).hasClass('current')) $(prevSlide).removeClass('current');
		$(currentSlide).addClass('current');

		// select current pagination button from list array
		prevPaginationButton = currentPaginationButton || $paginationButtonList[ 0 ];
		currentPaginationButton = $paginationButtonList[ currentSlideNum ];

		if ($(prevPaginationButton).hasClass('current')) $(prevPaginationButton).removeClass('current');
		$(currentPaginationButton).addClass('current');

	};

	/**
	 Click event for pagination button click.
	 Looks for buttonID then calls appropriate slide if same button is not clicked
	 @method paginationClick
	 **/
  var paginationClick = function(e) {

	  var $currentTarget = $(e.currentTarget);

	  prevID = currentID || null;

	  currentID = Number( $currentTarget.attr('buttonID') );

		// if the same pagination button hasn't been clicked then change slide
	  if ( currentID !== prevID ) goToSlide(currentID);

  };

	/**
	 Takes in a param, stops the timer, set the current and previous slides and animatate towards next slide
	 @param a number - determines which slide to go to.
	 @method goToSlide
	 **/
	var goToSlide = function (i) {

		killTimer();

		currentSlideNum = i;

		setCurrentSlide(currentSlideNum);

		if (settings.direction == Crivas.direction.FORWARD) {
			slideForward();
		} else {
			slideBackward();
		}

		startTimer();

	};

  /**
   Stop the cycling timer

   @method killSection
   **/
  var killTimer = function () {
    clearInterval(cycleTimer);
  };

	/**
	 Starts the cycling timer

	 @method killSection
	 **/
	var startTimer = function () {
		if (numberOfPics > 0) {
			cycleTimer = setInterval(cycleImages, settings.cycleTime);
		}
	};

  initCycle();

  return $this;

};