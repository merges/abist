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
    dataByTag: React.PropTypes.object.isRequired,
    disabledMedications: React.PropTypes.object,
    medications: React.PropTypes.array.isRequired
  },

  renderDataByMeasure: function(selectedMeasure) {
    var measures = this.props.data.measures; 
    var dataByTag = this.props.dataByTag;
    var measure = selectedMeasure;
    var tag = this.props.selectedTag;
    var measureData = dataByTag[tag][selectedMeasure].data;
    var grades = this.props.data.grades;

    if (measureData) {
      var medications = this.props.medications;
      var disabledMedications = this.props.disabledMedications;
      var entries = get.filterEntriesByMedication(get.getEntriesForMeasure(measureData), medications, disabledMedications);

      var sortedEntries = _.sortBy(entries, function(entry) {
        if (entry.intervention) {
          return entry.intervention.parts[0]
        }
      })

      return sortedEntries.map(function(entry, i) {
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
                  <Intervention intervention={entry.intervention.parts.join(' + ')} dosage={entry.intervention.dosage} />
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
      })
    }
  },

  render: function() {
    var classes = cx({
      'processing': true,
      'results': true
    });

    var selectedMeasure = this.props.selectedMeasure;
    
    return (
      <div className={classes}>
        {selectedMeasure !== null && this.renderDataByMeasure(selectedMeasure)}
      </div>
    );
  }

});

module.exports = OutcomeDifferences;