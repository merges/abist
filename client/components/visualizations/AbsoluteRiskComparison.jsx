/** @jsx React.DOM */

var React = require('react/addons');

var AbsoluteFrequency = require('./AbsoluteFrequency.jsx');

var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Popover = require('react-bootstrap').Popover;
var Tooltip = require('react-bootstrap').Tooltip;

// Absolute risk comparison

var AbsoluteRiskComparison = React.createClass({

  propTypes: {
    items: React.PropTypes.array.isRequired,
    mesaure: React.PropTypes.string
  },

  getDefaultProps: function() {
  	return {
      measure: null,
      showTitle: true,
      showValues: false
    };
  },

  getInitialState: function() {
    return {
      iconArrayHoverRiskValue: null,
      pillHoverRiskValue: null
    };
  },

  getPopover: function(item) {
  	// console.log(item)
    var measure =  item.measure_detail
        // name += ' (';
    var name = ''
    item.which == 'comparison' ?
          name += item.comparison.join(' + ')
          :
          name += item.intervention.join(' + ')
        // name += ')';

    return (
      <Popover title={measure}>
        {name} <span className='ss-icon ss-user'></span> <strong>{item.value.value}</strong> of 100 people
      </Popover>
    );
  },

  makePill: function(item) {
    var cx = React.addons.classSet;

    var handlePillHover = this.handlePillHover;
    var handlePillHoverLeave = this.handlePillHoverLeave;

    var riskFrequency = item.value.value;

    var classes = cx({
      'pill': true,
      'active': riskFrequency <= this.state.iconArrayHoverRiskValue
    });

    // Include measure_detail?
    // var name =  item.measure_detail;
    //     name += ' (';
    var name = ''
    item.which == 'comparison' ?
          name += item.comparison.join(' + ')
          :
          name += item.intervention.join(' + ')
        // name += ')';

    return (
      <OverlayTrigger
        delayHide={300}
        placement='right'
        overlay={this.getPopover(item)}
        key={name}>
          <div
            className={classes}
            onMouseEnter={handlePillHover.bind(null, riskFrequency)}
            onMouseLeave={handlePillHoverLeave}>
              {name}
          </div>
      </OverlayTrigger>
    );
  },

  handlePillHover: function(value) {
    this.setState({
      pillHoverRiskValue: value
    });
  },

  handlePillHoverLeave: function(value) {
    this.setState({
      pillHoverRiskValue: null
    });
  },

  handleIconArrayHover: function(value) {
    this.setState({
      iconArrayHoverRiskValue: value
    });
  },

  handleIconArrayHoverLeave: function(value) {
    this.setState({
      iconArrayHoverRiskValue: null
    });
  },

  renderIconArray: function() {
    var cx = React.addons.classSet;
    var handleIconArrayHover = this.handleIconArrayHover;
    var handleIconArrayHoverLeave = this.handleIconArrayHoverLeave;

    var iconArray = [];
    for (var i = 1; i <= 100; i++) {
      var classes = cx({
        'ss-icon ss-user': true,
        'tenth': i % 10 == 0,
        'active': i <= this.state.iconArrayHoverRiskValue || i <= this.state.pillHoverRiskValue
      })
      iconArray.push(
        <span
          key={i}
          className={classes}
          onMouseEnter={handleIconArrayHover.bind(null, i)}
          onMouseLeave={handleIconArrayHoverLeave}>
            <span className='number'>{i}</span>
        </span>)
    }

    return <div className='icon-array'>
      {iconArray}
    </div>
  },

  render: function() {
    var showValues = this.props.showValues;

    var items = this.props.items.sort(function(a, b) {
      return a.value.value - b.value.value;
    });

    var makePill = this.makePill;
    var pill;
    var groups = {};
    var previousPosition;
    var position;
    var threshold = 5;

    // Make the pills
    items.forEach(function(item) {
      position = item.value.value;

      // No previous position
      if (!previousPosition) {
        groups[position] = [];
        pill = makePill(item);
        groups[position].push(pill);
        previousPosition = position;
      }
      // Very close (within threshold range) to previous position
      else if (previousPosition && ((position - previousPosition) <= threshold)) {
        pill = makePill(item);
        groups[previousPosition].push(pill);
      }
      // Significantly different
      else {
        groups[position] = [];
        pill = makePill(item);
        groups[position].push(pill);
        previousPosition = position;
      }
    });

    var pillGroups = [];
    Object.keys(groups).forEach(function(pos, i) {
      var style = {
        left: pos + '%'
      }

      pillGroups.push(
        <li className='item' style={style} key={i}>
          {groups[pos]}
          <div className='line'></div>
          {showValues && <div className='legend'>{pos}</div>}
        </li>
      );
    });

    var giantLabelsStyle = {
    	display: 'table',
    	tableLayout: 'fixed',
    	position: 'absolute',
    	bottom: '35%',
    	width: '100%',
    	height: '65%'
    }
    var bigRightStyle = {
      textAlign: 'right',
    }

    var measure = this.props.measure

    return (
      <div>
        <div className='visualization absolute-risk-comparison'>
          <div className='chart-holder'>
          	<div style={giantLabelsStyle}>
          		<span className='x-light giant-label'>less {measure}</span>
          		<span className='giant-label'></span>
			        <span className='x-light giant-label' style={bigRightStyle}>more {measure}</span>
          	</div>

            <ul>
              {pillGroups}
            </ul>
            <div className='axis-labels'>
              {this.renderIconArray()}
              <div className='axis-label left'>
                <strong>None of 100 people</strong>
                <p>
                  At this end, no one is expected to experience <strong>{measure}</strong>
                </p>
              </div>
              <div className='axis-label right'>
                <strong>100 of 100 people</strong>
                <p>
                  At this end, almost everyone is expected to experience <strong>{measure}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = AbsoluteRiskComparison;