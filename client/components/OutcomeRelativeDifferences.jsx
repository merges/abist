/** @jsx React.DOM */

var React = require('react/addons');
var cx = React.addons.classSet
var _ = require('lodash');
var get = require('../data/get.js');

var Difference = require('./visualizations/Difference.jsx');
var GradeQuality = require('./visualizations/GradeQuality.jsx');
var Intervention = require('./visualizations/Intervention.jsx');
var Population = require('./visualizations/Population.jsx');
var RelativeDifferenceBlocks = require('./visualizations/RelativeDifferenceBlocks.jsx');
var Source = require('./visualizations/Source.jsx');

// Outcome relative difference blocks (i.e. change in pain)

var OutcomeRelativeDifferences = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired,
    dataFiltered: React.PropTypes.array.isRequired,
    disabledMedications: React.PropTypes.object,
    medications: React.PropTypes.array.isRequired,
    measure: React.PropTypes.string
  },

  getComparisonMean: function(acceptableMeasures, sortedEntries) {
    function Med (drug, score) {
      this.drug = drug
      this.score = score
    }
    var Meds = {}
    var means = []
    
    var counter = 0;
    sortedEntries.map(function(entry) {
      // Return if this entry doesn’t have an intervention
      if (!entry.comparison) {
        return
      }
      // Check to see whether this entry has an appropriate metric
      var measureToUse = _.find(acceptableMeasures, _.partial(_.has, entry.intervention))
      if (measureToUse) {
        var value = entry.comparison[measureToUse].value.value
        if (value) {
          value && means.push(value)
          Meds[counter] = new Med(entry.intervention.parts.join(' + '), value)
          counter++
        }
      }
    })

    if (counter !== 0) {
      var sum = _.sum(means)
      var mean = sum/means.length
      var meansSubtractedSquared = _.map(means, function(val) {
        return Math.pow((val - mean), 2)
      })
      var deviation = Math.sqrt(_.sum(meansSubtractedSquared)/meansSubtractedSquared.length)
      console.log(sum, mean, deviation)
      console.table(Meds, ['drug', 'score'])
    }

    var roundedMean = mean.toFixed(2)
    console.log('mean', roundedMean)
    return roundedMean
  },

  getInterventionValues: function(acceptableMeasures, sortedEntries, comparisonMean) {
    function Med (drug, score, normalized, difference) {
      this.drug = drug
      this.score = score
      this.normalized = normalized
      this.difference = difference
    }
    var Meds = {}
    var means = []

    newEntries = []
    
    var counter = 0;
    sortedEntries.map(function(entry) {
      // Return if this entry doesn’t have an intervention
      if (!entry.intervention) {
        return
      }
      // Check to see whether this entry has an appropriate metric
      var measureToUse = _.find(acceptableMeasures, _.partial(_.has, entry.intervention))
      if (measureToUse) {
        var value = entry.intervention[measureToUse].value.value
        if (value) {
          newEntries.push(_.cloneDeep(entry))

          value && means.push(value)
          Meds[counter] = new Med(entry.intervention.parts.join(' + '), value, null, null)
          var difference = (value - comparisonMean).toFixed(2)
          Meds[counter].difference = difference
          counter++   
        }
      }
    })

    if (counter !== 0) {
      var sum = _.sum(means)
      var mean = sum/means.length
      var meansSubtractedSquared = _.map(means, function(val) {
        return Math.pow((val - mean), 2)
      })
      var deviation = Math.sqrt(_.sum(meansSubtractedSquared)/meansSubtractedSquared.length).toFixed(2)
      var meansNormalized = _.map(means, function(val, i) {
        var normalized = (val - mean) / deviation
        Meds[i].normalized = normalized
        return normalized
      })

      // Normalized difference? # of stdDevs better than placebo
      _.each(newEntries, function (entry, i) {
        var differenceInDeviations = Meds[i].difference / deviation
        Meds[i]['differenceNormalized'] = differenceInDeviations
      })

      console.log('mean', mean, '-----', 'deviation', deviation)
      console.table(Meds, ['drug', 'score', 'normalized', 'difference', 'differenceNormalized'])
    }
  },

  render: function() {
    var classes = cx({
      'processing': true,
      'results': true
    })

    var data = this.props.data
    var dataFiltered = this.props.dataFiltered
    var disabledMedications = this.props.disabledMedications
    var medications = this.props.medications
    var medicationsMap = this.props.medicationsMap
    var measure = this.props.measure
    var grades = data.grades

    var entries = get.filterEntriesByMedication(get.getEntriesForMeasure(dataFiltered), medications, disabledMedications);
    var sortedEntries = _.sortBy(entries, function(entry) {
      if (entry.intervention) {
        return entry.intervention.parts[0]
      }
    })
    
    var acceptableMeasures = [
      'mean_difference_100',
      'mean_difference_10',
      'mean_score_change_100'
    ]
    
    // TODO re-scale everything to 100
    var comparisonMean = this.getComparisonMean(acceptableMeasures, sortedEntries)
    var mid = 10 // Minimally important difference

    this.getInterventionValues(acceptableMeasures, sortedEntries, comparisonMean)
    
    return <div>
      {sortedEntries.map(function(entry, i) {

        // Return if this entry doesn’t have an intervention
        if (!entry.intervention) {
          return
        }

        // Check to see whether this entry has an appropriate metric
        var measureToUse = _.find(acceptableMeasures, _.partial(_.has, entry.intervention))
        console.log(measureToUse)

        if (measureToUse) {
          var value = entry.intervention[measureToUse].value.value

          if (value != null) {
            // Calculate the mean_score_difference based on the pooled comparisonMean
            var difference = (value - comparisonMean).toFixed(2)
            
            var inlineStyle = {
              display: 'inline-block',
              verticalAlign: 'text-bottom'
            }

            return (
              <div key={i} className='pad-b-4'>
                <div>
                  <Intervention
                    intervention={entry.intervention.parts}
                    interventionName={entry.intervention.parts.join(' + ')}
                    dosage={entry.intervention.dosage}
                    medicationsMap={medicationsMap} />
                </div>
                <div>
                  <span style={inlineStyle} className='pad-r-3'>
                    <RelativeDifferenceBlocks key={i} value={difference} />
                  </span>
                  <span style={inlineStyle}>
                    <Source source={entry.source} kind={entry.kind} />
                  </span>
                  <span style={inlineStyle}>
                    <GradeQuality grade={entry.quality} gradeMap={grades} />
                  </span>
                </div>
              </div>
            )
          }
        }
      })}
    </div>
  }
});

module.exports = OutcomeRelativeDifferences;