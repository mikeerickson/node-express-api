// TASK CONFIGURATION
// task configuration only, use ./config for application configuration

'use strict';

var taskName = 'console';

var chalk   = require('chalk');
var winston = require('winston');
var mkdirp  = require('mkdirp');

// create some helper variables
var debug   = chalk.grey.dim;
var error   = chalk.red;
var success = chalk.green;
var info    = chalk.blue;
var warning = chalk.magenta;

var options = {
	logPath: 'logs/',
	logToFile: true,
};

var logOptions = {
	filename: 'app.log'
}

var initialized = false;

// remove winston console logging, we are handling it
winston.remove(winston.transports.Console);

module.exports = {

	init: function(filename) {
		mkdirp(options.logPath);

		logOptions.filename = options.logPath + logOptions.filename;
		if ( ! (typeof(filename) === 'undefined') ) {
			logOptions.filename = options.logPath + filename;
		}
		winston.add(winston.transports.DailyRotateFile, logOptions);
		initialized = true;
	},

	debug: function(msg) {
		if ( ! initialized) { this.init(); }
		console.log(debug(msg));
		options.logToFile ? winston.debug(msg) : '';
	},

	error: function(msg) {
		if ( ! initialized) { this.init(); }
		console.error(error(msg));
		options.logToFile ? winston.log(msg) : '';
	},

	info: function(msg) {
		if ( ! initialized) { this.init(); }
		console.log(info(msg));
		options.logToFile ? winston.info(msg) : '';
	},

	success: function(msg) {
		if ( ! initialized) { this.init(); }
		console.log(success(msg));
		options.logToFile ? winston.log(msg) : '';
	},

	warning: function(msg) {
		if ( ! initialized) { this.init(); }
		console.log(warning(msg));
		options.logToFile ? winston.log(msg) : '';
	},

	warn: function(msg) {
		if ( ! initialized) { this.init(); }
		this.warning(msg);
	},

	log: function(msg) {
		if ( ! initialized) { this.init(); }
		console.log(msg);
		options.logToFile ? winston.log(msg) : '';
	},

};
