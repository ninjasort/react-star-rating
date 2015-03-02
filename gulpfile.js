var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var reactify = require('reactify');
var server = require('gulp-webserver');
var ps = require('child_process');
var yargs = require('yargs').argv;

gulp.task('default', function () {
  return browserify('./src/index.js')
    .transform(reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  gulp.watch(['./src/*.js', './src/**/*.jsx'], ['default']);
  return gulp.src('.').pipe(server());
});

// gulp.task('run', function () {
//   ps.execFile('./script.sh', function (err, stdout, stderr) {
//     console.log(stdout);
//   });
// });