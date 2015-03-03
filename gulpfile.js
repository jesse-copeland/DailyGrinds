var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');

gulp.task('sass', function () {
    gulp.src('sass/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(plumber.stop())
    .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function () {
  gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('default', ['sass','watch']);