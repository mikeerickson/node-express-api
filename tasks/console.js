// TASK CONFIGURATION
// task configuration only, use ./config for application configuration

'use strict';

var taskName = 'console';

var chalk   = require('chalk');
var winston = require('winston');
var mkdirp  = require('mkdirp');

// create some quick variables

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

module.exports = {

	init: function(filename) {

		mkdirp(options.logPath);

		if ( ! (typeof(filename) === 'undefined') ) {
			logOptions.filename = options.logPath + filename;
		} else {
			logOptions.filename = options.logPath + logOptions.filename;
		}

		// winston.add(winston.transports.DailyRotateFile, logOptions);
  		winston.remove(winston.transports.Console);

	},

	debug: function(msg) {
		console.log(debug(msg));
		options.logToFile ? winston.debug(msg) : '';
	},

	error: function(msg) {
		console.error(error(msg));
		options.logToFile ? winston.log(msg) : '';
	},

	info: function(msg) {
		console.log(info(msg));
		options.logToFile ? winston.info(msg) : '';
	},

	success: function(msg) {
		console.log(success(msg));
		options.logToFile ? winston.log(msg) : '';
	},

	warning: function(msg) {
		console.log(warning(msg));
		options.logToFile ? winston.log(msg) : '';
	},

	warn: function(msg) {
		this.warning(msg);
	},

	log: function(msg) {
		console.log(msg);
		options.logToFile ? winston.log(msg) : '';
	},

};
