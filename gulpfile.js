// gulpfile.js

var browserify = require('browserify');
var gulp = require('gulp');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var path = require('path');
var reactify = require('reactify');
var rename = require('gulp-rename');
var server = require('gulp-express');
var transform = require('vinyl-transform');
var util = require('gulp-util');
var yaml = require('gulp-yaml');

gulp.task('browserify', function () {
  var browserified = transform(function(filename) {
    var b = browserify(filename, {
      extensions: ['.jsx'],
      insertGlobals: true,
    });
    b.transform(reactify);
    return b.bundle();
  });
  return gulp.src(['client/js/client.js'])
    .pipe(browserified)
    .on('error', function (err) {
      var error = util.colors.red(err);
      util.log(error);
      this.emit('end');
    })
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('less', function() {
  gulp.src('client/less/app.less')
    .pipe(less().on('error', util.log))
    .pipe(gulp.dest('client/css'))
    .pipe(livereload());
});

gulp.task('server', function() {
  server.run({
    file: 'app.js'
  })
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('client/less/*.less', ['less']);
  gulp.watch('client/components/**/*.jsx', ['browserify']);
  gulp.watch('client/components/**/*.jsx', function() {
    server.run;
  });
});

gulp.task('default', ['browserify', 'less', 'server', 'watch']);
