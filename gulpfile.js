'use strict';

var gulp       = require('gulp');
var nodemon    = require('gulp-nodemon');
var requireDir = require('require-dir');
var config     = require('./tasks/config');
var msg        = require('gulp-msg');


// LOAD ALL TASKS
// you can execute task like `gulp <taskName>`
requireDir('./tasks', { recurse: false });

// TASKS

gulp.task('start', function () {
  nodemon({
    script:  'server.js',
    ext:     'js html',
    ignore:  ['spec/**/*Spec.js'],
    env:     { 'NODE_ENV': 'development' }
  });
});

// WATCHERS
// if this gets too big, we will offload to its own task at that point

// script edits and lint them
gulp.task('watch', ['start'], function(){
	gulp.watch(config.lint.src, ['lint']);
	gulp.watch(config.test.src, ['test:mocha']);
});

gulp.task('tdd', function(){
  gulp.watch(config.test.src, ['test:mocha']);
});

gulp.task('test', function(){
	gulp.watch(config.test.src, ['test:mocha']);
});

gulp.task('default',['start'], function(){
	gulp.watch(config.lint.src, ['lint']);
});
