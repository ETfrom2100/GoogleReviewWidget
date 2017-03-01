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
			'hasNav':false
		};
		options = GRW.helpers.extendObj({},defaults,options);
		console.log(options);
		var target = document.querySelector(options.target);
		if(target)
		{
			if(options.placeid !== '' && google)
			{
				
				var service = new google.maps.places.PlacesService(document.querySelector(options.target));
			
				service.getDetails({
					placeId: options.placeid
				}, function(place, status) {
					if (status === google.maps.places.PlacesServiceStatus.OK) {
								var grw_wrapper = GRW.helpers.createElem('div',{
									className:'grw-wrapper',

								});

								target.appendChild(grw_wrapper);
								var theme_wrapper = GRW.helpers.createElem('div',{
									className:'google-reviews grw-theme-'+options.theme
								});
								grw_wrapper.appendChild(theme_wrapper);

								var widget_header = GRW.buildWidgetHeader(place);
								var reviews_wrapper = GRW.buildReviews(place,options);
								var widget_footer = GRW.buildWidgetFooter();
								theme_wrapper.appendChild(widget_header);
								theme_wrapper.appendChild(reviews_wrapper);
								theme_wrapper.appendChild(widget_footer);
					}
					
				});
				
			}
			else
			{
				return;
			}
			
			
			
		}
		
	};
	
	GRW.buildWidgetHeader = function(place){
		console.log(place);
		var place_name = place.name;
		var place_url = place.url;
		var place_rating = place.rating;
		var header_wrapper = GRW.helpers.createElem('div',{
									className:'grw-business-header grw-clear-fix'
								});
		header_wrapper.innerHTML = '<div class="grw-header-content-wrapper"><span class="grw-business-name"><a href="'+place_url+'" rel="nofollow" target="_blank" title="'+place_name+'">'+place_name+'</a></span><div class="grw-google-rating-content"><div class="grw-google-star-rating-wrapper"><div class="grw-google-star-rating" style="width:'+Math.round(67*place_rating/5)+'px"></div></div></div><div class="grw-rating-value">'+place_rating+' out of 5 stars</div></div>';
		
		return header_wrapper;
	};
	GRW.buildReviews = function(place,options){
		var wrapper_class = 'grw-reviews-wrapper';
		var review_class = 'grw-review';
		if(options.hasNav)
		{
			wrapper_class = 'grw-reviews-wrapper grw-slider-wrapper';
			review_class = 'grw-review grw-review-slide';
		}
		var reviews_wrapper = GRW.helpers.createElem('div',{
									className:wrapper_class
								});
		var reviews = place.reviews;
		for(var i=0; i<reviews.length;i++){
			var author = reviews[i].author_name;
			var rating = reviews[i].rating;
			var content = reviews[i].text;
			var review_html = '<div class="'+review_class+'"><div class="grw-author">'+author+'</div><div class="grw-review-rating"><div class="grw-google-star-rating-wrapper"><div class="grw-google-star-rating" style="width:'+Math.round(rating*67/5)+'px"></div></div></div><div class="grw-review-content"><p>'+content+'</p></div></div>';
			reviews_wrapper.innerHTML +=review_html;
		}
		
		return reviews_wrapper;
		
		
	};
	GRW.buildWidgetFooter = function(){
		var footer_wrapper = GRW.helpers.createElem('div',{
									className:'grw-business-footer grw-clear-fix'
								});
		footer_wrapper.innerHTML = '<div class="poweredByGoogle"></div>'
		return footer_wrapper;
	};
	
	window.$GrwJS = GRW;
}(this,this.document));