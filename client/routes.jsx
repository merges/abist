// routes.jsx

var React = require('react/addons');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require('./components/App.jsx');
var Experiment = require('./components/Experiment.jsx');
var Ptda = require('./components/ptda/Ptda.jsx');

var routes = (
  <Route name='home' path='/' handler={App}>
    <DefaultRoute name='experiment' handler={Experiment} />
    <Route name='ptda' path='/ptda' handler={Ptda} />
  </Route>
);

module.exports = routes;