import cx from 'classnames'
import React from 'react'
import {
  OverlayTrigger,
  Popover,
  Tooltip,
} from 'react-bootstrap'

import AbsoluteFrequency from './AbsoluteFrequency'

class AbsoluteRiskComparison extends React.Component {
  state = {
    iconArrayHoverRiskValue: null,
    pillHoverRiskValue: null,
  }

  getPopover = (item: Object) => {
  	// console.log(item: Object)
    let measure =  item.measure_detail
        // name += ' ('
    let name = ''
    item.which == 'comparison' ?
          name += item.comparison.join(' + ')
          :
          name += item.intervention.join(' + ')
        // name += ')'

    return (
      <Popover title={measure}>
        {name} <span className='ss-icon ss-user'></span> <strong>{item.value.value}</strong> of 100 people
      </Popover>
    )
  }

  makePill = (item: Object) => {
    let riskFrequency = item.value.value
    let classes = cx({
      'pill': true,
      'active': riskFrequency <= this.state.iconArrayHoverRiskValue
    })

    // Include measure_detail?
    // let name =  item.measure_detail
    //     name += ' ('
    let name = ''
    item.which == 'comparison' ?
          name += item.comparison.join(' + ')
          :
          name += item.intervention.join(' + ')
        // name += ')'

    return (
      <OverlayTrigger
        delayHide={300}
        key={name}
        overlay={this.getPopover(item: Object)}
        placement='right'
      >
          <div
            className={classes}
            onMouseEnter={() => this.handlePillHover(riskFrequency)}
            onMouseLeave={() => this.handlePillHoverLeave()}
          >
            {name}
          </div>
      </OverlayTrigger>
    )
  }

  handlePillHover = (value) => {
    this.setState({ pillHoverRiskValue: value })
  }

  handlePillHoverLeave = (value) => {
    this.setState({ pillHoverRiskValue: null })
  }

  handleIconArrayHover = (value) => {
    this.setState({ iconArrayHoverRiskValue: value })
  }

  handleIconArrayHoverLeave = (value) => {
    this.setState({ iconArrayHoverRiskValue: null })
  }

  renderIconArray = () => {
    let iconArray = []
    for (let i = 1; i <= 100; i++) {
      const classes = cx({
        'ss-icon ss-user': true,
        'tenth': i % 10 == 0,
        'active': i <= this.state.iconArrayHoverRiskValue || i <= this.state.pillHoverRiskValue
      })
      iconArray.push(
        <span
          key={i}
          className={classes}
          onMouseEnter={() => this.handleIconArrayHover(i)}
          onMouseLeave={() => this.handleIconArrayHoverLeave()}
        >
          <span className='number'>{i}</span>
        </span>
      )
    }

    return (
      <div className='icon-array'>
        {iconArray}
      </div>
    )
  }

  render () {
    let {
      items,
      measure,
      showValues,
    } = this.props
    
    let itemsSorted = items.sort((a, b) => {
      return a.value.value - b.value.value
    })

    let pill = null
    let groups = {}
    let previousPosition = null
    let position = null
    let threshold = 5

    // Make the pills
    itemsSorted.forEach(item => {
      position = item.value.value

      // No previous position
      if (!previousPosition) {
        groups[position] = []
        pill = this.makePill(item)
        groups[position].push(pill)
        previousPosition = position
      }
      // Very close (within threshold range) to previous position
      else if (previousPosition && ((position - previousPosition) <= threshold)) {
        pill = this.makePill(item)
        groups[previousPosition].push(pill)
      }
      // Significantly different
      else {
        groups[position] = []
        pill = this.makePill(item)
        groups[position].push(pill)
        previousPosition = position
      }
    })

    let pillGroups = []
    Object.keys(groups).forEach((pos, i) => {
      let style = {
        left: pos + '%'
      }

      pillGroups.push(
        <li className='item' style={style} key={i}>
          {groups[pos]}
          <div className='line'></div>
          {showValues && <div className='legend'>{pos}</div>}
        </li>
      )
    })

    let giantLabelsStyle = {
    	display: 'table',
    	tableLayout: 'fixed',
    	position: 'absolute',
    	bottom: '35%',
    	width: '100%',
    	height: '65%'
    }
    let bigRightStyle = {
      textAlign: 'right',
    }
    
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
    )
  }
}

AbsoluteRiskComparison.defaultProps = {
  measure: null,
  showTitle: true,
  showValues: false,
}

AbsoluteRiskComparison.propTypes = {
  items: React.PropTypes.array.isRequired,
  mesaure: React.PropTypes.string,
  showTitle: React.PropTypes.boolean,
  showValues: React.PropTypes.boolean,
}

export default AbsoluteRiskComparison