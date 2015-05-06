'use strict';

var config = require('../../config');
var User   = require('../models/user');
var chalk  = require('chalk');
var msg    = require('../../tasks/console');

module.exports = {

  checkRateLimit: function(req, res, next) {
    msg.success('* * * checking rate limit... * * * ');
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

