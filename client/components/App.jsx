/** @jsx React.DOM */

var React = require('react/addons');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var App = React.createClass({

  render: function() {
    return (
      <RouteHandler />
    );
  }

});

module.exports = App;