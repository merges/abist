/** @jsx React.DOM */

var React = require('react/addons');
var _ = require('lodash');
var cx = React.addons.classSet

// Visual analog scale as blocks (a la Mayo Clinic DAs)

var VisualAnalogScale = React.createClass({
 
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

      var blockStyle = {
        display: 'inline-block',
        position: 'relative',
        background: isFilledIn(n, value) ? '#9a9a9a' : '#efefef',
        width: '35px',
        height: '35px',
        marginRight: n <= 8 && '5px',
      }

      var iconName = cx({
        'ss-icon': true,
        'ss-plus': value > 0,
        'ss-hyphen': value < 0
      })
      var iconStyle = {
        fontSize: '150%',
        color: 'white',
        position: 'absolute',
        bottom: 0,
        right: 0,
      }

      return (
        <div key={n} style={blockStyle}>
          <i className={iconName} style={iconStyle}></i>
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

module.exports = VisualAnalogScale;