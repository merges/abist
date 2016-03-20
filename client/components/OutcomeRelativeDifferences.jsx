/** @jsx React.DOM */

var React = require('react/addons');
var cx = React.addons.classSet
var _ = require('lodash');
var get = require('../data/get.js');

var Difference = require('./visualizations/Difference.jsx');
var GradeQuality = require('./visualizations/GradeQuality.jsx');
var Intervention = require('./visualizations/Intervention.jsx');
var Population = require('./visualizations/Population.jsx');
var RelativeChangeBlocks = require('./visualizations/RelativeChangeBlocks.jsx');
var Source = require('./visualizations/Source.jsx');

// Relative change e.g. change in pain

var OutcomeRelativeDifferences = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired,
    dataFiltered: React.PropTypes.array.isRequired,
    disabledMedications: React.PropTypes.object,
    medications: React.PropTypes.array.isRequired,
    measure: React.PropTypes.string
  },

  // This function gets the mean of placebo values
  getMeanPlaceboChange: function(acceptableMetrics, sortedEntries) {
    var means = []
    sortedEntries.map(function(entry) {
      // Ignore this entry if it doesn't involve comparison with placebo
      if (!entry.comparison) {
        return
      }
      // Check to see whether this entry has an appropriate metric
      var metricToUse = _.find(acceptableMetrics, _.partial(_.has, entry.intervention))
      if (metricToUse && entry.comparison[metricToUse]) {
        var value = entry.comparison[metricToUse].value.value
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
      var roundedMean = mean.toFixedNumber(2)

      // console.log('mean of means:', mean)
      // console.log('deviation of means:', deviation)
      // console.log('rounded mean:', roundedMean)
      
      return roundedMean
    }

    // No mean? Assume the baseline change is 0.
    return 0
  },

  // Get the mean of values
  getMeanValue: function(entries) {
    var values = []

    entries.map(function(entry) {
      // console.log(entry.intervention[0] + entry.dosage.dosage + ' ' + entry.comparison[0])
      var value
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
      var sum = _.sum(values)
      var mean = sum/values.length
      var valuesSubtractedSquared = _.map(values, function(val) {
        return Math.pow((val - mean), 2)
      })
      var deviation = Math.sqrt(_.sum(valuesSubtractedSquared)/valuesSubtractedSquared.length)
      var roundedMean = Math.round(mean)

      // console.log('mean of values:', mean)
      // console.log('deviation of values:', deviation)
      // console.log('rounded mean:', roundedMean)
      
      return roundedMean
    }

    // No mean? Assume the mean is 0.
    return 0
  },

  getChangeValue: function(value, metricToUse, placeboMean) {
    /*
    
    Get the value as a change metric. placeboMean is the unweighted pooled placebo change
    from baseline. The baseline is unknown; we trust the mean of placebo values for
    the purposes of this UI.

    Some metrics already report a mean change. We leave those alone. Metrics that report
    a *difference* need to have the placeboMean added to come up with the total change
    from baseline.

    For example:
      - placeboMean                   = -9.9  (-9.9 mean placebo change from baseline)
      - value is mean_change_100      = -23.7 (-23.7 mean change on a 100 pt scale)
      - value is mean_difference_100  = -15.2 (-15.2 mean difference from placebo on a 100 pt scale)

    The mean_change_100 value can be left alone. It's already a value expressed as
    change from baseline.

    The mean_difference_100 value needs to have the placeboMean added to it.
    It's currently expressed as difference between intervention and placebo,
    and we need it to be expressed as change from baseline.

    https://docs.google.com/spreadsheets/d/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/edit#gid=1186511571
    Each metric in the metrics spreadsheet has a "kind" field that describes whether
    it is an absolute, relative, or difference metric. If our metricToUse is a *difference*
    metric, we need to do this calculation with the placeboMean.

    TODO: Using study sample size (which we have) the placeboMean can be weighted.
    
    */
    
    var metrics = this.props.data.metrics
    var kind = metrics[metricToUse].kind
    if (kind == 'difference') {
      value = value + placeboMean
    }

    // Now transform this into minimally important difference (MID) units.
    // For 100 mm scale, which this is limited to right now, it's 10.
    var mid = 10 // Minimally important difference
    var value = Math.round(value / mid) * 10
    
    return value

    // UNUSED
    // Calculate the mean_score_difference based on the pooled placeboMean
    // var difference = (value - placeboMean).toFixedNumber(2)

    // UNUSED
    // Calculate difference in stdDevs and round
    // var difference = Math.round((value - placeboMean) / deviation) * 10
  },

  // Group entries by intervention and dosage
  groupEntriesByInterventionAndDosage: function (entries) {
    return _.chain(entries)
            .groupBy(function (entry) {
              // Group entries by intervention + dosage
              if (entry.intervention) {
                var intervention = _.cloneDeep(entry.intervention.parts)
                if (entry.intervention.dosage.dosage) {
                  intervention[0] += ' (' + entry.intervention.dosage.dosage + ')'
                }
                return intervention.join(' + ')
              }
              return 'other'
            })
            // If we have populations or other types of entries, discard them
            .omit('other')
            .value()
  },

  render: function() {
    var data                = this.props.data
    var dataFiltered        = this.props.dataFiltered
    var disabledMedications = this.props.disabledMedications
    var medications         = this.props.medications
    var medicationsMap      = this.props.medicationsMap
    var measures            = this.props.data.measures
    var measure             = this.props.measure
    var grades              = data.grades
    
    /*

    Filter out entries where the comparison was not placebo, and the entry reports
    a mean difference. For the purposes of this UI, we want to focus on outcomes where:

    - The comparison was placebo, and there is a mean difference reported
    - A mean change is reported, regardless of what the comparison was (we don't care)

    This UI will pool placebo means together and *add* that mean to the mean difference
    data, to arrive at a mean change. The mean change scores will be converted into
    minimally important difference (MID) units.
    
    */
    var entries = get.filterEntriesWithNonPlaceboComparisons(get.filterEntriesByMedication(get.getEntriesForMeasure(dataFiltered), medications, disabledMedications))
    var sortedEntries = _.sortBy(entries, function(entry) {
      if (entry.intervention) {
        return entry.intervention.parts[0]
      }
    })

    // _.each(entries, function (entry) {
    //   console.log(entry.intervention.parts)
    // })

    // Acceptable metrics for comparison
    var acceptableMetrics = [
      'mean_difference_100',
      'mean_difference_10',
      'mean_change_100',
      'mean_change_10'
    ]

    // This function gets the value in just the way we want it,
    // as a change statistic and expressed in the units we want
    var getChangeValue = this.getChangeValue
    var placeboMean = this.getMeanPlaceboChange(acceptableMetrics, sortedEntries)
    // var deviation = this.getInterventionValues(acceptableMetrics, sortedEntries, placeboMean)

    // Populate data into natural medication presentation order
    var dataByIntervention = {
      placebo: []
    }
    _.each(medications, function(medication) {
      dataByIntervention[medication.name_generic] = []
    })

    var inlineStyle = {
      display: 'inline-block',
      verticalAlign: 'text-bottom'
    }

    // Build rows
    dataByIntervention['placebo'].push(
      <tr key={'placebo'}>
        <td className='pad-t-4 pad-b-1 text-right'>
          <Intervention interventionName={'Placebo'} />
        </td>
        <td></td>
        <td></td>
      </tr>
    )
    dataByIntervention['placebo'].push(
      <tr key={'placebo' + 'data'}>
        <td className='text-right vertical-align-bottom'>
          <RelativeChangeBlocks value={placeboMean} />
        </td>
        <td></td>
        <td className='pad-l-4 vertical-align-bottom'>
          <span style={inlineStyle}>
            <Source label='pooled from all sources below' />
          </span>
          <span style={inlineStyle}>
            <GradeQuality grade={null} gradeMap={grades} />
          </span>
        </td>
      </tr>
    )

    var entriesGroupedByInterventionAndDosage = this.groupEntriesByInterventionAndDosage(entries)
    // TODO switch to using the entriesGroupedByInterventionAndDosage,
    // and get the means when there is more than one entry


    sortedEntries.forEach(function(entry, i) {
      // Ignore this entry if it does not report an outcome for an intervention
      if (!entry.intervention) {
        return
      }
      
      // Check to see whether this entry has an appropriate metric
      var metricToUse = _.find(acceptableMetrics, _.partial(_.has, entry.intervention))
      if (metricToUse) {
        var value = entry.intervention[metricToUse].value.value
        
        // Ignore this entry if it's for a drug we don't support
        if (!dataByIntervention[entry.intervention.parts[0]]) {
          return
        }
        // Ignore this entry if for some reason it doesn't have a value      
        if (!value) {
          return
        }

        // Get the value as change from baseline, which may involve a little math
        // depending on the metric being used
        var changeValue = getChangeValue(value, metricToUse, placeboMean)

        dataByIntervention[entry.intervention.parts[0]].push(
          <tr key={entry.intervention.parts.join(' + ') + i}>
            <td className='pad-t-4 pad-b-1 text-right'>
              <Intervention
                intervention={entry.intervention.parts}
                interventionName={entry.intervention.parts.join(' + ')}
                dosage={entry.intervention.dosage}
                medicationsMap={medicationsMap} />
            </td>
            <td></td>
            <td></td>
          </tr>
        )
        dataByIntervention[entry.intervention.parts[0]].push(
          <tr key={entry.intervention.parts.join(' + ') + i + 'data'}>
            <td className='text-right vertical-align-bottom'>
              <RelativeChangeBlocks value={changeValue} />
            </td>
            <td></td>
            <td className='pad-l-4 vertical-align-bottom'>
              <span style={inlineStyle}>
                <Source source={entry.source} kind={entry.kind} />
              </span>
              <span style={inlineStyle}>
                <GradeQuality grade={entry.quality} gradeMap={grades} />
              </span>
            </td>
          </tr>
        )
      }
    })

    // Enforce natural presentation order
    var rows = []
    _.each(dataByIntervention, function(val, key) {
      // key == 'methotrexate'
      // val == meanValue || empty

      // If this med is disabled, don't show anything
      if (disabledMedications[key]) {
        return
      }
      // No data
      if (dataByIntervention[key].length == 0) {
        rows.push(
          <tr key={key}>
            <td className='pad-t-4 pad-b-1 text-right opacity-3'>
              <small>No {measure.name_friendly} info for</small> <Intervention intervention={[key]} />
            </td>
            <td></td>
            <td></td>
          </tr>
        )
      }
      // Data
      _.each(dataByIntervention[key], function(row) {
        rows.push(row)
      })
    })

    return <table>
      <tbody>
        <tr className='border-b-1'>
          <td>
            <h3>‹ less {measures[measure].name_friendly}</h3>
          </td>
          <td></td>
          <td></td>
        </tr>
        {rows}
      </tbody>
    </table>
  }
});

module.exports = OutcomeRelativeDifferences;