"use strict";

module.exports = {

	defaults: {
		appName: 'MLB Player Stats'
	},

	dev: {
		connection:  'mongodb://localhost:27017/players',
		port: 3000
	},

	production: {
		connection: 'mongodb://localhost:27017/players',
		port: 3000
	}
};
