'use strict';

var taskName  = 'jasmine';

var gulp      = require('gulp');
var jasmine   = require('gulp-jasmine');
var reporters = require('jasmine-reporters');

gulp.task('test:js', function () {
	return gulp.src('spec/**/*Spec.js')
	  .pipe(jasmine({
	      reporter: new reporters.TerminalReporter({color: true, verbosity: 3})
	  }));
});