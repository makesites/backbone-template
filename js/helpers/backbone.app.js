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
	APP.Templates = {};
	
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
		}, 
		// FIX: override sync to support DELETE method (411 error on NGINX)
		// issue: http://serverfault.com/q/396020
		sync : function(method, model, options) {
			var methodMap = { 'create': 'POST', 'update': 'PUT', 'delete': 'DELETE', 'read':   'GET' };
			var type = methodMap[method];
			options || (options = {});
			var params = {type: type, dataType: 'json', data: {}};
			
			if (!options.url) {
			  params.url = this.getValue(model, 'url') || urlError();
			}
			
			if (!options.data && model && (method == 'create' || method == 'update')) {
			  params.contentType = 'application/json';
			  params.data = JSON.stringify(model.toJSON());
			}
			
			if (params.type !== 'GET' && !Backbone.emulateJSON) {
			  params.processData = false;
			}
			
			return $.ajax(_.extend(params, options));
		},
		// Helper - DELETE if the sync is not needed any more...
		getValue : function(object, prop) {
			if (!(object && object[prop])) return null;
			return _.isFunction(object[prop]) ? object[prop]() : object[prop];
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
				
				if ( _.isUndefined(model.id) ) {
					// no id = no way to verify the identity
					// we have to assume this is an new model
					modelsToAdd["add_model_"+ Math.random() ] = model;
				} else if ( _.isUndefined( this.get(model.id) ) ) {
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
	
	Template = Backbone.Model.extend({
		initialize: function(){
			_.bindAll(this, 'fetch','parse'); 
			this.fetch();
		}, 
		fetch: function(){
			// this can be replaced with a backbone method...
			$.get(this.url, this.parse);
		}, 
		parse: function(data){
			var self = this;
			$(data).filter("script").each(function(){
				// filter only scripts defined as template
				var el = $(this);
				if(el.attr("type").indexOf("template") >= 0){ 
					// convention: the id sets the key for the tmeplate
					self.set( el.attr("id"), el.html() );
				}
			});
			this.trigger("reset");
			return data;
		}
	});
	
	
	// Helpers
	// this is to enable {{moustache}} syntax to simple _.template() calls
	_.templateSettings = {
		interpolate : /\{\{(.+?)\}\}/g
	};
	
	
})(this._, this.Backbone);