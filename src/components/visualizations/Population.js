

var React = require('react');

var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Tooltip = require('react-bootstrap').Tooltip;

// Intervention display with tooltip

var Population = React.createClass({
  
  propTypes: {
    population: React.PropTypes.string.isRequired,
    dosage: React.PropTypes.string
  },

  getTooltip: function(population, dosage) {
    return (
      <Tooltip>
        <strong>{population}</strong><br />
        {dosage}
      </Tooltip>
    );
  },

  render: function() {
    var cx = require('classnames');
    var visualizationClasses = cx({
      'population': true
    });

    var population = this.props.population;
    var dosage = this.props.dosage;

    return (
      <div className={visualizationClasses}>
        <OverlayTrigger delayHide={150} placement='right' overlay={this.getTooltip(population, dosage)}>
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