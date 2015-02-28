/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var App = React.createClass({
	render: function() {
		return (
    	<div>
				<RouteHandler {...this.props} />

	      <nav className='site-wide-nav'>
	      	<a href='/'>
	    			<span className="fa fa-home fa-fw"></span>
	    			Adam Baker IS thesis project website
	    		</a>
	      </nav>
	    </div>
    );
  }
});

module.exports = App;