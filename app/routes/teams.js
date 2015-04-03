'use strict';

var express = require('express');
var Team    = require('../models/team');
var router  = express.Router();

// CONFIGURE BATTERS API ROUTES
// =============================================================================

// Configure all `teams`
// includes routes (GET, POST)
router.route('/')

	// create a team (accessed at POST http://localhost:3000/teams)
	.post(function(req, res) {
		var team = new Team();		// create a new instance of the Team model
		team.set(req.body);
		team.save(function(err, team) {
			if (err) {res.send(err); }

			res.json({ status: 'OK', id: team._id, message: 'Team created' });
		});
	})

	// get all the teams (accessed at GET http://localhost:3000/api/v1/teams)
	.get(function(req, res) {
		Team.find(req.query,function(err, teams) {
			if (err) {res.status(404).send(err); }

			res.json(teams);
		});
	});

// on routes that end in /teams/:team_id
// includes GET, PUT, PATCH, DELETE
// ----------------------------------------------------
router.route('/:team_id')

// get the better with that id
.get(function(req, res) {
	Team.findById(req.params.team_id, function(err, team) {
		if (err) { res.status(404).send(err); }

		res.json(team);
	});
})

// update the team with this id
.put(function(req, res) {
	Team.findById(req.params.team_id, function(err, team) {
		if (err) {res.send(err); }

		team.set(req.body);
		team.save(function(err) {
			if (err) {res.send(err); }

			res.json({status: 'OK', message: team.name + ' Updated Successfully'});
		});
	});
})

// update the team with this id
.patch(function(req, res) {
	Team.findById(req.params.team_id, function(err, team) {
		if (err) {res.send(err); }

		team.set(req.body);
		team.save(function(err) {
			if (err) {res.send(err); }

			res.json({status: 'OK', message: team.name + ' Updated Successfully'});
		});
	});
})

// delete the team with this id
.delete(function(req, res) {
	Team.remove({
		_id: req.params.team_id
	}, function(err) {
		if (err) { res.send(err); }

		res.json({ status: 'OK', message: 'Team Deleted Successfully' });
	});
});

module.exports = router;