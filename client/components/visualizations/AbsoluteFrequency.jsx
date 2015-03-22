/** @jsx React.DOM */

var React = require('react/addons');

// Absolute risk frequency icon array

var AbsoluteFrequency = React.createClass({
  propTypes: {
    baseline: React.PropTypes.number,
    breakpoint: React.PropTypes.number,
    denominator: React.PropTypes.number,
    frequency: React.PropTypes.number.isRequired,
    metric: React.PropTypes.string,
    classNames: React.PropTypes.string
  },

  render: function() {
    var cx = React.addons.classSet;

    var baseline = this.props.baseline;
    var breakpoint = this.props.breakpoint;
    var denominator = this.props.denominator;
    var frequency = this.props.frequency;

    // Set denominators and breakpoints based on supplied metric or values.
    //
    if (!this.props.metric && !this.props.denominator) {
      frequency < 1 && (frequency = frequency * 100);
      frequency > 1000 && (frequency = frequency * 0.1);

      !this.props.breakpoint && (breakpoint = 20);
      !this.props.denominator && (denominator = 100);

      if (frequency > 100) {
        !this.props.breakpoint && (breakpoint = 50);
        !this.props.denominator && (denominator = 1000);
      }
    }
    if (frequency < 1 && this.props.denominator) {
      // Prioritize the frequency, and forget the denominator—it shouldn't have been supplied.
      frequency = frequency * 100;
      denominator = 100;
      !this.props.breakpoint && (breakpoint = 20);
    }
    else if (this.props.metric == 'ar_100') {
      !this.props.breakpoint && (breakpoint = 20);
      !this.props.denominator && (denominator = 100);
    }
    else if (this.props.metric == 'ar_1000') {
      !this.props.breakpoint && (breakpoint = 50);
      !this.props.denominator && (denominator = 1000);
    }

    var rows = [];
    var icons = [];
    var counter = 0;

    for (var i = 1; i <= denominator; i++) {
      var iconClasses = cx({
        'ss-icon ss-user': true,
        'highlight': i <= frequency
      });
      icons.push(<td key={i}><i className={iconClasses}></i></td>);
      counter++;
      if (counter % breakpoint == 0) {
        rows.push(<tr key={counter}>{icons}</tr>);
        icons = [];
      }
    }
    // Push leftover icons, in cases with unusual denominators
    if (icons.length > 0) {
      rows.push(<tr key={counter}>{icons}</tr>);
    }

    var visualizationClasses = cx({
      'visualization absolute': true,
      'better': this.props.classNames == 'better',
      'worse': this.props.classNames == 'worse'
    });

    if (frequency > denominator) {
      <div className={visualizationClasses}>
        Can’t show an icon array when the frequency is greater than the denominator.<br />
        <strong>{frequency} > {denominator}</strong>
      </div>
    }
    return (
      <div className={visualizationClasses}>
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = AbsoluteFrequency;