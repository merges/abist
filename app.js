// app.js

require('node-jsx').install({
  extension: '.jsx',
  harmony: true
});

var React = require('react');
var Router = require('react-router');

var express = require('express');
var iso = require('iso');
var path = require('path');

var routes = require('./client/routes');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = Number(process.env.PORT || 5000);

var consoleLog = function(message) {
  env != 'production' && console.warn('abist ››› ' + message);
};

var app = module.exports.app = exports.app = express();

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'templates'));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/', express.static(path.join(__dirname, 'client')));


app.use(function (err, req, res, next) {
  res.status(500);
  res.send('<pre>' + err.stack + '</pre>');
});

env == 'development' && app.use(require('connect-livereload')({
  port: 18828
}));

app.use(function (req, res) {
  Router.run(routes, req.url, function (Handler) {
    var content = React.renderToString(React.createElement(Handler));
    res.render('layout', {
      html: content
    })
  });
});

app.listen(port, function() {
  consoleLog("server listening on port " + port);
});

module.exports.app = app;