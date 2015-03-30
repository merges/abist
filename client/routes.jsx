// routes.jsx

var React = require('react/addons');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var AdverseEvents = require('./components/adverse/AdverseEvents.jsx');
var App = require('./components/App.jsx');
var Experiment = require('./components/Experiment.jsx');
var Processing = require('./components/Processing.jsx');
var Ptda = require('./components/ptda/Ptda.jsx');
var VisualizationSketches = require('./components/visualizations/VisualizationSketches.jsx');
var VisualizationTests = require('./components/visualizations/VisualizationTests.jsx');

var routes = (
  <Route name='home' path='/' handler={App}>
    <DefaultRoute name='experiment' handler={Experiment} />
    <Route name='adverse' path='/adverse' handler={AdverseEvents} />
    <Route name='processing' path='/processing' handler={Processing} />
    <Route name='ptda' path='/ptda' handler={Ptda} />
    <Route name='visualization-sketches' path='/visualization-sketches' handler={VisualizationSketches} />
    <Route name='visualization-tests' path='/visualization-tests' handler={VisualizationTests} />
  </Route>
);

module.exports = routes;