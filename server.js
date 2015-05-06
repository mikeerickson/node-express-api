// SERVER
// =============================================================================
// main entrypoint into API

// LOAD SERVER MODULES
// =============================================================================
// load all modules used in application

'use strict';

var config      = require('./config'); // load config object first so we can use immediately
var connection  = require('./connection');

var express     = require('express');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var msg         = require('./tasks/console');

var app        = express();
var appName    = config.defaults.appName;

// loading API Authentication and Rate Limiting Middleware
var ApiAuthentication = require('./app/core/apiAuthentication');
var ApiRateLimiter    = require('./app/core/apiRateLimiter');

msg.init();
msg.info('\n==========================================================================\n');


// SETUP APPLICATION
// =============================================================================

// log any request URI to the console, only when in `dev` mode (default: dev)
app.use(morgan('dev'));

// configure application middelware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// SETUP MONGOOSE (ODM)
// =============================================================================
var mongoose   = require('mongoose');
mongoose.connect(connection.database.url); // connect to our database
msg.success('Connected to ' + connection.database.url);


// LOAD MODELS
// =============================================================================
var models = require('./app/models');


// CONFIGURE ROUTE MIDDLEWARE
// =============================================================================
var apiCheck     = ApiAuthentication();
var apiRateLimit = ApiRateLimiter();

var router = express.Router();

// attach global middleware to use for all requests
router.use(function(req, res, next) {
  res.removeHeader("X-Powered-By");
  apiCheck(req, res, next);
  apiRateLimit(req, res, next);

  // if you dont properly handle next in your middleware, things will come
  // to a screeching halt.
  // next();

});

// attach to router object
app.use('/', router);

// CONFIGURE NON-API ROUTES
// =============================================================================


// CONFIGURE API ROUTES
// =============================================================================

// load all the API routes (see ./app/routes/index.js for details)
var routes = require('./app/routes');

// and finally attach router to API prefix
app.use('/api/v1', routes);


// START THE SERVER
// =============================================================================
var port = connection.http.port; // set our port from connection config
app.listen(port);
msg.info(appName +' API Server with Rate Limiting running on port ' + port);
