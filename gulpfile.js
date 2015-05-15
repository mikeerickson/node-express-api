'use strict';

var gulp       = require('gulp');
var nodemon    = require('gulp-nodemon');
var requireDir = require('require-dir');
var config     = require('./tasks/config');


// LOAD ALL TASKS
// =============================================================================
// you can execute task like `gulp <taskName>`
requireDir('./tasks', { recurse: false });


// DEFINE TASKS
// =============================================================================
// Setup Nodemon Server

gulp.task('serve', function () {
  nodemon({
    script:  'server.js',
    ext:     'js html',
    ignore:  ['spec/**/*Spec.js'],
    env:     { 'NODE_ENV': 'development' }
  });
});

// for the brain that is used to typing npm start
gulp.task('start',['serve']);


// WATCHERS
// =============================================================================
// if this gets too big, we will offload to its own task at that point

// script edits and lint them
gulp.task('watch', ['serve'], function(){
	gulp.watch(config.lint.src, ['lint']);
	gulp.watch(config.test.src, ['test:mocha']);
  gulp.watch(config.todo.src, ['todo']);

});

gulp.task('tdd', function(){
  gulp.watch(config.test.src, ['test:mocha']);
});

gulp.task('test', function(){
	gulp.watch(config.test.src, ['test:mocha']);
});

gulp.task('default',['serve'], function(){
	gulp.watch(config.lint.src, ['lint']);
	gulp.watch(config.test.src, ['test']);
	gulp.watch(config.todo.src, ['todo']);
});
