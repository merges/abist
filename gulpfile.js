// gulpfile.js

var gulp = require('gulp');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var path = require('path');
var server = require('gulp-express');

gulp.task('less', function() {
  gulp.src('client/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('client/css'))
    .pipe(livereload());
});

gulp.task('server', function() {
  server.run({
    file: 'server/app.js'
  })
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('client/less/*.less', ['less']);
  gulp.watch('client/components/*.jsx', function() {
    console.log('abist >>> restarting server');
    server.stop();
    server.run({
      file: 'server/app.js'
    });
  });
});

gulp.task('default', ['less', 'server', 'watch']);