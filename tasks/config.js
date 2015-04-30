// TASK CONFIGURATION
// task configuration only, use ./config for application configuration

"use strict";

module.exports = {

	logs: {
		dir: ['spec/logs']
	},

	lint: {
		src:  ['./server.js','app/**/*.js']
	},

	test: {
		src: ['./spec/**/*Spec.js', './server.js', 'app/**/*.js']
	}

};
