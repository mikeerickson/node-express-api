// SERVER
// =============================================================================
// main entrypoint into API

// LOAD SERVER MODULES
// =============================================================================
// load all modules used in application

var config     = require('./config');			// load config object first so we can use immediately
var connection = require('./connection');
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var chalk      = require('chalk');
var _          = require('lodash');

var appName    = config.defaults.appName;


// SETUP APPLICATION
// =============================================================================

app.use(morgan('dev')); // log requests to the console

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
// Only using batter model, but you could use other models as you need here
// Note: You will need to expand API ROUTES accordingly

var Batter     = require('./app/models/batter');
// var Pitcher    = require('./app/models/pitcher');


// CONFIGURE APP ROUTES
// =============================================================================

// create router object
var router = express.Router();

// attach global middleware to use for all requests
router.use(function(req, res, next) {
	// Examples (will be added in future versions of this code)
	// perform rate limit
	// perform authentication
	// perform logging

	// make sure to call next() or everything will come to a screeching
	// halt and application will be non responsive
	next();
});


// CONFIGURE API ROUTES
// =============================================================================

// Configure all `batters` routes (GET, PUT, PATCH, POST, DELETE)
router.route('/batters')

	// create a batter (accessed at POST http://localhost:3000/batters)
	.post(function(req, res) {
		var batter = new Batter();		// create a new instance of the Batter model
		batter.set(req.body);
		batter.save(function(err) {
			if (err) res.send(err);
			res.json({ status: 'OK', message: 'Batter created' });
		});
	})

	// get all the batters (accessed at GET http://localhost:3000/api/v1/batters)
	.get(function(req, res) {
		var q = req.query;
		Batter.find(q,function(err, batters) {
			if (err) res.send(err);
			res.json(batters);
		});
	});

// on routes that end in /batters/:batter_id
// ----------------------------------------------------
router.route('/batters/:batter_id')

	// get the better with that id
	.get(function(req, res) {
		Batter.findById(req.params.batter_id, function(err, batter) {
			if (err) res.send(err);
			res.json(batter);
		});
	})

	// update the batter with this id
	.put(function(req, res) {
		Batter.findById(req.params.batter_id, function(err, batter) {
			if (err) res.send(err);
			batter.set(req.body);
			batter.save(function(err) {
				if (err) res.send(err);
				res.json({status: 'OK', message: batter.first_name +' '+ batter.last_name + ' Updated Successfully'});
			});
		});
	})
	// update the batter with this id
	.patch(function(req, res) {
		Batter.findById(req.params.batter_id, function(err, batter) {
			if (err) res.send(err);
			batter.set(req.body);
			batter.save(function(err) {
				if (err) res.send(err);
				res.json({status: 'OK', message: batter.first_name +' '+ batter.last_name + ' Updated Successfully'});
			});
		});
	})

	// delete the batter with this id
	.delete(function(req, res) {
		Batter.remove({
			_id: req.params.batter_id
		}, function(err, batter) {
			if (err) res.send(err);
			res.json({ status: 'OK', message: 'Batter Successfully Deleted' });
		});
	});


// REGISTER ROUTES to `api/v1`
// =============================================================================
// important that this is called at end of setup code as it depends on the router
// object configured above.   This will set the default API route to
// http::localhost:<port>/api/v1


// create default route to make sure everything is working (accessed at GET http://localhost:3000/api/v1)
router.get('/', function(req, res) {
	res.json({ status: 'OK', message: 'Welcome to '+ appName +' 2014 API' });
});

// and finally attach router to API prefix
app.use('/api/v1', router);


// START THE SERVER
// =============================================================================
var port = connection.http.port; // set our port
app.listen(port);
console.log(chalk.blue(appName +' API Server running on port ' + port));
