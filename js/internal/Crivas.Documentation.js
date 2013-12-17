CS.documentation = {

    options: [
        {
            key: 'child',
            defaultValue: 'null',
            type: 'String | Selector',
            description: 'The child element which can be a div, li, or img elements.',
            required: true
        },
        {
            key: 'cycleTime',
            defaultValue: '3000',
            type: 'Number',
            description: 'The time in milliseconds it takes for owl gallery to automatically go to the next slide.',
            required: false
        },
        {
            key: 'animationTime',
            defaultValue: '350',
            type: 'Number',
            description: 'The time in milliseconds it takes for owl gallery to automatically go to the next slide.',
            required: false
        },
        {
            key: 'galleryWidth',
            defaultValue: '640',
            type: 'Number',
            description: 'The width of the element passed into owlgallery.',
            required: false
        },
        {
            key: 'galleryHeight',
            defaultValue: '480',
            type: 'Number',
            description: 'The height of the element passed into owlgallery.',
            required: false

        },
        {
            key: 'paginationElement',
            defaultValue: 'null',
            type: 'String | Selector',
            description: 'A JQuery selector string which contains ONE iteration of the pagination element. The plugin will automatically create the number of elements according to the number of slides.',
            required: false
        },
        {
            key: 'navElement',
            defaultValue: 'null',
            type: 'String | Selector',
            description: 'A JQuery selector string which contains two elements that will move forward and backwards through the gallery when clicked.',
            required: false
        },
        {
            key: 'animationType',
            defaultValue: 'slide',
            type: 'String | Predefined',
            description: 'Accepts two strings:<br/><br/> slide | fade. <br/><br/>OR<br/><br/> constants Owl.animationTypes.SLIDE | Owl.animationTypes.FADE',
            required: false
        },
        {
            key: 'direction',
            defaultValue: 'forward',
            type: 'String | Predefined',
            description: 'Accepts two strings:<br/><br/> forward | backward. <br/><br/>OR<br/><br/> Owl.direction.FORWARD | Owl.direction.BACKWARD',
            required: false
        },
        {
            key: 'responsiveMode',
            defaultValue: 'neverresize',
            type: 'String | Predefined',
            description: 'Whether the gallery to resizes on window resize event. If set to <var>neverresize</var> it ignores <var>galleryWidth</var> and <var>galleryHeight</var>. Accepts one of 3 predefined of strings: <br/><br/>alwaysresize | onlyresizewhensmaller | neverresize <br/><br/>OR<br/><br/> Owl.responsivemode.ALWAYSRESIZE | Owl.responsivemode.ONLYRESIZEWHENSMALLER | Owl.responsivemode.NEVERRESIZE',
            required: false
        },
        {
            key: 'enableTweener',
            defaultValue: 'false',
            type: 'Boolean',
            description: 'Allows animations to use TweenMax/TweenLite animations for improved performance. Must be loaded externally. <a href="http://www.greensock.com/get-started-js/">DOWNLOAD</a>',
            required: false
        },
        {
            key: 'enableTouchEvents',
            defaultValue: 'false',
            type: 'Boolean',
            description: 'Enables touch events for swipe left and swipe right. No support for swiping up or down. External library required. ',
            required: false
        },
        {
            key: 'autoPlay',
            defaultValue: 'false',
            type: 'Boolean',
            description: 'Whether to automatically start the gallery cycle based on <var>cycleTime</var>.',
            required: false
        },
        {
            key: 'hideUntilReady',
            defaultValue: 'false',
            type: 'Boolean',
            description: 'Hides the entire plugin via opacity until ready. Then fades in.',
            required: false
        }


    ],
	
	events: [
		{
			eventName: 'slidechanged',
			description: 'Dispatched when the slide is changed in any way. In other words if the slide changes via swipe, navigation, pagination or timer.',
			target: 'Event returns an instance of the event and one parameter, containing the current slide number.'
		},
		{
			eventName: 'slidenextclicked',
			description: 'Dispatched when the next button is clicked.',
			target: 'Event returns an instance of the event and one parameter, containing the current slide number.'
		},
		{
			eventName: 'slideprevclicked',
			description: 'Dispatched when the previous button is clicked.',
			target: 'Event returns an instance of the event and one parameter, containing the current slide number.'
		},
		{
			eventName: 'paginationclicked',
			description: 'Dispatched when one of the pagination elements are clicked.',
			target: 'Event returns an instance of the event and one parameter, containing the current slide number.'
		}
	]

};