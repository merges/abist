/** @jsx React.DOM */

var React = require('react/addons');
var _ = require('underscore');

// Data
var get = require('../data/get.js');

var AbsoluteFrequency = require('./visualizations/AbsoluteFrequency.jsx');
var AbsoluteRiskComparison = require('./visualizations/AbsoluteRiskComparison.jsx');
var Difference = require('./visualizations/Difference.jsx');
var GradeQuality = require('./visualizations/GradeQuality.jsx');
var Intervention = require('./visualizations/Intervention.jsx');
var Population = require('./visualizations/Population.jsx');
var RelativeRiskComparison = require('./visualizations/RelativeRiskComparison.jsx');
var RiskRelativeToBaseline = require('./visualizations/RiskRelativeToBaseline.jsx');
var Source = require('./visualizations/Source.jsx');

// Outcome adverse events

var OutcomeAdverseEvents = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired,
    dataByTag: React.PropTypes.object.isRequired,
    disabledMedications: React.PropTypes.object,
    medications: React.PropTypes.array.isRequired
  },

  renderDataByMeasure: function(selectedMeasure) {
    var measures = this.props.data.measures;
    var dataByTag = this.props.dataByTag;
    var renderEntry = this.renderEntry;

    var renderAbsoluteRiskComparison = function(entries, measure) {
      var sources = {};

      Object.keys(entries).map(function (key) {
        var entry = entries[key];

        if (entry.which == 'comparison') {
          if (!sources[entry.comparison.parts]) {
            sources[entry.comparison.parts] = {};
            sources[entry.comparison.parts]['items'] = [];
          }
          sources[entry.comparison.parts]['baseline'] = entry.comparison;

          // Check to see that we have absolute risk
          if (entry.intervention.ar) {
            sources[entry.comparison.parts].items.push(entry.intervention);
          }
        }
      });

      return Object.keys(sources).map(function (comparison) {
        if (sources[comparison].items.length > 1) {
          return (
            <div className='visualization-rr'>
              <RelativeRiskComparison
                  baseline={sources[comparison].baseline}
                items={sources[comparison].items}
                measure={measure} />
            </div>
          );
        }
      })
    };

    var renderRiskRelativeToBaselineComparison = function(entries, measure) {
      var sources = {};

      Object.keys(entries).map(function (key) {
        var entry = entries[key];

        if (entry.which == 'comparison') {
          if (!sources[entry.comparison.parts]) {
            sources[entry.comparison.parts] = {};
            sources[entry.comparison.parts]['items'] = [];
          }
          sources[entry.comparison.parts]['comparison'] = entry.comparison;

          // Check to see that we have relative risk
          if (entry.intervention.rr) {
            sources[entry.comparison.parts].items.push(entry.intervention);
          }
        }
      });

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
          );
        }
      })
    };

    var measure = selectedMeasure;
    var tag = this.props.selectedTag;
    var measureData = dataByTag[tag][selectedMeasure].data;

    // debugger;

    if (measureData) {
      var medications = this.props.medications;
      var disabledMedications = this.props.disabledMedications;
      var entries = get.filterEntriesByMedication(get.getEntriesForMeasure(measureData), medications, disabledMedications);

      console.log('OutcomeAdverseEvents ENTRIES', entries);

      return (
        <div key={measure}>
          {renderRiskRelativeToBaselineComparison(entries, measure)}
        </div>
      );
    }
  },

  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'adverse-events': true,
      'results': true
    });

    var selectedMeasure     = this.props.selectedMeasure;
    var selectedTag         = this.props.selectedTag;
    var measureData         = this.props.dataByTag[selectedTag][selectedMeasure].data;
    var disabledMedications = this.props.disabledMedications;

    if (measureData) {
      return (
        <AbsoluteRiskComparison />
      );
      // return (
      //   <div className={classes}>
      //     {measureData.map(function (entry, i) {
      //       console.log(entry)
      //       return (
      //         <div key={i}>
      //           <strong>{entry.measure_detail}</strong><br />
      //           {entry.which == 'comparison' && <span>{entry.comparison.join(' + ')} - {entry.value}%</span>}
      //           {entry.which == 'intervention' && <span>{entry.intervention.join(' + ')} - {entry.value}%</span>}
      //         </div>
      //       );
      //     })}
      //   </div>
      // );
      // return (
      //   <div>{JSON.stringify(measureData)}</div>
      // );
    }
    return (<noscript />);
  }
});

module.exports = OutcomeAdverseEvents;