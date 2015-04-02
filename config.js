// APPLICATION CONFIGURATION
// global, application wide configuration (./tasks/connfig is for tasks configuration only)

"use strict";

module.exports = {

	defaults: {
		appName: 'MLB Player Stats',
		connection:  'mongodb://localhost:27017/players',
		port: 3000
	},

	dev: {
		connection:  'mongodb://localhost:27017/players',
		port:        3000,
		apikey:      'gunner',
		checkApiKey: true
	},

	production: {
		connection: 'mongodb://localhost:27017/players',
		port: 3000
	}
};
