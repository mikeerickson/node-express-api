'use strict';

var taskName  = 'mocha';

var gulp     = require('gulp');
var mocha    = require('gulp-mocha');
var mkdirp   = require('mkdirp');
var msg      = require('gulp-msg');

mkdirp('spec/logs', function (err) {
  if (err) { msg.Error(err); }
});

gulp.task('test:mocha', function () {
  return gulp.src('spec/**/*Spec.js', {read: false})
    .pipe(mocha())
    .once('error', function () {
      process.exit(1);
    })
    .once('end', function () {
      process.exit();
    });
});
