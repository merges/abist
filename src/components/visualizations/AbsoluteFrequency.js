import cx from 'classnames'
import React from 'react'

// Absolute risk frequency icon array

const AbsoluteFrequency = ({ baseline, breakpoint, className, denominator, frequency, metric, style }) => {
  // Set denominators and breakpoints based on supplied metric or values.
  if (!metric && !denominator) {
    frequency < 1 && (frequency = frequency * 100)
    frequency > 1000 && (frequency = frequency * 0.1)

    !breakpoint && (breakpoint = 20)
    !denominator && (denominator = 100)

    if (frequency > 100) {
      !breakpoint && (breakpoint = 50)
      !denominator && (denominator = 1000)
    }
  }

  // Prioritize the frequency, and forget the denominator—it shouldn't have been supplied.
  if (frequency < 1 && denominator) {
    frequency = frequency * 100
    denominator = 100
    !breakpoint && (breakpoint = 20)
  }
  else if (metric == 'ar_100') {
    !breakpoint && (breakpoint = 20)
    !denominator && (denominator = 100)
  }
  else if (metric == 'ar_1000') {
    !breakpoint && (breakpoint = 50)
    !denominator && (denominator = 1000)

    // If a denominator of 100 is specified, divide and re-present as frequency per 100
    // for easier comparison, especially in small spaces.
    if (denominator == 100) {
      frequency = Math.floor(frequency * 0.1)
      baseline = Math.floor(baseline * 0.1)
      !breakpoint && (breakpoint = 20)
    }
  }

  let rows = []
  let icons = []
  let counter = 0
  for (let i = 1; i <= denominator; i++) {
    const iconClasses = cx({
      'ss-icon ss-user': true,
      'highlight': i <= frequency,
      'lower': baseline && (frequency < baseline) && (i > frequency && i <= baseline),
      'higher': baseline && (i > baseline && i <= frequency)
    })

    icons.push(<td key={i}><i className={iconClasses}></i></td>)
    counter++
    
    if (counter % breakpoint == 0) {
      rows.push(<tr key={counter}>{icons}</tr>)
      icons = []
    }
  }
  
  // Push leftover icons, in cases with unusual denominators.
  if (icons.length > 0) {
    rows.push(<tr key={counter}>{icons}</tr>)
  }

  const visualizationClasses = cx({
    'visualization absolute': true,
    [className]: className,
  })

  if (frequency > denominator) {
    return (
      <div className={visualizationClasses} style={style}>
        Can’t show an icon array when the frequency is greater than the denominator.<br />
        <strong>{frequency} > {denominator}</strong>
      </div>
    )
  }
  return (
    <div className={visualizationClasses} style={style}>
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  )
}

AbsoluteFrequency.propTypes = {
  baseline: React.PropTypes.number,
  breakpoint: React.PropTypes.number,
  classNames: React.PropTypes.string,
  denominator: React.PropTypes.number,
  frequency: React.PropTypes.number.isRequired,
  metric: React.PropTypes.string,
}

export default AbsoluteFrequency