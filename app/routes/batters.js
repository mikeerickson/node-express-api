'use strict';

var express = require('express');
var Batter  = require('../models/batter');
var router  = express.Router();
var _       = require('lodash');

// CONFIGURE BATTERS API ROUTES
// =============================================================================

// Configure all `batters`
// includes routes (GET, POST)
router.route('/')

  // create a batter (accessed at POST http://localhost:3000/batters)
  .post(function(req, res) {
    var batter = new Batter();    // create a new instance of the Batter model
    batter.set(req.body);
    batter.save(function(err, batter) {
      if (err) {res.send(err); }

      res.json({ id: batter._id, status: 'OK', message: 'Batter created' });
    });
  })

  // get all the batters (accessed at GET http://localhost:3000/api/v1/batters)
  .get(function(req, res) {

    // remove apikey from queryString
    var q = _.remove(req.query, function(key) {
      return key !== 'apikey';
    });
    Batter.find(q,function(err, batters) {
      if (err) {res.send(err); }

      res.json(batters);
    });
  });

// on routes that end in /batters/:batter_id
// includes GET, PUT, PATCH, DELETE
// ----------------------------------------------------
router.route('/:batter_id')

// get the better with that id
.get(function(req, res) {
  Batter.findById(req.params.batter_id, function(err, batter) {
    if (err) {res.send(err); }

    res.json(batter);
  });
})

// update the batter with this id
.put(function(req, res) {
  Batter.findById(req.params.batter_id, function(err, batter) {
    if (err) {res.send(err); }

    batter.set(req.body);
    batter.save(function(err) {
      if (err) {res.send(err); }

      res.json({status: 'OK', message: batter.first_name +' '+ batter.last_name + ' Updated Successfully'});
    });
  });
})

// update the batter with this id
.patch(function(req, res) {
  Batter.findById(req.params.batter_id, function(err, batter) {
    if (err) {res.send(err); }

    batter.set(req.body);
    batter.save(function(err) {
      if (err) {res.send(err); }

      res.json({status: 'OK', message: batter.first_name +' '+ batter.last_name + ' Updated Successfully'});
    });
  });
})

// delete the batter with this id
.delete(function(req, res) {
  Batter.remove({
    _id: req.params.batter_id
  }, function(err) {
    if (err) { res.send(err); }

    res.json({ status: 'OK', message: 'Batter Successfully Deleted' });
  });
});

module.exports = router;