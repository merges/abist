/** @jsx React.DOM */

var React = require('react/addons');

var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Tooltip = require('react-bootstrap').Tooltip;

// Intervention display with tooltip

var Population = React.createClass({
  
  propTypes: {
    population: React.PropTypes.string.isRequired
  },

  getTooltip: function(text) {
    return (
      <Tooltip>
        <strong>{text}</strong>
      </Tooltip>
    );
  },

  render: function() {
    var cx = React.addons.classSet;
    var visualizationClasses = cx({
      'population': true
    });

    var population = this.props.population;

    return (
      <div className={visualizationClasses}>
        <OverlayTrigger delayHide={150} placement='right' overlay={this.getTooltip(population)}>
          <span className='name'>
            <span className='ss-icon ss-usergroup'></span>
            <strong>{population}</strong>
            <span className='title'> group</span>
          </span>
        </OverlayTrigger>
      </div>
    );
  }
});

module.exports = Population;