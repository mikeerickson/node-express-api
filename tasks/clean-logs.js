'use strict';

var taskName = 'clean-logs';

var gulp    = require('gulp');
var config  = require('./config');
var chalk   = require('chalk');
var logger  = require('gulp-logger');
var clean   = require('gulp-clean');

gulp.task('clean-logs', function () {
  return gulp.src(config.logs.dir, {read: false})
	.pipe(logger({ after: chalk.green('Clearing Logs...')}))
      .pipe(clean());
});