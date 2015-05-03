'use strict';

var config = require('../../config');
var User   = require('../models/user');
var chalk  = require('chalk');
var msg    = require('../../tasks/console');

module.exports = {

  // HANDLE AUTHENTICATION
  // =============================================================================

  isAuthenticated: function(req, res, next) {

    // TODO: Refactor so it only fires on PUT, POST and DELETE
    if(config.dev.checkApiKey) {
      var apikey = req.headers.apikey || req.query.apikey || req.body.apikey;
      if ( apikey !== 'undefined' ) {
        if ( apikey === config.dev.apikey ) {
          return true;
        } else {
          User.findByApiKey(apikey, function(err, user) {
            if (err) { res.send(err); }
            if (user.length === 0) {
              res.status(401).send({'status': 'fail', 'message': 'Unauthorized -- Invalid ApiKey'});
            }
          });
        }
      } else {
        res.status(401).send({'status': 'fail', 'message': 'Unauthorized -- Invalid ApiKey'});
      }
    }
  },

  validateCredentials: function(username, password) {
    return true;
  },

// HANDLE RATE LIMIIING
// =============================================================================

  checkRateLimit: function(req, res, next) {
    msg.log('checkRateLimit...');
    next();
  },

  getRemaining: function() {

  },

  resetCount: function() {

  },
  getNumRequests: function() {
    return 1111;
  },


};

