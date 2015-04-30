
var connection = require('../../connection');
var msg        = require('../../tasks/console');
var chalk      = require('chalk');

// SETUP MONGOOSE (ODM)
// =============================================================================
var mongoose   = require('mongoose');

mongoose.connect(connection.database.url); // connect to our database
console.log(chalk.green('Connected to %s', connection.database.url));