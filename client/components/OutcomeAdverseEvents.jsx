/** @jsx React.DOM */

var React = require('react/addons');
var _ = require('lodash');

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

var ProgressBar = require('react-bootstrap').ProgressBar;

// Outcome adverse events

var OutcomeAdverseEvents = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired,
    dataFiltered: React.PropTypes.array.isRequired,
    disabledMedications: React.PropTypes.object,
    medications: React.PropTypes.array.isRequired,
    measure: React.PropTypes.string
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

    var data                = this.props.data
    var dataFiltered        = this.props.dataFiltered
    var medications         = this.props.medications
    var measure             = this.props.measure
    // var selectedTag         = this.props.selectedTag
    // var measureData         = this.props.dataByTag[selectedTag][selectedMeasure].data
    var disabledMedications = this.props.disabledMedications


    if (dataFiltered) {
      var entries = get.filterEntriesByMedication(dataFiltered, medications, disabledMedications)
      
      var groupedData = _.groupBy(entries, function (entry) {
        return entry.comparison + entry.intervention;
      });

      return (
        <section className={classes}>
          {_.map(groupedData, function (group) {
            var firstEntry = group[0];
            var comparison = firstEntry.comparison.join(' + ');
            var intervention = firstEntry.intervention.join(' + ');
            
            var groupedByDetail = _.chain(group)
                                  .groupBy(function (entry) {
                                    return entry.measure_detail;
                                  })
                                  .sortBy(function (clump) {
                                    return _.max(clump, function (part) {
                                      return part.value.value;
                                    });
                                  })
                                  .value();

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

                  var name = clump[0].measure_detail;
                  
                  // PILL VISUALIZATION
                  return <div key={i} className='visualization-rr pad-b-5'>
                    <h3 className='font-size-6'>{name}</h3>
                    <AbsoluteRiskComparison
                      items={clump}
                      measure={name} />
                  </div>


                  // WEIRD RELATIVE VISUALIZATION

                  // var comparisonValue   = _.chain(clump)
                  //                          .find({'which': 'comparison'})
                  //                          .value()
                  //                          .value.value;
                  // var interventionValue = _.chain(clump)
                  //                          .find({'which': 'intervention'})
                  //                          .value()
                  //                          .value.value;

                  // if (interventionValue < comparisonValue) {
                  //   var stackedValue = comparisonValue - interventionValue;

                  //   // Progress bar
                  //   return (
                  //     <div key={i}>
                  //       <strong>{name}</strong><br />
                  //       <span className='light'>less common with <strong>{intervention}</strong></span>
                  //       <ProgressBar>
                  //         <ProgressBar bsSize="xsmall" className='better' label={"%(percent)s% taking " + intervention} now={interventionValue} key={1} />
                  //         <ProgressBar bsSize="xsmall" label={comparisonValue + '% on ' + comparison} now={stackedValue} key={2} />
                  //       </ProgressBar>
                  //     </div>
                  //   );
                  // }
                  // else {
                  //   var stackedValue = interventionValue - comparisonValue;

                  //   // Progress bar
                  //   return (
                  //     <div key={i}>
                  //       <strong>{name}</strong><br />
                  //       <span className='light'>as or more common with <strong>{intervention}</strong></span>
                  //       <ProgressBar>
                  //         <ProgressBar bsSize="xsmall" label={"%(percent)s% on " + comparison} now={comparisonValue} key={1} />
                  //         <ProgressBar bsSize="xsmall" className='worse' label={interventionValue + '% on ' + intervention} now={stackedValue} key={2} />
                          
                  //       </ProgressBar>
                  //     </div>
                  //   );
                  // }
                })}
              </div>
            );
          })}
        </section>
      );
    }
    return (<noscript />);
  }
});

module.exports = OutcomeAdverseEvents;