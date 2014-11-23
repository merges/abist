// app.js
// Sets up the server, and initial HTML and index React component.

// Requirements

var express = require('express');
var underscore = require('underscore');
var fs = require("fs");
var http = require("http");
var auth = require('http-auth');
var https = require("https");

var app = express();
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = Number(process.env.PORT || 5000);

var consoleLog = function(message) {
  env != 'production' && console.log('abist ››› ' + message);
};

// Load initial data

var itemsDataJson = (env === 'production') ? getData('data/items.json') : getData('data/items.json');

// Basic password authentication (unused for now)

// var basic = auth.basic({
//   realm: "Private area",
//   file: __dirname + "/.htpasswd",
//   authType: "basic"
// });


function readJsonFileSync(filepath, encoding) {
  consoleLog("trying to read file", filepath);

  if (typeof (encoding) == 'undefined'){
      encoding = 'utf8';
  }
  var file = fs.readFileSync(filepath, encoding);

  return JSON.parse(file);
}

function getData(file) {
  var filepath = __dirname + '/' + file;

  return readJsonFileSync(filepath);
}

function renderPage(req, res) {
  var itemSelectedInitial = null;
  var itemsInitial = [];

  if (req.query.items) {
    req.query.items = req.query.items.replace(/[\[\]]+/g, "");
    itemsInitial = req.query.items.split(",");

    if (itemsInitial.length == 1) {
      itemSelectedInitial = itemsInitial[0];
      itemsInitial = [];
    }
    else {
      for (var i = 0; i < itemsInitial.length; i++) {
        itemsInitial[i] = "\"" + itemsInitial[i] + "\"";
      }
    }
  }

  var htmlArray = [
    '<!DOCTYPE html>',
    '<html lang="en">',
      '<head>',
        '<script src="bower_components/closure-library/closure/goog/base.js"></script>',
        '<script>goog.require("goog.dom.classlist");</script>',
        '<script>goog.require("goog.array");</script>',
        '<script>goog.require("goog.string");</script>',

        '<title>abist</title>',

        '<link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">',
        '<link href="bower_components/c3/c3.css" rel="stylesheet">',
        '<link href="css/app.css" rel="stylesheet">',

        '<script src="bower_components/jquery/dist/jquery.min.js"></script>',
        '<script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>',
        '<script type="text/jsx" src="bower_components/d3/d3.min.js"></script>',
        '<script src="bower_components/c3/c3.min.js"></script>',
        '<script src="bower_components/underscore/underscore.js"></script>',
        '<script src="bower_components/pourover/pourover.js"></script>',
        '<script src="bower_components/react/react-with-addons.js"></script>',
        '<script src="bower_components/react/JSXTransformer.js"></script>',

      '</head>',

      '<body>',
        '<div id="react-container">',
        '</div>',

        '<script type="text/jsx" src="components/menu.js"></script>',
        '<script type="text/jsx" src="components/index.js"></script>',
        '<script type="text/jsx">',
        '/**',
        ' * @jsx React.DOM',
        ' */'];

  var reactComponentHtml =  'React.renderComponent(<Index ';

  if (itemSelectedInitial) {
    reactComponentHtml += 'itemSelected="' + itemSelectedInitial + '" ';
  }

  if (itemsInitial.length > 0) {
    reactComponentHtml += 'items={[' + itemsInitial.join(',') + ']}';
  }

  reactComponentHtml += '/>,document.getElementById("react-container"));</script>';

  htmlArray.push(reactComponentHtml);
  htmlArray.push('</body>');
  htmlArray.push('</html>');

  return htmlArray.join('\n');
}

// If passed, use itemsData JSON

app.use('/itemsData', function(req, res){
  consoleLog('trying to use /itemsData');

  res.send(itemsDataJson);
  res.end();
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

  // app.use(auth.connect(basic));
  app.use('/', express.static(__dirname + '/../client'));
  app.get('*', function(req, res, next) {
    var html = renderPage(req, res);
    res.send(html);
  });
}
else {
  consoleLog('node env == *not* production');

  app.use('/', express.static(__dirname + '/../client'));
  app.get('*', function(req, res, next) {
    var html = renderPage(req, res);
    res.send(html);
  });
}

app.listen(port, function() {
  consoleLog("server listening on port " + port);
});
