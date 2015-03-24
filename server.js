// load all the packages we will be using

var config     = require('./config');			// load config object first so we can use immediately
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var chalk      = require('chalk');
var _          = require('lodash');

var appName    = config.defaults.appName;
// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port       = process.env.PORT || config.dev.port || 3000; // set our port

var mongoose   = require('mongoose');
console.log(config.dev.connection);
mongoose.connect(config.dev.connection); // connect to our database

// LOAD MODELS
// Only using batter model, but you could use other models as you need here
// Note: You will need to expand API ROUTES accordingly

var Batter     = require('./app/models/batter');
// var Pitcher    = require('./app/models/pitcher');


// API ROUTES
// =============================================================================

// create router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// here you can do any type of user validation etc before proceeding to API
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:3000/api/v1)
router.get('/', function(req, res) {
	res.json({ status: 'OK', message: 'Welcome to '+ appName +' 2014 API' });
});

// API ROUTES
// =============================================================================

// Configure all `batters` routes (GET, PUT, PATCH, POST, DELETE)
router.route('/batters')

	// create a batter (accessed at POST http://localhost:3000/batters)
	.post(function(req, res) {
		var batter = new Batter();		// create a new instance of the Batter model
		batter.set(res.body);
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
			batting.set(res.body);
			batter.save(function(err) {
				if (err) res.send(err);
				res.json({ status: 'OK', message: batter.first_name + ' Updated Successfully' });
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
app.use('/api/v1', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log(chalk.blue(appName +' API Server running on port ' + port));
