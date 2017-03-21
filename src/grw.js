/**
* @app GoolgeReviewWidget
* @desc A widget pulls up to 5 Google reviews using Google Place Javascript API
* @version 1.0.0
* @license The MIT License (MIT)
* @author Leo Lee
*/
;(function(win,doc,undef){
	'use strict';
	
	var GRW = {};
	GRW.helpers = {
		extendObj:function(){
			
			for(var i=1; i<arguments.length;i++)
			{
				for(var key in arguments[i])
				{
					if(arguments[i].hasOwnProperty(key))
					{
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
		//a helper for creating a DOM element
		createElem:function(tag,props){
			var elem = document.createElement(tag);
			
			for(var key in props)
			{
				elem.setAttribute(key, props[key]);
			}
			return elem;
		},
		//If a review has more words than the max number of words set in the options, add ellipsis to it
		ellipsis:function(elem,numOfWords){
			
			var text = elem.textContent;
			
			var words_count = text.split(/\s+/).length;
			
			if(words_count > numOfWords)
			{
				var trimmedText = text.split(/\s+/,numOfWords).join(' ')+'...';
				
				elem.textContent = trimmedText;
				
				var rm_link_wrapper = document.createElement('div');
				var rm_link = GRW.helpers.createElem('a',{
					class:'rm-link'
				});
				rm_link.textContent = 'Read More';
				rm_link_wrapper.appendChild(rm_link);
				elem.parentElement.appendChild(rm_link_wrapper);
				rm_link.addEventListener('click',function(){
					if(this.getAttribute('data-clicked') !== 'true')
					{
						elem.textContent = text;
						this.textContent = 'Read Less';
						this.setAttribute('data-clicked',true);
					}
					else
					{
						elem.textContent = trimmedText;
						this.textContnet = 'Read More';
						this.setAttribute('data-clicked',false);
					}
					
				});
			}
			
		},
		//display the reviews horizontally as a slider
		initSlider:function(container){
			var links = container.querySelectorAll( ".grw-slider-nav a" );
			var wrapper = container.querySelector( ".grw-slider-wrapper" );
			for( var i = 0; i < links.length; i++ ) {
				var aLink = links[i];
				if(document.addEventListener)
				{
					aLink.addEventListener( "click", function( e ) {
						e.preventDefault();
						var a = this;
						
						a.className = "grw-slide-current";

						for( var j = 0; j<links.length; ++j ) {
							var cur = links[j];
							if( cur !== a ) {
								cur.className = "";
							}
						}
						var index = parseInt( a.getAttribute( "data-grw-slide" ), 10 ) + 1;
						var currentSlide = container.querySelector( ".grw-review-slide:nth-child(" + index + ")" );

						wrapper.style.left = "-" + currentSlide.offsetLeft + "px";
						

					}, false);
				}
			}
		},
		
	};
	//initialize the widget
	GRW.init = function(options){
		var defaults = {
			target:'',
			placeid:'',
			theme:'dark',//light,dark
			numOfWords:20, //max number of words for each review. default:20
			horizontal:true, //display reviews horizontally
			autoScroll:false, //automatically scroll the reivew horizontally; horizontal has to be set to true
			scrollInterval:8 //an interval on how often to scroll the review horizontally; default: 8s
		};
		options = GRW.helpers.extendObj({},defaults,options);
		
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
									class:'grw-wrapper',

								});

								target.appendChild(grw_wrapper);
								var theme_wrapper = GRW.helpers.createElem('div',{
									class:'google-reviews grw-theme-'+options.theme
								});
								grw_wrapper.appendChild(theme_wrapper);

								var widget_header = GRW.buildWidgetHeader(place);
								var reviews_wrapper = GRW.buildReviews(place,options);
								var widget_footer = GRW.buildWidgetFooter();
								theme_wrapper.appendChild(widget_header);
								theme_wrapper.appendChild(reviews_wrapper);
								theme_wrapper.appendChild(widget_footer);
						
						        if(options.numOfWords > 0)
								{
									var reviews = document.querySelectorAll('.grw-review-content p');
									reviews.forEach(function(aReview,idx){
										
										GRW.helpers.ellipsis(aReview,options.numOfWords);
									});
								}
					}
					
				});
				
			}
			else
			{
				return;
			}
			
			
			
		}
		
	};
	//build the widget header
	GRW.buildWidgetHeader = function(place){
		
		var place_name = place.name;
		var place_url = place.url;
		var place_rating = place.rating;
		var header_wrapper = GRW.helpers.createElem('div',{
									class:'grw-business-header grw-clear-fix'
								});
		header_wrapper.innerHTML = '<div class="grw-header-content-wrapper"><span class="grw-business-name"><a href="'+place_url+'" rel="nofollow" target="_blank" title="'+place_name+'">'+place_name+'</a></span><div class="grw-google-rating-content"><div class="grw-google-star-rating-wrapper"><div class="grw-google-star-rating" style="width:'+Math.round(67*place_rating/5)+'px"></div></div></div><div class="grw-rating-value">'+place_rating+' out of 5 stars</div></div>';
		
		return header_wrapper;
	};
	//build the widget body
	GRW.buildReviews = function(place,options){
		var wrapper_class = 'grw-reviews-wrapper';
		var review_class = 'grw-review';
		var slider_wrapper = GRW.helpers.createElem('div',{
									class:'grw-reviews-compact grw-slider'
								});
		var slider_nav = GRW.helpers.createElem('div',{
									class:'grw-slider-nav'
								});
		if(options.horizontal)
		{
			wrapper_class = 'grw-reviews-wrapper grw-slider-wrapper';
			review_class = 'grw-review grw-review-slide';
		}
		var reviews_wrapper = GRW.helpers.createElem('div',{
									class:wrapper_class
								});
		var reviews = place.reviews;
		for(var i=0; i<reviews.length;i++){
			var author = reviews[i].author_name;
			var rating = reviews[i].rating;
			var content = reviews[i].text;
			var review_html = '<div class="'+review_class+'"><div class="grw-author">'+author+'</div><div class="grw-review-rating"><div class="grw-google-star-rating-wrapper"><div class="grw-google-star-rating" style="width:'+Math.round(rating*67/5)+'px"></div></div></div><div class="grw-review-content"><p>'+content+'</p></div></div>';
			reviews_wrapper.innerHTML +=review_html;
			
			var slide_nav_dot = GRW.helpers.createElem('a',{
									'href':'#',
									'data-grw-slide':i
								});
			if(i==0)
			{
				slide_nav_dot.className = 'grw-slide-current';
			}
			slider_nav.appendChild(slide_nav_dot);
		}
		
		if(options.horizontal)
		{
			slider_wrapper.appendChild(reviews_wrapper);
			slider_wrapper.appendChild(slider_nav);
			GRW.helpers.initSlider(slider_wrapper);
			//if autoScroll is set to true, set an interval to automatically scroll the review horizontally
			if(options.autoScroll === true )
			{
			    
				setInterval(function(){
					
					var current_nav_dot = slider_nav.querySelector('.grw-slide-current');
					var next_nav_dot = current_nav_dot.nextSibling;
					if(next_nav_dot == null)
					{
						next_nav_dot = slider_nav.firstChild;
					}
					next_nav_dot.click();
					
				},options.scrollInterval*1000);
			}
			return slider_wrapper;
		}
		else
		{
			return reviews_wrapper;
		}
		
		
		
	};
	//build the widget footer
	GRW.buildWidgetFooter = function(){
		var footer_wrapper = GRW.helpers.createElem('div',{
									class:'grw-business-footer grw-clear-fix'
								});
		footer_wrapper.innerHTML = '<div class="poweredByGoogle"></div>'
		return footer_wrapper;
	};
	
	window.$GrwJS = GRW;
}(this,this.document));