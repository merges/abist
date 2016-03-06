/** @jsx React.DOM */

var React = require('react/addons');
var _ = require('lodash');
var cx = React.addons.classSet

// Relative change blocks (a la Mayo Clinic DAs)

var RelativeChangeBlocks = React.createClass({

  propTypes: {
    // value should be on a 100 point scale
    value: React.PropTypes.number,
    // If range is specified, there will be at least that many blocks (e.g. 10)
    // but ordinarily, we just let there be as many blocks as necessary.
    range: React.PropTypes.number
  },

  renderBlocks: function(value, range) {
    var roundedValue = Math.round(value / 10)
    
    return _.times(range, function(n) {
      var isFilledIn = function(n, value) {
        // If roundedValue == range, it means we're only supposed
        // to render just enough blocks.
        if (Math.abs(roundedValue) == range) {
          return true
        }
        // Otherwise we have a minimum number of blocks,
        // and only want to fill in the appropriate few.
        if (roundedValue < 0) {
          return (10 + roundedValue) <= n
        }
        return (n + 1) <= roundedValue
      }

      var blockClass = cx({
        'relative-change-block': true,
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
      'visualization relative-change-blocks': true,
      'up': value > 0,
      'down': value < 0
    })

    var value = this.props.value
    var range = this.props.range ? this.props.range : Math.abs(value / 10)

    return (
      <div className={visualizationClasses}>
        {this.renderBlocks(value, range)}
      </div>
    );
  }
});

module.exports = RelativeChangeBlocks;