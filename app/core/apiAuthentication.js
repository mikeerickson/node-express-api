'use strict';

var config   = require('../../config');
var defaults = require('defaults');
var User     = require('../models/user');
var msg      = require('../../tasks/console');

function ApiAuthentication(options) {

  options = defaults(options, {
      override: false
  });

  return function authenticate(req, res, next) {

    var checkApiKey = options.override;

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