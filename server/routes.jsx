// routes.jsx

var React = require('react/addons');

var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require('../client/components/App.jsx');
var Experiment = require('../client/components/Experiment.jsx');
var Ptda = require('../client/components/Ptda.jsx');

var routes = (
  <Route name="main" path="/" handler={App}>
    <DefaultRoute name="experiment" handler={Experiment} />
    <Route name="ptda" path="/ptda" handler={Ptda} />
  </Route>
);

module.exports = routes;