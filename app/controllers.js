(function() {

	// Namespace definition
	APP = {
		init: {}, 
		Collections: {},
		Models: {},
		Views: {}
	}
	
	// App contructor
	APP.init = Backbone.Router.extend({
		data: {}, 
		initialize: function() {
			// every function that uses 'this' as the current object should be in here
			_.bindAll(this, 'index'); 
			
		}, 
		routes: {
			"": "index",
		},
		// Save app state in a seperate object
		state: {
			fullscreen: false, 
			online: navigator.onLine,
			browser: function(){ return ( $.browser.safari && /chrome/.test(navigator.userAgent.toLowerCase()) ) ? 'chrome' : 'other' }, 
		},
		index: function(){
			// do something...
			//APP.Collections.Main
			//APP.Views.Main
		}, 
		
	});

})
