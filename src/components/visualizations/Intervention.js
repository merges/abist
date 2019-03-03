import cx from 'classnames'
import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

String.prototype.capitalizeFirstletter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

// Intervention display with tooltip

class Intervention extends React.Component {
  getDosageDescription = (dosage) => {
    let dosageDescription = ''
    let dosageInterval = parseInt(dosage['dosage_interval'])
    let dosageMultiple = dosage['dosage_multiple'] && parseInt(dosage['dosage_multiple'])

    // Quantity
    // e.g. 25 mg
    dosage.dosage.length < 10 && (dosageDescription += dosage.dosage + ' ')

    // Frequency
    // e.g. once || twice || 3 times
    if (dosage['dosage_frequency'] == 1) {
      dosageDescription += 'once '
    }
    else if (dosage['dosage_frequency'] == 2) {
      dosageDescription += 'twice '
    }
    else if (dosage['dosage_frequency'] > 2) {
      dosageDescription += dosage['dosage_frequency'] + ' times '
    }

    // Interval
    // e.g. daily || weekly || monthly
    if (!dosage['dosage_multiple'] || dosage['dosage_multiple'] == 1) {
      if (dosage['dosage_interval'] == 'day') {
        dosageDescription += 'daily'
      }
      else if (dosage['dosage_interval'] == 'week') {
        dosageDescription += 'weekly'
      }
      else if (dosage['dosage_interval'] == 'month') {
        dosageDescription += 'monthly'
      }
    }
    // e.g. every 2 weeks || every 5 months
    else {
      dosageDescription += 'every '

      if (dosage['dosage_interval'] == 'day') {
        dosageDescription += dosage['dosage_multiple'] + ' days'
      }
      else if (dosage['dosage_interval'] == 'week') {
        dosageDescription += dosage['dosage_multiple'] + ' weeks'
      }
      else if (dosage['dosage_interval'] == 'month') {
        dosageDescription += dosage['dosage_multiple'] + ' months'
      }
    }

    return dosageDescription
  }

  getDosageFormDescription = (dosage) => {
    let dosageFormTranslationMap = {
      'iv': 'infusion (at a hospital or clinic)',
      'parenteral': 'injection (at home or at a clinic)',
      'subcutaneous': 'injection (at home or at a clinic)',
      'oral': 'pill, by mouth',
      'tablet': 'pill, by mouth'
    }

    let translated = dosage['dosage_form'].map(function (form) {
      return dosageFormTranslationMap[form]
    })

    return translated.join(', or ')
  }

  getTooltip = (intervention, dosage) => {
    return (
      <Tooltip id={JSON.stringify(intervention + dosage)}>
        <strong>{intervention}</strong><br />
        {this.getDosageFormDescription(dosage)}<br />
        {this.getDosageDescription(dosage)}
      </Tooltip>
    )
  }

  renderInterventionName = () => {
    let intervention = this.props.intervention
    let interventionName = this.props.interventionName
    let medicationsMap = this.props.medicationsMap
    let dosage = this.props.dosage

    let html = []

    if (intervention) {
      for (let i = 0; i < intervention.length; i++) {
        let part = intervention[i]
        let interventionHtml = []

        if (medicationsMap && medicationsMap[part]) {
          let med = medicationsMap[part][0]

          interventionHtml = (
            <span key={part} className='name text-left'>
              <div className='generic'>
                {intervention.length > 0 && i > 0 && '+ '} {med.name_generic.capitalizeFirstletter()}
              </div>
              {med.names_brand && med.name_generic.toLowerCase() != med.name_common.toLowerCase() && <div className='small brand'>brand name {med.names_brand[0]}</div>}
              {i == 0 && dosage && <div className='small dosage'>{this.getDosageDescription(dosage)}</div>}
            </span>
          )
          html.push(interventionHtml)
        }
        else {
          interventionHtml = (
            <span key={part} className='name text-left small'>
              {intervention.length > 0 && i > 0 && '+ '}{part.capitalizeFirstletter()}
            </span>
          )
          html.push(interventionHtml)
        }
      }
    }
    else {
      html.push(<span className='name text-left small'>{interventionName}</span>)
    }
    return <span>{html}</span>
  }

  render () {
    let cx = require('classnames')
    let visualizationClasses = cx({
      'intervention': true
    })

    let intervention = this.props.intervention
    let interventionName = this.props.interventionName
    let medicationsMap = this.props.medicationsMap
    let dosage = this.props.dosage

    if (dosage) {
      return (
        <div className={visualizationClasses}>
          <OverlayTrigger delayHide={150} placement='right' overlay={this.getTooltip(interventionName, dosage && dosage)}>
            <span>
              {this.renderInterventionName()}
            </span>
          </OverlayTrigger>
        </div>
      )
    }
    return <div className={visualizationClasses}>
      {this.renderInterventionName()}
    </div>
  }
}

Intervention.propTypes = {
  dosage: React.PropTypes.object,
  // intervention: React.PropTypes.object,
  interventionName: React.PropTypes.string,
  medicationsMap: React.PropTypes.object
}

export default Intervention