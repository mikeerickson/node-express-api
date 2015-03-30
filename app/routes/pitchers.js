var express = require('express');
var Pitcher = require('../models/pitcher');
var router = express.Router();

// CONFIGURE BATTERS API ROUTES
// =============================================================================

// Configure all `pitchers`
// includes routes (GET, POST)
router.route('/')

	// create a pitcher (accessed at POST http://localhost:3000/pitchers)
	.post(function(req, res) {
		var pitcher = new Pitcher();		// create a new instance of the Pitcher model
		pitcher.set(req.body);
		pitcher.save(function(err) {
			if (err) {res.send(err); }

			res.json({ status: 'OK', message: 'Pitcher Create Successfully' });
		});
	})

	// get all the pitchers (accessed at GET http://localhost:3000/api/v1/pitchers)
	.get(function(req, res) {
		var q = req.query;
		Pitcher.find(q,function(err, pitchers) {
			if (err) {res.send(err); }

			res.json(pitchers);
		});
	});

// on routes that end in /pitchers/:pitcher_id
// includes GET, PUT, PATCH, DELETE
// ----------------------------------------------------
router.route('/:pitcher_id')

// get the better with that id
.get(function(req, res) {
	Pitcher.findById(req.params.pitcher_id, function(err, pitcher) {
		if (err) {res.send(err); }

		res.json(pitcher);
	});
})

// update the pitcher with this id
.put(function(req, res) {
	Pitcher.findById(req.params.pitcher_id, function(err, pitcher) {
		if (err) {res.send(err); }

		pitcher.set(req.body);
		pitcher.save(function(err) {
			if (err) {res.send(err); }

			res.json({status: 'OK', message: pitcher.first_name +' '+ pitcher.last_name + ' Updated Successfully'});
		});
	});
})

// update the pitcher with this id
.patch(function(req, res) {
	Pitcher.findById(req.params.pitcher_id, function(err, pitcher) {
		if (err) {res.send(err); }

		pitcher.set(req.body);
		pitcher.save(function(err) {
			if (err) {res.send(err); }

			res.json({status: 'OK', message: pitcher.first_name +' '+ pitcher.last_name + ' Updated Successfully'});
		});
	});
})

// delete the pitcher with this id
.delete(function(req, res) {
	Pitcher.remove({
		_id: req.params.pitcher_id
	}, function(err) {
		if (err) { res.send(err); }

		res.json({ status: 'OK', message: 'Pitcher Deleted Successfully' });
	});
});

module.exports = router;