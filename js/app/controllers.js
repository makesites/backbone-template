(function() {

	// Namespace definition
	APP = {
		init : function(){},
		Routers : {},
		Collections: {},
		Models: {},
		Views: {}
	}
	
	// App contructor
	APP.init = function(){
		var router = false;
		// check URIs
		var path = window.location.pathname.split( '/' );
		// find a router based on the path
		for( i in path ){
			// discart the first item if it's empty
			if( path[i] === "") continue;
			router = (path[i].charAt(0).toUpperCase() + path[i].slice(1));
			// stop if we've found a router
			if(typeof(APP.Routers[router]) == "function") break;
		}
		// call the router or fallback to the default
		var controller = (router && APP.Routers[router]) ? new APP.Routers[router]() : new APP.Routers.Default();
	}
	
	// Routers
	APP.Routers.Default = Backbone.Router.extend({
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
		}
		
	});

})();
