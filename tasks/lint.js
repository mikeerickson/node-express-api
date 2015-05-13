"use strict";

var taskName    = 'Lint';

var gulp        = require('gulp');
var jshint      = require('gulp-jshint');
var jshintStyle = require('jshint-stylish');
var config      = require('./config');
var logger      = require('gulp-logger');
var chalk       = require('chalk');
var msg         = require('gulp-msg');

gulp.task('lint', function() {
  return gulp.src(config.lint.src)
    .pipe(jshint())
    //.pipe(logger({ after: chalk.green('Linting Complete...')}))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(msg.flush.info('Linting Completed Successfully')); //'Notice!' at the and of stream

});
