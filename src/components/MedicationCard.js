import React from 'react'
import PropTypes from 'prop-types'

class MedicationCard extends React.Component {
  renderPreferredMedicationName = (medication: Object) => {
    if (medication.name_common.toLowerCase() == medication.name_generic.toLowerCase()) {
      return (
        <span className='medication-name'>
          <strong>{medication.name_generic.capitalizeFirstletter()}</strong>
        </span>
      )
    }
    else {
      return (
        <span className='medication-name'>
          <strong>{medication.name_generic.capitalizeFirstletter()}</strong> <span className='light'>brand name {medication.name_common}</span>
        </span>
      )
    }
  }

  renderPreferences = (preferences: Object, preferencesSelected: Object) => {
    if (preferences) {
      var medication = this.props.medication

      return (
        <div className='preferences t-table table-layout-fixed'>
          {_.map(preferences, function (value, key) {
            // Check medication for this key, to see if it has a hit
            // e.g. medication[risks.alcohol] = 0 (ok), 1 (unsure), 2 (bad)
            // e.g. medication[generic_available]
            // e.g. medication[preferences[key]]
            // e.g. methotrexate[risks.alcohol]

            if (preferences[key].type === 'list') {
              return
            }

            // Is a the preference true or non-empty?
            var match = null
            if (value) {
              // Does the preference exist in our preferences object, and is there a function to look for a match?
              if (preferences[key] && preferences[key].isMatch) {
                var isMatch = preferences[key].isMatch
                var lookupKey = preferences[key].key
                match = isMatch(_.get(medication, lookupKey), value)
              }
            }

            var preferenceClass = cx({
              't-cell preference': true,
              'active': preferencesSelected[key]
            })
            var iconClasses = {
              'ss-icon': true
            }
            iconClasses[preferences[key].icon] = true
            var iconClass = cx(iconClasses)
            
            var renderSafetyText = function(match) {
              if (match == 'unsafe') {
                return <strong key={key + match}>Unsafe</strong>
              }
              // If we get an "unknown"
              if (match == 'unknown') {
                return <strong key={key + match}>Not sure</strong>
              }
              // If we get a "false" i.e. for a boolean, it's not true
              if (match === false) {
                return <strong key={key + match}>Not sure</strong>
              }
              return <strong key={key + match}>OK</strong>
            }

            return <div key={medication.name + key} className={preferenceClass}>
              <div className={iconClass}></div>
              {preferences[key].name_short}
              <div>{renderSafetyText(match)}</div>
            </div>

            // // If we get an "unsafe"
            
            // TODO handle dosage form properly
          })}
        </div>
      )
    }
  }

  render () {
    var medication = this.props.medication
    var preferences = this.props.preferences
    var preferencesSelected = this.props.preferencesSelected

    if (this.props.mini) {
      return <div className='medication-card mini'>
        <div className='dosage-forms'>
          {medication.forms.map(function (form, i) {
            return (
              <DosageForm key={i} form={form.name} />
            )
          })}
        </div>
        {this.renderPreferredMedicationName(medication)}
      </div>
    }
    return (
      <div className='medication-card large'>
        <div className='t-table names'>
          <div className='t-row'>
            <div className='t-cell caption light'>medicine (generic) name</div>
            <div className='t-cell caption light'>
              {medication.names_brand.length > 1 ? 'brand names' : 'brand name'}
            </div>
          </div>
          <div className='t-row'>
            <div className='t-cell generic'>{medication.name_generic.capitalizeFirstletter()}</div>
            <div className='t-cell brand'>
              {medication.names_brand.length > 1 ?
                <span>
                  {medication.names_brand.map(function (item, i) {
                    return <span className={i}>
                      {item}{i < medication.names_brand.length - 1 && ', '}
                    </span>
                  })}
                </span>
                :
                <span>
                  {medication.names_brand[0]}
                </span>
              }
            </div>
          </div>
        </div>

        <div className='pad-b-5'>
          <span className='font-size-1 light pad-r-5'>{medication.name_generic_phonetic}</span>
          <span className='font-size-1 light pad-r-5'>
            {medication.class.length > 1 ?
              <span>
                {medication.class.map(function (item, i) {
                  return <span key={i} className={i}>
                    {item}{i < medication.class.length - 1 && ', '}
                  </span>
                })}
              </span>
              :
              <span>
                {medication.class[0]}
              </span>
            }
          </span>
        </div>

        <div className='t-table pad-b-5'>
          <div className='t-row'>
            <div className='t-cell caption'>how it’s taken</div>
            <div className='t-cell caption'>cost</div>
          </div>
          <div className='t-row'>
            <div className='t-cell dosage-forms pad-r-5'>
              {medication.forms.map(function (form, i) {
                numberOfForms = medication.forms.length
                if (numberOfForms > 1 && i < numberOfForms - 1) {
                  return <span key={i} className={i}>
                    <DosageForm key={i} form={form.name} />
                    <span> or </span>
                  </span>
                }
                return <span key={i}>
                  <DosageForm key={i} form={form.name} />
                </span>
              })}
              <div className='frequency'>
                {medication.ptda.frequency.dose &&
                  <span>
                    {medication.ptda.frequency.dose == 1 ? 'once ' : 'twice '}
                    {medication.ptda.frequency.multiple > 1 ?
                      <span>every {medication.ptda.frequency.multiple} {medication.ptda.frequency.unit}s</span> :
                      <span>a {medication.ptda.frequency.unit}</span>
                    }
                  </span>
                }
              </div>
            </div>
            <div className='t-cell cost'>
              {medication.ptda.cost.min != medication.ptda.cost.max ?
                <span>${medication.ptda.cost.min}-${medication.ptda.cost.max}</span> :
                <span>${medication.ptda.cost.max}</span>
              }
              <br /><span className='light'>every month</span>
              
            </div>
          </div>
        </div>

        {this.renderPreferences(preferences, preferencesSelected)}
      </div>
    )
  }
}

MedicationCard.PropTypes = {
  medication: React.PropTypes.object.isRequired,
  mini: React.PropTypes.bool,
  preferences: React.PropTypes.object,
  preferencesSelected: React.PropTypes.object,
},

MedicationCard.defaultProps = {
  mini: false,
}

export default MedicationCard