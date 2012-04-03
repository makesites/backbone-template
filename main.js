var app;

// when logic dependencies are loaded
$(function() {

	// initialize APP
	app = new APP.init;
	window.app = app;
	// start backbone history
	Backbone.history.start();

});
