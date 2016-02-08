import gulp       from 'gulp';
import source     from 'vinyl-source-stream';
import browserify from 'browserify';
import babelify   from 'babelify';
import babel      from 'gulp-babel';
import server     from 'gulp-webserver';
import sass       from 'gulp-sass';
import concat     from 'gulp-concat';
import rename     from 'gulp-rename';
import uglify     from 'gulp-uglify';
import eslint     from 'gulp-eslint';
import replace    from 'gulp-replace';
import minifyCSS  from 'gulp-minify-css';
import karma      from 'gulp-karma';

var config = {
  componentFileName: 'react-star-rating',
  componentSrc: './src/StarRating.js',
  componentStylesDir: './src/sass',
  stylesDest: './dist/css',
  watchPaths: [
    './src/**/*.{js,jsx}',
    './src/sass/{*/,}*.scss'
  ]
};

/**
 * Lint
 */
gulp.task('lint', () => {
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
gulp.task('styles', ['demo-styles'], () => {
  return gulp.src(config.componentStylesDir + '/' + config.componentFileName + '.scss')
    .pipe(sass())
    .pipe(gulp.dest(config.stylesDest))
    .pipe(minifyCSS())
    .pipe(rename(config.componentFileName + '.min.css'))
    .pipe(gulp.dest(config.stylesDest));
});

/**
 * Build
 */
gulp.task('build', ['lint'], () => {
  return gulp.src(config.componentSrc)
    .pipe(babel())
    .pipe(rename(config.componentFileName + '.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename(config.componentFileName + '.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

/**
 * Demo Styles
 */
gulp.task('demo-styles', () => {
  return gulp.src(config.componentStylesDir + '/demo.scss')
    .pipe(sass())
    .pipe(gulp.dest('./example/css'))
    .pipe(gulp.dest(config.stylesDest));
});

/**
 * Demo Bundle
 */
gulp.task('docs', ['lint', 'styles'], () => {
  return browserify('./src/docs.jsx', {extensions: '.jsx'})
    .transform(babelify)
    .bundle()
    .on('error', function (err) {
      console.log(err);
    })
    .pipe(source('docs.js'))
    .pipe(gulp.dest('example'));
});

/**
 * Watch
 */
gulp.task('watch', ['default'], () => {
  gulp.watch(config.watchPaths, ['dist']);
  return gulp.src('./example').pipe(server({
    port: 3000
  }));
});

/**
 * Dist
 */
gulp.task('dist', ['build', 'docs']);
