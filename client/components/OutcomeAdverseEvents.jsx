/** @jsx React.DOM */

var React = require('react/addons')
var _ = require('lodash')

// Data
var get = require('../data/get.js')

var AbsoluteFrequency = require('./visualizations/AbsoluteFrequency.jsx')
var AbsoluteRiskComparison = require('./visualizations/AbsoluteRiskComparison.jsx')
var Difference = require('./visualizations/Difference.jsx')
var GradeQuality = require('./visualizations/GradeQuality.jsx')
var Intervention = require('./visualizations/Intervention.jsx')
var Population = require('./visualizations/Population.jsx')
var RelativeRiskComparison = require('./visualizations/RelativeRiskComparison.jsx')
var RiskRelativeToBaseline = require('./visualizations/RiskRelativeToBaseline.jsx')
var Source = require('./visualizations/Source.jsx')

var DropdownButton = require('react-bootstrap').DropdownButton
var MenuItem = require('react-bootstrap').MenuItem

String.prototype.capitalizeFirstletter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}
// Outcome adverse events

var OutcomeAdverseEvents = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired,
    dataFiltered: React.PropTypes.array.isRequired,
    disabledMedications: React.PropTypes.object,
    medications: React.PropTypes.array.isRequired,
    measure: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      selectedDetail: null
    }
  },

  renderDataByMeasure: function(selectedMeasure) {
    var measures = this.props.data.measures
    var dataByTag = this.props.dataByTag
    var renderEntry = this.renderEntry

    var renderAbsoluteRiskComparison = function(entries, measure) {
      var sources = {}

      Object.keys(entries).map(function (key) {
        var entry = entries[key]

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

    var measure = selectedMeasure
    var tag = this.props.selectedTag
    var measureData = dataByTag[tag][selectedMeasure].data

    if (measureData) {
      var medications = this.props.medications
      var disabledMedications = this.props.disabledMedications
      var entries = get.filterEntriesByMedication(get.getEntriesForMeasure(measureData), medications, disabledMedications)

      return (
        <div key={measure}>
          {renderRiskRelativeToBaselineComparison(entries, measure)}
        </div>
      )
    }
  },

  // Get the mean of values
  getMeanValue: function(entries) {
    var means = []

    entries.map(function(entry) {
      console.log(entry.intervention[0] + ' vs ' + entry.comparison[0], entry.value.value, entry.duration.high, entry.duration.interval)
      var value = entry.value.value
      if (value) {
        means.push(value)
      }
    })

    if (means.length > 0) {
      var sum = _.sum(means)
      var mean = sum/means.length
      var meansSubtractedSquared = _.map(means, function(val) {
        return Math.pow((val - mean), 2)
      })
      var deviation = Math.sqrt(_.sum(meansSubtractedSquared)/meansSubtractedSquared.length)
      var roundedMean = Math.round(mean)

      console.log('mean of means:', mean)
      console.log('deviation of means:', deviation)
      console.log('rounded mean:', roundedMean)
      
      return roundedMean
    }

    // No mean? Assume the mean is 0.
    return 0
  },

  // Group entries by outcome detail (adverse event name)
  groupEntriesByDetail: function (entries) {
    return _.chain(entries)
            .groupBy(function (entry) {
              return entry.measure_detail
            })
            .value()
  },

  // Group entries into placebo and intervention groups
  groupEntriesByWhich: function(entries) {
    return _.chain(entries)
            .groupBy(function (entry) {
              if (entry.which === 'intervention') {
                return entry.intervention.join(' + ')
              }
              else if (entry.which === 'comparison' && entry.comparison.join() === 'placebo') {
                return 'placebo'
              }
              return 'other'
            })
            .omit('other')
            .value()
  },

  // Get outcome details as list
  getOutcomeDetails: function (entries) {
    return _.chain(entries)
            .map('measure_detail')
            .unique()
            .value()
            .sort()
  },

  handleAdverseEventChange: function (name) {
    this.setState({
      selectedDetail: name
    })
  },

  renderOutcomeDetailMenu: function (names) {
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
  },

  render: function() {
    var cx = React.addons.classSet

    var data                = this.props.data
    var entries        = this.props.dataFiltered
    var medications         = this.props.medications
    var medicationsMap      = this.props.medicationsMap
    var measure             = this.props.measure
    var disabledMedications = this.props.disabledMedications

    var getMeanValue = this.getMeanValue

    // Data by comparison + intervention
    var groupedData = _.groupBy(entries, function (entry) {
      return entry.comparison + entry.intervention
    })

    var outcomeDetails = this.getOutcomeDetails(entries)
    var entriesByDetail = this.groupEntriesByDetail(entries)
    var selectedDetail = this.state.selectedDetail

    var resultHtml = []
    
    // If an outcome detail is selected, we can get results
    if (selectedDetail) {
      var html =[]

      // Get data for this detail
      var entriesForSelectedDetail = entriesByDetail[selectedDetail]
      var entriesByWhichForSelectedDetail = this.groupEntriesByWhich(entriesForSelectedDetail)
      var means = {}
      _.each(entriesByWhichForSelectedDetail, function (value, key) {
        var mean = getMeanValue(value)
        means[key] = mean
      })
      
      // Populate data into natural medication presentation order
      var dataByIntervention = {
        placebo: _.get(means, 'placebo')
      }
      _.each(medications, function(medication) {
        dataByIntervention[medication.name_generic] = _.get(means, medication.name_generic)
      })

      // Enforce natural presentation order
      _.each(dataByIntervention, function(val, key) {
        // key == 'methotrexate'
        // val == meanValue || empty

        // If this med is disabled, don't show anything
        if (disabledMedications[key]) {
          return
        }

        var inlineStyle = {
          width: '210px',
          flex: '0 1 auto',
          marginRight: '10px',
          hyphens: 'auto'
        }

        // There is data
        if (val) {
          html.push(
            <span key={key + selectedDetail} className='pad-b-4' style={inlineStyle}>
              <Intervention interventionName={key.capitalizeFirstletter()} />
              <div className='pad-t-1 pad-b-2 font-size-2'>
                <strong>{val} people</strong> <span className='light'>out of 100</span><br />
                <span className='small'>
                  would be expected to experience<br />
                  {selectedDetail}
                </span>
              </div>
              <AbsoluteFrequency
                frequency={val}
                metric={'ar_100'}
                denominator={100} 
                breakpoint={10}
                baseline={null} />
            </span>
          )
        }
        // There is no data
        else {
          html.push(
            <span key={key + selectedDetail} className='pad-b-4 opacity-3' style={inlineStyle}>
              <Intervention
                interventionName={key.capitalizeFirstletter()} />
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
          )
        }
      })

      resultHtml.push(
        <div key={selectedDetail + 'ae'} className='pad-b-5'>
          <h2 className='font-size-7 font-lighter light pad-b-3'>{selectedDetail}</h2>
          <div className='flex flex-row'>{html}</div>
        </div>
      )
    }

    var classes = cx({
      'adverse-events results pad-l-5 pad-r-5': true,
    })
    var style = {
      minHeight: '300px'
    }

    return <section style={style} className={classes}>
      <div>{this.renderOutcomeDetailMenu(outcomeDetails)}</div>
      {resultHtml}
    </section>
  }
})

/*
      {_.map(groupedData, function (group) {
        var firstEntry = group[0]
        var comparison = firstEntry.comparison.join(' + ')
        var intervention = firstEntry.intervention.join(' + ')
        
        var groupedByDetail = _.chain(group)
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

              var name = clump[0].measure_detail

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

module.exports = OutcomeAdverseEvents