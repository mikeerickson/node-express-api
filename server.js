// load all the packages we will be using

var appName    = 'MLB Player Stats';

var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port       = process.env.PORT || 3000; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Players'); // connect to our database

// load Player model
var Player     = require('./app/models/player');

// API ROUTES
// =============================================================================

// create router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	console.log('API Connection Received.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
	res.json({ message: 'Welcome to '+ appName +' 2014' });
});

// on routes that end in /players
// ----------------------------------------------------
router.route('/players')

	// create a player (accessed at POST http://localhost:3000/players)
	.post(function(req, res) {

		var player = new Player();		// create a new instance of the Player model
		player.name = req.body.name;  // set the players name (comes from the request)

		player.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Player created!' });
		});


	})

	// get all the players (accessed at GET http://localhost:8080/api/players)
	.get(function(req, res) {
		Player.find(function(err, players) {
			if (err)
				res.send(err);
			res.json(players);
		});
	});

// on routes that end in /players/:player_id
// ----------------------------------------------------
router.route('/players/:player_id')

	// get the player with that id
	.get(function(req, res) {
		Player.findById(req.params.player_id, function(err, player) {
			if (err)
				res.send(err);
			res.json(player);
		});
	})

	// update the player with this id
	.put(function(req, res) {
		Player.findById(req.params.player_id, function(err, player) {

			if (err)
				res.send(err);

			player.name = req.body.name;
			player.save(function(err) {
				if (err)
					res.send(err);
				res.json({ message: 'Player updated!' });
			});

		});
	})

	// delete the player with this id
	.delete(function(req, res) {
		Player.remove({
			_id: req.params.player_id
		}, function(err, player) {
			if (err)
				res.send(err);

			res.json({ message: 'Player Successfully Deleted' });
		});
	});

// REGISTER OUR ROUTES
app.use('/api', router);

// START THE SERVER
app.listen(port);
console.log('API Server running on port ' + port);
