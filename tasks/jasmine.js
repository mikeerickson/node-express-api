var gulp    = require('gulp');
var jasmine = require('gulp-jasmine');

gulp.task('test:js', function () {
    return gulp.src('spec/**/*Spec.js')
        .pipe(jasmine());
});