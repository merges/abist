// app.js

require('node-jsx').install({
  extension: '.jsx'
});

var browserify = require('browserify');
var express = require('express');
var iso = require('iso');
var path = require('path');

var React = require('react');
var Router = require('react-router');

var routes = require('./routes');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = Number(process.env.PORT || 5000);

var consoleLog = function(message) {
  env != 'production' && console.log('abist ››› ' + message);
};

var app = express();

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'templates'));
app.use('/js', express.static(path.join(__dirname + '/../js')));
app.use('/bower_components', express.static(path.join(__dirname + '/../bower_components')));
app.use('/', express.static(path.join(__dirname + '/../client')));

app.get('/', function (req, res, next) {
  next();
});

app.use(function (req, res) {
  Router.run(routes, req.url, function (Handler) {
    var content = React.renderToString(React.createElement(Handler));
    res.render('layout', {
      html: iso.server(content)
    })
  })
});

app.use(function (err, req, res, next) {
  res.status(500);
  res.send('<pre>' + err.stack + '</pre>');
});

if (env != 'production') {
  app.use(require('connect-livereload')());
}

app.listen(port, function() {
  consoleLog("server listening on port " + port);
});

module.exports.app = app;