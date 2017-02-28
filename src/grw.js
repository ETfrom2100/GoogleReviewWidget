/**
* @app GoolgeReviewWidget
* @desc A widget pulls up to 5 Google reviews using Google Place API
* @version 1.0.0
* @license The MIT License (MIT)
* @author Leo Lee
*/
;(function(win,doc,undef){
	'use strict';
	
	var GRW = {};
	GRW.helpers = {
		extendObj:function(){
			//console.log(arguments);
			for(var i=1; i<arguments.length;i++)
			{
				for(var key in arguments[i])
				{
					if(arguments[i].hasOwnProperty(key))
					{
						//console.log(arguments[i][key].constructor);
						if(arguments[i][key] && arguments[i][key].constructor && arguments[i][key].constructor === Object)
						{
							arguments[0][key] = arguments[i][key] || {};
							this.extendObj(arguments[0][key],arguments[i][key]);
						}
						else
						{
							arguments[0][key] = arguments[i][key];
						}
					}
				}
			}
			return arguments[0];
		},
		createElem:function(tag,props){
			var elem = document.createElement(tag);
			for(var key in props)
			{
				elem[key] = props[key];
			}
			return elem;
		}
	};
	GRW.init = function(options){
		var defaults = {
			target:'',
			placeid:'',
			theme:'dark',//light,dark
			'readmore':false,
			'hasSlider':false
		};
		options = GRW.helpers.extendObj({},defaults,options);
		console.log(options);
		var target = document.querySelector(options.target);
		if(target)
		{
			if(options.placeid !== '' && google)
			{
				var place_details = GRW.getPlaceDetails(options);
			}
			else
			{
				return;
			}
				
			var grw_wrapper = GRW.helpers.createElem('div',{
				className:'grw-wrapper',
				
			});
			
			target.appendChild(grw_wrapper);
			var theme_wrapper = GRW.helpers.createElem('div',{
				className:'google-reviews grw-theme-'+options.theme
			});
			grw_wrapper.appendChild(theme_wrapper);
			
			var widget_header = GRW.buildWidgetHeader();
			var reviews_wrapper = GRW.buildReviews();
			var widget_footer = GRW.buildWidgetFooter();
		}
		
	};
	GRW.getPlaceDetails = function(options){
		if(options.placeid)
		{
			var service = new google.maps.places.PlacesService(document.querySelector(options.target));
			
			service.getDetails({
				placeId: options.placeid
			}, function(place, status) {
										  if (status === google.maps.places.PlacesServiceStatus.OK) {
										  	console.log(place)
										  }
		    });
		}
	};
	GRW.buildWidgetHeader = function(){
		
	};
	GRW.buildReviews = function(){
		
	};
	GRW.buildWidgetFooter = function(){
		
	};
	
	window.$GrwJS = GRW;
}(this,this.document));