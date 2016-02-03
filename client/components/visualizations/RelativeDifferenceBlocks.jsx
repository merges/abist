/** @jsx React.DOM */

var React = require('react/addons');
var _ = require('lodash');
var cx = React.addons.classSet

// Relative difference blocks (a la Mayo Clinic DAs)

var RelativeDifferenceBlocks = React.createClass({

  propTypes: {
    value: React.PropTypes.number,
    range: React.PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      range: 100
    }
  },

  renderBlocks: function(value) {
    var roundedValue = Math.ceil(value / 10)

    return _.times(10, function(n) {
      var isFilledIn = function(n, value) {
        if (roundedValue < 0) {
          return (10 + roundedValue) <= (n)
        }
        return (n + 1) <= roundedValue
      }

      var blockClass = cx({
        'vas-block': true,
        'highlight': isFilledIn(n, value)
      })

      var iconClass = cx({
        'ss-icon': true,
        'ss-plus': isFilledIn(n, value) && value > 0,
        'ss-hyphen': isFilledIn(n, value) && value < 0
      })

      return (
        <div key={n} className={blockClass}>
          <i className={iconClass}></i>
        </div>
      )
    })
  },

  render: function() {
    var visualizationClasses = cx({
      'visualization visual-analog-scale': true,
      'up': value > 0,
      'down': value < 0
    })

    var value = this.props.value;

    return (
      <div className={visualizationClasses}>
        {this.renderBlocks(value)}
      </div>
    );
  }
});

module.exports = RelativeDifferenceBlocks;