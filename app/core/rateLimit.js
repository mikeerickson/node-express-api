'use strict';

var config = require('../../config');
var User   = require('../models/user');
var chalk  = require('chalk');
var msg    = require('../../tasks/console');

msg.init('rate-limit');

module.exports = {

  checkLimiting: function(req, res, next) {

  },

  getRemaining: function() {

  },

  resetCount: function() {

  },
  getNumRequests: function() {
    return 1111;
  },

};

