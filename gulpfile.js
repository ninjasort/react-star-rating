var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var reactify = require('reactify');
var server = require('gulp-webserver');

gulp.task('default', function () {
  return browserify('./src/index.js')
    .transform(reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  gulp.watch(['./src/*.js', './src/*.jsx'], ['default']);
  return gulp.src('.').pipe(server());
});