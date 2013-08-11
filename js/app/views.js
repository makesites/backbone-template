(function(_, Backbone, $) {

	/* Main layout */
	APP.Layouts.Main = APP.Layout.extend({
		initialize: function( options ){

			// custom code...

			return APP.Layout.prototype.initialize.call( this, options );
		}
	});

	// Section views (duplicate as needed...)
	APP.Views.Section = APP.View.extend({
		el: "",
		events: {},
		initialize: function(model, options){},
		render: function(){}
	});

})(this._, this.Backbone, this.$);