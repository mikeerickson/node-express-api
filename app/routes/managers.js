'use strict';

var express = require('express');
var Manager = require('../models/manager');
var router  = express.Router();

// CONFIGURE BATTERS API ROUTES
// =============================================================================

// Configure all `managers`
// includes routes (GET, POST)
router.route('/')

  // create a manager (accessed at POST http://localhost:3000/managers)
  .post(function(req, res) {
    var manager = new Manager();    // create a new instance of the Manager model
    manager.set(req.body);
    manager.save(function(err, manager) {
      if (err) {res.send(err); }

      res.json({ status: 'OK', id: manager._id, message: 'Manager created' });
    });
  })

  // get all the managers (accessed at GET http://localhost:3000/api/v1/managers)
  .get(function(req, res) {
    Manager.find(req.query,function(err, managers) {
      if (err) {res.status(404).send(err); }

      res.json(managers);
    });
  });

// on routes that end in /managers/:manager_id
// includes GET, PUT, PATCH, DELETE
// ----------------------------------------------------
router.route('/:manager_id')

// get the better with that id
.get(function(req, res) {
  Manager.findById(req.params.manager_id, function(err, manager) {
    if (err) { res.status(404).send(err); }

    res.json(manager);
  });
})

// update the manager with this id
.put(function(req, res) {
  Manager.findById(req.params.manager_id, function(err, manager) {
    if (err) {res.send(err); }

    manager.set(req.body);
    manager.save(function(err) {
      if (err) {res.send(err); }

      res.json({status: 'OK', message: manager.first_name +' '+ manager.last_name + ' Updated Successfully'});
    });
  });
})

// update the manager with this id
.patch(function(req, res) {
  Manager.findById(req.params.manager_id, function(err, manager) {
    if (err) {res.send(err); }

    manager.set(req.body);
    manager.save(function(err) {
      if (err) {res.send(err); }

      res.json({status: 'OK', message: manager.first_name +' '+ manager.last_name + ' Updated Successfully'});
    });
  });
})

// delete the manager with this id
.delete(function(req, res) {
  Manager.remove({
    _id: req.params.manager_id
  }, function(err) {
    if (err) { res.send(err); }

    res.json({ status: 'OK', message: 'Manager Deleted Successfully' });
  });
});

module.exports = router;