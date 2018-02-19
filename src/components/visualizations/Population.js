import cx from 'classnames'
import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

// Intervention display with tooltip

class Population extends React.Component {
  getTooltip = (population, dosage) => {
    return (
      <Tooltip>
        <strong>{population}</strong><br />
        {dosage}
      </Tooltip>
    )
  }

  render () {
    var cx = require('classnames')
    var visualizationClasses = cx({
      'population': true
    })

    var population = this.props.population
    var dosage = this.props.dosage

    return (
      <div className={visualizationClasses}>
        <OverlayTrigger delayHide={150} placement='right' overlay={this.getTooltip(population, dosage)}>
          <span className='name'>
            <span className='ss-icon ss-usergroup'></span>
            <strong>{population}</strong>
            <span className='title'> group</span>
          </span>
        </OverlayTrigger>
      </div>
    )
  }
}

Population.defaultProps = {
  population: React.PropTypes.string.isRequired,
  dosage: React.PropTypes.string,
}

export default Population