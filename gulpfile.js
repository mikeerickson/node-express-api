var gulp       = require('gulp'),
    requireDir = require('require-dir');
    config     = require('./tasks/config');

// LOAD ALL TASKS
// you can execute task like `gulp <taskName>`
requireDir('./tasks', { recurse: true });

// WATCHERS
// if gets too big, we will offload to its own task at that point

// script edits and lint them
gulp.task('watch', ['lint'], function(){
	gulp.watch(config.lint.src, ['lint']);
	gulp.watch(config.jasmine.src, ['test:js']);
});

gulp.task('tdd', ['test:js'], function(){
	gulp.watch(config.jasmine.src, ['test:js']);
});