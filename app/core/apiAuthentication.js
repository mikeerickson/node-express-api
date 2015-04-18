'use strict';

var config = require('../../config');
var User   = require('../models/user');
var chalk  = require('chalk');

module.exports = {
  isAuthenticated: function(req, res, next) {
    if(config.dev.checkApiKey) {
      var apikey = req.headers.apikey || req.query.apikey || req.body.apikey;
      if ( apikey !== 'undefined ') {
        if ( apikey === config.dev.apikey ) {
          return true;
        } else {
          User.findByApiKey(apikey, function(err, user) {
            if (err) {res.send(err); }
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
  }

};

