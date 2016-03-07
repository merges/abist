/** @jsx React.DOM */

var React = require('react/addons')

var OverlayTrigger = require('react-bootstrap').OverlayTrigger
var Tooltip = require('react-bootstrap').Tooltip

// Source tag

var Source = React.createClass({
  
  propTypes: {
    source: React.PropTypes.string,
    kind: React.PropTypes.string,
    label: React.PropTypes.string,
  },

  getTooltip: function(kind) {
    var sourceToDescriptionMap = {
      'systematic review': 'A systematic review is a high-quality source. Researchers do a consistent review of as much evidence as they can find, looking at the big picture formed by all that research.',
      'randomized trial': 'A randomized clinical trial is an okay-quality source. Researchers usually study a small number of treatments in small groups of people, for a relatively short time. Each group gets a different treatment, and they are compared.',
      'clinical trial': 'A clinical trial is an okay-quality source. Researchers usually study a small number of treatments in small groups of people, for a relatively short time. Each group gets a different treatment, and they are compared.',
      'meta-analysis': 'A meta-analysis is a high-quality source. Researchers do a consistent review of as much evidence as they can find, using statistics to compare treatments to one another, and then looking at the big picture formed by those statistics.'
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
    var source = this.props.source
    var kind = this.props.kind
    var label = this.props.label
    var getTooltip = this.getTooltip
    
    if (source) {
      return (
        <OverlayTrigger delayHide={150} placement='right' overlay={getTooltip(kind)}>
          <span className='source'>
            <span className='box tiny'>
              <span className='light'>source </span>
              <a href={source} target='_new'>
                {kind ? kind : 'Click to see'}
              </a>
            </span>
          </span>
        </OverlayTrigger>
      )
    }
    if (label) {
      return (
        <span className='source'>
          <span className='box tiny'>
            {label}
          </span>
        </span>
      )
    }
    return (<noscript />)
  }
})

module.exports = Source