

var React = require('react');

// Simple difference display

var Difference = React.createClass({
 
  propTypes: {
    value: React.PropTypes.number,
    low: React.PropTypes.number,
    high: React.PropTypes.number,
    metric: React.PropTypes.string
  },

  render: function() {
    var cx = require('classnames');

    var value = this.props.value;

    var visualizationClasses = cx({
      'visualization difference': true,
      'up': value > 0,
      'down': value < 0
    });

    if (value > 0) {
      return (
        <div className={visualizationClasses}>
          <span className='ss-icon ss-directup'></span><br />
          <strong>{value}</strong>
        </div>
      );
    }
    if (value < 0) {
      return (
        <div className={visualizationClasses}>
          <span className='ss-icon ss-dropdown'></span><br />
          <strong>{value}</strong>
        </div>
      );
    }
    return (
      <div className={visualizationClasses}>
        <strong>{value}</strong>
      </div>
    );
  }
});

module.exports = Difference;