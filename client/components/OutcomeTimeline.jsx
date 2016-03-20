/** @jsx React.DOM */

var React = require('react/addons')
var cx = React.addons.classSet
var _ = require('lodash')
var get = require('../data/get.js')

var AbsoluteFrequency = require('./visualizations/AbsoluteFrequency.jsx')
var Difference = require('./visualizations/Difference.jsx')
var GradeQuality = require('./visualizations/GradeQuality.jsx')
var Intervention = require('./visualizations/Intervention.jsx')
var Population = require('./visualizations/Population.jsx')
var RelativeRiskComparison = require('./visualizations/RelativeRiskComparison.jsx')
var RiskRelativeToBaseline = require('./visualizations/RiskRelativeToBaseline.jsx')
var Source = require('./visualizations/Source.jsx')

// Outcome timeline i.e. outcomes at certain timepoints

var OutcomeTimeline = React.createClass({
	propTypes: {
    data: React.PropTypes.object.isRequired,
    dataFiltered: React.PropTypes.array.isRequired,
		disabledMedications: React.PropTypes.object,
    measure: React.PropTypes.string.isRequired,
    medications: React.PropTypes.array.isRequired,
    medicationsMap: React.PropTypes.object,
	},

  getInitialState: function() {
    return {
      keyMedication: null
    }
  },

  componentWillReceiveProps: function() {
    this.setState({
      keyMedication: null
    })
  },

  renderDataBySource: function(data) {
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
  },

  renderFollowUpTime: function(duration, measure) {
    var low = duration.low
    var high = duration.high
    var interval = duration.interval

    (low && !high) && (high = low)
    (!low && high) && (low = high)

    var durationString = low == high ? low : low + ' to ' + high
    var intervalString = low > 1 ? interval + 's' : interval

    return (
      <div>
        <strong>{durationString} {intervalString}</strong><br />
        <span className='light'>Researchers looked at {measure ? measure : 'this'} {durationString} {intervalString} after people started treatment.</span>
      </div>
    )
  },

  renderValue: function(results, metric, comparisonResults) {
    // results = the data/finding, passed as part of an entry as population / intervention / comparison
    // metric (optional) = the preferred metric to render. often helpful if a specific metric is required. otherwise there's logic to render all of them.
    // comparisonResults = a pair dataset used for relative comparisons, i.e. the "comparison" to an intervention
    // preferredKind = what kind of value to show — a difference/comparison…

    var grades = this.props.data.grades
    var measures = this.props.data.measures
    var metrics = this.props.data.metrics
    var tags = this.props.data.tags
    var selectedTag = this.props.data.selectedTag

    var renderAbsoluteRisk = this.renderAbsoluteRisk
    var renderDifference = this.renderDifference
    var renderPercentage = this.renderPercentage
    var renderNumber = this.renderNumber

    var renderAppropriateVisualization = function(results, metric, measure) {
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
      // Prefer an ar_100/ar_1000, but don't render other things
      if (results['ar_100']) {
        return renderAppropriateVisualization(results, 'ar_100', results['ar_100'].measure)
      }
      if (results['ar_1000']) {
        return renderAppropriateVisualization(results, 'ar_1000', results['ar_1000'].measure)
      }
    	// Otherwise terate through all the keys (ar_1000, ar_100, etc.) to see whether we can render a value for each
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
  },

  renderNumber: function(results, metric, measure) {
    var metrics = this.props.data.metrics
    var data = results[metric]

    return (
      <div>
        <small>{metrics[metric].name_short}</small><br />
        <strong>{data.value.value}</strong> {metric == 'ar_100' && <span className='light'>of 100 people<br /></span>} {metric == 'ar_1000' && <span className='light'>of 1000 people<br /></span>}
        {data.value.value_ci_low && data.value.value_ci_high &&
          <span>({data.value.value_ci_low} to {data.value.value_ci_high})</span>
        }
      </div>
    )
  },

  renderPercentage: function(results, metric, measure) {
    var metrics = this.props.data.metrics
    var data = results[metric]

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
  },

  renderAbsoluteRisk: function(results, metric, measure, comparisonResults) {
    var measures = this.props.data.measures
    var measure = results[metric].measure
    var data = results[metric].value
    var baseline = comparisonResults ? comparisonResults[metric].value.value : null

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
  },

  renderDifference: function(results, metric, measure) {
    var measures = this.props.data.measures
    var metrics = this.props.data.metrics

    var measure = results[metric].measure
    var data = results[metric].value

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
  },

  getDataByTag: function(tags, data) {
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

  getDurationInWeeks: function (durationObject) {
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
	},

  getDurationNatural: function (durationInWeeks) {
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
  },

  getDurationsFromEntries: function(entries) {
    var getDurationInWeeks = this.getDurationInWeeks
    var durations = {}
    _.each(entries, function (entry) {
      if (entry.duration) {
        var numberOfWeeks = getDurationInWeeks(entry.duration)
        durations[numberOfWeeks] = true
      }
    })
    return _.keys(durations)
  },

  getDurationsNaturalFromEntries: function(entries) {
    var getDurationNatural = this.getDurationNatural

    // Sort durations by week in ascending order
    var durationsInWeeks = this.getDurationsFromEntries(entries).sort(function (a, b) {
      return a - b
    })

    // Convert durations in weeks to plain language duration keys
    // mindful that there may be items in [durationsInWeeks]
    // that convert to duplicate plain language keys
    // e.g. '48 weeks' and '52 weeks' both become '1 year'
    var durations = {}
    _.each(durationsInWeeks, function (numberOfWeeks) {
      var durationNatural = getDurationNatural(numberOfWeeks)
      var key = durationNatural.duration + ' ' + durationNatural.interval
      durations[key] = true
    })
    return _.keys(durations)
  },

  getInterventionAsString: function(entry) {
    if (entry.intervention) {
      var intervention = _.cloneDeep(entry.intervention.parts)

      // Find dosage string, if available
      var dosage = _.chain(entry)
                    .get('intervention.dosage.dosage')
                    .value()

      // Append dosage to first part of intervention
      if (dosage) {
        intervention[0] += ' (' + dosage + ')'
      }
      // e.g. methotrexate (5 mg) + prednisolone
      return intervention.join(' + ')
    }
  },

  getInterventionsFromEntries: function(entries) {
    var getInterventionAsString = this.getInterventionAsString
    var interventions = {}
    _.each(entries, function (entry) { 
      if (entry.intervention) {
        interventions[getInterventionAsString(entry)] = entry
      }
    })
    return interventions
  },

  getPrimaryInterventionsFromEntries: function(entries) {
    var interventions = {}
    _.each(entries, function (entry) {
      if (entry.intervention) {
        interventions[entry.intervention.parts[0]] = entry
      }
    })
    return interventions
  },

  getWhichesFromEntries: function(entries) {
    var getPopulationAsString = this.getPopulationAsString
    var getInterventionAsString = this.getInterventionAsString

    var whiches = {}
    _.each(entries, function (entry) {
      if (entry.which == 'population' && entry.population) {
        whiches[getPopulationAsString(entry)] = {}
      }
      if (entry.which == 'intervention' && entry.intervention) {
        whiches[getInterventionAsString(entry)] = {}
      }
    })
    return whiches
  },

  groupEntriesByIntervention: function(entries) {
    var getInterventionAsString = this.getInterventionAsString
    return _.groupBy(entries, function (entry) {
      return getInterventionAsString(entry)
    })
  },

  groupEntriesByPrimaryIntervention: function(entries) {
    return _.groupBy(entries, function (entry) {
      if (entry.intervention) {
        return entry.intervention.parts[0]
      }
    })
  },

  getPopulationsFromEntries: function(entries) {
    var getPopulationAsString = this.getPopulationAsString
    var populations = {}
    _.each(entries, function (entry) {
      if (entry.population) {
        populations[getPopulationAsString(entry)] = entry
      }
    })
    return populations
  },

  getPopulationAsString: function(entry) {
    if (entry.population) {
      return entry.population.parts.join(' + ')
    }
  },

  groupEntriesByPopulation: function(entries) {
    var getPopulationAsString = this.getPopulationAsString
    return _.groupBy(entries, function (entry) {
      return getPopulationAsString(entry)
    })
  },

  getWhichAsString: function(entry) {
    var getPopulationAsString = this.getPopulationAsString
    var getInterventionAsString = this.getInterventionAsString

    if (entry.which == 'population' || entry.population) {
      return getPopulationAsString(entry)
    }
    if (entry.which == 'intervention' || entry.intervention) {
      return getInterventionAsString(entry)
    }
  },

  groupEntriesByWhich: function (entries) {
    var getWhichAsString = this.getWhichAsString
    return _.groupBy(entries, function (entry) {
      return getWhichAsString(entry)
    })
  },

  groupEntriesByDurationNatural: function (entries) {
    var getDurationInWeeks = this.getDurationInWeeks
    var getDurationNatural = this.getDurationNatural
    return _.groupBy(entries, function (entry) {
      var durationNatural = getDurationNatural(getDurationInWeeks(entry.duration))
      var key = durationNatural.duration + ' ' + durationNatural.interval
      return key
    })
  },

  groupEntriesByDuration: function (entries) {
    // return this.groupEntriesByDurationNatural(entries)
    var getDurationInWeeks = this.getDurationInWeeks
    return _.groupBy(entries, function (entry) {
      return getDurationInWeeks(entry.duration)
    })
  },

  groupEntriesByInterventionAndDuration: function (entries) {
    var groupEntriesByDurationNatural = this.groupEntriesByDurationNatural
    var groupEntriesByIntervention = this.groupEntriesByIntervention
  
    var results = {}
    var entriesByIntervention = groupEntriesByIntervention(entries)
    _.each(entriesByIntervention, function (val, key) {
      var byDuration = groupEntriesByDurationNatural(val)
      results[key] = byDuration
    })

    return results
  },

  groupEntriesByPrimaryInterventionAndDuration: function (entries) {
    var groupEntriesByDurationNatural = this.groupEntriesByDurationNatural
    var groupEntriesByPrimaryIntervention = this.groupEntriesByPrimaryIntervention
  
    var results = {}
    var entriesByIntervention = groupEntriesByPrimaryIntervention(entries)
    _.each(entriesByIntervention, function (val, key) {
      var byDuration = groupEntriesByDurationNatural(val)
      results[key] = byDuration
    })

    return results
  },

  groupEntriesByWhichAndDuration: function (entries) {
    var groupEntriesByDuration = this.groupEntriesByDuration
    var groupEntriesByWhich = this.groupEntriesByWhich
  
    var entriesByWhichAndDuration = {}
    var entriesByWhich = groupEntriesByWhich(entries)
    _.each(entriesByWhich, function (val, key) {
      var byDuration = groupEntriesByDuration(val)
      entriesByWhichAndDuration[key] = byDuration
    })

    return entriesByWhichAndDuration
  },

  // groupEntriesByDuration: function(entries, boundary) {
  // 	var getDurationInWeeks = this.getDurationInWeeks

  // 	var entriesByDuration = {}

  // 	Object.keys(entries).forEach(function (entry) {
  // 		var currentEntry = entries[entry]

  // 		if (currentEntry.duration) {
  // 			var numberOfWeeks = getDurationInWeeks(currentEntry.duration)

  // 			if (!entriesByDuration[numberOfWeeks]) {
  // 				entriesByDuration[numberOfWeeks] = []
  // 			}
  // 			entriesByDuration[numberOfWeeks].push(currentEntry)
  // 		}
  // 	})
  // 	return entriesByDuration
  // },

  handleMomentDataCellHover: function(medicationName) {
    this.setState({
      keyMedication: medicationName
    })
  },

  renderTimelineByTag: function(data, tags, tag) {
    var dataByTag = this.getDataByTag(tags, data)
    var tagDescriptions = this.props.data.tagDescriptions

    return (
			<div>
				{this.renderTimelineByMeasure(dataByTag[tag])}
	    </div>
		)
  },

  render: function() {
    var classes = cx({
      'processing': true,
      'results': true
    })

    var data                = this.props.data
    var dataFiltered        = this.props.dataFiltered
    var disabledMedications = this.props.disabledMedications
    var measure             = this.props.measure
    var medications         = this.props.medications
    var medicationsMap      = this.props.medicationsMap
    
    var grades              = data.grades
    var measures            = data.measures
    var metrics             = data.metrics
    var tags                = data.tags
    var tagDescriptions     = data.tagDescriptions
    var selectedTag         = this.props.selectedTag

    var handleMomentDataCellHover = this.handleMomentDataCellHover
    var getInterventionAsString = this.getInterventionAsString
    var getDurationInWeeks = this.getDurationInWeeks
    var getDurationNatural = this.getDurationNatural
    var groupEntriesByDuration = this.groupEntriesByDuration
    var renderEntry = this.renderEntry
    var renderValue = this.renderValue

    var keyMedication = this.state.keyMedication

    var renderRelativeRiskComparison = function(entries, measure) {
      var sources = {}

      Object.keys(entries).map(function (key) {
        var entry = entries[key]

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
            <ul className='visualization-rr'>
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

    var renderRiskRelativeToBaselineComparison = function(entries, measure) {
      var sources = {}

      Object.keys(entries).map(function (key) {
        var entry = entries[key]

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
            <ul className='visualization-rr'>
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
      var entries = get.filterEntriesByMedication(get.getEntriesForMeasure(dataFiltered), medications, disabledMedications)
      var populationEntries = get.filterEntriesToPopulationOnly(get.getEntriesForMeasure(dataFiltered))

      // If there are no medication entries, use population entries
      if (entries.length == 0) {
        entries = populationEntries
        var interventions = this.getWhichesFromEntries(entries)
        var entriesByIntervention = this.groupEntriesByWhich(entries)
        var entriesByInterventionAndDuration = this.groupEntriesByWhichAndDuration(entries)
      }
      else {
        var interventions = this.getPrimaryInterventionsFromEntries(entries)
        var entriesByPrimaryIntervention = this.groupEntriesByPrimaryIntervention(entries)
        var entriesByInterventionAndDuration = this.groupEntriesByInterventionAndDuration(entries)

        var groupEntriesByInterventionAndDuration = this.groupEntriesByInterventionAndDuration
        _.each(entriesByPrimaryIntervention, function (val, key) {
          // val == [entry, entry, entry]
          // key == 'methotrexate'
          interventions[key] = groupEntriesByInterventionAndDuration(val)
        })
      }
      var durations = this.getDurationsNaturalFromEntries(entries)



      //
      // Console logging fun
      //
      // console.log('dataFiltered', dataFiltered.length)
      // console.log('entries', entries.length)
      // console.log(entriesByPrimaryIntervention)
      // console.log(entriesByInterventionAndDuration)

      // _.each(dataFiltered, function (entry) {
      //   if (entry.which == 'intervention' && entry.metric == 'ar_1000') {
      //     console.log(entry.intervention, entry.dosage, entry.value.value)
      //   }
      // })

      // _.each(entries, function (entry) {
      //   console.log(entry)
      // })

      // console.log(interventions)
      // console.log(durations)



      // Populate data into natural medication presentation order
      var dataByIntervention = {}
      _.each(medications, function(medication) {
        // Make a row for each unique intervention
        var rows = []
        var entries = _.get(entriesByPrimaryIntervention, medication.name_generic, [])

        var individualInterventions = _.get(interventions, medication.name_generic, {})

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
          _.each(individualInterventions, function (moments, key) {
            // moments == '{'6 months': [entry, entry]}
            // key == 'methotrexate (5 mg)'
            var rowClasses = cx({
              't-row': true
            })

            // var intervention = getInterventionAsString(entry)
            // console.log(key, moments)

            // Get first entry for basic data
            var firstEntry = moments[_.keys(moments)[0]][0]

            rows.push(
              <section key={key} className='chunk'>
                <section className='t-row timeline-labels'>
                  <div className='t-cell moment first'>
                    <section>
                      {measures[measure].name_friendly} for people taking
                    </section>
                  </div>
                  {_.map(durations, function (timepoint) {
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

                  {_.map(durations, function (timepoint, i) {
                    var entries = _.get(moments, timepoint, [])

                    if (entries.length > 0) {
                      // Could have multiple entries for this timpoint; take the first for now
                      var entry = entries[0]
                      if (entry.which !== 'population' && entry.intervention) {
                        return <div
                          key={key + timepoint}
                          className='t-cell moment-data'>
                            <section>
                              {renderValue(entry.intervention)}
                              <Source source={entry.source} kind={entry.kind} /><br />
                              <GradeQuality grade={entry.quality} gradeMap={grades} />
                            </section>
                        </div>
                      }
                      if (entry.which == 'population') {
                        return <div key={key + timepoint} className='t-cell moment-data'>
                          <section>
                            {renderValue(entry.population)}
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

        // [rows] may contain a row for multiple variations of interventions
        // e.g. 'methotrexate', 'methotrexate + infliximab', etc.
        // All should be pushed into the rows belonging to this medication,
        // which is the primary intervention.
        dataByIntervention[medication.name_generic] = rows
      })

      // Enforce natural presentation order
      var resultHtml = []
      _.each(dataByIntervention, function(val, key) {
        // key == 'methotrexate'
        // val == [entries]

        // If this med is disabled, don't show anything
        if (disabledMedications[key]) {
          return
        }
        _.each(dataByIntervention[key], function (row) {
          resultHtml.push(row) 
        })
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
})

module.exports = OutcomeTimeline