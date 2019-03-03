import cx from 'classnames'
import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

// Relative risk comparison

class RelativeRiskComparison extends React.Component {
  getTooltip = (value) => {
    return (
      <Tooltip>
        <strong>{value}</strong>
      </Tooltip>
    )
  }

  makePill = (item) => {
    let ar100
    if (item.ar_1000) {
      ar100 = Math.round(item.ar_1000.value.value / 10)
    }
    else {
      ar100 = item.ar_100.value.value
    }
    return (
      <OverlayTrigger delayHide={150} placement='right' overlay={this.getTooltip(ar100)}>
        <div className='pill'>
         {item.parts}
        </div>
      </OverlayTrigger>
    )
  }

  render () {
    let cx = require('classnames')
    let visualizationClasses = cx({
      'visualization relative-risk-comparison': true
    })

    let items = this.props.items

    // Get ranges and values
    let values = []
    items.forEach(function(item) {
      values.push(item.rr.value.value)
    })
    let min = 0
    let max = Math.max.apply(Math, values)
    let range = (max - min)

    // Set a difference threshold based on the range
    let threshold = 5

    let getPosition = function(value) {
      return Math.floor(((value - min) * 100) / range)
    }

    // Sort entries
    let sortedItems = items.sort(function(a, b) {
      return a.rr.value.value - b.rr.value.value
    })

    // Deprecated—placebo should be with all other items
    // // Put placebo into a pill group
    // groups['0'] = [makePill(this.props.baseline)]

    let makePill = this.makePill

    let pill
    let groups = {}
    let previousValue
    let position

    // Make the pills
    items.forEach(function(item) {
      let value = item.rr.value.value

      // No previous position
      if (!previousValue) {
        // console.log('first')
        position = getPosition(value)
        groups[position] = []

        pill = makePill(item)

        groups[position].push(pill)
        previousValue = value
      }
      // Very close (within threshold range)
      else if (previousValue && ((value - previousValue) < threshold)) {
        // console.log('value below threshold', value, previousValue)
        pill = makePill(item)
        groups[position].push(pill)
        previousValue = value
      }
      // Significantly different
      else {
        // console.log('significantly different', value)
        position = getPosition(value)
        groups[position] = []
        pill = makePill(item)
        groups[position].push(pill)
        previousValue = value
      }
    })

    let pillGroups = []
    Object.keys(groups).forEach(function(group) {
      let style = {
        left: group + '%'
      }

      let legend
      if (group == '0') {
        legend = 'baseline'
      }
      else {
        legend = '~' + ((group / 100) * max).toFixed(2) + 'x'
      }

      pillGroups.push(
        <li className='item' style={style}>
          {groups[group]}
          <div className='line'></div>
          <div className='legend'>{legend}</div>
        </li>
      )
    })

    return (
      <div className={visualizationClasses}>
        <ul>
          {pillGroups}
        </ul>
        <div className='note'>TODO: logarithmic scale</div>
      </div>
    )
  }
}

RelativeRiskComparison.defaultProps = {
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
}

RelativeRiskComparison.propTypes = {
  baseline: React.PropTypes.object
}

export default RelativeRiskComparison