import _ from 'lodash'
import React from 'react'
import { DropdownButton, MenuItem } from 'react-bootstrap'

import * as Evidence from '../api/Evidence'
import AbsoluteFrequency from './visualizations/AbsoluteFrequency'
import AbsoluteRiskComparison from './visualizations/AbsoluteRiskComparison'
import Difference from './visualizations/Difference'
import GradeQuality from './visualizations/GradeQuality'
import Intervention from './visualizations/Intervention'
import Population from './visualizations/Population'
import RelativeRiskComparison from './visualizations/RelativeRiskComparison'
import RiskRelativeToBaseline from './visualizations/RiskRelativeToBaseline'
import Source from './visualizations/Source'

String.prototype.capitalizeFirstletter = () => {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

// Outcome adverse events

class OutcomeAdverseEvents extends React.Component {
  state = { selectedDetail: null }
  
  renderDataByMeasure = (selectedMeasure) => {
    let measures = this.props.data.measures
    let dataByTag = this.props.dataByTag
    let renderEntry = this.renderEntry

    let renderAbsoluteRiskComparison = function(entries, measure) {
      let sources = {}

      Object.keys(entries).map(function (key) {
        let entry = entries[key]

        if (entry.which == 'comparison') {
          if (!sources[entry.comparison.parts]) {
            sources[entry.comparison.parts] = {}
            sources[entry.comparison.parts]['items'] = []
          }
          sources[entry.comparison.parts]['baseline'] = entry.comparison

          // Check to see that we have absolute risk
          if (entry.intervention.ar) {
            sources[entry.comparison.parts].items.push(entry.intervention)
          }
        }
      })

      return Object.keys(sources).map(function (comparison) {
        if (sources[comparison].items.length > 1) {
          return (
            <div className='visualization-rr'>
              <RelativeRiskComparison
                  baseline={sources[comparison].baseline}
                items={sources[comparison].items}
                measure={measure} />
            </div>
          )
        }
      })
    }

    let renderRiskRelativeToBaselineComparison = function(entries, measure) {
      let sources = {}

      Object.keys(entries).map(function (key) {
        let entry = entries[key]

        if (entry.which == 'comparison') {
          if (!sources[entry.comparison.parts]) {
            sources[entry.comparison.parts] = {}
            sources[entry.comparison.parts]['items'] = []
          }
          sources[entry.comparison.parts]['comparison'] = entry.comparison

          // Check to see that we have relative risk
          if (entry.intervention.rr) {
            sources[entry.comparison.parts].items.push(entry.intervention)
          }
        }
      })

      return Object.keys(sources).map(function (comparison) {
        if (sources[comparison].items.length > 1) {
          return (
            <div className='visualization-rr'>
              <RiskRelativeToBaseline
                comparison={sources[comparison].comparison}
                items={sources[comparison].items}
                measure={measure}
                measures={measures} />
            </div>
          )
        }
      })
    }

    let measure = selectedMeasure
    let tag = this.props.selectedTag
    let measureData = dataByTag[tag][selectedMeasure].data

    if (measureData) {
      let medications = this.props.medications
      let disabledMedications = this.props.disabledMedications
      let entries = get.filterEntriesByMedication(get.getEntriesForMeasure(measureData), medications, disabledMedications)

      return (
        <div key={measure}>
          {renderRiskRelativeToBaselineComparison(entries, measure)}
        </div>
      )
    }
  }

  // Get the mean of values
  getMeanValue = (entries) => {
    let values = []

    entries.map(function(entry) {
      // console.log(entry.intervention[0] + entry.dosage.dosage + ' ' + entry.comparison[0])
      let value
      if (entry.metric == 'ar_1000') {
        value = entry.value.value / 10
      }
      else {
        value = entry.value.value
      }
      if (value) {
        values.push(value)
      }
    })

    if (values.length > 0) {
      let sum = _.sum(values)
      let mean = sum/values.length
      let valuesSubtractedSquared = _.map(values, function(val) {
        return Math.pow((val - mean), 2)
      })
      let deviation = Math.sqrt(_.sum(valuesSubtractedSquared)/valuesSubtractedSquared.length)
      let roundedMean = Math.round(mean)

      // console.log('mean of values:', mean)
      // console.log('deviation of values:', deviation)
      // console.log('rounded mean:', roundedMean)
      
      return roundedMean
    }

    // No mean? Assume the mean is 0.
    return 0
  }

  // Group entries by outcome detail (adverse event name)
  groupEntriesByDetail = (entries) => {
    return _.chain(entries)
            .groupBy(function (entry) {
              return entry.measure_detail
            })
            .value()
  }

  // Group entries into placebo and intervention groups
  groupEntriesByWhich = (entries) => {
    return _.chain(entries)
            .groupBy(function (entry) {
              // Group entries by primary intervention
              if (entry.which === 'intervention') {
                return entry.intervention[0]
              }
              // Group all the placebo values
              else if (entry.which === 'comparison' && entry.comparison.join() === 'placebo') {
                return 'placebo'
              }
              return 'other'
            })
            // If we have populations or other types of entries, discard them
            .omit('other')
            .value()
  }

  // Group entries by intervention and dosage
  groupEntriesByInterventionAndDosage = (entries) => {
    return _.chain(entries)
            .groupBy(function (entry) {
              // Group entries by intervention + dosage
              if (entry.which === 'intervention') {
                let intervention = _.cloneDeep(entry.intervention)
                if (entry.dosage.dosage) {
                  intervention[0] += ' (' + entry.dosage.dosage + ')'
                }
                return intervention.join(' + ')
              }
              return 'other'
            })
            // If we have populations or other types of entries, discard them
            .omit('other')
            .value()
  }

  // Get outcome details as list
  getOutcomeDetails = (entries) => {
    return _.chain(entries)
            .map('measure_detail')
            .unique()
            .value()
            .sort()
  }

  handleAdverseEventChange = (name) => {
    this.setState({
      selectedDetail: name
    })
  }

  renderOutcomeDetailMenu = (names) => {
    return <DropdownButton
            bsStyle={null}
            title={'Choose a side effect'}
            key={'adverse-event-menu'}
            id={'adverse-event-menu'}
            onSelect={this.handleAdverseEventChange}>
              {names.map(function (name) {
                return <MenuItem eventKey={name}>{name}</MenuItem>
              })}
    </DropdownButton>
  }

  filterEntriesToThoseWithAcceptableMetrics = (entries) => {
    let acceptableMetrics = [
      'ar_100',
      'ar_1000'
    ]
    return entries.filter(function (entry) {
      // Check to see whether this entry has an appropriate metric
      let metricToUse = _.find(acceptableMetrics, function (val, key) {
        if (entry.metric === val) {
          return entry.metric
        }
      })
      if (metricToUse) {
        return entry
      }
    })
  }

  render () {
    let data                = this.props.data
    let entries             = this.props.dataFiltered
    let medications         = this.props.medications
    let medicationsMap      = this.props.medicationsMap
    let measure             = this.props.measure
    let disabledMedications = this.props.disabledMedications

    // Function shortcuts
    let getMeanValue = this.getMeanValue
    let groupEntriesByWhich = this.groupEntriesByWhich
    let groupEntriesByInterventionAndDosage = this.groupEntriesByInterventionAndDosage

    // Filter entries to only those with metrics that are used for the visualizations here
    let filteredEntries = this.filterEntriesToThoseWithAcceptableMetrics(entries)
    // console.log('# of side effect entries', entries.length)
    // console.log('# of side effect entries ar_100 or ar_1000', filteredEntries.length)

    // Data by comparison + intervention
    let groupedData = _.groupBy(filteredEntries, function (entry) {
      return entry.comparison + entry.intervention
    })

    let outcomeDetails = this.getOutcomeDetails(filteredEntries)
    let entriesByDetail = this.groupEntriesByDetail(filteredEntries)
    let selectedDetail = this.state.selectedDetail

    // Container for results of processing
    let resultHtml = []
    
    // If an outcome detail (e.g. 'headache') is selected, we can get results
    if (selectedDetail) {
      let html =[]

      // Get data for this detail
      let entriesForSelectedDetail = entriesByDetail[selectedDetail]
      let entriesByWhichForSelectedDetail = groupEntriesByWhich(entriesForSelectedDetail)

      // console.log(entriesByWhichForSelectedDetail)
      
      let cellStyle = {
        minWidth: '210px'
      }
      
      // Populate data into natural medication presentation order, starting with placebo
      let dataByIntervention = {
        placebo: []
      }
      let placeboHtml = []
      // No placebo data
      if (!entriesByWhichForSelectedDetail['placebo']) {
        placeboHtml.push(
          <div key={'placebo' + selectedDetail} className='pad-b-4 opacity-3'>
            <span>
              <Intervention
              interventionName={'Placebo'} />
            </span>
            <span>
              <div className='pad-t-1 pad-b-2 font-size-2'>
                <span>No information</span><br />
                <span className='small'>
                  about how common<br />
                  {selectedDetail} is
                </span>
              </div>
              <div className='opacity-5'>
                <AbsoluteFrequency
                  frequency={0}
                  metric={'ar_100'}
                  denominator={100} 
                  breakpoint={10}
                  baseline={null} />
              </div>
            </span>
          </div>
        )
      }
      // Placebo data
      else {
        let placeboMean = getMeanValue(entriesByWhichForSelectedDetail['placebo'])
        placeboHtml.push(
          <div key={'placebo' + selectedDetail} className='pad-b-4'>
            <span>
              <Intervention
                interventionName={'Placebo'} />
            </span>
            <span>
              <div className='pad-t-1 pad-b-2 font-size-2'>
                <strong>{placeboMean} people</strong> <span className='light'>out of 100</span><br />
                <span className='small'>
                  would be expected to experience<br />
                  {selectedDetail}
                </span>
              </div>
              <AbsoluteFrequency
                frequency={placeboMean}
                metric={'ar_100'}
                denominator={100} 
                breakpoint={10}
                baseline={null} />
            </span>
          </div>
        )
      }
      dataByIntervention['placebo'] = <div className='t-cell pad-r-2' style={cellStyle}>
        {placeboHtml}
      </div>

      // Make the same for all other interventions
      _.each(medications, function(medication) {
        let medHtml = []

        // If this med is disabled, don't show anything or bother proceeding
        if (disabledMedications[medication.name]) {
          return
        }
        
        // Group entries for this medication, by intervention + dose
        let entries = entriesByWhichForSelectedDetail[medication.name_generic]
        let grouped = groupEntriesByInterventionAndDosage(entries)

        // No data, so push a 'no data' visualization for this medication
        if (_.isEmpty(grouped)) {
          medHtml.push(
            <div key={medication.name_generic + selectedDetail} className='pad-b-4 opacity-3'>
              <span>
                <Intervention
                  intervention={[medication.name_generic]}
                  medicationsMap={medicationsMap} />
              </span>
              <span>
                <div className='pad-t-1 pad-b-2 font-size-2'>
                  <span>No information</span><br />
                  <span className='small'>
                    about how common<br />
                    {selectedDetail} is
                  </span>
                </div>
                <div className='opacity-5'>
                  <AbsoluteFrequency
                    frequency={0}
                    metric={'ar_100'}
                    denominator={100} 
                    breakpoint={10}
                    baseline={null} />
                </div>
              </span>
            </div>
          )
        }
        // Otherwise, we have data and want to get the mean values for all dosages, and display those as separate visualizations
        else {
          _.each(grouped, function (val, key) {
            let entries = val
            let mean = getMeanValue(entries)
            // There is a mean value for this side effect
            if (mean) {
              // Use the first entry as the source of information about the intervention
              let entry = entries[0]
              medHtml.push(
                <div key={key + selectedDetail} className='pad-b-4'>
                  <span>
                    <Intervention
                      intervention={entry.intervention}
                      dosage={entry.dosage}
                      medicationsMap={medicationsMap} />
                  </span>
                  <span>
                    <div className='pad-t-1 pad-b-2 font-size-2'>
                      <strong>{mean} people</strong> <span className='light'>out of 100</span><br />
                      <span className='small'>
                        would be expected to experience<br />
                        {selectedDetail}
                      </span>
                    </div>
                    <AbsoluteFrequency
                      frequency={mean}
                      metric={'ar_100'}
                      denominator={100} 
                      breakpoint={10}
                      baseline={null} />
                  </span>
                </div>
              )
            }
          })
        }

        dataByIntervention[medication.name_generic] = <div className='t-cell pad-r-2' style={cellStyle}>
          {medHtml}
        </div>
      })

      // Get data in natural presentation order
      _.each(dataByIntervention, function (val, key) {
        html.push(val)
      })

      resultHtml.push(
        <div key={selectedDetail + 'ae'} className='pad-b-5'>
          <h2 className='font-size-7 font-lighter light pad-b-3'>{selectedDetail}</h2>
          <div className='t-table table-layout-fixed'>
            <div className='t-row'>
              {html}
            </div>
          </div>
        </div>
      )
    }

    let classes = cx({
      'adverse-events results pad-l-5 pad-r-5': true,
    })
    let style = {
      minHeight: '300px'
    }

    return <section style={style} className={classes}>
      <div>{this.renderOutcomeDetailMenu(outcomeDetails)}</div>
      {resultHtml}
    </section>
  }
}

/*
      {_.map(groupedData, function (group) {
        let firstEntry = group[0]
        let comparison = firstEntry.comparison.join(' + ')
        let intervention = firstEntry.intervention.join(' + ')
        
        let groupedByDetail = _.chain(group)
                              .groupBy(function (entry) {
                                return entry.measure_detail
                              })
                              .sortBy(function (clump) {
                                return _.max(clump, function (part) {
                                  return part.value.value
                                })
                              })
                              .value()

        return (
          <div className='pad-t-5 pad-b-5' key={comparison + intervention}>
            <h2>
              When <strong>{intervention}</strong> was compared with <strong>{comparison}</strong> for people with RA<br />
              <span className='light'>these were the most common side effects</span>
            </h2>
            <Source source={firstEntry.source} kind={firstEntry.kind} />
            <GradeQuality grade={firstEntry.quality} gradeMap={data.grades} />

            {groupedByDetail.map(function (clump, i) {
              // If there's only an entry for the intervention, we can't
              // draw a comparison chart.
              if (!_.find(clump, {'which': 'comparison'})) {
                return
              }

              let name = clump[0].measure_detail

              // ABSOLUTE FREQUENCY (ICON ARRAY) VISUALIZATION
              return <div key={name + i} className='pad-b-5'>
                <h3 className='font-size-2'>{name}</h3>
                {_.map(clump, function(entry) {
                  return <div>
                    <span style={labelStyle}> 
                      {entry[entry.which][0]}
                    </span>
                    <span>
                      <AbsoluteFrequency
                        frequency={Math.round(entry.value.value / 10)}
                        metric={'ar_100'}
                        denominator={10} 
                        breakpoint={10}
                        baseline={null} />
                    </span>
                  </div>
                })}
              </div>
              
              // PILL VISUALIZATION
              return <div key={i} className='visualization-rr pad-b-5'>
                <h3 className='font-size-6'>{name}</h3>
                <AbsoluteRiskComparison
                  items={clump}
                  measure={name} />
              </div>

            })}
          </div>
        )
      })}
*/

OutcomeAdverseEvents.propTypes = {
  data: React.PropTypes.object.isRequired,
  dataFiltered: React.PropTypes.array.isRequired,
  disabledMedications: React.PropTypes.object,
  measure: React.PropTypes.string,
  medications: React.PropTypes.array.isRequired,
}

export default OutcomeAdverseEvents