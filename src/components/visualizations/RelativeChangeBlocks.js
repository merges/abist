import _ from 'lodash'
import cx from 'classnames'
import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

// Relative change blocks (a la Mayo Clinic DAs)

class RelativeChangeBlocks extends React.Component {
  renderBlocks = (value, range) => {
    let labelStyle = {
      color: 'white',
      lineHeight: '36px',
      position: 'absolute',
      textAlign: 'center',
      width: '100%',
    }

    let roundedValue = Math.round(value / 10)
    
    let html = []
    _.times(range, function(n) {
      let isFilledIn = function(n, value) {
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

      let blockClass = cx({
        'relative-change-block': true,
        'highlight': isFilledIn(n, value)
      })
      let blockStyle = {
        background: 'rgba(165,165,165,' + (1 - ((range - n) / 6)) + ')'
      }

      html.push(
        <div key={n} className={blockClass} style={blockStyle}>
          {n == 0 && <div style={labelStyle}>-{range - n}</div>}
        </div>
      )
    })

    // 0 / no change block
    if (range < 1) {
      let blockStyle = {
        width: '75px',
        background: 'none',
        border: '1px solid #333',
      }
      html.push(
        <div className='relative-change-block' style={blockStyle}>
          <div className='font-size-1 text-center' style={{lineHeight: '34px'}}>no change</div>
        </div>
      )
    }

    return html
  }

  render () {
    let visualizationClasses = cx({
      'visualization relative-change-blocks': true,
      'up': value > 0,
      'down': value < 0,
    })

    let value = this.props.value
    let range = this.props.range ? this.props.range : Math.abs(value / 10)

    return (
      <div className={visualizationClasses}>
        {this.renderBlocks(value, range)}
      </div>
    )
  }
}

RelativeChangeBlocks.propTypes = {
  // value should be on a 100 point scale
  value: React.PropTypes.number,
  // If range is specified, there will be at least that many blocks (e.g. 10)
  // but ordinarily, we just let there be as many blocks as necessary.
  range: React.PropTypes.number,
}

export default RelativeChangeBlocks