

var React = require('react');

var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Tooltip = require('react-bootstrap').Tooltip;

// Relative risk comparison

var RelativeRiskComparison = React.createClass({

  propTypes: {
    baseline: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      baseline: {
        parts: 'placebo',
        ar_1000: {
          measure: 'acr_50',
          value: {
            value: 208
          }
        }
      },
      items: [{
        parts: 'abatacept',
        ar_1000: {
          value: {
            value: 437
          }
        },
        rr: {
          measure: 'acr_50',
          value: {
            value: 2.11
          }
        }
      },
      {
        parts: 'adalimumab',
        ar_1000: {
          value: {
            value: 491
          }
        },
        rr: {
          measure: 'acr_50',
          value: {
            value: 2.37
          }
        }
      },
      {
        parts: 'anakinra',
        ar_1000: {
          value: {
            value: 304
          }
        },
        rr: {
          measure: 'acr_50',
          value: {
            value: 1.47
          }
        }
      },
      {
        parts: 'etanercept',
        ar_1000: {
          value: {
            value: 565
          }
        },
        rr: {
          measure: 'acr_50',
          value: {
            value: 2.73
          }
        }
      },
      {
        parts: 'infliximab',
        ar_1000: {
          value: {
            value: 433
          }
        },
        rr: {
          measure: 'acr_50',
          value: {
            value: 2.09
          }
        }
      },
      {
        parts: 'rituximab',
        ar_1000: {
          value: {
            value: 518
          }
        },
        rr: {
          measure: 'acr_50',
          value: {
            value: 2.5
          }
        }
      }],
      measure: 'acr_50'
    };
  },

  getTooltip: function(value) {
    return (
      <Tooltip>
        <strong>{value}</strong>
      </Tooltip>
    );
  },

  makePill: function(item) {
    var ar100;
    if (item.ar_1000) {
      ar100 = Math.round(item.ar_1000.value.value / 10);
    }
    else {
      ar100 = item.ar_100.value.value;
    }
    return (
      <OverlayTrigger delayHide={150} placement='right' overlay={this.getTooltip(ar100)}>
        <div className='pill'>
         {item.parts}
        </div>
      </OverlayTrigger>
    );
  },

  render: function() {
    var cx = require('classnames');
    var visualizationClasses = cx({
      'visualization relative-risk-comparison': true
    });

    var items = this.props.items;

    // Get ranges and values
    var values = [];
    items.forEach(function(item) {
      values.push(item.rr.value.value);
    });
    var min = 0;
    var max = Math.max.apply(Math, values);
    var range = (max - min);

    // Set a difference threshold based on the range
    var threshold = 5;

    var getPosition = function(value) {
      return Math.floor(((value - min) * 100) / range);
    };

    // Sort entries
    var sortedItems = items.sort(function(a, b) {
      return a.rr.value.value - b.rr.value.value;
    });

    // Deprecated—placebo should be with all other items
    // // Put placebo into a pill group
    // groups['0'] = [makePill(this.props.baseline)]

    var makePill = this.makePill;

    var pill;
    var groups = {};
    var previousValue;
    var position;

    // Make the pills
    items.forEach(function(item) {
      var value = item.rr.value.value;

      // No previous position
      if (!previousValue) {
        // console.log('first')
        position = getPosition(value);
        groups[position] = [];

        pill = makePill(item);

        groups[position].push(pill);
        previousValue = value;
      }
      // Very close (within threshold range)
      else if (previousValue && ((value - previousValue) < threshold)) {
        // console.log('value below threshold', value, previousValue)
        pill = makePill(item);
        groups[position].push(pill);
        previousValue = value;
      }
      // Significantly different
      else {
        // console.log('significantly different', value)
        position = getPosition(value);
        groups[position] = [];
        pill = makePill(item);
        groups[position].push(pill);
        previousValue = value;
      }
    });

    var pillGroups = [];
    Object.keys(groups).forEach(function(group) {
      var style = {
        left: group + '%'
      }

      var legend;
      if (group == '0') {
        legend = 'baseline';
      }
      else {
        legend = '~' + ((group / 100) * max).toFixed(2) + 'x';
      }

      pillGroups.push(
        <li className='item' style={style}>
          {groups[group]}
          <div className='line'></div>
          <div className='legend'>{legend}</div>
        </li>
      );
    });

    return (
      <div className={visualizationClasses}>
        <ul>
          {pillGroups}
        </ul>
        <div className='note'>TODO: logarithmic scale</div>
      </div>
    );
  }
});

module.exports = RelativeRiskComparison;