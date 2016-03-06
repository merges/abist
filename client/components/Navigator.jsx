/** @jsx React.DOM */

var $ = require('jquery')
var React = require('react/addons')
var cx = React.addons.classSet
var _ = require('lodash')

var get = require('../data/get.js')
var medications = require('../data/medications.js')
var preferences = require('../data/preferences.js')
var mockData = require('../data/mock.js')

var medicationsMap = _.indexBy(medications, 'name_generic')
    medicationsMap['dmard'] = {
      name: 'another dmard',
      name_generic: 'another RA drug',
      name_common: 'like methotrexate'
    }

var Nav = require('react-bootstrap').Nav
var NavItem = require('react-bootstrap').NavItem

var Sticky = require('react-sticky')

var OutcomeAdverseEvents = require('./OutcomeAdverseEvents.jsx')
var OutcomeRelativeDifferences = require('./OutcomeRelativeDifferences.jsx')
var OutcomeRelativeComparison = require('./OutcomeRelativeComparison.jsx')
var OutcomeTimeline = require('./OutcomeTimeline.jsx')

String.prototype.capitalizeFirstletter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

var ScrollTo = React.createClass({

  propTypes: {
    to: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      <a onClick={this.props.onClick.bind(null, this.props.to)} className='scroll-down'>
        <i className='ss-icon ss-navigatedown'></i>
      </a>
    )
  }

})

var DosageForm = React.createClass({

  propTypes: {
    form: React.PropTypes.string.isRequired
  },

  checkForSubstring: function(form, canonical) {
    return form.toLowerCase().indexOf(canonical) >= 0
  },

  render: function() {
    var form = this.props.form

    var cx = React.addons.classSet
    var classes = cx({
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

})

var MedicationCard = React.createClass({

  propTypes: {
    medication: React.PropTypes.object.isRequired,
    mini: React.PropTypes.bool,
    preferences: React.PropTypes.object,
    preferencesSelected: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      mini: false
    }
  },

  renderPreferredMedicationName: function (medication) {
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
  },

  renderPreferences: function (preferences, preferencesSelected) {
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
  },

  render: function() {
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

})

// Navigator experiment

var Navigator = React.createClass({

  getDefaultProps: function () {
    return {
      issues: {
        basic: {
          name: 'basic issues',
          measures: []
        },
        improvement: {
          name: 'RA improvement',
          measures: ['acr_50']
        },
        pain: {
          name: 'pain',
          measures: ['patient_pain']
        },
        work: {
          name: 'work',
          measures: ['median_work_disability_days']
        },
        side_effects: {
          name: 'side effects',
          measures: ['discontinued_ae', 'ae', 'serious_ae']
        },
      },
      medications: medications,
      preferences: preferences
    }
  },

  getInitialState: function () {
    var getDosageForms = function(medications) {
      var dosageForms = {}
      medications.map(function(medication) {
        if (medication.forms) {
          medication.forms.forEach(function(form) {
            dosageForms[form.name] = false
          })
        }
      })
      return dosageForms
    }

    var getClasses = function(medications) {
      var classes = {}
      medications.map(function(medication) {
        if (medication.class) {
          medication.class.forEach(function(name) {
            classes[name] = false
          })
        }
      })
      return classes
    }

    var getDisabledMedications = function(medications) {
      var disabled = {}
      medications.forEach(function(medication) {
        disabled[medication.name] = false
      })
      return disabled
    }

    var preferencesDefault = {
      alcohol: false,
      cancer_treatment: false,
      class: getClasses(this.props.medications),
      cost: null,
      forms: getDosageForms(this.props.medications),
      generic_available: false,
      heart_failure: false,
      kidney_disease: false,
      liver_disease: false,
      pregnancy: false,
      tb: false
    }

    return {
      data: {},
      dev: this.props.query.dev ? true : false,
      full: this.props.query.full ? true : false,
      offline: this.props.query.offline ? true : false,

      // Medication filtering-related
      disabledMedications: getDisabledMedications(medications),
      menuOpen: false,
      preferences: this.props.preferences,
      preferencesDefault: _.cloneDeep(preferencesDefault),
      preferencesSelected: _.cloneDeep(preferencesDefault),

      // UI-related
      selectedIssue: 'basic',
      selectedTag: null,
      selectedMeasure: null,
      userReadyToViewData: false
    }
  },

  componentDidMount: function () {
    var instance = this

    if (this.state.offline) {
      // Use mock data
      this.setState({
        data: mockData,
        selectedMeasure: 'acr_50',
        selectedTag: 'improvement'
      })
    }
    else {
      // Query spreadsheets
      this.getData()
      .done(function(data) {
        if (instance.isMounted) {
          instance.setState({data: data})
          if (data.tags['improvement'] && data.measures['acr_50'] && data.grades && data.data != {}) {
            instance.setState({
              selectedMeasure: 'acr_50',
              selectedTag: 'improvement',
              // selectedMeasure: 'ae',
              // selectedTag: 'adverse event'
            })
          }
        }
      })
    }
  },

  handleStickyStateChange: function() {
    this.setStickyHeaderOffsets()
  },

  setStickyHeaderOffsets: function() {
    var stickyHolderHeight = this.refs['stickyHolder'].getDOMNode().offsetHeight
    var offsets = {
      medications: this.getOffsetTop('medications') - stickyHolderHeight,
      results: this.getOffsetTop('results') - stickyHolderHeight
    }
    this.setState({
      offsets: offsets
    })
  },

  // setStickyHolderHeight: function() {
  //   var heights = {
  //     filterControls: this.refs['stickyFilterControls'].getDOMNode().offsetHeight,
  //     medications: this.refs['stickyMedications'].getDOMNode().offsetHeight
  //   }

  //   if (heights.filterControls > 0 || heights.medications > 0) {
  //     var stickyHolderHeight = this.refs['stickyHolder'].getDOMNode().offsetHeight
  //     console.log('stickyHolderHeight', stickyHolderHeight)
  //     this.setState({
  //       stickyHolderHeight: stickyHolderHeight
  //     })
  //   }
  // },

  // getOffsetTopPlusStickyHeader: function (ref) {
  //   return this.getOffsetTop() + this.state.stickyHolderHeight
  // },

  getOffsetTop: function (ref) {
    if (this.refs[ref]) {
      var element = this.refs[ref].getDOMNode()
      return Math.ceil($(element).offset().top)
    }
    return 99999
  },

  scrollSmoothlyToElement: function (ref) {
    var stickyHolderHeight = this.refs['stickyHolder'].getDOMNode().offsetHeight
    var newScrollTop = this.getOffsetTop(ref) - stickyHolderHeight
    $('html, body').animate({
      scrollTop: newScrollTop
    }, 450)
  },

  getData: function () {
    var urlTagDescriptions = get.getSheetUrl(get.sheets.tagDescriptions)
    var urlMeasures = get.getSheetUrl(get.sheets.measures)
    var urlMetrics = get.getSheetUrl(get.sheets.metrics)
    var urlGrades = get.getSheetUrl(get.sheets.grades)
    var urlTagDescriptions = get.getSheetUrl(get.sheets.tagDescriptions)

    var allData = {}
    var deferred = new $.Deferred

    $.when(
      // Get GRADE
      $.getJSON(urlGrades + '&callback=?').done(function (data) {
        allData['grades'] = get.processGrades(data)
      }),

      // Get measures & tags
      $.getJSON(urlMeasures + '&callback=?').done(function (data) {
        // var newStateItems = get.processMeasures(data)
        allData['measures'] = get.processMeasures(data).measures
        allData['tags'] = get.processMeasures(data).tags
      }),

      // Get metrics
      $.getJSON(urlMetrics + '&callback=?').done(function (data) {
        allData['metrics'] = get.processMetrics(data)
      }),

      // Get tag descriptions
      $.getJSON(urlTagDescriptions + '&callback=?').done(function (data) {
        allData['tagDescriptions'] = get.processTagDescriptions(data)
      }),

      // Get data
      $.when(Object.keys(get.sheets.data).forEach(function (source) {
        var url = get.getSheetUrl(get.sheets.data[source])
        $.getJSON(url + '&callback=?').done(function (data) {
          !allData['data'] && (allData['data'] = {})
          allData['data'][source] = get.processData(data)
        })
      })
      ).done(function() {
        return true
      })
    )
    .done(function() {
      deferred.resolve(allData)
    })

    return deferred.promise()
  },

  handleDrugFilterClick: function (key, selectedValue) {
    var preferencesSelected = this.state.drugPreferencesSelected
    if (selectedValue) {
      Object.keys(preferencesSelected[key]).forEach(function(pref) {
        preferencesSelected[key][pref] = false
      })
      preferencesSelected[key][selectedValue] = true
    }
    else {
      preferencesSelected[key] = !preferencesSelected[key]
    }
    this.setState({
      userHasFiltered: true,
      preferencesSelected: preferencesSelected
    })
  },

  filterDrugs: function (drugs, preferencesSelected) {
    var disabledDrugs = {}

    drugs.forEach(function(drug, i) {
      var drugFeatures = {}

      // 1. Examine all the preferences for a match
      for (var preference in preferencesSelected) {
        if (preferencesSelected[preference] && preferencesSelected[preference] != null) {
          var filter = drugFilters[preference]
          var options = preferencesSelected[preference]
          drugFeatures[preference] = filter.isMatch(drug, options)
        }
      }

      // 2. Check if the drug should be disabled
      var keepDrug = true
      for (var preference in preferencesSelected) {
        if (preferencesSelected[preference] != null) {
          for (var feature in drugFeatures) {
            if (preferencesSelected[preference] && !drugFeatures[preference]) {
              keepDrug = false
            }
          }
        }
      }
      disabledDrugs[drug.name] = !keepDrug
    })

    return disabledDrugs
  },

  togglePreferenceControls: function (direction) {
    // var isOpen = this.state.menuOpen
    // isOpen = !isOpen
    // this.setState({
    //   menuOpen: isOpen
    // })

    if (direction == 'open') {
      this.setState({
        menuOpen: true
      })
    }
    if (direction == 'close') {
      this.setState({
        menuOpen: false
      })
    }
  },

  togglePreferenceControlsOpen: function () {
    this.setState({
      menuOpen: true
    })
  },

  togglePreferenceControlsClose: function () {
    this.setState({
      menuOpen: false
    })
  },

  renderPreferenceControls: function (preferences) {
    var filterPreference = this.filterPreference
    var toggleOpen = this.togglePreferenceControlsOpen
    var toggleClose = this.togglePreferenceControlsClose

    var preferences = this.props.preferences
    var preferencesSelected = this.state.preferencesSelected

    return (
      <div className='filter-controls'>
          {Object.keys(preferences).map(function (key, i) {
            var preference = preferences[key]
            if (preference.type == 'boolean') {
              return (
                <div key={i} className='checkbox'>
                  <label>
                    <input type='checkbox'
                      key={key}
                      value={key}
                      checked={preferencesSelected[key]}
                      onChange={filterPreference.bind(null, key, false)} />
                        {preference.name}
                  </label>
                </div>
              )
            }
            // List preferences become a list
            else if (preference.type == 'list') {
              // Get the possible options for this preference from this.state.preferencesSelected.
              // There is a function in getInitialState() that iterates through the provided medications,
              // collecting the "options" they provide for vis à vis this preference.
              var options = Object.keys(preferencesSelected[key])

              return (
                <section key={key}>
                  <div className='pad-t-2 pad-b-2'>
                    {options.map(function(option, i) {
                      var optionClasses = cx({
                        'active': !preferencesSelected[key][option]
                      })
                      return (
                        <div key={i} className='checkbox'>
                          <label>
                            <input type='checkbox'
                              key={option}
                              value={option}
                              checked={!preferencesSelected[key][option]}
                              onChange={filterPreference.bind(null, key, option)} />
                                {option}
                          </label>
                        </div>
                      )
                      // return (
                      //   <a className={optionClasses} key={option} onClick={filterPreference.bind(null, key, option)}>
                      //     <DosageForm form={option} />
                      //   </a>
                      // )
                    })}
                  </div>
                </section>
              )
            }
            else {
              return (
                <section>
                  {preference.name}
                  <span className='description'>{preference.description}</span>
                </section>
              )
            }
          })}
      </div>
    )
  },

  filterPreference: function (preferenceKey, optionKey, event) {
    if (this.state.menuOpen) {
      event.stopPropagation()
    }

    var disabledMedications = {}
    var medications = this.props.medications
    var preferences = this.props.preferences
    var preferencesSelected = this.state.preferencesSelected

    // Toggle the preference. If there's an 'option' provided, the preference is a list type,
    // for example dosage form. So we use the 'preference' to access the dosage forms object,
    // and use the preference to set true/false on the appropriate dosage form.
    //
    // forms: {
    //   tablet: true,
    //   injection: true
    // }
    //

    // TOGGLE PREFERENCES
    if (optionKey) {
      preferencesSelected[preferenceKey][optionKey] = !preferencesSelected[preferenceKey][optionKey]
    }
    else {
      preferencesSelected[preferenceKey] = !preferencesSelected[preferenceKey]
    }

    // Check each medication against the selected preferences and options,
    // disabling any that doesn't satisfy.
    //
    medications.forEach(function(medication, i) {
      var medicationMatchingPreferences = {}

      // 1. Examine all the preferences for a match.
      //
      for (var preference in preferencesSelected) {
        if (preferencesSelected[preference]) {

          // a. Simple boolean preference
          if (typeof preferencesSelected[preference] === 'boolean') {

            // Look for a matching key in the medication object
            // Boolean? e.g. 'generic_available' -- inverse match
            if (medication[preference] == false) {
              medicationMatchingPreferences[preference] = true
              // disabledMedications[medication.name] = true
            }
            // Not a key in medication object, so check ptda.risks
            else {
              // Look for key in right place
              if (preferences[preference] && preferences[preference].isMatch) {
                var isMatch = preferences[preference].isMatch
                var lookupKey = preferences[preference].key
                var result = _.get(medication, lookupKey)
                var match = isMatch(_.get(medication, lookupKey))

                if (match == 'unsafe') {
                  medicationMatchingPreferences[preference] = true
                }
              }
            }
          }

          // b. List preference
          else if (typeof preferencesSelected[preference] === 'object') {

            // The user chose one or more options (to avoid), so the medication must match
            // each option in order to get disabled.
            var selectedOptions = {}
            var medicationMatchingOptions = {}

            // Check each option for a match
            for (var option in preferencesSelected[preference]) {

              // Option is selected
              if (preferencesSelected[preference][option]) {
                selectedOptions[option] = true

                // Look for a matching key in the medication object
                if (medication[preference]) {

                  // Is it an array or an object?
                  if (typeof medication[preference] === 'object') {

                    // Array
                    if (Array.isArray(medication[preference])) {
                      var list = medication[preference]

                      // Check for our option in the list
                      for (var item in list) {
                        // Straight up list item?
                        if (typeof list[item] === 'string') {
                          if (list[item].toLowerCase() == option.toLowerCase()) {
                            medicationMatchingOptions[option] = true
                          }
                          else {
                            medicationMatchingOptions[list[item].toLowerCase()] = true
                          }
                        }
                        // Object? Look for a 'name' that we'll check against
                        else if (list[item].hasOwnProperty('name')) {
                          if (list[item].name.toLowerCase() == option.toLowerCase()) {
                            medicationMatchingOptions[option] = true
                          }
                          else {
                            medicationMatchingOptions[list[item].name.toLowerCase()] = true
                          }
                        }
                      }
                    }
                    // Object
                    else {
                      for (var item in Object.keys(medication[preference])) {
                        if (list[item].toLowerCase() == option.toLowerCase()) {
                          medicationMatchingOptions[option] = true
                        }
                        else {
                          medicationMatchingOptions[list[item].toLowerCase()] = true
                        }
                      }
                      // // Check for our option in the object
                      // if (medication[preference][optionKey]) {
                      //   medicationMatchingOptions[option] = true
                      // }
                    }
                  }
                }
              }
            }

            // Check if the drug should be disabled based on one of the options matching.
            if (Object.keys(selectedOptions).length > 0) {
              // Disabled options present in the drug? Disable it.
              for (var selected in selectedOptions) {
                for (var option in medicationMatchingOptions) {
                  if (medicationMatchingOptions[option] && selectedOptions[option]) {
                    medicationMatchingPreferences[preference] = true
                  }
                }
              }
              // Wait! Does the drug have other options that are NOT disabled? Don't disable it!
              for (var option in medicationMatchingOptions) {
                if (medicationMatchingOptions[option] && !selectedOptions[option]) {
                  medicationMatchingPreferences[preference] = false
                }
              }
            }
          }
        }
      }

      // 2. Check if the drug should be disabled.
      //
      if (Object.keys(preferencesSelected).length > 0) {
        var disableMedication = false

        // Disabled options present in the drug? Disable it.
        for (var selected in preferencesSelected) {
          for (var preference in medicationMatchingPreferences) {
            if (medicationMatchingPreferences[preference] && preferencesSelected[preference]) {
              disableMedication = true
            }
          }
        }
        // Wait! Does the drug have other preferences that are NOT disabled? Don't disable it!
        for (var preference in medicationMatchingPreferences) {
          if (medicationMatchingPreferences[preference] && !preferencesSelected[preference]) {
            disableMedication = false
          }
        }

        // Add the medication to disabledMedications.
        if (disableMedication) {
          disabledMedications[medication.name] = true
        }
        else {
          disabledMedications[medication.name] = false
        }
      }
    })

    this.setState({
      disabledMedications: disabledMedications,
      preferencesSelected: preferencesSelected
    })
  },

  getDataByMeasure: function (measures) {
    var data = this.state.data.data
    var dataByMeasure = _.indexBy(measures)

    // Measure e.g. 'acr_50'
    _.each(measures, function (measure) {
      dataByMeasure[measure] = {}
      dataByMeasure[measure]['data'] = []

      // Source (sheet in spreadsheet at https://docs.google.com/spreadsheets/d/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/edit#gid=302670246)
      _.each(data, function (source) {
        // Entry i.e. line of spreadsheet
        _.each(source, function (entry) {
          if (entry.measure === measure) {
            dataByMeasure[measure].data.push(entry)
          }
        })
      })
    })

    return dataByMeasure
  },

  getDataByTag: function (selectedTag) {
    var data = this.state.data.data
    var tags = this.state.data.tags
    var dataByTag = JSON.parse(JSON.stringify(tags))

    // Each tag (pain, function, etc.)
    Object.keys(tags).map(function (tag) {
      // Each source (sheet of data)
      Object.keys(data).map(function (source) {
        // Each entry in the source data (line of sheet)
        data[source].map(function (entry) {
          // Entry records an outcome in a measure that is associated with one of the tags?
          // e.g. tags['pain']['patient_pain'] or ['improvement']['acr_50']
          if (tags[tag][entry.measure]) {
            // Create a place for data about each measure
            dataByTag[tag][entry.measure] === true && (dataByTag[tag][entry.measure] = {})
            !dataByTag[tag][entry.measure]['data'] && (dataByTag[tag][entry.measure]['data'] = [])

            dataByTag[tag][entry.measure]['data'].push(entry)
          }
        })
      })
    })

    return dataByTag
  },

  handleMedicationClick: function (medicationName) {
    var disabledMedications = this.state.disabledMedications
    disabledMedications[medicationName] = !disabledMedications[medicationName]

    // User's prefs should be reset, since may no longer match
    var preferencesDefault = _.cloneDeep(this.state.preferencesDefault)

    this.setState({
      preferencesSelected: preferencesDefault,
      disabledMedications: disabledMedications
    })

    this.forceUpdate()
  },

  renderMedicationList: function (medications) {
  	var disabledMedications = this.state.disabledMedications
    var handleMedicationClick = this.handleMedicationClick
    var preferences = this.props.preferences
    var preferencesSelected = this.state.preferencesSelected

    if (medications) {
      return (
        <div className='medication-cards'>
          <ul>
            {Object.keys(medications).map(function (medication, i) {
            	var medication = medications[medication]
              return (
                <li key={i} className={(disabledMedications[medication.name] === true) && 'disabled'}>
                  <a
                    onClick={handleMedicationClick.bind(null, medication.name)}>
                      <MedicationCard
                        medication={medication}
                        mini={true}
                        preferences={preferences} preferencesSelected={preferencesSelected} />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      )
    }
  },

  renderMedicationCards: function () {
    var medications = this.props.medications
    var disabledMedications = this.state.disabledMedications
    var preferences = this.props.preferences
    var preferencesSelected = this.state.preferencesSelected

    return <div className='medication-cards'>
      <ul>
        {Object.keys(medications).map(function (medication, i) {
          var medication = medications[medication]
          return <li key={i} className={(disabledMedications[medication.name] === true) && 'disabled'}>
            <MedicationCard
              medication={medication}
              preferences={preferences} preferencesSelected={preferencesSelected} />
          </li>
        })}
      </ul>
    </div>
  },

  handleMeasureSelect: function (key) {
    this.setState({
      selectedMeasure: key
    })
  },

  renderMeasureBar: function (selectedTag, selectedMeasure) {
    var tags = this.state.data.tags
    var tagDescriptions = this.state.data.tagDescriptions
    var measures = this.state.data.measures

    if (selectedTag) {
      var tagMeasures = tags[selectedTag]
      return (
        <div>
          <Nav bsStyle="pills" activeKey={selectedMeasure && selectedMeasure} onSelect={this.handleMeasureSelect}>
            {Object.keys(tagMeasures).map(function (measure, i) {
              return (<NavItem key={i} eventKey={measure}>{measures[measure] ? measures[measure].name_friendly : measure}</NavItem>)
            })}
          </Nav>
        </div>
      )
    }
  },

  handleTagSelect: function (key) {
    this.setState({
      selectedTag: key,
      selectedMeasure: null
    })
  },

  renderTagBar: function (selectedTag) {
    var tags = this.state.data.tags
    var tagDescriptions = this.state.data.tagDescriptions

    if (tags && tagDescriptions) {
      return (
        <Nav className='tag-navigation large' bsStyle="pills" activeKey={selectedTag && selectedTag} onSelect={this.handleTagSelect}>
          {Object.keys(tags).map(function (tag, i) {
            return (<NavItem key={i} eventKey={tag}>{tagDescriptions[tag] ? tagDescriptions[tag].name_short : tag}</NavItem>)
          })}
        </Nav>
      )
    }
  },

  handleIssueSelect: function (key) {
    this.setState({
      selectedIssue: key
    })
  },

  renderIssueNavigationBar: function (selectedIssue) {
    var issues = this.props.issues;

    return <Nav className='tag-navigation' bsStyle="pills" activeKey={selectedIssue && selectedIssue} onSelect={this.handleIssueSelect}>
        {Object.keys(issues).map(function (issue, i) {
          return <NavItem key={i} eventKey={issue}>{issues[issue].name}</NavItem>
        })}
    </Nav>
  },

  renderTagDescription: function (selectedTag) {
    var tagDescriptions = this.state.data.tagDescriptions

    if (selectedTag && tagDescriptions) {
      return (
        <div className='panel'>
          <h2 className='tag-description'>
            <strong>{tagDescriptions[selectedTag] ? tagDescriptions[selectedTag].name_friendly : selectedTag}</strong>
            {tagDescriptions[selectedTag] && <p>{tagDescriptions[selectedTag].description}</p>}
          </h2>
        </div>
      )
    }
  },

  // Utility function to render data out as JSON
  renderDataToJSON: function (data) {
    return (
      <div>
        <div>grades: {JSON.stringify(data.grades)}</div>
        <hr />
        <div>measures: {JSON.stringify(data.measures)}</div>
        <hr />
        <div>metrics: {JSON.stringify(data.metrics)}</div>
        <hr />
        <div>tags: {JSON.stringify(data.tags)}</div>
        <hr />
        <div>tagDescriptions: {JSON.stringify(data.tagDescriptions)}</div>
        <hr />
        <div>data: {JSON.stringify(data.data)}</div>
      </div>
    )
  },

  renderDataByMeasure: function (measures) {
    var data = this.state.data
    var getDataByMeasure = this.getDataByMeasure
    var medications = this.props.medications
    var disabledMedications = this.state.disabledMedications

    var html = []

    _.each(measures, function (measureName, i) {
      if (measureName == 'patient_pain') {
        html.push(<div key={measureName + i}>
          <OutcomeRelativeDifferences
            data={data}
            dataFiltered={getDataByMeasure([measureName])[measureName].data}
            medications={medications}
            disabledMedications={disabledMedications}
            measure={measureName}
            medicationsMap={medicationsMap} />
        </div>)
      }
      if (measureName == 'discontinued_ae') {
        html.push(<div key={measureName + i}>
          <OutcomeRelativeComparison
            data={data}
            dataFiltered={getDataByMeasure([measureName])[measureName].data}
            medications={medications}
            disabledMedications={disabledMedications}
            measure={measureName}
            medicationsMap={medicationsMap} />
        </div>)
      }
      if (measureName == 'ae') {
        console.log(measureName, i)
        html.push(<div key={measureName + i}>
          <OutcomeAdverseEvents
            data={data}
            dataFiltered={getDataByMeasure([measureName])[measureName].data}
            medications={medications}
            disabledMedications={disabledMedications}
            measure={measureName} />
        </div>)
      }
      html.push(<div key={measureName + i}>
        <OutcomeTimeline
          data={data}
          dataFiltered={getDataByMeasure([measureName])[measureName].data}
          disabledMedications={disabledMedications}
          measure={measureName}
          medications={medications}
          medicationsMap={medicationsMap} />
      </div>)
    })

    return html
  },

  renderMeasure: function (selectedTag, selectedMeasure) {
    var medications = this.props.medications
    var data = this.state.data
    var disabledMedications = this.state.disabledMedications

    if (selectedMeasure == 'patient_pain') {
      return (
        <OutcomeRelativeDifferences
          data={data}
          dataByTag={this.getDataByTag(selectedTag)}
          medications={medications}
          disabledMedications={disabledMedications}
          selectedTag={selectedTag}
          selectedMeasure={selectedMeasure} />
      )
    }
    if (selectedMeasure == 'discontinued_ae') {
      return (
        <OutcomeRelativeComparison
          data={data}
          dataByTag={this.getDataByTag(selectedTag)}
          medications={medications}
          disabledMedications={disabledMedications}
          selectedTag={selectedTag}
          selectedMeasure={selectedMeasure} />
      )
    }
    if (selectedMeasure == 'ae') {
      return (
        <OutcomeAdverseEvents
          data={data}
          dataByTag={this.getDataByTag(selectedTag)}
          medications={medications}
          disabledMedications={disabledMedications}
          selectedTag={selectedTag}
          selectedMeasure={selectedMeasure} />
      )
    }
    return(
      <OutcomeTimeline
        data={data}
        medications={medications}
        disabledMedications={disabledMedications}
        selectedTag={selectedTag}
        selectedMeasure={selectedMeasure} />
    )
  },

  handleShortcutClick: function (tag, measure) {
    this.setState({
      selectedTag: tag,
      selectedMeasure: measure,
    })
  },

  renderDetails: function (selectedIssue) {
    var issues = this.props.issues;
    var measures = issues[selectedIssue] && issues[selectedIssue].measures

    if (selectedIssue == 'basic') {
      return <div>
        {this.renderMedicationCards()}
      </div>
    }
    return <div>
      {this.renderDataByMeasure(measures)}
    </div>
  },

  // Is all the necessary data available?
  hasData: function (data) {
    if (data != {} &&
        data['grades'] &&
        data['metrics'] &&
        data['measures'] &&
        data['tags'] &&
        data['tagDescriptions'] &&
        data['data'] != {}) {
      return true
    }
  },

  handleShowDataClick: function(userReadyToViewData) {
    this.setState({
      userReadyToViewData: true
    })
  },

  render: function () {

    var navigatorClasses = cx({
      'navigator': true,
      'dev row': this.state.dev,
      'mobile': this.state.mobile,
      'no-scroll': this.state.mobile && this.state.menuOpen
    })
    var drugPickerClasses = cx({
      'drug-picker': true,
      'col-md-2 col-lg-1': this.state.dev,
      'open': this.state.menuOpen == true,
      'closed': this.state.menuOpen == false
    })
    var medicationListClasses = cx({
      'medication-list': true,
      'col-md-2 col-lg-1': this.state.dev
    })
    var detailsClasses = cx({
      'details': true,
      'col-md-9 col-lg-10': this.state.dev,
      'closed': this.state.menuOpen == true,
      'open': this.state.menuOpen == false
    })

    var medications         = this.props.medications
    var preferences         = this.props.preferences
    var disabledMedications = this.state.disabledMedications
    var data                = this.state.data
    var selectedMeasure     = this.state.selectedMeasure
    var selectedTag         = this.state.selectedTag

    // Necessary data available
    if (this.hasData(data)) {
      // return (
      //   <div className='container-fluid'>
      //     <div className={navigatorClasses}>
      //       {this.renderDataToJSON(data)}
      //     </div>
      //   </div>
      // )

      // Dev mode
      if (this.state.dev) {
        return (
          <div className='container-fluid'>
            <div className={navigatorClasses}>
            	<section className={drugPickerClasses}>
            		{this.renderPreferenceControls(preferences)}
            	</section>

              <section className={medicationListClasses}>
                {this.renderMedicationList(medications)}
              </section>

              <section className={detailsClasses}>
                <h3 className='brief-header'>
                  Look at evidence about the selected medications, in various categories.<br />
                  e.g.&nbsp
                  <a onClick={this.handleShortcutClick.bind(null, 'improvement', 'acr_50')}>ACR50 from multiple sources</a> - <a onClick={this.handleShortcutClick.bind(null, 'adverse event', 'discontinued_ae')}>Withdrawl due to AE (RR comparison)</a> - <a onClick={this.handleShortcutClick.bind(null, 'adverse event', 'ae')}>Side effects (etanercept only)</a>
                </h3>

                {this.renderTagBar(selectedTag)}
                {this.renderTagDescription(selectedTag)}
                {this.renderMeasureBar(selectedTag, selectedMeasure)}
                {this.renderMeasure(selectedTag, selectedMeasure)}

                <section>
                  See the individual data items in <a href='https://docs.google.com/spreadsheets/d/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/' target='_top'>this Google Spreadsheet</a>
                </section>
             	</section>
            </div>
          </div>
        )
      }

      // Old-style full-screen mode
      if (this.state.full) {
        var selectedPreferenceItems = []
        _.each(this.state.preferencesSelected, function(value, key) {
          value == true && selectedPreferenceItems.push(key)
        })

        return (
          <div className='navigator-old'>
            <section className='full-screen intro' ref='intro'>
              <div className='spread'>
                <div>
                  <h1>This app shows you findings from medical research about rheumatoid arthritis treatments.</h1>
                  <h2>They work differently for different people, are taken on different schedules, and vary in cost and side effects.</h2>
                  <ScrollTo to='controls' onClick={this.scrollSmoothlyToElement} />
                </div>
              </div>
            </section>

            <section className='full-screen controls' ref='controls'>
              <div className='spread'>
                <div>
                  <h1>A lot of medications treat RA, but only some might match your needs.</h1>
                  <h2>Choose a few preferences, and move on to see medications that work out.</h2>
                  {this.renderPreferenceControls(preferences)}
                  <ScrollTo to='medications' onClick={this.scrollSmoothlyToElement} />
                </div>
              </div>
            </section>

            <section className='full-screen medications' ref='medications'>
              <div className='spread'>
                <div>
                  <h1>These medications match your needs and preferences</h1>
                  <section className={medicationListClasses}>
                    {this.renderMedicationList(medications)}
                  </section>
                  <ScrollTo to='results' onClick={this.scrollSmoothlyToElement} />
                </div>
              </div>
            </section>

            <section className='full-screen results' ref='results'>
              <div className='spread'>
                <div>
                  <section className={detailsClasses}>
                    {this.renderTagBar(selectedTag)}
                    {/*this.renderTagDescription(selectedTag)*/}
                    {this.renderMeasureBar(selectedTag, selectedMeasure)}
                    {this.renderMeasure(selectedTag, selectedMeasure)}
                  </section>
                </div>
              </div>
            </section>

            <div className='sticky-holder' ref='stickyHolder'>
              <Sticky
                ref='stickyFilterControls'
                className='sticky-filter-controls'
                onStickyStateChange={this.handleStickyStateChange}
                stickyClass='stuck'
                stickyStyle={{position: 'relative'}}
                topOffset={this.state.offsets['medications']}>
                  {this.renderPreferenceControls(preferences)}
              </Sticky>
              <Sticky
                ref='stickyMedications'
                className='sticky-medications'
                onStickyStateChange={this.handleStickyStateChange}
                stickyClass='stuck'
                stickyStyle={{position: 'relative'}}
                topOffset={this.state.offsets['results']}>
                  {this.renderMedicationList(medications)}
              </Sticky>
            </div>
          </div>
        )
      }

      var viewData = this.state.userReadyToViewData
      var sidebarClasses = cx({
        'sidebar': true,
        'compact': viewData,
        'open': !viewData
      })
      var detailsClasses = cx({
        'details': true,
        'compact': !viewData,
        'open': viewData
      })

      // Working navigator
      return (
        <div className='navigator'>
          <div className={sidebarClasses}>
            <h1>
              Rheumatoid arthritis<br />
              <span className='color-link'>medication navigator</span>

            </h1>
            
            {!viewData &&
              <p>
                <button
                  className='btn'
                  onClick={this.handleShowDataClick.bind(null)}>
                    Show me the data ›
                </button>
              </p>
            }
            
            {this.renderPreferenceControls(preferences)}
            {this.renderMedicationList(medications)}
            
            {!viewData &&
              <p>
                <button
                  className='btn'
                  onClick={this.handleShowDataClick.bind(null)}>
                    Show me the data ›
                </button>
              </p>
            }

            <p><small>This prototype is based on the <a href='http://www.ncbi.nlm.nih.gov/pubmed/25649726' target='_new'>RA Choice decision aid</a> by Barton, et al. and employs dozens of other data sources.</small></p>
          </div>
          <div className={detailsClasses}>
            {this.renderIssueNavigationBar(this.state.selectedIssue)}
            {this.renderDetails(this.state.selectedIssue)}
          </div>
        </div>
      )
    }


    // No data — loading screen
    return (
      <div className='navigator'>
        <section className='full-screen' ref='intro'>
          <div className='spread'>
            <div>
              <h1>Loading</h1>
            </div>
          </div>
        </section>
      </div>
    )
  }

})

module.exports = Navigator