module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		docco: {
			debug: {
				src: ['js/**/*.js'],
				options: {
					output: 'docs/'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-docco');

	// execute
	grunt.registerTask('default', ['docco']);
};