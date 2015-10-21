/** @jsx React.DOM */

var React = require('react/addons');

var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Tooltip = require('react-bootstrap').Tooltip;

// Source tag

var Source = React.createClass({
  
  propTypes: {
    source: React.PropTypes.string,
    kind: React.PropTypes.string
  },

  getTooltip: function(kind) {
    var sourceToDescriptionMap = {
      'systematic review': 'A systematic review is a high-quality source. Researchers take a comprehensive, consistent look at as much data as they can find to produce a summary of what has been found so far.'
    }
    
    var tooltip = (<Tooltip>Click to see more information about the source.</Tooltip>)
    if (sourceToDescriptionMap[kind]) {
      tooltip = (
        <Tooltip>
          {sourceToDescriptionMap[kind]}
        </Tooltip>
      )
    }
    return tooltip
  },

  render: function() {
    var source = this.props.source;
    var kind = this.props.kind;
    var getTooltip = this.getTooltip;
    
    if (source) {
      return (
        <OverlayTrigger delayHide={150} placement='right' overlay={getTooltip(kind)}>
          <a className='source' href={source} target='_new'>
            <span className='tiny-title'>Source</span><br />
            {kind ? <span>{kind} »</span> : 'Click to see source'}
          </a>
        </OverlayTrigger>
      );
    }
    return (<noscript />);
  }
});

module.exports = Source;