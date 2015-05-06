'use strict';

// LOAD SERVER MODULES
// =============================================================================

var config   = require('../../config');
var defaults = require('defaults');
var msg      = require('../../tasks/console');


// LOAD MODELS
// only need User Module to perform authentication API check
// =============================================================================
var User     = require('../models/user');


function ApiAuthentication(options) {

  options = defaults(options, {
      override: false // reserved for when we allow forced override (no api check)
  });

  return function authenticate(req, res, next) {

    // this will only be used in debug mode, typically this is false
    if ( options.override ) {
      return true;
    }

    if(config.dev.checkApiKey) {
      // TODO: Need to figure out how to check multiple header when multiple are set
      var apikey = req.headers.apikey || req.query.apikey || req.body.apikey;
      if ( typeof(apikey) !== 'undefined' ) {
        if (( apikey === config.dev.apikey ) || (req.method === 'GET')) {
          return true;
        } else {
          User.findByApiKey(apikey, function(err, user) {
            if (err) { res.send(err); }
            if (user.length === 0) {
              res.status(401).json({'status': 'fail', 'message': 'Unauthorized -- Invalid ApiKey'});
            }
          });
        }
      } else {
        if(req.method === 'GET') {
          return true;
        } else {
          res.status(401).send({'status': 'fail', 'message': 'Unauthorized -- Invalid ApiKey'});
        }
      }
    }

  }
}

module.exports = ApiAuthentication;