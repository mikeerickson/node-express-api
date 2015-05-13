'use strict';

var taskName = 'clean-logs';

var gulp    = require('gulp');
var config  = require('./config');
var chalk   = require('chalk');
var clean   = require('gulp-clean');
var msg     = require('gulp-msg');

gulp.task('clean-logs', function () {
  return gulp.src(config.logs.dir, {read: false})
    .pipe(clean())
    .pipe(msg.flush.success('Logs Cleared Successfully...'));
});
