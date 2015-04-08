"use strict";

var taskName    = 'Lint';

var gulp        = require('gulp');
var jshint      = require('gulp-jshint');
var jshintStyle = require('jshint-stylish');
var config      = require('./config');
var logger      = require('gulp-logger');
var chalk       = require('chalk');

gulp.task('lint', function() {
  return gulp.src(config.lint.src)
    .pipe(jshint())
	.pipe(logger({ after: chalk.green('Linting Complete...')}))
    .pipe(jshint.reporter('jshint-stylish'));
});
