'use strict';

var taskName = 'build';

var gulp    = require('gulp');
var config  = require('./config');
var chalk   = require('chalk');
var clean   = require('gulp-clean');
var msg     = require('gulp-msg');

gulp.task('build', function () {
	return gulp.src(config.logs.dir, {read: false})
		.pipe(clean())
    .pipe(msg.flush.success('Logs Cleared Successfully...'));
});
