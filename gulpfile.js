var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var reactify = require('reactify');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var ps = require('child_process');
var yargs = require('yargs').argv;
var react = require('gulp-react');
var uglify = require('gulp-uglify');

gulp.task('default', ['styles'], function () {
  return browserify('./src/index.jsx')
    .transform(reactify)
    .bundle()
    .on('error', function (err) {
      console.log(err.fileName, err.lineNumber, err.description);
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('styles', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass({
      includePaths: require('node-bourbon').includePaths
    }))
    .pipe(concat('react-star-rating.min.css'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', ['default'], function () {
  gulp.watch(['./src/*.js', './src/**/*.jsx', './src/sass/{**/,}*.scss'], ['default']);
  return gulp.src('.').pipe(server());
});

gulp.task('build:react', function () {
  return gulp.src('./src/components/StarRating.jsx')
    .pipe(react())
    .pipe(uglify())
    .pipe(gulp.dest('dist/browser'));
});

// gulp.task('run', function () {
//   ps.execFile('./script.sh', function (err, stdout, stderr) {
//     console.log(stdout);
//   });
// });