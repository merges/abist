import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

class DosageForm extends React.Component {
  checkForSubstring = (form: string, canonical: string) => {
    return form.toLowerCase().indexOf(canonical) >= 0
  }

  render () {
    const { form } = this.props
    let classes = cx({
      'ss-icon': true,
      'ss-hospital': this.checkForSubstring(form, 'infusion'),
      'ss-syringe': this.checkForSubstring(form, 'injection'),
      'ss-pill': this.checkForSubstring(form, 'tablet')
    })
    return (
      <div className='dosage-form'>
        <span className={classes}></span>
        <span className='form-name'>{form}</span>
      </div>
    )
  }
}

DosageForm.PropTypes = {
  form: React.PropTypes.string.isRequired
}

export default DosageForm