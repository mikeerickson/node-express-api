// TASK CONFIGURATION
// task configuration only, use ./config for application configuration

'use strict';

var chalk = require('chalk');
// create some quick variables

var error   = chalk.red;
var success = chalk.blue;
var info    = chalk.yellow;
var warning = chalk.magenta;

module.exports = {

	error: function(msg) {
		console.log(error(msg));
	},

	info: function(msg) {
		console.log(info(msg));
	},

	success: function(msg) {
		console.log(success(msg));
	},

	warning: function(msg) {
		console.log(warning(msg));
	}

};
