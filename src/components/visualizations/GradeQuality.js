import cx from 'classnames'
import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

// GRADE level of evidence visualization

const GradeQuality = ({ className, grade, gradeMap, style }) => {
  const getIcons = (grade: string) => {
    let icons = []
    let gradeNumber = Math.floor(parseInt(grade))
    if (gradeNumber > 0) {
      for (let i = 1; i <= 4; i++) {
        let iconClasses = cx({
          'ss-icon ss-navigateright': true,
          'highlight': i <= gradeNumber
        })
        icons.push(<i key={i} className={iconClasses}></i>)
      }
    }
    else {
      let iconClass = 'ss-icon ss-navigateright'
      let iconStyle = { opacity: '.1' }
      icons.push(
        <i style={iconStyle} className={iconClass}></i>,
        <i style={iconStyle} className={iconClass}></i>,
        <i style={iconStyle} className={iconClass}></i>,
        <i style={iconStyle} className={iconClass}></i>
      )
    }
    return icons
  }

  const getTooltip = (grade: string) => {
    let tooltip
    if (grade == 'X' || !grade) {
      tooltip = (
        <Tooltip>
          <strong>Not sure.</strong> This information hasn’t been quality rated according to GRADE.
        </Tooltip>
      )
    }
    else {
      tooltip = (
        <Tooltip>
          <strong>{grades[grade].name_friendly}.</strong><br />
          {grades[grade].description_friendly}
        </Tooltip>
      )
    }
    return tooltip
  }

  let visualizationClasses = cx({
    'visualization grade-quality': true,
    [className]: className,
  })
  return (
    <div className={visualizationClasses} style={style}>
      <OverlayTrigger delayHide={150} placement='right' overlay={getTooltip(grade)}>
        <div>
          <span className='box tiny'><span className='light'>quality</span> {getIcons(grade)}</span>
        </div>
      </OverlayTrigger>
    </div>
  )
}

GradeQuality.propTypes = {
  grade: React.PropTypes.string,
  gradeMap: React.PropTypes.object
} 

export default GradeQuality