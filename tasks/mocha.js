'use strict';

var taskName  = 'mocha';

var gulp      = require('gulp');
var exec      = require('gulp-exec');
var mocha    = require('gulp-mocha');
var mkdirp   = require('mkdirp');
var winston  = require('winston');

// CONFIGURE LOGGER
// =============================================================================
var options = {
  filename:    'spec/logs/batter-test.log',
  silent:      false,
  timestamp:   true,
  prettyPrint: true
};

mkdirp('spec/logs', function (err) {
    if (err) { msg.error(err); }
});

winston.add(winston.transports.DailyRotateFile, options)
winston.remove(winston.transports.Console); // suppress console output

gulp.task('test:mocha', function () {
    return gulp.src('spec/**/*Spec.js', {read: false})
        .pipe(mocha())
        .once('error', function () {
            process.exit(1);
        })
        .once('end', function () {
            process.exit();
        });
});