/*global require*/

"use strict";

var taskName = 'Todo';

var gulp     = require('gulp');
var config   = require('./config');
var todo     = require('gulp-todo');
var msg      = require('gulp-messenger');
var run      = require('gulp-run');

var args = process.argv.slice(3);
var openReport = args.indexOf('--open') >= 0 || (config.todo.reporter.openReport);


gulp.task('todo', function() {
  return gulp.src(config.todo.src)
    .pipe(todo())
    .pipe(gulp.dest('./'))
    .pipe(msg.flush.success('./TODO.MD file updated...'))
    .once('end', function () {
      if (openReport) {
        run('open todo.md').exec();
      }
    });
});
