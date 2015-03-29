var express = require('express');
var config  = require('../../config');			// load config object first so we can use immediately
var router  = express.Router();


// load home route (http://localhost/api/v1/)
// create default route to make sure everything is working (accessed at GET http://localhost:3000/api/v1)
router.get('/', function(req, res) {
	res.json({ status: 'OK', message: 'Welcome to '+ config.defaults.appName +' 2014 API' });
});

module.exports = router;