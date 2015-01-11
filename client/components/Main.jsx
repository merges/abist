/** @jsx React.DOM */

var DocumentTitle = require('react-document-title');
var React = require('react/addons');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
// var Link = Router.Link;

var PageTitle = "Main";

var Main = React.createClass({

  render: function() {
    return (
      <RouteHandler />
    );
  }

});

module.exports = Main;