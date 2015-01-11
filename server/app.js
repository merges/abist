// app.js

// Enable jsx requires
require('node-jsx').install({
  extension: '.jsx'
});

var bodyParser = require('body-parser');
var browserify = require('browserify');
var express = require('express');
var fs = require('fs');
var path = require('path');
var reactServer = require('./server');

// Config variables
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = Number(process.env.PORT || 5000);

// Custom console log function
var consoleLog = function(message) {
  env != 'production' && console.log('abist ››› ' + message);
};

// App

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/bower_components', express.static(path.join(__dirname + '/../bower_components')));
app.use('/', express.static(path.join(__dirname + '/../client')));
app.use('/', reactServer);

// Error pages
app.use(function (err, req, res, next) {
  res.status(500);
  res.send('<pre>' + err.stack + '</pre>');
});

if (env === 'production') {
  app.get('*',function(req,res,next){
    if (req.headers['x-forwarded-proto']!='https') {
      res.redirect('https://' + req.headers.host + req.url);
    }
    else {
      next();
    }
  });
}
else {
  app.use(require('connect-livereload')());
}

app.listen(port, function() {
  consoleLog("server listening on port " + port);
});

module.exports.app = app;