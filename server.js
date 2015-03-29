// SERVER
// =============================================================================
// main entrypoint into API

// LOAD SERVER MODULES
// =============================================================================
// load all modules used in application

'use strict';

var config     = require('./config'); // load config object first so we can use immediately
var connection = require('./connection');
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var chalk      = require('chalk');

var appName    = config.defaults.appName;


// SETUP APPLICATION
// =============================================================================

// log any request URI to the console, only when in `dev` mode (default: dev)
app.use(morgan('dev'));

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// SETUP MONGOOSE (ODM)
// =============================================================================
var mongoose   = require('mongoose');

mongoose.connect(connection.database.url); // connect to our database
console.log(chalk.green('Connected to ' + connection.database.url));


// LOAD MODELS
// =============================================================================
// Only using batter model, but you could use other models as you need here
// Note: You will need to expand API ROUTES accordingly

// TODO: Refactor this so you can load all models including 'dir'
var Batter     = require('./app/models/batter');
var Pitcher    = require('./app/models/pitcher');


// CONFIGURE API ROUTES
// =============================================================================

// load each route into separate route file
var batters = require('./app/routes/batters');
var home    = require('./app/routes/home');

// and finally attach router to API prefix
app.use('/api/v1', home);
app.use('/api/v1/batters', batters);


// START THE SERVER
// =============================================================================
var port = connection.http.port; // set our port from connection
app.listen(port);
console.log(chalk.blue(appName +' API Server running on port ' + port));