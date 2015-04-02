// TASK CONFIGURATION
// task configuration only, use ./config for application configuration

"use strict";

module.exports = {

	lint: {
		src:  ['./server.js','app/**/*.js']
	},

	jasmine: {
		src: ['./spec/**/*Spec.js', './server.js', 'app/**/*.js']
	}

};
