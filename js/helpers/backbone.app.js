(function(_, Backbone) {
	
	// App contructor
	APP = function(){
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
		// return controller so it's accessible through the app global
		return controller;
	}
	
	// Namespace definition
	APP.Models = {};
	APP.Routers = {};
	APP.Collections = {};
	APP.Views = {};
	
  	// **Main constructors**
	Model = Backbone.Model.extend({
		// cache all data to localstorage 
		cache: function(){
			// construct a cache mechanism, using localstorage or other...
		}, 
		// Helper functions
		// - check if the app is online
		isOnline: function(){
			return ( !_.isUndefined( app ) ) ? app.state.online : true;
		}
	});
	
  	Collection = Backbone.Collection.extend({
		// initialization (if not overriden)
		initialize: function(models, options){
			// save options for later
			this.options = options || {};
			// auto-fetch if no models are passed
			if( _.isNull(models) ){ 
				this.fetch();
			}
		}, 
		// DEPRECATED variables
		attributes: {
		}, 
		// A custom add function that can prevent models with duplicate IDs
		// from being added to the collection. Usage:
		add: function(models, options) {
		
			// empty list of objects
			var modelsToAdd = {};
			
			// add in an array if only one item
			models = _.isArray(models) ? models.slice() : [models];
			
			_.each(models, function(model) {
				if ( _.isUndefined( this.get(model.id) ) ) {
					// add them this way to avoid duplicates on the same set
					modelsToAdd[model.id] = model;
				} else {
					// merge with existing
					this.set(model);
				}
			}, this);
		  
			// finally convert list to an array
			modelsToAdd = _.toArray( modelsToAdd );
		  
			return Backbone.Collection.prototype.add.call(this, modelsToAdd, options);
		},
		// a custom set() method to merge with existing models
		set: function( model) {
			var model_in_array = this.get(model.id);
			var updated_model = _.extend(model_in_array, model);
			this.remove(model_in_array);
			this.add(updated_model);
		}, 
		update:  function(){

		}, 
		// Helper functions
		// - set an attribute
		setAttr: function( attr ) {
			for( key in attr ){ 
				this.attributes[key] = attr[key];
			}        
		}, 
		// - get an attribute
		getAttr: function( attr ) {
			return this.attributes[attr];
		}, 
		// - check if the app is online
		isOnline: function(){
			return ( !_.isUndefined( app ) ) ? app.state.online : true;
		}
	});
	
	View =  Backbone.View.extend({
		// events
		events: {
			"click a[rel='external']" : "clickExternal",
		},
		clickExternal: function(e){
			window.open($(e.target).attr("href"), '_blank'); return false; 
		}
	});
	
	// Helpers
	// this is to enable {{moustache}} syntax to simple _.template() calls
	_.templateSettings = {
		interpolate : /\{\{(.+?)\}\}/g
	};
	
	
})(this._, this.Backbone);