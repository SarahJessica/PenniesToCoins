const gulp = require('gulp');
const jshint = require('gulp-jshint');
const jscs = require('gulp-jscs');
const nodemon = require('gulp-nodemon');
const inject = require('gulp-inject');
const scss = require('gulp-sass');
const uglify = require('gulp-uglify');

const jsFiles = ['*.js', 'src/**/*.js'];
const scssFiles = ['*.scss', 'src/**/*.scss'];

// CONSISTENT CODING STYLE
gulp.task('style', function() {
  gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {
        verbose : true
    }))
    .pipe(jscs());
});

// DEPENDENCY INJECTION
gulp.task('inject', function() {
  const wiredep = require('wiredep').stream;
  const injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'],
  {read: false});
  const injectOpts = { ignorePath: '/public'};
  const options = {
    bowerJson: require('./bower.json'),
    directory: './public/lib',
    ignorePath: '../../public'
  };
  return gulp.src('./src/views/*.html')
  .pipe(wiredep(options))
  .pipe(inject(injectSrc, injectOpts))
  .pipe(gulp.dest('./public/'));
});

// CSS
gulp.task('scss', function() {
gulp.src(scssFiles)
  .pipe(scss().on('error', scss.logError))
  .pipe(gulp.dest('./public/'));
});

// UGLIGFY
// gulp.task('compress', function() {
//   return gulp.src('./src/js/calculations.js')
//     .pipe(uglify())
//     .pipe(gulp.dest('./public/js/'));
// });

// MOVE JS
gulp.task('prodJs', function() {
  return gulp.src('src/js/*.js')
    .pipe(gulp.dest('./public/js/'));
});

// DEVELOPMENT SERVER
gulp.task('serve', ['scss', 'prodJs', 'style', 'inject'], function() {
  var options = {
    script: 'index.js',
    delayTime: 1,
    env: {
      'PORT': 8800
    },
    watch: jsFiles
  }
  return nodemon(options)
    .on('restart', function(e) {
      console.log('restarting server');
    });
});
