var gulp = require('gulp');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var uglify = require('gulp-uglifyjs');
var pump = require('pump');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var watchify = require('watchify');
var watch = require('gulp-watch');
var gutil = require('gulp-util');

var config = {
  js: {
    src: './public/javascripts/src/app.jsx',
    watch: './client/**/*',
    outputDir: './public/javascripts/build/',
    outputFile: 'app.js',
    outputPath: './public/javascripts/build/app.js'
  },
  css: {
    src: './public/stylesheets/src/style.scss',
    outputDir: './public/stylesheets/build/',
    outputFile: 'style.css',
    outputPath: './public/stylesheets/build/style.css',
    watch: './public/stylesheets/src/**'
  }
};

gulp.task('default', function() {

});

gulp.task('run', function() {
  runSequence(['watch-js', 'watch-css', 'nodemon', 'sass']);
});

gulp.task('lintjs', function() {
  return gulp.src([
    'main.js',
    'gulpfile.js',
    './routes/**.js',
    '.util/**.js',
    './client/actions/**.js',
    './client/stores/**.js'
  ], {matchBase: true})
    .pipe(jshint({esnext: true}))
    .pipe(jshint.reporter('default'));
});

gulp.task('nodemon', function() {
  nodemon({
    script: 'bin/www',
    tasks: [],
    ext: 'html js jsx jade scss',
    env: { 'NODE_ENV': 'development' },
    ignore: [
      'public/**',
      'node_modules',
      'client/**'
    ],
  });
});

gulp.task('watch-js', function() {
  var task = '[watch-js]';
  var count = 0;
  var cyan = gutil.colors.cyan;
  var magenta = gutil.colors.magenta;

  var bundle = function(bundler) {
    gutil.log(cyan(task), 'Starting bundling', magenta('#' + count));
    var startTime = new Date().getTime();

    return bundler
      .transform(reactify, {es6: true, sourceMap: false})
      .transform(babelify.configure({
        compact: false
      }))
      .bundle()
      .on('error', function(e) {
        gutil.log(gutil.colors.red(e.toString()));
        this.emit('end');
      })
      .pipe(source('app.js'))
      .pipe(gulp.dest('public/javascripts/build/'))
      .on('end', function() {
        var time = new Date().getTime() - startTime;
        gutil.log(cyan(task), 'Finished bundling', magenta('#' + count++), 'after', magenta(time + 'ms'));
      });
  };

  var bundler = browserify(config.js.src, {
      cache: {},
      packageCache: {}
    })
    .plugin(watchify);

  bundler.on('update', function() {
    bundle(bundler);
  });

  return bundle(bundler);
});

gulp.task('react-render', function() {
  return browserify(config.js.src)
    .transform(reactify, {es6: true})
    .transform(babelify.configure({
      compact: false
    }))
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest(config.js.outputDir))
});

gulp.task('minify-js', function() {
  return pump([
    gulp.src(config.js.outputPath),
    uglify(),
    gulp.dest(config.js.outputDir)
  ]);
});

gulp.task('watch-css', function() {
  return watch(config.css.watch, function() {
    return gulp.start('sass');
  });
});

gulp.task('sass', function() {
  gulp.src(config.css.src)
    .pipe(sass())
    .pipe(gulp.dest(config.css.outputDir))
});

gulp.task('minify-css', function() {
  return gulp.src(config.css.outputPath)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(config.css.outputDir));
});
