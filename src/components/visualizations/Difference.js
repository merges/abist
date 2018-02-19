import cx from 'classnames'
import React from 'react'

// Simple difference display

const Difference = ({ className, high, low, metric, value, style }) => {
  var value = this.props.value
  var visualizationClasses = cx({
    'visualization difference': true,
    'up': value > 0,
    'down': value < 0
  })

  if (value > 0) {
    return (
      <div className={visualizationClasses}>
        <span className='ss-icon ss-directup'></span><br />
        <strong>{value}</strong>
      </div>
    )
  }
  if (value < 0) {
    return (
      <div className={visualizationClasses}>
        <span className='ss-icon ss-dropdown'></span><br />
        <strong>{value}</strong>
      </div>
    )
  }
  return (
    <div className={visualizationClasses}>
      <strong>{value}</strong>
    </div>
  )
}

Difference.propTypes = {
  high: React.PropTypes.number,
  low: React.PropTypes.number,
  metric: React.PropTypes.string,
  value: React.PropTypes.number,
}

export default Difference