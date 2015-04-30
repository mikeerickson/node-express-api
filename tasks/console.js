// TASK CONFIGURATION
// task configuration only, use ./config for application configuration

'use strict';

var taskName = 'log';

var chalk   = require('chalk');
var winston = require('winston');

// create some quick variables

var error   = chalk.red;
var success = chalk.green;
var info    = chalk.blue;
var warning = chalk.magenta;

var options = {
	logToFile: true
};

module.exports = {

	error: function(msg) {
		console.log(error(msg));
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

	log: function(msg) {
		console.log(msg);
		options.logToFile ? winston.log(msg) : '';
	},


};
