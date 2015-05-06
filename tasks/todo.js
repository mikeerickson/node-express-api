"use strict";
var taskName = 'Todo';

var gulp     = require('gulp');
var config   = require('./config');
var todo     = require('gulp-todo');
var msg      = require('./console');


gulp.task('todo', function() {
  msg.info('./TODO.MD file updated...');
  return gulp.src(config.todo.src)
    .pipe(todo())
    .pipe(gulp.dest('./'));
});