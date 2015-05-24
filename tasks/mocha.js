'use strict';

var taskName  = 'mocha';

var gulp     = require('gulp');
var mocha    = require('gulp-mocha');
var mkdirp   = require('mkdirp');
var msg      = require('gulp-messenger');
var run      = require('gulp-run');

var args     = process.argv.slice(3);

var launch  = args.indexOf('--launch') >= 0;

mkdirp('spec/logs', function (err) {
  if (err) { msg.Error(err); }
});

gulp.task('test:mocha', function () {
  return gulp.src('spec/**/*Spec.js', {read: false})
    .pipe(mocha({reporter: 'progress'}))
    .once('error', function () {
      process.exit(1);
    })
    .once('end', function () {
      process.exit();
    });
});

gulp.task('test:report', function () {
  return gulp.src('spec/**/*Spec.js', {read: false})
    .pipe(mocha({reporter: 'mochawesome'}))
    .once('error', function () {
      process.exit(1);
    })
    .once('end', function () {
      // so we will check --launch flag read from command line
      // if ( params.indexOf('launch') >= 0 )
      if ( launch ) {
      	run('open mochawesome-reports/mochawesome.html').exec();
      }
      process.exit();
    });
});
