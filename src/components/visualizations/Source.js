import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

// Source tag

class Source extends React.Component {
  getTooltip = (kind) => {
    let sourceToDescriptionMap = {
      'systematic review': 'A systematic review is a high-quality source. Researchers do a consistent review of as much evidence as they can find, looking at the big picture formed by all that research.',
      'randomized trial': 'A randomized clinical trial is an okay-quality source. Researchers usually study a small number of treatments in small groups of people, for a relatively short time. Each group gets a different treatment, and they are compared.',
      'clinical trial': 'A clinical trial is an okay-quality source. Researchers usually study a small number of treatments in small groups of people, for a relatively short time. Each group gets a different treatment, and they are compared.',
      'meta-analysis': 'A meta-analysis is a high-quality source. Researchers do a consistent review of as much evidence as they can find, using statistics to compare treatments to one another, and then looking at the big picture formed by those statistics.'
    }
    
    let tooltip = (<Tooltip id={kind}>Click to see more information about the source.</Tooltip>)
    if (sourceToDescriptionMap[kind]) {
      tooltip = (
        <Tooltip id={kind}>
          {sourceToDescriptionMap[kind]}
        </Tooltip>
      )
    }
    return tooltip
  }

  render () {
    let source = this.props.source
    let kind = this.props.kind
    let label = this.props.label
    let getTooltip = this.getTooltip
    
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
    return null
  }
}

Source.propTypes = {
  kind: React.PropTypes.string,
  label: React.PropTypes.string,
  source: React.PropTypes.string,
}

export default Source