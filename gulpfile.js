/**
 * Gulp
 */
var gulp       = require('gulp');
var source     = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify   = require('babelify');
var babel      = require('gulp-babel');
var server     = require('gulp-webserver');
var sass       = require('gulp-sass');
var concat     = require('gulp-concat');
var rename     = require('gulp-rename');
var uglify     = require('gulp-uglify');
var eslint     = require('gulp-eslint');
var replace    = require('gulp-replace');
var minifyCSS  = require('gulp-minify-css');

var config = {
  componentFileName: 'react-star-rating',
  componentSrc: './src/StarRating.jsx',
  componentStylesDir: './src/sass',
  stylesDest: './dist/css'
};

/**
 * Lint
 */
gulp.task('lint', function () {
  return gulp.src('./src/**/*.{jsx, js}')
    .pipe(eslint({
      useEslintrc: true
    }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

/**
 * Styles
 */
gulp.task('styles', function () {
  return gulp.src(config.componentStylesDir + '/' + config.componentFileName + '.scss')
    .pipe(sass({
      includePaths: require('node-bourbon').includePaths
    }))
    .pipe(gulp.dest(config.stylesDest))
    .pipe(minifyCSS())
    .pipe(rename(config.componentFileName + '.min.css'))
    .pipe(gulp.dest(config.stylesDest));
});

/**
 * Build
 */
gulp.task('build', ['lint'], function () {
  return gulp.src(config.componentSrc)
    .pipe(babel())
    .pipe(rename(config.componentFileName + '.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename(config.componentFileName + '.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

/**
 * Demo Bundle
 */
gulp.task('default', ['lint','styles'], function () {
  return browserify('./src/index.jsx', {extensions: '.jsx'})
    .transform(babelify)
    .bundle()
    .on('error', function (err) {
      console.log(err);
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/demo'));
});

/**
 * Watch
 */
gulp.task('watch', ['default'], function () {
  gulp.watch(['./src/*.js', './src/**/*.jsx', './src/sass/{*/,}*.scss'], ['dist']);
  return gulp.src('.').pipe(server());
});

/**
 * Dist
 */
gulp.task('dist', ['default', 'styles', 'build']);
