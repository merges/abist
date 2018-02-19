import _ from 'lodash'
import React from 'react'

import * as Evidence from '../api/Evidence'
import Medications from '../data/Medications'
import MockData from '../data/MockData'
import Preferences from '../data/Preferences'

const Issues = {
	basic: {
	  name: 'basic Issues',
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
	  measures: ['ae', 'discontinued_ae']
	},
}

const MedicationsMap = _.groupBy(Medications, 'name_generic')
MedicationsMap['dmard'] = [{
  name: 'another dmard',
  name_generic: 'another RA drug',
  name_common: 'like methotrexate'
}]

const getDosageForms = (medications: Array<Object>) => {
  let dosageForms = {}
  medications.map(medication => {
    if (medication.forms) {
      medication.forms.forEach(form => {
        dosageForms[form.name] = false
      })
    }
  })
  return dosageForms
}

const getClasses = (medications: Array<Object>) => {
  let classes = {}
  medications.map(medication => {
    if (medication.class) {
      medication.class.forEach(name => {
        classes[name] = false
      })
    }
  })
  return classes
}

const userPreferences = {
  alcohol: false,
  cancer_treatment: false,
  class: getClasses(Medications),
  cost: null,
  forms: getDosageForms(Medications),
  generic_available: false,
  heart_failure: false,
  kidney_disease: false,
  liver_disease: false,
  pregnancy: false,
  tb: false
}

function withEvidenceData (WrappedComponent) {
	return class extends React.Component {
		constructor (props) {
	    super(props)

	    this.state = {
	      data: {},
	      dev: false,
	      full: false,
	      mobile: false,
	      offline: true,
	      userPreferences,
	    }
	  }

	  componentDidMount () {
	    if (this.state.offline) {
	      this.setState({ data: MockData })
	    }
	    // else {
	    //   this.getData()
	    //   .done((data) {
	    //     if (instance.isMounted) {
	    //       instance.setState({data: data})
	    //       if (data.tags['improvement'] && data.measures['acr_50'] && data.grades && data.data != {}) {
	    //         instance.setState({
	    //           selectedMeasure: 'acr_50',
	    //           selectedTag: 'improvement',
	    //           // selectedMeasure: 'ae',
	    //           // selectedTag: 'adverse event'
	    //         })
	    //       }
	    //     }
	    //   })
	    // }
	  }

	  getData = async () => {
	    console.log('HOC getData')

	    let urlTagDescriptions = Evidence.getSheetUrl(Sheets.tagDescriptions)
	    let urlMeasures = Evidence.getSheetUrl(Sheets.measures)
	    let urlMetrics = Evidence.getSheetUrl(Sheets.metrics)
	    let urlGrades = Evidence.getSheetUrl(Sheets.grades)

	    let allData = {}
	    // let deferred = new $.Deferred

	    // $.when(
	    //   // Get GRADE
	    //   $.getJSON(urlGrades + '&callback=?').done((data) {
	    //     allData['grades'] = Evidence.processGrades(data)
	    //   }),

	    //   // Get measures & tags
	    //   $.getJSON(urlMeasures + '&callback=?').done((data) {
	    //     // let newStateItems = Evidence.processMeasures(data)
	    //     allData['measures'] = Evidence.processMeasures(data).measures
	    //     allData['tags'] = Evidence.processMeasures(data).tags
	    //   }),

	    //   // Get metrics
	    //   $.getJSON(urlMetrics + '&callback=?').done((data) {
	    //     allData['metrics'] = Evidence.processMetrics(data)
	    //   }),

	    //   // Get tag descriptions
	    //   $.getJSON(urlTagDescriptions + '&callback=?').done((data) {
	    //     allData['tagDescriptions'] = Evidence.processTagDescriptions(data)
	    //   }),

	    //   // Get data
	    //   $.when(Object.keys(Sheets.data).forEach((source) {
	    //     let url = Evidence.getSheetUrl(Sheets.data[source])
	    //     $.getJSON(url + '&callback=?').done((data) {
	    //       !allData['data'] && (allData['data'] = {})
	    //       allData['data'][source] = Evidence.processData(data)
	    //     })
	    //   })
	    //   ).done(() {
	    //     return true
	    //   })
	    let test = await fetch(urlGrades)
	    let testGrades = await test.json()
	    console.log('testGrades', Evidence.processGrades(testGrades))

	    let gradesQuery = fetch(urlGrades).then(response => response.json())
	    let measuresAndTagsQuery = fetch(urlGrades).then(response => response.json())
	    let metricsQuery = fetch(urlMetrics).then(response => response.json())
	    let tagDescriptionsQuery = fetch(urlTagDescriptions).then(response => response.json())

	    // let results = [
	    //   await gradesQuery,
	    //   await measuresAndTagsQuery,
	    //   await metricsQuery,
	    //   await tagDescriptionsQuery,
	    // ];

	    let grades
	    let measuresAndTags
	    let metrics
	    let tagDescriptions
	    
	    [
	      grades,
	      measuresAndTags,
	      metrics,
	      tagDescriptions
	    ] = [
	      await gradesQuery,
	      await measuresAndTagsQuery,
	      await metricsQuery,
	      await tagDescriptionsQuery,
	    ]

	    console.log('Query results ›')
	    console.log('              ›', grades)
	    console.log('              ›', measuresAndTags)
	    console.log('              ›', metrics)
	    console.log('              ›', tagDescriptions)
	  }

	  readyToRender = () => {
	    const { data } = this.state;
	    const hasData = data['data'] !== undefined &&
							        data['grades'] !== undefined &&
							        data['measures'] !== undefined &&
							        data['metrics'] !== undefined &&
							        data['tagDescriptions'] !== undefined &&
							        data['tags'] !== undefined
	    return hasData
	  }

	  render () {
	  	if (!this.readyToRender()) {
	  		return null;
	  	}
	  	return (
    		<WrappedComponent
    			issues={Issues}
    			medications={Medications}
    			medicationsMap={MedicationsMap}
    			preferences={Preferences}
    			{...this.state}
    			{...this.props}
    		/>
    	)
    }
	}
}

export default withEvidenceData