"use strict";
var taskName    = 'Lint';

var gulp        = require('gulp');
var jshint      = require('gulp-jshint');
var jshintStyle = require('jshint-stylish');
var config      = require('./config');

gulp.task('lint', function() {
  return gulp.src(config.lint.src)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
