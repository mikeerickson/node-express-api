var express  = require('express');
var home     = require('./home');
var batters  = require('./batters');
var pitchers = require('./pitchers');
var managers = require('./managers');

var router   = express.Router();

router.use('/', home);
router.use('/batters', batters);
router.use('/pitchers', pitchers);
router.use('/managers', managers);

module.exports = router;
