// client.js

var iso = require('iso');

var React = require('react');
var Router = require('react-router');

var routes = require('../server/routes.jsx');

iso.client(function (state, _, container) {
	Router.run(routes, Router.HistoryLocation, function (Handler) {
    var node = React.createElement(Handler)
    React.render(node, container)
  });
});