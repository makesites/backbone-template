(function(_, Backbone) {
	// this is to enable {{moustache}} syntax to simple _.template() calls
	_.templateSettings = {
		interpolate : /\{\{(.+?)\}\}/g
	};
	
	/* Main layout */
	APP.Views.Main = Backbone.View.extend({
		// the template file that's used as a resource for the markup
		el: "#main", 
		// events
		events: {
			"click a[rel='external']" : "clickExternal",
		}, 
		initialize: function(model, options){ 
			
			// every function that uses 'this' as the current object should be in here
			_.bindAll(this, 'render', 'update', 'clickExternal'); 
			
			// get the data
			this.model = model;
			
			// render the page
			this.render();
			
		},
		// Presentation View rendering
		render: function(){
			
			// remove loading state
			$("body").removeClass("loading");
			
			// return the object for reference
			return this;
		}, 
		// Update the view when a new model is sent
		update: function( model, options ){
			
		}, 
		clickExternal: function(e){
			window.open($(e.target).attr("href"), '_blank'); return false; 
		}
	});
	
})(this._, this.Backbone);