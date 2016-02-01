/** @jsx React.DOM */

var React = require('react/addons');
var cx = React.addons.classSet
var _ = require('lodash');
var get = require('../data/get.js');

var AbsoluteFrequency = require('./visualizations/AbsoluteFrequency.jsx');
var Difference = require('./visualizations/Difference.jsx');
var GradeQuality = require('./visualizations/GradeQuality.jsx');
var Intervention = require('./visualizations/Intervention.jsx');
var Population = require('./visualizations/Population.jsx');
var Source = require('./visualizations/Source.jsx');
var VisualAnalogScale = require('./visualizations/VisualAnalogScale.jsx');

// Outcome differences

var OutcomeDifferences = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired,
    dataFiltered: React.PropTypes.array.isRequired,
    disabledMedications: React.PropTypes.object,
    medications: React.PropTypes.array.isRequired,
    measure: React.PropTypes.string
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
    var measure = this.props.measure

    var grades = data.grades

    var entries = get.filterEntriesByMedication(get.getEntriesForMeasure(dataFiltered), medications, disabledMedications);

    var sortedEntries = _.sortBy(entries, function(entry) {
      if (entry.intervention) {
        return entry.intervention.parts[0]
      }
    })

    return <div>
      {sortedEntries.map(function(entry, i) {
        if (entry.intervention && entry.intervention['mean_score_difference']) {
          var value = entry.intervention['mean_score_difference'].value.value

          if (value != null) {
            var entryStyle = {
              marginBottom: '15px'
            }
            var inlineStyle = {
              display: 'inline-block',
              marginLeft: '15px'
            }

            return (
              <div key={i} style={entryStyle}>
                <span style={{display: 'inline-block'}}>
                  <Intervention 
                    interventionName={entry.intervention.parts.join(' + ')}
                    dosage={entry.intervention.dosage} />
                  {entry.comparison &&
                    <div className='light'>
                      vs.<br />
                      {entry.comparison.parts.join(' + ')}
                    </div>
                  }
                  <VisualAnalogScale key={i} value={value} />
                </span>
                <span style={inlineStyle}>
                  <Source source={entry.source} kind={entry.kind} />
                </span>
                <span style={inlineStyle}>
                  <GradeQuality grade={entry.quality} gradeMap={grades} />
                </span>
              </div>
            )
          }
        }
      })}
    </div>
  }
});

module.exports = OutcomeDifferences;