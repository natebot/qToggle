/**
  * jQuery qToggle Plugin
  * Allows you to toggle (hide/show) DOM elements just by applying data attributes to a controlling HTML element.
  * Supports many jQuery animations like slideToggle, fadeToggle, etc., and also support animation settings such as duration, easing, and callbacks.
  * @developer Nathan Letsinger
  * @since 1.0
  * @requires jQuery 1.7.2
  *
  * Copyright 2012 Nathan Letsinger
  *
  * Permission is hereby granted, free of charge, to any person obtaining
  * a copy of this software and associated documentation files (the
  * "Software"), to deal in the Software without restriction, including
  * without limitation the rights to use, copy, modify, merge, publish,
  * distribute, sublicense, and/or sell copies of the Software, and to
  * permit persons to whom the Software is furnished to do so, subject to
  * the following conditions:
  * The above copyright notice and this permission notice shall be
  * included in all copies or substantial portions of the Software.
  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
  * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  **/
(function($){
	jQuery.fn.qToggle = function(options){

		// settings with defaults
		var settings = $.extend({
			'data'        : {},                         // object - passed into event (reserved for later use)
			'effect'      : 'toggle',              // string - the animation effect on target
			'events'      : 'click.qToggle',      		// string - the event on control (namespaced)
			'context'     : '[data-qtoggle-selector]',  // string - a selector that defines a control
			'selector'    : 'qtoggle-selector',         // string - the name of the data that holds selector string of target
			'targets'     : 'prev',                     // string - the default target if none is specified in settings.selector
			'innerHTML'   : '',                         // string - html to insert into control's text node. Empty string for no change
			'toggleClass' : '',							// string - a class name to toggle if using the toggleClass effect
			'eventArgs'   : {							// object - arguments passed to the effect function
				'duration' 	: 'fast',					// int|string - duration of animation in miliseconds or keywords 'fast','slow',etc. Note that the default 'toggle' effect will always have 0 duration
				'easing' 	: 'linear',					// string - the animation effect, 'linear' or 'swing' are the only options in native jQuery but other plugins may provide other options
				'callback' 	: null						// string|function - the function to call when animation is complete
				}																			
		}, options);
	

	// listen for events on the selector
	this.on( settings.events, settings.context, settings.data, function(event){
		
		// explicitly stop default behavior of events on this control
		event.preventDefault();
		// explicitly stop bubbling
		event.stopPropagation();

		/* @var object - a whitelist of available effects and DOM transversal keywords */
		var defaults = {
			'effects' :[ 'toggle', 'slideToggle', 'fadeToggle', 'hide' , 'show' , 'fadeOut', 'fadeIn', 'slideUp' , 'slideDown', 'toggleClass' ],
			'transversals' : [ 'prev' ,'next', 'parent', 'siblings', 'nextAll', 'prevAll' ,'children' ]
		};

		/* @var object - the jQuery selection of the toggle control element */
		var control = jQuery(this);
		
		// @todo throw an error if given effect is not in our whitelist
		/* @var string - the name of the effect function desired, 'toggle' by default */
		var effect  = control.data('qtoggle-effect') || settings.effect;
		effect      = (jQuery.inArray( effect, defaults.effects ) === -1) ? defaults.effects[0] : effect;
		
		/* @var string - the selector string for our targeted DOM element to be effected */
		var targets 	=  control.data( settings.selector ) || settings.targets;

		/* @var string - the new value of the control's innerHTML, if any */ 
		var innerHTML 	=  ( control.data('qtoggle-text') || settings.innerHTML );

		/* @var string|int - the timing for the animation */ 
		var duration 	= control.data('qtoggle-duration') || settings.eventArgs.duration;
		/* 'toggle' effect should *always* be instantanious regardless of passed duration setting */
		if( effect === 'toggle' ){
			duration = 0;
		}

		/* @var string - the timing for the animation */ 
		var easing    	= control.data('qtoggle-easing') || settings.eventArgs.easing;

		/* @var function|null - the callback function, if any */
		var callback 	=  control.data('qtoggle-callback') || settings.eventArgs.callback;			
		callback 		= (typeof window[callback] === 'function' ) ? window[callback] : null

		// possibly update the innerHTML of the control element
		if( innerHTML ) {
			 control.data( 'qtoggle-text', control.html() );
			 control.html( innerHTML ); 
		}
		
		// exceptions to standard effect arguments:
		// if we are toggling a class then the first argument passed to effect function is a class name not a duration
		if( effect === 'toggleClass' ){
			duration = control.data('qtoggle-class') || settings.eventArgs.toggleClass;
			easing = null;
			callback = null;
		}

		// apply the desired effect on the DOM targets:
		// first we check if we are using a DOM transversal keyword like 'next' or 'prev'
		if( jQuery.inArray(targets, defaults.transversals) !== -1 )
			control[targets]()[effect]( duration, easing,  callback );
		// then we check if we should effect the control itself
		else if( targets === 'this' || targets === 'self' )
			control[effect]( duration, easing, callback );
		// otherwise we select the target using css selectors
		else
			jQuery(targets)[effect]( duration, easing, callback );

		return false; // stop propogations and default events

	});// end this.on()

	// I'm a chainable function
	return this; 

}})( jQuery );