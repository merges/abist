// server.jsx

var DocumentTitle = require('react-document-title');

var React = require('react/addons');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Experiment = require('../client/components/Experiment');
var Main = require('../client/components/Main');
var Ptda = require('../client/components/Ptda');

var routes = (
  <Route name="main" path="/" handler={Main}>
    <DefaultRoute name="experiment" handler={Experiment} />
    <Route name="ptda" path="/ptda" handler={Ptda} />
  </Route>
  
);

var Page = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <link href='/bower_components/bootstrap/dist/css/bootstrap.min.css' rel='stylesheet' />
          <link href='css/app.css' rel='stylesheet' />
          <script src='/bower_components/jquery/dist/jquery.min.js'></script>
          <script src='/bower_components/bootstrap/dist/js/bootstrap.min.js'></script>
          <meta name='robots' content='noindex, nofollow' />
        </head>
        <body dangerouslySetInnerHTML={{__html: this.props.markup}}></body>
      </html>
    );
  }
});

module.exports = function(req, res, next) {
  Router.run(routes, req.url, function(Handler, state) {
    var title = DocumentTitle.rewind();
    var markup = React.renderToString(<Handler />);
    var html = React.renderToStaticMarkup(<Page title={title} markup={markup} />);
    res.send('<!DOCTYPE html>' + html);
  });
};