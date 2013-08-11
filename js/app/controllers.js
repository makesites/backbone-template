(function(_, Backbone) {

	// Routers
	APP.Routers.Default = APP.Router.extend({
		data: {},
		initialize: function() {
			// every function that uses 'this' as the current object should be in here
			_.bindAll(this, 'index');

		},
		routes: {
			"": "index",
		},
		index: function(){
			console.log("I'm in index");
			// load data
			this.data = new Backbone.Model({
				// enter custom data here...
			});
			// init layout
			this.layout = new APP.Layouts.Main({
				data: this.data
			});
		}

	});

})(this._, this.Backbone);
