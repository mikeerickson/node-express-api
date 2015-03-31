// SERVER
// =============================================================================
// main entrypoint into API

// LOAD SERVER MODULES
// =============================================================================
// load all modules used in application

'use strict';

var config     = require('./config'); // load config object first so we can use immediately
var connection = require('./connection');
var express    = require('express');
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var chalk      = require('chalk');
var app        = express();
var User       = require('./app/models/user');

var appName    = config.defaults.appName;
// SETUP APPLICATION
// =============================================================================

// log any request URI to the console, only when in `dev` mode (default: dev)
app.use(morgan('dev'));

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// SETUP MONGOOSE (ODM)
// =============================================================================
var mongoose   = require('mongoose');

mongoose.connect(connection.database.url); // connect to our database
console.log(chalk.green('Connected to ' + connection.database.url));


// LOAD MODELS
// =============================================================================
// Only using batter and pitcher models, but you could use other models as needed
// Note: You will need to expand API ROUTES accordingly

// TODO: Refactor this so you can load all models including 'dir'
var Batter     = require('./app/models/batter');
var Pitcher    = require('./app/models/pitcher');
// var Manager    = require('./app/models/managers');


// CONFIGURE ROUTE MIDDLEWARE
// =============================================================================

var router = express.Router();

// attach global middleware to use for all requests
router.use(function(req, res, next) {
	// Examples (will be added in future versions of this code)
	// - perform rate limit
	// - perform authentication
	// - perform logging

	var apikey = req.headers.apikey || req.query.apikey || req.body.apikey;

	User.findByApiKey(apikey, function(err, user) {
		if (err) {res.send(err); }

		if (user.length === 0) {
			res.status(401).send({'status': 'fail', 'ApiKey': apikey, 'message': 'Unauthorized -- Invalid ApiKey'});
		}
	});

	// make sure to call next() or everything will come to a screeching
	// halt and application will be non responsive
	next();
});

app.use('/', router);

// CONFIGURE NON-API ROUTES
// =============================================================================


// CONFIGURE API ROUTES
// =============================================================================

// load all the routes
var routes = require('./app/routes');

// and finally attach router to API prefix
app.use('/api/v1', routes);


// START THE SERVER
// =============================================================================
var port = connection.http.port; // set our port from connection
app.listen(port);
console.log(chalk.blue(appName +' API Server running on port ' + port));