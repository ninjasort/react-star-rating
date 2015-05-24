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
  componentSrc: './src/export.js',
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
 * hacky, don't use !!!![Deprecated]!!!!!
 */
// gulp.task('replace-scripts', function () {
//   return gulp.src('./src/StarRating.jsx')
//     .pipe(babel())
//     .pipe(jshint())
//     .pipe(jshint.reporter('jshint-stylish'))
//     .pipe(rename('react-star-rating.js'))
//     .pipe(replace(/module.exports/g, 'window.StarRating'))
//     .pipe(gulp.dest('dist/browser'))
//     .pipe(replace(/window.StarRating/g, 'module.exports'))
//     .pipe(replace(/\/\/ \{amd_start\}/, 'define(function(require,exports,module){'))
//     .pipe(replace(/\/\/ \{amd_end\}/, '});'))
//     .pipe(gulp.dest('dist/amd'));
// });

/**
 * Browser !!!![Deprecated]!!!!!
 */
// gulp.task('build:browser', ['replace-scripts'], function () {
//   // amd
//   gulp.src('./dist/amd/react-star-rating.js')
//     .pipe(rename('react-star-rating.min.js'))
//     .pipe(uglify())
//     .on('error', function (err) {
//       console.log(err);
//     })
//     .pipe(gulp.dest('dist/amd'));
//   // browser
//   gulp.src('./dist/browser/react-star-rating.js')
//     .pipe(rename('react-star-rating.min.js'))
//     .pipe(uglify())
//     .on('error', function (err) {
//       console.log(err);
//     })
//     .pipe(gulp.dest('dist/browser'));
// });

/**
 * Bundle
 */
gulp.task('default', ['lint','styles'], function () {
  return browserify('./src/index.jsx', {extensions: '.jsx'})
    .transform(babelify)
    .bundle()
    .on('error', function (err) {
      console.log(err.fileName, err.lineNumber, err.description);
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
