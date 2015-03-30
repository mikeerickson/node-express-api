var express = require('express');
var home = require('./home');
var batters = require('./batters');
var pitchers = require('./pitchers');

var router = express.Router();

router.use('/', home);
router.use('/batters', batters);
router.use('/pitchers', pitchers);

module.exports = router;
