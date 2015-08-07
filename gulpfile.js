"use strict";

var gulp = require("gulp");
var uglify = require("gulp-uglify");

gulp.task('js', function () {

  gulp.src('./src/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
});

gulp.task('default', ['js']);
