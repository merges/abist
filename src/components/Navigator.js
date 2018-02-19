import _ from 'lodash'
import cx from 'classnames'
import React from 'react'
import Sticky from 'react-sticky'
import { Nav, NavItem } from 'react-bootstrap'

import withEvidenceData from './withEvidenceData'

import * as Evidence from '../api/Evidence'
import AbsoluteFrequency from './visualizations/AbsoluteFrequency'
import Difference from './visualizations/Difference'
import GradeQuality from './visualizations/GradeQuality'
import Intervention from './visualizations/Intervention'
import MedicationCard from './MedicationCard'
import Medications from '../data/Medications'
import MockData from '../data/MockData'
import OutcomeAdverseEvents from './OutcomeAdverseEvents'
import OutcomeRelativeComparison from './OutcomeRelativeComparison'
import OutcomeRelativeDifferences from './OutcomeRelativeDifferences'
import OutcomeTimeline from './OutcomeTimeline'
import Population from './visualizations/Population'
import Preferences from '../data/Preferences'
import RelativeRiskComparison from './visualizations/RelativeRiskComparison'
import RiskRelativeToBaseline from './visualizations/RiskRelativeToBaseline'
import Source from './visualizations/Source'

Object.assign(String.prototype, {
  capitalizeFirstletter () {
    return this.charAt(0).toUpperCase() + this.slice(1)
  }
})

class Navigator extends React.Component {
  constructor (props) {
    super(props)

    const getDisabledMedications = (medications: Array<Object>) => {
      let disabled = {}
      medications.forEach(medication => {
        disabled[medication.name_generic] = false
      })
      return disabled
    }

    this.state = {
      disabledMedications: getDisabledMedications(props.medications),
      menuOpen: false,
      userPreferencesDefault: _.cloneDeep(props.userPreferences),
      userPreferencesSelected: _.cloneDeep(props.userPreferences),
      selectedIssue: 'improvement',
      selectedMeasure: props.offline && 'acr_50',
      selectedTag: props.offline && 'improvement',
      showData: false,
    }
  }

  handleStickyStateChange = () => {
    this.setStickyHeaderOffsets()
  }

  setStickyHeaderOffsets = () => {
    let stickyHolderHeight = this.refs['stickyHolder'].getDOMNode().offsetHeight
    let offsets = {
      medications: this.getOffsetTop('medications') - stickyHolderHeight,
      results: this.getOffsetTop('results') - stickyHolderHeight
    }
    this.setState({
      offsets: offsets
    })
  }

  // setStickyHolderHeight: () {
  //   let heights = {
  //     filterControls: this.refs['stickyFilterControls'].getDOMNode().offsetHeight,
  //     medications: this.refs['stickyMedications'].getDOMNode().offsetHeight
  //   }

  //   if (heights.filterControls > 0 || heights.medications > 0) {
  //     let stickyHolderHeight = this.refs['stickyHolder'].getDOMNode().offsetHeight
  //     console.log('stickyHolderHeight', stickyHolderHeight)
  //     this.setState({
  //       stickyHolderHeight: stickyHolderHeight
  //     })
  //   }
  // },

  // getOffsetTopPlusStickyHeader: (ref) {
  //   return this.getOffsetTop() + this.state.stickyHolderHeight
  // },

  // getOffsetTop = (ref) => {
  //   if (this.refs[ref]) {
  //     let element = this.refs[ref].getDOMNode()
  //     return Math.ceil($(element).offset().top)
  //   }
  //   return 99999
  // }

  scrollSmoothlyToElement = (ref) => {
    let stickyHolderHeight = this.refs['stickyHolder'].getDOMNode().offsetHeight
    let newScrollTop = this.getOffsetTop(ref) - stickyHolderHeight
    $('html, body').animate({
      scrollTop: newScrollTop
    }, 450)
  }

  handleDrugFilterClick = (key, selectedValue) => {
    let userPreferencesSelected = this.state.druguserPreferencesSelected
    if (selectedValue) {
      Object.keys(userPreferencesSelected[key]).forEach(pref => {
        userPreferencesSelected[key][pref] = false
      })
      userPreferencesSelected[key][selectedValue] = true
    }
    else {
      userPreferencesSelected[key] = !userPreferencesSelected[key]
    }
    this.setState({
      userHasFiltered: true,
      userPreferencesSelected: userPreferencesSelected
    })
  }

  filterDrugs = (medications, userPreferencesSelected) => {
    let disabledDrugs = {}

    medications.forEach((drug, i) => {
      let medicationFeatures = {}

      // 1. Examine all the preferences for a match
      for (let preference in userPreferencesSelected) {
        if (userPreferencesSelected[preference] && userPreferencesSelected[preference] != null) {
          let filter = drugFilters[preference]
          let options = userPreferencesSelected[preference]
          medicationFeatures[preference] = filter.isMatch(drug, options)
        }
      }

      // 2. Check if the drug should be disabled
      let keepMedication = true
      for (let preference in userPreferencesSelected) {
        if (userPreferencesSelected[preference] != null) {
          for (let feature in medicationFeatures) {
            if (userPreferencesSelected[preference] && !medicationFeatures[preference]) {
              keepMedication = false
            }
          }
        }
      }
      disabledMedications[medication.name_generic] = !keepMedication
    })

    return disabledMedications
  }

  togglePreferenceControls = (direction) => {
    // let isOpen = this.state.menuOpen
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
  }

  togglePreferenceControlsOpen = () => {
    this.setState({
      menuOpen: true
    })
  }

  togglePreferenceControlsClose = () => {
    this.setState({
      menuOpen: false
    })
  }

  renderPreferenceControls = (preferences) => {
    let filterPreference = this.filterPreference
    let toggleOpen = this.togglePreferenceControlsOpen
    let toggleClose = this.togglePreferenceControlsClose
    // let preferences = this.props.preferences
    let userPreferencesSelected = this.state.userPreferencesSelected

    return (
      <div className='filter-controls'>
          {Object.keys(preferences).map((key, i) => {
            let preference = preferences[key]
            if (preference.type == 'boolean') {
              return (
                <div key={i} className='checkbox'>
                  <label>
                    <input type='checkbox'
                      key={key}
                      value={key}
                      checked={userPreferencesSelected[key]}
                      onChange={filterPreference.bind(null, key, false)} />
                        {preference.name}
                  </label>
                </div>
              )
            }
            // List preferences become a list
            else if (preference.type == 'list') {
              // Get the possible options for this preference from this.state.userPreferencesSelected.
              // There is a function in getInitialState() that iterates through the provided medications,
              // collecting the "options" they provide for vis à vis this preference.
              let options = Object.keys(userPreferencesSelected[key])

              return (
                <section key={key}>
                  <div className='pad-t-2 pad-b-2'>
                    {options.map((option, i) => {
                      let optionClasses = cx({
                        'active': !userPreferencesSelected[key][option]
                      })
                      return (
                        <div key={i} className='checkbox'>
                          <label>
                            <input type='checkbox'
                              key={option}
                              value={option}
                              checked={!userPreferencesSelected[key][option]}
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
  }

  filterPreference = (preferenceKey, optionKey, event) => {
    if (this.state.menuOpen) {
      event.stopPropagation()
    }

    let disabledMedications = {}
    let medications = this.props.medications
    let preferences = this.props.preferences
    let userPreferencesSelected = this.state.userPreferencesSelected

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
      userPreferencesSelected[preferenceKey][optionKey] = !userPreferencesSelected[preferenceKey][optionKey]
    }
    else {
      userPreferencesSelected[preferenceKey] = !userPreferencesSelected[preferenceKey]
    }

    // Check each medication against the selected preferences and options,
    // disabling any that doesn't satisfy.
    //
    medications.forEach((medication, i) => {
      let medicationMatchingPreferences = {}

      // 1. Examine all the preferences for a match.
      //
      for (let preference in userPreferencesSelected) {
        if (userPreferencesSelected[preference]) {

          // a. Simple boolean preference
          if (typeof userPreferencesSelected[preference] === 'boolean') {

            // Look for a matching key in the medication object
            // Boolean? e.g. 'generic_available' -- inverse match
            if (medication[preference] == false) {
              medicationMatchingPreferences[preference] = true
              // disabledMedications[medication.name_generic] = true
            }
            // Not a key in medication object, so check ptda.risks
            else {
              // Look for key in right place
              if (preferences[preference] && preferences[preference].isMatch) {
                let isMatch = preferences[preference].isMatch
                let lookupKey = preferences[preference].key
                let result = _.get(medication, lookupKey)
                let match = isMatch(_.get(medication, lookupKey))

                if (match == 'unsafe') {
                  medicationMatchingPreferences[preference] = true
                }
              }
            }
          }

          // b. List preference
          else if (typeof userPreferencesSelected[preference] === 'object') {

            // The user chose one or more options (to avoid), so the medication must match
            // each option in order to get disabled.
            let selectedOptions = {}
            let medicationMatchingOptions = {}

            // Check each option for a match
            for (let option in userPreferencesSelected[preference]) {

              // Option is selected
              if (userPreferencesSelected[preference][option]) {
                selectedOptions[option] = true

                // Look for a matching key in the medication object
                if (medication[preference]) {

                  // Is it an array or an object?
                  if (typeof medication[preference] === 'object') {

                    // Array
                    if (Array.isArray(medication[preference])) {
                      let list = medication[preference]

                      // Check for our option in the list
                      for (let item in list) {
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
                      for (let item in Object.keys(medication[preference])) {
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
              for (let selected in selectedOptions) {
                for (let option in medicationMatchingOptions) {
                  if (medicationMatchingOptions[option] && selectedOptions[option]) {
                    medicationMatchingPreferences[preference] = true
                  }
                }
              }
              // Wait! Does the drug have other options that are NOT disabled? Don't disable it!
              for (let option in medicationMatchingOptions) {
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
      if (Object.keys(userPreferencesSelected).length > 0) {
        let disableMedication = false

        // Disabled options present in the drug? Disable it.
        for (let selected in userPreferencesSelected) {
          for (let preference in medicationMatchingPreferences) {
            if (medicationMatchingPreferences[preference] && userPreferencesSelected[preference]) {
              disableMedication = true
            }
          }
        }
        // Wait! Does the drug have other preferences that are NOT disabled? Don't disable it!
        for (let preference in medicationMatchingPreferences) {
          if (medicationMatchingPreferences[preference] && !userPreferencesSelected[preference]) {
            disableMedication = false
          }
        }

        // Add the medication to disabledMedications.
        if (disableMedication) {
          disabledMedications[medication.name_generic] = true
        }
        else {
          disabledMedications[medication.name_generic] = false
        }
      }
    })

    this.setState({
      disabledMedications: disabledMedications,
      userPreferencesSelected: userPreferencesSelected
    })
  }

  getDataByMeasure = (measures) => {
    let data = this.props.data.data
    let dataByMeasure = _.groupBy(measures)

    // Measure e.g. 'acr_50'
    _.each(measures, measure => {
      dataByMeasure[measure] = {}
      dataByMeasure[measure]['data'] = []

      // Source (sheet in spreadsheet at https://docs.google.com/spreadsheets/d/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/edit#gid=302670246)
      _.each(data, source => {
        // Entry i.e. line of spreadsheet
        _.each(source, entry => {
          if (entry.measure === measure) {
            dataByMeasure[measure].data.push(entry)
          }
        })
      })
    })

    return dataByMeasure
  }

  getDataByTag = (selectedTag) => {
    let data = this.props.data.data
    let tags = this.props.data.tags
    let dataByTag = JSON.parse(JSON.stringify(tags))

    // Each tag (pain, function, etc.)
    Object.keys(tags).map(tag => {
      // Each source (sheet of data)
      Object.keys(data).map(source => {
        // Each entry in the source data (line of sheet)
        data[source].map(entry => {
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
  }

  handleMedicationClick = (medicationName) => {
    let disabledMedications = this.state.disabledMedications
    disabledMedications[medicationName] = !disabledMedications[medicationName]

    // User's prefs should be reset, since may no longer match
    let userPreferencesDefault = _.cloneDeep(this.state.userPreferencesDefault)

    this.setState({
      userPreferencesSelected: userPreferencesDefault,
      disabledMedications: disabledMedications
    })

    this.forceUpdate()
  }

  renderMedicationList = (medications) => {
  	let disabledMedications = this.state.disabledMedications
    let handleMedicationClick = this.handleMedicationClick
    let preferences = this.props.preferences
    let userPreferencesSelected = this.state.userPreferencesSelected

    if (medications) {
      return (
        <div className='medication-cards'>
          <ul>
            {Object.keys(medications).map((med, i) => {
            	let medication = medications[med]
              return (
                <li key={i} className={(disabledMedications[medication.name_generic] === true) && 'disabled'}>
                  <a
                    onClick={handleMedicationClick.bind(null, medication.name_generic)}>
                      <MedicationCard
                        medication={medication}
                        mini={true}
                        preferences={preferences} userPreferencesSelected={userPreferencesSelected} />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      )
    }
  }

  renderMedicationCards = () => {
    let medications = this.props.medications
    let disabledMedications = this.state.disabledMedications
    let preferences = this.props.preferences
    let userPreferencesSelected = this.state.userPreferencesSelected

    return <div className='medication-cards'>
      <ul>
        {Object.keys(medications).map((med, i) => {
          let medication = medications[med]
          return <li key={i} className={(disabledMedications[medication.name_generic] === true) && 'disabled'}>
            <MedicationCard
              medication={medication}
              preferences={preferences} userPreferencesSelected={userPreferencesSelected} />
          </li>
        })}
      </ul>
    </div>
  }

  handleMeasureSelect = (key) => {
    this.setState({
      selectedMeasure: key
    })
  }

  renderMeasureBar = (selectedTag, selectedMeasure) => {
    let tags = this.props.data.tags
    let tagDescriptions = this.state.data.tagDescriptions
    let measures = this.state.data.measures

    if (selectedTag) {
      let tagMeasures = tags[selectedTag]
      return (
        <div>
          <Nav bsStyle="pills" activeKey={selectedMeasure && selectedMeasure} onSelect={this.handleMeasureSelect}>
            {Object.keys(tagMeasures).map((measure, i) => {
              return (<NavItem key={i} eventKey={measure}>{measures[measure] ? measures[measure].name_friendly : measure}</NavItem>)
            })}
          </Nav>
        </div>
      )
    }
  }

  handleTagSelect = (key) => {
    this.setState({
      selectedTag: key,
      selectedMeasure: null
    })
  }

  renderTagBar = (selectedTag) => {
    let tags = this.props.data.tags
    let tagDescriptions = this.state.data.tagDescriptions

    if (tags && tagDescriptions) {
      return (
        <Nav className='tag-navigation large' bsStyle="pills" activeKey={selectedTag && selectedTag} onSelect={this.handleTagSelect}>
          {Object.keys(tags).map((tag, i) => {
            return (<NavItem key={i} eventKey={tag}>{tagDescriptions[tag] ? tagDescriptions[tag].name_short : tag}</NavItem>)
          })}
        </Nav>
      )
    }
  }

  handleIssueSelect = (key) => {
    this.setState({
      selectedIssue: key
    })
  }

  renderIssueNavigationBar = (selectedIssue) => {
    let issues = this.props.issues;
    return <Nav className='tag-navigation' bsStyle="pills" activeKey={selectedIssue && selectedIssue} onSelect={this.handleIssueSelect}>
        {Object.keys(issues).map((issue, i) => {
          return <NavItem key={i} eventKey={issue}>{issues[issue].name}</NavItem>
        })}
    </Nav>
  }

  renderTagDescription = (selectedTag) => {
    let tagDescriptions = this.state.data.tagDescriptions

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
  }

  // Utility function to render data out as JSON
  renderDataToJSON = (data) => {
    return (
      <div>
        <pre>grades: {JSON.stringify(data.grades, null, 2)}</pre>
        <hr />
        <pre>measures: {JSON.stringify(data.measures, null, 2)}</pre>
        <hr />
        <pre>metrics: {JSON.stringify(data.metrics, null, 2)}</pre>
        <hr />
        <pre>tags: {JSON.stringify(data.tags, null, 2)}</pre>
        <hr />
        <pre>tagDescriptions: {JSON.stringify(data.tagDescriptions, null, 2)}</pre>
        <hr />
        <pre>data: {JSON.stringify(data.data, null, 2)}</pre>
      </div>
    )
  }

  renderDataByMeasure = (measures) => {
    const {
      data,
      medications,
      medicationsMap,
    } = this.props
    const { disabledMedications } = this.state

    let html = []
    _.each(measures, (measureName, i) => {
      if (measureName == 'patient_pain') {
        html.push(<div className='evidence-panel' key={measureName + i}>
          <OutcomeRelativeDifferences
            data={data}
            dataFiltered={this.getDataByMeasure([measureName])[measureName].data}
            medications={medications}
            disabledMedications={disabledMedications}
            measure={measureName}
            medicationsMap={medicationsMap} />
        </div>)
      }
      if (measureName == 'ae') {
        html.push(<div className='evidence-panel' key={measureName + i}>
          <OutcomeAdverseEvents
            data={data}
            dataFiltered={this.getDataByMeasure([measureName])[measureName].data}
            medications={medications}
            disabledMedications={disabledMedications}
            measure={measureName}
            medicationsMap={medicationsMap} />
        </div>)
      }
      if (measureName == 'discontinued_ae') {
        html.push(<div className='evidence-panel' key={measureName + i}>
          <OutcomeRelativeComparison
            data={data}
            dataFiltered={this.getDataByMeasure([measureName])[measureName].data}
            medications={medications}
            disabledMedications={disabledMedications}
            measure={measureName}
            medicationsMap={medicationsMap} />
        </div>)
      }
      html.push(<div className='evidence-panel' key={measureName + i}>
        <OutcomeTimeline
          data={data}
          dataFiltered={this.getDataByMeasure([measureName])[measureName].data}
          disabledMedications={disabledMedications}
          measure={measureName}
          medications={medications}
          medicationsMap={medicationsMap} />
      </div>)
    })

    return html
  }

  handleShortcutClick = (tag, measure) => {
    this.setState({
      selectedTag: tag,
      selectedMeasure: measure,
    })
  }

  renderDetails = (selectedIssue) => {
    let issues = this.props.issues;
    let measures = issues[selectedIssue] && issues[selectedIssue].measures

    if (selectedIssue == 'basic') {
      return <div key='basic'>
        <div className='explanatory'>
          <h1>What are these medications?</h1>
          <p>These are basic facts and lifestyle considerations about each medication. If a medication doesn’t fit the options you choose on the left, it will be dimmed here.</p>
        </div>
        {this.renderMedicationCards()}
      </div>
    }
    if (selectedIssue == 'improvement') {
      return <div key='improvement'>
        <div className='explanatory'>
          <h1>How well do these medications <strong>work?</strong></h1>
          <p>It turns out that’s a tough question. There are dozens of ways to ask how much someone with RA has improved by taking a medication—from just asking,to lab tests, to X-rays.</p>
          <p>One way is to have a doctor count tender and swollen joints, and ask people about their pain or overall assessment. If there’s 50% improvement, that is generally considered good progress.</p>
        </div>
        {this.renderDataByMeasure(measures)}
      </div>
    }
    if (selectedIssue == 'pain') {
      return <div key='pain'>
        <div className='explanatory'>
          <h1>How well do these medications <strong>lessen pain?</strong></h1>
          <p>This is hard to answer, partly because these medications aren’t pain relievers themselves. They slow down RA, which can help reduce pain.</p>
          <p>Reducing pain by 1 box is considered the minimum amount most people can feel.</p>
        </div>
        {this.renderDataByMeasure(measures)}
      </div>
    }
    if (selectedIssue == 'work') {
      return <div key='work'>
        <h2>Text about work</h2>
        {this.renderDataByMeasure(measures)}
      </div>
    }
    if (selectedIssue == 'side_effects') {
      return <div key='side_effects'>
        <div className='explanatory'>
          <h1>What are common <strong>side effects?</strong></h1>
          <p>Avoiding side effects is important to most people taking RA medications. Some are common, and if you know about them you can be prepared for them.</p>
          <p>For some medications, there isn’t any good information about how common certain side effects are. That doesn’t mean they can’t happen. It just means that good data hasn’t been published.</p>
        </div>
        <div>
          
          {this.renderDataByMeasure(measures)}
          <div className='explanatory'>
            <h1>What are these medications?</h1>
            <p>These are basic facts and lifestyle considerations about each medication. If a medication doesn’t fit the options you choose on the left, it will be dimmed here.</p>
          </div>
        </div>
      </div>
    }
    return (
      <div>
        {this.renderDataByMeasure(measures)}
      </div>
    )
  }

  handleShowDataClick = (showData) => {
    this.setState({ showData: true })
  }

  render () {
    const {
      data,
      dev,
      full,
      history,
      issues,
      location,
      match,
      medications,
      mobile,
      offline,
      preferences,
    } = this.props
    const {
      disabledMedications,
      menuOpen,
      userPreferencesDefault,
      userPreferencesSelected,
      selectedIssue,
      selectedMeasure,
      selectedTag,
      showData,
    } = this.state

    let navigatorClasses = cx({
      'navigator': true,
      'dev row': dev,
      'mobile': mobile,
      'no-scroll': mobile && menuOpen
    })
    let drugPickerClasses = cx({
      'drug-picker': true,
      'col-md-2 col-lg-1': dev,
      'open': menuOpen == true,
      'closed': menuOpen == false
    })
    let medicationListClasses = cx({
      'medication-list': true,
      'col-md-2 col-lg-1': dev
    })
    let detailsClasses = cx({
      'details': true,
      'col-md-9 col-lg-10': dev,
      'closed': menuOpen == true,
      'open': menuOpen == false
    })

    // if (!this.readyToRender()) {
    //   return (
    //     <div className='navigator'>
    //       <section className='full-screen' ref='intro'>
    //         <div className='spread'>
    //           <div>
    //             <h1>Loading</h1>
    //           </div>
    //         </div>
    //       </section>
    //     </div>
    //   )
    // }

    // Dev mode
    if (dev) {
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
                Look at evidence about the selected medications, in letious categories.<br />
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
    if (full) {
      let selectedPreferenceItems = []
      _.each(userPreferencesSelected, (value, key) => {
        value == true && selectedPreferenceItems.push(key)
      })

      return (
        <div className='navigator-old'>
          <section className='full-screen intro' ref='intro'>
            <div className='spread'>
              <div>
                <h1>This app shows you findings from medical research about rheumatoid arthritis treatments.</h1>
                <h2>They work differently for different people, are taken on different schedules, and lety in cost and side effects.</h2>
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
              topOffset={offsets['medications']}>
                {this.renderPreferenceControls(preferences)}
            </Sticky>
            <Sticky
              ref='stickyMedications'
              className='sticky-medications'
              onStickyStateChange={this.handleStickyStateChange}
              stickyClass='stuck'
              stickyStyle={{position: 'relative'}}
              topOffset={offsets['results']}>
                {this.renderMedicationList(medications)}
            </Sticky>
          </div>
        </div>
      )
    }

    let sidebarClasses = cx({
      'sidebar': true,
      'compact': showData,
      'open': !showData
    })
    // let detailsClasses = cx({
    //   'details': true,
    //   'compact': !showData,
    //   'open': showData
    // })

    // Working navigator
    return (
      <div className='navigator'>
        <div className={sidebarClasses}>
          <h1>
            Rheumatoid arthritis<br />
            <span className='color-link'>medication navigator</span>
          </h1>
          
          {!showData &&
            <p className='pad-t-2 pad-b-2'>
              <button
                className='btn'
                onClick={this.handleShowDataClick.bind(null)}>
                  Show me the data ›
              </button>
            </p>
          }
          
          {this.renderPreferenceControls(preferences)}
          {this.renderMedicationList(medications)}
          
          {!showData &&
            <p className='pad-t-2 pad-b-2'>
              <button
                className='btn'
                onClick={this.handleShowDataClick.bind(null)}>
                  Show me the data ›
              </button>
            </p>
          }

          <p className='pad-t-2'><small>This prototype is based on the <a href='http://www.ncbi.nlm.nih.gov/pubmed/25649726' target='_new'>RA Choice decision aid</a> by Barton, et al. and shows <a href='https://docs.google.com/spreadsheets/d/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/edit#gid=302670246' target='_new'>data from dozens of sources.</a></small></p>
        </div>
        <div className={detailsClasses}>
          {this.renderIssueNavigationBar(selectedIssue)}
          {this.renderDetails(selectedIssue)}
        </div>
      </div>
    )
  }
}

export default withEvidenceData(Navigator)