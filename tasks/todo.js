"use strict";
var taskName = 'Todo';

var gulp     = require('gulp');
var config   = require('./config');
var todo     = require('gulp-todo');
var msg      = require('gulp-msg');


gulp.task('todo', function() {
  return gulp.src(config.todo.src)
    .pipe(todo())
    .pipe(gulp.dest('./'))
    .pipe(msg.flush.success('./TODO.MD file updated...'));
});
