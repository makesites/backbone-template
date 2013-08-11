var app;

// wrap everything in an init method
function init(){
	// when logic dependencies are loaded
	Backbone.ready(function(){

		// initialize APP
		app = new APP();
		window.app = app;
		// start backbone history
		Backbone.history.start();

	});
}