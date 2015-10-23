/** @jsx React.DOM */

var React = require('react/addons')
var _ = require('lodash')

// Data
var get = require('../data/get.js')

var AbsoluteFrequency = require('./visualizations/AbsoluteFrequency.jsx')
var Difference = require('./visualizations/Difference.jsx')
var GradeQuality = require('./visualizations/GradeQuality.jsx')
var Intervention = require('./visualizations/Intervention.jsx')
var Population = require('./visualizations/Population.jsx')
var RelativeRiskComparison = require('./visualizations/RelativeRiskComparison.jsx')
var RiskRelativeToBaseline = require('./visualizations/RiskRelativeToBaseline.jsx')
var Source = require('./visualizations/Source.jsx')

// Outcome timeline test

var OutcomeTimeline = React.createClass({
	propTypes: {
    data: React.PropTypes.object.isRequired,
		disabledMedications: React.PropTypes.object,
    medications: React.PropTypes.array.isRequired
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
        console.log('looping')
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
        <strong>{data.value && (metric == 'ar_1000' ? Math.floor(data.value * 0.1) : data.value)}</strong> <span className='light'>of 100 people</span>
        <AbsoluteFrequency frequency={data.value} metric={metric} denominator={100} breakpoint={10} baseline={baseline} />
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

  getDurationAsWeeks: function(duration) {
		// Should average to get common duration? Or use one end of range?
		// i.e. if 4 to 12 weeks, use 4, 12, or 8?

    console.log(duration)

    if (duration.low) {
  		if (duration.interval == 'year') {
        return duration.low * 52
      }
      if (duration.interval == 'month') {
  			return duration.low * 4
  		}
  		if (duration.interval == 'week') {
  			return duration.low
  		}
    }
    if (duration.high) {
      if (duration.interval == 'year') {
        return duration.high * 52
      }
      if (duration.interval == 'month') {
        return duration.high * 4
      }
      if (duration.interval == 'week') {
        return duration.high
      }
    }
    return ('an unknown number of')
	},

  getDurationsFromEntries: function(entries) {
    var getDurationAsWeeks = this.getDurationAsWeeks
    var durations = {}
    _.each(entries, function (entry) {
      if (entry.duration) {
        var numberOfWeeks = getDurationAsWeeks(entry.duration)
        durations[numberOfWeeks] = true
      }
    })
    return _.keys(durations)
  },

  getInterventionAsString: function(entry) {
    if (entry.intervention) {
      return entry.intervention.parts.join(' + ')
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

  getWhichesFromEntries: function(entries) {
    var getPopulationAsString = this.getPopulationAsString
    var getInterventionAsString = this.getInterventionAsString

    var whiches = {}
    _.each(entries, function (entry) {
      if (entry.which == 'population' && entry.population) {
        whiches[getPopulationAsString(entry)] = entry
      }
      if (entry.which == 'intervention' && entry.intervention) {
        whiches[getInterventionAsString(entry)] = entry
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

  groupEntriesByWhich: function(entries) {
    var getWhichAsString = this.getWhichAsString
    return _.groupBy(entries, function (entry) {
      return getWhichAsString(entry)
    })
  },

  groupEntriesByDuration: function(entries) {
    var getDurationAsWeeks = this.getDurationAsWeeks
    return _.groupBy(entries, function (entry) {
      return getDurationAsWeeks(entry.duration)
    })
  },

  groupEntriesByInterventionAndDuration: function(entries) {
    var groupEntriesByDuration = this.groupEntriesByDuration
    var groupEntriesByIntervention = this.groupEntriesByIntervention
  
    var entriesByInterventionAndDuration = {}
    var entriesByIntervention = groupEntriesByIntervention(entries)
    _.each(entriesByIntervention, function (val, key) {
      var byDuration = groupEntriesByDuration(val)
      entriesByInterventionAndDuration[key] = byDuration
    })

    return entriesByInterventionAndDuration
  },

  groupEntriesByWhichAndDuration: function(entries) {
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
  // 	var getDurationAsWeeks = this.getDurationAsWeeks

  // 	var entriesByDuration = {}

  // 	Object.keys(entries).forEach(function (entry) {
  // 		var currentEntry = entries[entry]

  // 		if (currentEntry.duration) {
  // 			var numberOfWeeks = getDurationAsWeeks(currentEntry.duration)

  // 			if (!entriesByDuration[numberOfWeeks]) {
  // 				entriesByDuration[numberOfWeeks] = []
  // 			}
  // 			entriesByDuration[numberOfWeeks].push(currentEntry)
  // 		}
  // 	})
  // 	return entriesByDuration
  // },

  renderTimelineByMeasure: function(measures, direction) {
    var cx = React.addons.classSet

    var measureMap = this.props.data.measures
    var grades = this.props.data.grades
    var getInterventionAsString = this.getInterventionAsString
    var getDurationAsWeeks = this.getDurationAsWeeks
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
                <h3><strong>relative risk</strong> › {measureMap[measure].name_friendly}</h3>
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
                <h3><strong>relative risk</strong> › {measureMap[measure].name_friendly}</h3>
              </li>
              <li>
                <RiskRelativeToBaseline
                  comparison={sources[comparison].comparison}
                  items={sources[comparison].items}
                  measure={measure}
                  measures={measureMap} />
              </li>
            </ul>
          )
        }
      })
    }

    var measure = this.props.selectedMeasure
    var measureData = measure && measures[measure].data
    !direction && (direction = 'horizontal')

    console.log('about to render something')

    // Render a timeline
    if (measure && measureData) {
      console.log('rendering a timeline')

      var medications = this.props.medications
      var disabledMedications = this.props.disabledMedications

      // Vertical
      if (direction == 'vertical') {
        var durations = groupEntriesByDuration(get.filterEntriesByMedication(get.getEntriesForMeasure(measureData), medications, disabledMedications))

        return (
        	<div key={'outcome-timeline' + measure}>
          	<section className='outcome-timeline'>
  		      	<section>
  		      		<div className='moment'>
  		      			<section>
  		        			<div className='title'></div>
  		        			<div className='line'>
  		        				<div className='bar'></div>
  		        			</div>
  		        			<div className='description'>Treatment</div>
  		        		</section>
  		      		</div>
  		      		<div className='moment-data'>
  		      			<section>
  			      			{Object.keys(durations).map(function (numberOfWeeks) {
  				        		var entries = durations[numberOfWeeks]

  					        	return entries.map(function (entry, i) {
  					      			if (entry.intervention) {
  					      				return (
  							         		<div key={i}>
                              <Intervention intervention={entry.intervention.parts.join(' + ')} dosage={entry.intervention.dosage} />
                              {entry.comparison &&
                              	<div className='light'>
                              		vs.<br />
                              		{entry.comparison.parts.join(' + ')}
                              	</div>
                              }
                              <Source source={entry.source} kind={entry.kind} />
                              <GradeQuality grade={entry.quality} gradeMap={grades} />
                            </div>
  							         	)
  							        }
  						       	})
  									})}
  								</section>
  			      	</div>
  			      </section>

              {Object.keys(durations).map(function (timepoint) {
  			      	return (
  			      		<section key={measure + timepoint}>
  				      		<div className='moment'>
  				      			<section>
  				        			<div className='title'><strong>at {timepoint} weeks</strong></div>
  				        			<div className='line'>
  				        				<div className='ball'></div>
  				        			</div>
  				        			<div className='description'>
  				        				<strong>{measureMap[measure].name_short}</strong> {measureMap[measure].name_friendly}
  					              {measureMap[measure].description && <p>{measureMap[measure].description}</p>}
  				        			</div>
  				        		</section>
  				      		</div>
  				      		<div className='moment-data'>
  							      <section>
  					      			{Object.keys(durations).map(function (numberOfWeeks) {
  						        		var entries = durations[numberOfWeeks]
  						        		return entries.map(function (entry, i) {
                            if (entry.intervention && (getDurationAsWeeks(entry.duration) == timepoint)) {
  								      			return (
  									         		<div key={i}>
  									         			{/* entry.intervention.ar_1000 ? renderValue(entry.intervention, 'ar_1000') : renderValue(entry.intervention, 'ar_100') */}
                                  {renderValue(entry.intervention)}
  									         		</div>
  									         	)
  									        }
  									        else if (entry.intervention) {
  									        	return (<div key={i}></div>)
  									        }
  									      })
  											})}
  										</section>
  							    </div>
  				      	</section>
  				      )
  						})}
  					</section>
  		    </div>
  		  )
      }
      
      // Horizontal
      var entries = get.filterEntriesByMedication(get.getEntriesForMeasure(measureData), medications, disabledMedications)
      var populationEntries = get.filterEntriesToPopulationOnly(get.getEntriesForMeasure(measureData))

      if (entries.length == 0) {
        entries = populationEntries
        var entriesByDuration = groupEntriesByDuration(entries)
        var entriesByIntervention = this.groupEntriesByWhich(entries)
        var durations = this.getDurationsFromEntries(entries)
        var interventions = this.getWhichesFromEntries(entries)
        var interventionsSorted = _.keys(interventions).sort()
        var entriesByInterventionAndDuration = this.groupEntriesByWhichAndDuration(entries)
      }
      else {
        var entriesByDuration = groupEntriesByDuration(entries)
        var entriesByIntervention = this.groupEntriesByWhich(entries)
        var durations = this.getDurationsFromEntries(entries)
        var interventions = this.getInterventionsFromEntries(entries)
        var interventionsSorted = _.keys(interventions).sort()
        var entriesByInterventionAndDuration = this.groupEntriesByWhichAndDuration(entries)
      }
      

      

      // console.log('------------GROUPED ENTRIES------------')
      // _.each(entriesByInterventionAndDuration, function(val, key) {
      //   _.each(val, function(val, key) {
      //     console.log(val[0].intervention.parts.join(' + '), val[0].duration)
      //   })
      // })

      // console.log('------------ORIGINAL ENTRIES-------------')
      // _.each(entries, function(val, key) {
      //   console.log(val.intervention.parts.join(' + '), val.duration)
      // })

      // console.log('------------DURATIONS------------')
      // console.log(durations)

      // console.log(entriesByInterventionAndDuration)

      console.log(interventionsSorted)

      var handleMomentDataCellHover = this.handleMomentDataCellHover

      return (
        <div key={'outcome-timeline' + measure}>
          <section className='measure-description'>
            <h3>{measureMap[measure].name_long}</h3>
            <h4>Researchers measure this and call it <strong>{measureMap[measure].name_short}</strong>: {measureMap[measure].description && measureMap[measure].description}</h4>
            <h5>
              <strong>About this timeline.</strong><br />
              When researchers study RA medications, they look at how people are doing a certain number of weeks after starting treatment. Each study checks in with people at a different time. This timeline shows the best guess of each treatment’s effects at whatever time the researchers followed up.
            </h5>
          </section>

          <section className='outcome-timeline horizontal'>
            <section className='t-row timeline-header'>
              <div className='t-cell moment'>
                <section>
                  <div className='title strong'>Treatment group</div>
                  <div className='description'>This is the treatment or group of people that was studied. Sometimes it’s one medication, sometimes a combination. There isn’t always information about the dose.</div>
                </section>
              </div>
              {durations.map(function (timepoint) {
                return (
                  <div key={measure + timepoint} className='t-cell moment'>
                    <section>
                      <div className='ball'></div>
                      <div className='title strong'>at {timepoint} weeks</div>
                      <div className='description'>This is the best guess of {measureMap[measure].name_friendly} at this time after starting treatment</div>
                    </section>
                  </div>
                )
              })}
            </section>

            {/* TODO: Separately and specially handle population. */}

            {_.map(interventionsSorted, function (intervention) {
              var entry = interventions[intervention];
              var rowClasses = cx({
                't-row': true,
                'active': keyMedication == intervention
              })
              return (
                <section key={intervention} className={rowClasses}>
                  <div className='t-cell subject'>
                    {entry.which != 'population' && <Intervention intervention={entry.intervention.parts.join(' + ')} dosage={entry.intervention.dosage} />}
                    {entry.which == 'population' && <Population population={entry.population.parts.join(' + ')} dosage={entry.dosage} />}
                    {entry.comparison &&
                      {/*<div className='pull-tab light'>
                        vs.<br />
                        {entry.comparison.parts.join(' + ')}
                      </div>
                      TODO: display comparison appropriately */}
                    }
                    <Source source={entry.source} kind={entry.kind} /><br />
                    <GradeQuality grade={entry.quality} gradeMap={grades} />
                  </div>
                  {durations.map(function (timepoint, i) {
                    if (entriesByInterventionAndDuration[intervention][timepoint]) {
                      var entry = entriesByInterventionAndDuration[intervention][timepoint][0]
                      if (entry.which != 'population' && entry.intervention) {
                        return (
                          <div
                            key={intervention + timepoint}
                            className='t-cell moment-data'
                            onMouseEnter={handleMomentDataCellHover.bind(null, intervention)}>
                              <section>
                                {renderValue(entry.intervention)}
                              </section>
                          </div>
                        )
                      }
                      if (entry.which == 'population') {
                        return (
                          <div key={intervention + timepoint} className='t-cell moment-data'>
                            <section>
                              {renderValue(entry.population)}
                            </section>
                          </div>
                        )
                      }
                    }
                    else {
                      return (
                        <div key={intervention + timepoint} className='t-cell moment'><span className=
                        'light'>--</span></div>
                      )
                    }
                  })}
                </section>
              )
            })}
          </section>
        </div>
      )
	  }
    if (measure) {
      return (
        <div key={'outcome-timeline' + measure}>
          <section className='measure-description'>
            <h3>{measureMap[measure].name_long}</h3>
            <h4>Researchers measure this and call it <strong>{measureMap[measure].name_short}</strong>: {measureMap[measure].description && measureMap[measure].description}</h4>
            <h4><strong>This prototype doesn’t have enough data in it yet to show information for the medications you’ve selected.</strong></h4>
          </section>
        </div>
      )
    }
  },

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
    var cx = React.addons.classSet

    // Medication filtering-related
    var medications = this.props.medications
    var preferences = this.props.preferences
    var risks = this.props.risks
    var risksFriendly = this.props.risksFriendly
    var disabledMedications = this.props.disabledMedications

    var classes = cx({
      'processing': true,
      'results': true
    })

    // Data
    var grades          = this.props.data.grades
    var measures        = this.props.data.measures
    var metrics         = this.props.data.metrics
    var tags            = this.props.data.tags
    var tagDescriptions = this.props.data.tagDescriptions
    var data            = this.props.data.data

    var selectedTag     = this.props.selectedTag

    return (
      <div className={classes}>
        {selectedTag !== null && this.renderTimelineByTag(data, tags, selectedTag)}
      </div>
    )
  }
})

module.exports = OutcomeTimeline