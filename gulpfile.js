'use strict';

var gulp       = require('gulp');
var requireDir = require('require-dir');
var config     = require('./tasks/config');

// LOAD ALL TASKS
// you can execute task like `gulp <taskName>`
requireDir('./tasks', { recurse: true });

// WATCHERS
// if this gets too big, we will offload to its own task at that point

// script edits and lint them
gulp.task('watch', ['lint','test:js'], function(){
	gulp.watch(config.lint.src, ['lint']);
	gulp.watch(config.jasmine.src, ['test:js']);
});

gulp.task('tdd', ['test:js'], function(){
	gulp.watch(config.jasmine.src, ['test:js']);
});