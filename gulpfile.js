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

gulp.task('browserify', function () {
  var browserified = transform(function(filename) {
    var b = browserify(filename, {
      insertGlobals: true,
      extensions: ['.jsx']
    });
    b.transform(reactify);
    return b.bundle();
  });
  return gulp.src(['client/js/*.js'])
    .pipe(browserified)
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('less', function() {
  gulp.src('client/less/*.less')
    .pipe(less())
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
  gulp.watch('client/components/*.jsx', ['browserify']);
  gulp.watch('client/components/*.jsx', function() {
    // server.stop();
    // console.log('abist >>> restarting server');
    // server.run({
    //   file: 'app.js'
    // });
    server.run;
  });
});

gulp.task('default', ['browserify', 'less', 'server', 'watch']);