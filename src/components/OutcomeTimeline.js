import _ from 'lodash'
import cx from 'classnames'
import React from 'react'

import withEvidenceData from './withEvidenceData'

import * as Evidence from '../api/Evidence'
import AbsoluteFrequency from './visualizations/AbsoluteFrequency'
import Difference from './visualizations/Difference'
import GradeQuality from './visualizations/GradeQuality'
import Intervention from './visualizations/Intervention'
import Population from './visualizations/Population'
import RelativeRiskComparison from './visualizations/RelativeRiskComparison'
import RiskRelativeToBaseline from './visualizations/RiskRelativeToBaseline'
import Source from './visualizations/Source'

// Outcome timeline i.e. outcomes at certain timepoints

class OutcomeTimeline extends React.Component {
  state = { keyMedication: null }

  componentWillReceiveProps () {
    this.setState({ keyMedication: null })
  }

  renderDataBySource = (data) => {
    Object.keys(data).map(source => {
      return (
        <section className='data'>
          <h2>{source} data</h2>
          <ul>
            {data[source].map((entry, i) => {
              return (
                <li key={i}>
                  <h3>{i}</h3>
                  <p>{entry.which}</p>
                  <div>
                    <ul>
                      {Object.keys(entry).map((key, i) => {
                        return (
                          <li key={i}>
                            <small>{key}</small>
                            {entry[key]}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      )
    })
  }

  renderFollowUpTime = (duration, measure) => {
    let low = duration.low
    let high = duration.high
    let interval = duration.interval

    (low && !high) && (high = low)
    (!low && high) && (low = high)

    let durationString = low == high ? low : low + ' to ' + high
    let intervalString = low > 1 ? interval + 's' : interval

    return (
      <div>
        <strong>{durationString} {intervalString}</strong><br />
        <span className='light'>Researchers looked at {measure ? measure : 'this'} {durationString} {intervalString} after people started treatment.</span>
      </div>
    )
  }

  renderValue = (results, metric, comparisonResults) => {
    // results = the data/finding, passed as part of an entry as population / intervention / comparison
    // metric (optional) = the preferred metric to render. often helpful if a specific metric is required. otherwise there's logic to render all of them.
    // comparisonResults = a pair dataset used for relative comparisons, i.e. the "comparison" to an intervention
    // preferredKind = what kind of value to show — a difference/comparison…

    let grades = this.props.data.grades
    let measures = this.props.data.measures
    let metrics = this.props.data.metrics
    let tags = this.props.data.tags
    let selectedTag = this.props.data.selectedTag

    const renderAppropriateVisualization = (results, metric, measure) => {
      if (metrics[metric]) {
        if (metrics[metric].presentation == 'frequency') {
          return this.renderAbsoluteRisk(results, metric, measure, comparisonResults)
        }
        if (metrics[metric].presentation == 'percentage') {
          return this.renderPercentage(results, metric, measure)
        }
        if (metrics[metric].presentation == 'difference') {
          return this.renderDifference(results, metric, measure)
        }
        else {
          return this.renderNumber(results, metric, measure)
        }
      }
    }

    if (metric) {
    	if (results[metric]) {
        return renderAppropriateVisualization(results, metric, results[metric].measure)
      }
    }
    else {
      // Prefer an ar_100/ar_1000, but don't render other things
      if (results['ar_100']) {
        return renderAppropriateVisualization(results, 'ar_100', results['ar_100'].measure)
      }
      if (results['ar_1000']) {
        return renderAppropriateVisualization(results, 'ar_1000', results['ar_1000'].measure)
      }
    	// Otherwise terate through all the keys (ar_1000, ar_100, etc.) to see whether we can render a value for each
      return Object.keys(results).map((metric) => {
        // If we know how to render this kind of metric
        if (metrics[metric]) {
          // For now, only render absolute-kind of metrics
          if (!comparisonResults) {
          	if (metrics[metric].kind == 'absolute') {
          		return renderAppropriateVisualization(results, metric, results[metric].measure)
            }
            else if (metrics[metric].kind == 'relative') {
            	return renderAppropriateVisualization(results, metric, results[metric].measure)
            }
          }
        }
      })
    }
  }

  renderNumber = (results, metric, measure) => {
    let metrics = this.props.data.metrics
    let data = results[metric]

    return (
      <div>
        <small>{metrics[metric].name_short}</small><br />
        <strong>{data.value.value}</strong> {metric == 'ar_100' && <span className='light'>of 100 people<br /></span>} {metric == 'ar_1000' && <span className='light'>of 1000 people<br /></span>}
        {data.value.value_ci_low && data.value.value_ci_high &&
          <span>({data.value.value_ci_low} to {data.value.value_ci_high})</span>
        }
      </div>
    )
  }

  renderPercentage = (results, metric, measure) => {
    let metrics = this.props.data.metrics
    let data = results[metric]

    return (
      <div>
        {results.parts && <span>{results.parts.join(' + ')}<br /></span>}
        <small>{metrics[metric].name_short}</small><br />
        <strong>{Math.round(data.value.value * 100) + '%'}</strong><br />
        {data.value.value_ci_low && data.value.value_ci_high &&
          <span>({Math.round(data.value.value_ci_low * 100) + '%'} to {Math.round(data.value.value_ci_high * 100) + '%'})</span>
        }
      </div>
    )
  }

 renderAbsoluteRisk = (results, metric, comparisonResults) => {
    let measures = this.props.data.measures
    let measure = results[metric].measure
    let data = results[metric].value
    let baseline = _.get(comparisonResults, `[${metric}].value.value`, null)

    return (
      <div>
        <div>
          <AbsoluteFrequency frequency={data.value} metric={metric} denominator={100} breakpoint={10} baseline={baseline} />
        </div>
        <div>
          <strong>{data.value && (metric == 'ar_1000' ? Math.floor(data.value * 0.1) : data.value)} people</strong> <span className='light'>out of 100</span><br />
          <span className='small'>
            would be expected to experience {measures[measure].name_friendly}
          </span>
        </div>
      </div>
    )
  }

  renderDifference = (results, metric) => {
    let measures = this.props.data.measures
    let metrics = this.props.data.metrics

    let measure = results[metric].measure
    let data = results[metric].value

    return (
      <div>
        {results.parts && <span>{results.parts.join(' + ')}<br /></span>}
        <span className='light'>Outcome: {measures[measure].name_friendly}</span><br />
        <small>{metrics[metric].name_short}</small><br />
        {data.value && <Difference value={data.value} metric={metric} />}
        {data.value_ci_low && data.value_ci_high &&
          <span>({data.value_ci_low} to {data.value_ci_high})</span>
        }
      </div>
    )
  }

  getDataByTag = (tags, data) => {
    let dataByTag = JSON.parse(JSON.stringify(tags))

    // Each tag (pain, function, etc.)
    Object.keys(tags).map((tag) => {
      // Each source (sheet of data)
      Object.keys(data).map((source) => {
        // Each entry in the source data (line of sheet)
        data[source].map((entry) => {
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

  getDurationInWeeks = (durationObject) => {
    if (durationObject.high) {
      if (durationObject.interval == 'year') {
        return durationObject.high * 52
      }
      if (durationObject.interval == 'month') {
        return durationObject.high * 4
      }
      if (durationObject.interval == 'week') {
        return durationObject.high
      }
    }
    else if (durationObject.low) {
      if (durationObject.interval == 'year') {
        return durationObject.low * 52
      }
      if (durationObject.interval == 'month') {
        return durationObject.low * 4
      }
      if (durationObject.interval == 'week') {
        return durationObject.low
      }
    }
    return (null)
	}

  getDurationNatural = (durationInWeeks) => {
    if (durationInWeeks === 'null' || durationInWeeks === null) {
      return {
        duration: 'who knows',
        interval: 'when'
      }
    }
    if (durationInWeeks <= 12) {
      return {
        duration: durationInWeeks,
        interval: 'weeks'
      }
    }
    if (13 <= durationInWeeks && durationInWeeks <= 47) {
      return {
        duration: Math.floor(durationInWeeks / 4),
        interval: 'months'
      }
    }
    if (48 <= durationInWeeks && durationInWeeks <= 55) {
      return {
        duration: 1,
        interval: 'year'
      }
    }
    if (56 <= durationInWeeks && durationInWeeks <= 95) {
      return {
        duration: Math.floor(durationInWeeks / 4),
        interval: 'months'
      }
    }
    if (durationInWeeks >= 96) {
      return {
        duration: (Math.round(durationInWeeks / 52) * 2) / 2,
        interval: 'years'
      }
    }
  }

  getDurationsFromEntries = (entries) => {
    let durations = {}
    _.each(entries, (entry) => {
      if (entry.duration) {
        let numberOfWeeks = this.getDurationInWeeks(entry.duration)
        durations[numberOfWeeks] = true
      }
    })
    return _.keys(durations)
  }

  getDurationsNaturalFromEntries = (entries) => {
    // Sort durations by week in ascending order
    let durationsInWeeks = this.getDurationsFromEntries(entries).sort((a, b) => {
      return a - b
    })

    // Convert durations in weeks to plain language duration keys
    // mindful that there may be items in [durationsInWeeks]
    // that convert to duplicate plain language keys
    // e.g. '48 weeks' and '52 weeks' both become '1 year'
    let durations = {}
    _.each(durationsInWeeks, (numberOfWeeks) => {
      let durationNatural = this.getDurationNatural(numberOfWeeks)
      let key = durationNatural.duration + ' ' + durationNatural.interval
      durations[key] = true
    })
    return _.keys(durations)
  }

  getInterventionAsString = (entry) => {
    if (entry.intervention) {
      let intervention = _.cloneDeep(entry.intervention.parts)

      // Find dosage string, if available
      let dosage = _.chain(entry)
                    .get('intervention.dosage.dosage')
                    .value()

      // Append dosage to first part of intervention
      if (dosage) {
        intervention[0] += ' (' + dosage + ')'
      }
      // e.g. methotrexate (5 mg) + prednisolone
      return intervention.join(' + ')
    }
  }

  getInterventionsFromEntries = (entries) => {
    let interventions = {}
    _.each(entries, (entry) => { 
      if (entry.intervention) {
        interventions[this.getInterventionAsString(entry)] = entry
      }
    })
    return interventions
  }

  getPrimaryInterventionsFromEntries = (entries) => {
    let interventions = {}
    _.each(entries, (entry) => {
      if (entry.intervention) {
        interventions[entry.intervention.parts[0]] = entry
      }
    })
    return interventions
  }

  getWhichesFromEntries = (entries) => {
    let whiches = {}
    _.each(entries, (entry) => {
      if (entry.which == 'population' && entry.population) {
        whiches[this.getPopulationAsString(entry)] = {}
      }
      if (entry.which == 'intervention' && entry.intervention) {
        whiches[this.getInterventionAsString(entry)] = {}
      }
    })
    return whiches
  }

  groupEntriesByIntervention = (entries) => {
    return _.groupBy(entries, (entry) => {
      return this.getInterventionAsString(entry)
    })
  }

  groupEntriesByPrimaryIntervention = (entries) => {
    return _.groupBy(entries, (entry) => {
      if (entry.intervention) {
        return entry.intervention.parts[0]
      }
    })
  }

  getPopulationsFromEntries = (entries) => {
    let populations = {}
    _.each(entries, (entry) => {
      if (entry.population) {
        populations[this.getPopulationAsString(entry)] = entry
      }
    })
    return populations
  }

  getPopulationAsString = (entry) => {
    if (entry.population) {
      return entry.population.parts.join(' + ')
    }
  }

  groupEntriesByPopulation = (entries) => {
    return _.groupBy(entries, (entry) => {
      return this.getPopulationAsString(entry)
    })
  }

  getWhichAsString = (entry) => {
    if (entry.which == 'population' || entry.population) {
      return this.getPopulationAsString(entry)
    }
    if (entry.which == 'intervention' || entry.intervention) {
      return this.getInterventionAsString(entry)
    }
  }

  groupEntriesByWhich = (entries) => {
    return _.groupBy(entries, (entry) => {
      return this.getWhichAsString(entry)
    })
  }

  groupEntriesByDurationNatural = (entries) => {
    return _.groupBy(entries, (entry) => {
      let durationNatural = this.getDurationNatural(this.getDurationInWeeks(entry.duration))
      let key = durationNatural.duration + ' ' + durationNatural.interval
      return key
    })
  }

  groupEntriesByDuration = (entries) => {
    return _.groupBy(entries, (entry) => {
      return this.getDurationInWeeks(entry.duration)
    })
  }

  groupEntriesByInterventionAndDuration = (entries) => {
    let results = {}
    let entriesByIntervention = this.groupEntriesByIntervention(entries)
    _.each(entriesByIntervention, (value, key) => {
      let byDuration = this.groupEntriesByDurationNatural(value)
      results[key] = byDuration
    })
    return results
  }

  groupEntriesByPrimaryInterventionAndDuration = (entries) => {
    let results = {}
    let entriesByIntervention = this.groupEntriesByPrimaryIntervention(entries)
    _.each(entriesByIntervention, (value, key) => {
      let byDuration = this.groupEntriesByDurationNatural(value)
      results[key] = byDuration
    })
    return results
  }

  groupEntriesByWhichAndDuration = (entries) => {
    let entriesByWhichAndDuration = {}
    let entriesByWhich = this.groupEntriesByWhich(entries)
    _.each(entriesByWhich, (value, key) => {
      let byDuration = this.groupEntriesByDuration(value)
      entriesByWhichAndDuration[key] = byDuration
    })
    return entriesByWhichAndDuration
  }

  // this.groupEntriesByDuration = (entries, boundary) {
  // 	let this.getDurationInWeeks = this.getDurationInWeeks

  // 	let entriesByDuration = {}

  // 	Object.keys(entries).forEach((entry) {
  // 		let currentEntry = entries[entry]

  // 		if (currentEntry.duration) {
  // 			let numberOfWeeks = this.getDurationInWeeks(currentEntry.duration)

  // 			if (!entriesByDuration[numberOfWeeks]) {
  // 				entriesByDuration[numberOfWeeks] = []
  // 			}
  // 			entriesByDuration[numberOfWeeks].push(currentEntry)
  // 		}
  // 	})
  // 	return entriesByDuration
  // },

  handleMomentDataCellHover = (medicationName) => {
    this.setState({ keyMedication: medicationName })
  }

  renderTimelineByTag = (data, tags, tag) => {
    let dataByTag = this.getDataByTag(tags, data)
    let tagDescriptions = this.props.data.tagDescriptions
    return (<div>{this.renderTimelineByMeasure(dataByTag[tag])}</div>)
  }

  render () {
    let classes = cx({
      'processing': true,
      'results': true
    })

    // From withEvidenceData HOC
    const {
      data,
      medications,
      medicationsMap,
    } = this.props
    const {
      grades,
      measures,
      metrics,
      tags,
      tagDescriptions,
    } = data

    // From parent component
    const {
      dataFiltered,
      disabledMedications,
      measure,
      selectedTag,
    } = this.props
    let { keyMedication } = this.state

    const renderRelativeRiskComparison = (entries, measure) => {
      let sources = {}

      Object.keys(entries).map((key) => {
        let entry = entries[key]

        if (entry.which == 'comparison') {
          if (!sources[entry.comparison.parts]) {
            sources[entry.comparison.parts] = {}
            sources[entry.comparison.parts]['items'] = []
          }
          sources[entry.comparison.parts]['baseline'] = entry.comparison

          // Check to see that we have relative risk
          if (entry.intervention.rr) {
            sources[entry.comparison.parts].items.push(entry.intervention)
          }
        }
      })

      return Object.keys(sources).map((comparison, c) => {
        if (sources[comparison].items.length > 1) {
          return (
            <ul key='c' className='visualization-rr'>
              <li>
                <h3><strong>relative risk</strong> › {measures[measure].name_friendly}</h3>
              </li>
              <li>
                <RelativeRiskComparison
                  baseline={sources[comparison].baseline}
                  items={sources[comparison].items}
                  measure={measure} />
              </li>
            </ul>
          )
        }
      })
    }

    const renderRiskRelativeToBaselineComparison = (entries, measure) => {
      let sources = {}

      Object.keys(entries).map((key) => {
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

      return Object.keys(sources).map((comparison, c) => {
        if (sources[comparison].items.length > 1) {
          return (
            <ul key='c' className='visualization-rr'>
              <li>
                <h3><strong>relative risk</strong> › {measures[measure].name_friendly}</h3>
              </li>
              <li>
                <RiskRelativeToBaseline
                  comparison={sources[comparison].comparison}
                  items={sources[comparison].items}
                  measure={measure}
                  measures={measures} />
              </li>
            </ul>
          )
        }
      })
    }

    // Render a timeline
    if (measure && dataFiltered) {
      // Filter to entries for non-disabled medications only
      let entries = Evidence.filterEntriesByMedication(Evidence.getEntriesForMeasure(dataFiltered), medications, disabledMedications)
      let populationEntries = Evidence.filterEntriesToPopulationOnly(Evidence.getEntriesForMeasure(dataFiltered))
      let interventions = null
      let entriesByIntervention = null
      let entriesByInterventionAndDuration = null
      let entriesByPrimaryIntervention = null

      // If there are no medication entries, use population entries.
      if (entries.length == 0) {
        entries = populationEntries
        interventions = this.getWhichesFromEntries(entries)
        entriesByIntervention = this.groupEntriesByWhich(entries)
        entriesByInterventionAndDuration = this.groupEntriesByWhichAndDuration(entries)
      }
      else {
        interventions = this.getPrimaryInterventionsFromEntries(entries)
        entriesByPrimaryIntervention = this.groupEntriesByPrimaryIntervention(entries)
        entriesByInterventionAndDuration = this.groupEntriesByInterventionAndDuration(entries)
        _.each(entriesByPrimaryIntervention, (value, key) => {
          // val == [entry, entry, entry]
          // key == 'methotrexate'
          interventions[key] = this.groupEntriesByInterventionAndDuration(value)
        })
      }

      let durations = this.getDurationsNaturalFromEntries(entries)

      // Populate data into natural medication presentation order
      let dataByIntervention = {}
      _.each(medications, (medication) => {
        // Make a row for each unique intervention
        let rows = []
        let entries = _.get(entriesByPrimaryIntervention, medication.name_generic, [])
        let individualInterventions = _.get(interventions, medication.name_generic, {})



        // No data
        if (_.isEmpty(individualInterventions)) {
          rows.push(
            <section key={medication.name_generic} className='t-row'>
              <div className='t-cell subject'>
                <small>No {measure.name_friendly} info for</small>
                <Intervention
                  intervention={[medication.name_generic]}
                  interventionName={medication.name_generic}
                  medicationsMap={medicationsMap} />
              </div>
            </section>
          )
        }
        // Data
        else {
          _.each(individualInterventions, (moments, key) => {
            // moments == '{'6 months': [entry, entry]}
            // key == 'methotrexate (5 mg)'
            let rowClasses = cx({
              't-row': true
            })

            // let intervention = this.getInterventionAsString(entry)
            // console.log(key, moments)

            // Get first entry for basic data
            let firstEntry = moments[_.keys(moments)[0]][0]

            rows.push(
              <section key={key} className='chunk'>
                <section className='t-row timeline-labels'>
                  <div className='t-cell moment first'>
                    <section>
                      {measures[measure].name_friendly} for people taking
                    </section>
                  </div>
                  {_.map(durations, (timepoint) => {
                    return <div key={key + timepoint} className='t-cell moment'>
                      …by about {timepoint}
                    </div>
                  })}
                </section>
                
                <section className='t-row'>
                  <div className='t-cell subject first'>
                    {firstEntry.which !== 'population' && firstEntry.intervention &&
                      <Intervention
                        intervention={firstEntry.intervention.parts}
                        interventionName={firstEntry.intervention.parts.join(' + ')}
                        dosage={firstEntry.intervention.dosage}
                        medicationsMap={medicationsMap} />
                    }
                    {firstEntry.which == 'population' &&
                      <Population
                        population={firstEntry.population.parts.join(' + ')}
                        dosage={firstEntry.dosage} />
                    }
                    {/*TODO: display comparison */}
                  </div>

                  {_.map(durations, (timepoint, i) => {
                    let entries = _.get(moments, timepoint, [])

                    if (entries.length > 0) {
                      // Could have multiple entries for this timpoint; take the first for now
                      let entry = entries[0]
                      if (entry.which !== 'population' && entry.intervention) {
                        return <div
                          key={key + timepoint}
                          className='t-cell moment-data'>
                            <section>
                              {this.renderValue(entry.intervention)}
                              <Source source={entry.source} kind={entry.kind} /><br />
                              <GradeQuality grade={entry.quality} gradeMap={grades} />
                            </section>
                        </div>
                      }
                      if (entry.which == 'population') {
                        return <div key={key + timepoint} className='t-cell moment-data'>
                          <section>
                            {this.renderValue(entry.population)}
                          </section>
                        </div>
                      }
                    }
                    return <div key={key + timepoint} className='t-cell moment empty'><span className=
                        'light font-size-1'>no research that looked into this at {timepoint}</span>
                    </div>
                  })}
                </section>
              </section>
            )
          })
        }

        // [rows] may contain a row for multiple letiations of interventions
        // e.g. 'methotrexate', 'methotrexate + infliximab', etc.
        // All should be pushed into the rows belonging to this medication,
        // which is the primary intervention.
        dataByIntervention[medication.name_generic] = rows
      })

      // Enforce natural presentation order
      let resultHtml = []
      _.each(dataByIntervention, (value, key) => {
        // key == 'methotrexate'
        // val == [entries]

        // If this med is disabled, don't show anything
        if (disabledMedications[key]) {
          return
        }
        _.each(dataByIntervention[key], row => resultHtml.push(row))
      })

      return (
        <div key={'outcome-timeline' + measure}>
          <section className='outcome-timeline horizontal'>
            {/* TODO: Separately and specially handle population. */}
            {/* TODO: Have text at top that says "best performer, worst performer!" SUMMARIES! */}
            {resultHtml}
          </section>
        </div>
      )
    }
    // if (measure) {
    //   return (
    //     <div key={'outcome-timeline' + measure}>
    //       <section className='measure-description'>
    //         <h3>{measures[measure].name_long}</h3>
    //         <h4>Researchers measure this and call it <strong>{measures[measure].name_short}</strong>: {measures[measure].description && measures[measure].description}</h4>
    //         <h4><strong>This prototype doesn’t have enough data in it yet to show information for the medications you’ve selected.</strong></h4>
    //       </section>
    //     </div>
    //   )
    // }
  }
}

OutcomeTimeline.propTypes = {
  disabledMedications: React.PropTypes.object,
  data: React.PropTypes.object.isRequired,
  dataFiltered: React.PropTypes.array.isRequired,
  measure: React.PropTypes.string.isRequired,
  medications: React.PropTypes.array.isRequired,
  medicationsMap: React.PropTypes.object,
}

export default withEvidenceData(OutcomeTimeline)
