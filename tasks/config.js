// TASK CONFIGURATION
// task configuration only, use ./config for application configuration

"use strict";

module.exports = {

	logs: {
		dir: ['logs', 'spec/logs']
	},

	scripts: {
		src: ['./server.js','app/**/*.js']
	},

	lint: {
		src:  ['./server.js','app/**/*.js']
	},

	test: {
		src: ['spec/**/*Spec.js', './server.js', 'app/**/*.js'],
    spec: ['spec/**/*.Spec.js'],
    reporter: {
      openReport: true
    }
	},

	todo: {
		src: ['spec/**/*Spec.js', './server.js', 'app/**/*.js'],
    reporter: {
      openReport: true
    }
	}

};
