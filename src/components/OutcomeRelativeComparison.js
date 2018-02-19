import _ from 'lodash'
import cx from 'classnames'
import React from 'react'

import * as Evidence from '../api/Evidence'
import AbsoluteFrequency from './visualizations/AbsoluteFrequency'
import Difference from './visualizations/Difference'
import GradeQuality from './visualizations/GradeQuality'
import Intervention from './visualizations/Intervention'
import Population from './visualizations/Population'
import RelativeRiskComparison from './visualizations/RelativeRiskComparison'
import RiskRelativeToBaseline from './visualizations/RiskRelativeToBaseline'
import Source from './visualizations/Source'

// Outcome relative comparison

class OutcomeRelativeComparison extends React.Component {
  renderDataBySource = (data) => {
    Object.keys(data).map(function (source) {
      return (
        <section className='data'>
          <h2>{source} data</h2>
          <ul>
            {data[source].map(function (entry, i) {
              return (
                <li key={i}>
                  <h3>{i}</h3>
                  <p>{entry.which}</p>
                  <div>
                    <ul>
                      {Object.keys(entry).map(function (key, i) {
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

    let renderAbsoluteRisk = this.renderAbsoluteRisk
    let renderDifference = this.renderDifference
    let renderPercentage = this.renderPercentage
    let renderNumber = this.renderNumber

    let renderAppropriateVisualization = function(results, metric, measure) {
      if (metrics[metric]) {
        if (metrics[metric].presentation == 'frequency') {
          return renderAbsoluteRisk(results, metric, measure, comparisonResults)
        }
        if (metrics[metric].presentation == 'percentage') {
          return renderPercentage(results, metric, measure)
        }
        if (metrics[metric].presentation == 'difference') {
          return renderDifference(results, metric, measure)
        }
        else {
          return renderNumber(results, metric, measure)
        }
      }
    }

    if (metric) {
    	if (results[metric]) {
        return renderAppropriateVisualization(results, metric, results[metric].measure)
      }
    }
    else {
    	// Iterate through all the keys (ar_1000, ar_100, etc.) to see whether we can render a value for each
      return Object.keys(results).map(function (metric) {
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

    let baseline = comparisonResults ? comparisonResults[metric].value.value : null

    return (
      <div>
        <strong>{data.value && (metric == 'ar_1000' ? Math.floor(data.value * 0.1) : data.value)}</strong> <span className='light'>of 100 people</span>
        <AbsoluteFrequency frequency={data.value} metric={metric} denominator={100} breakpoint={10} baseline={baseline} />
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

  getDurationAsWeeks = (duration) => {
		// Should average to get common duration? Or use one end of range?
		// i.e. if 4 to 12 weeks, use 4, 12, or 8?

		if (duration.interval == 'month') {
			return duration.low * 4
		}
		else if (duration.interval == 'week') {
			return duration.low
		}
	}

  groupEntriesByDuration = (entries, boundary) => {
  	let getDurationAsWeeks = this.getDurationAsWeeks

  	let entriesByDuration = {}

  	Object.keys(entries).forEach(function (entry) {
  		let currentEntry = entries[entry]

  		if (currentEntry.duration.low) {
  			let numberOfWeeks = getDurationAsWeeks(currentEntry.duration)

  			if (!entriesByDuration[numberOfWeeks]) {
  				entriesByDuration[numberOfWeeks] = []
  			}
  			entriesByDuration[numberOfWeeks].push(currentEntry)
  		}
  	})

  	return entriesByDuration
  }

  render () {
    let classes = cx({
      'processing': true,
      'results': true
    })

    let renderRelativeRiskComparison = function(entries, measure) {
      let sources = {}

      Object.keys(entries).map(function (key) {
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

    let data = this.props.data
    let dataFiltered = this.props.dataFiltered
    let disabledMedications = this.props.disabledMedications
    let medications = this.props.medications
    let measure = this.props.measure

    let measures = this.props.data.measures
    let grades = data.grades

    let renderEntry = this.renderEntry

    let entries = get.filterEntriesByMedication(get.getEntriesForMeasure(dataFiltered), medications, disabledMedications)

    return (
      <div className={classes}>
        <div key={measure}>
          {renderRiskRelativeToBaselineComparison(entries, measure)}
        </div>
      </div>
    )

    // return (
    //   <div className={classes}>
    //     {selectedMeasure !== null && this.renderDataByMeasure(selectedMeasure)}
    //   </div>
    // )
  }
}

OutcomeRelativeComparison.propTypes = {
  data: React.PropTypes.object.isRequired,
  disabledMedications: React.PropTypes.object,
  medications: React.PropTypes.array.isRequired
}

export default OutcomeRelativeComparison