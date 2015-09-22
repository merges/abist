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

var ProgressBar = require('react-bootstrap').ProgressBar;

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

    var data                = this.props.data;
    var medications         = this.props.medications;
    var selectedMeasure     = this.props.selectedMeasure;
    var selectedTag         = this.props.selectedTag;
    var measureData         = this.props.dataByTag[selectedTag][selectedMeasure].data;
    var disabledMedications = this.props.disabledMedications;

    if (measureData) {
      // return (
      //   <AbsoluteRiskComparison />
      // );

      measureData = get.filterEntriesByMedication(measureData, medications, disabledMedications)

      console.log(measureData);
      
      var groupedMeasureData = _.groupBy(measureData, function (entry) {
        return entry.comparison + entry.intervention;
      });

      return (
        <section className={classes}>
          {_.map(groupedMeasureData, function (group) {
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
              <div key={group}>
                <h4>
                  When <strong>{intervention}</strong> was compared with <strong>{comparison}</strong> for people with RA<br />
                  <span className='light'>these were the most common side effects</span>
                </h4>
                <Source source={firstEntry.source} kind={firstEntry.kind} />
                <GradeQuality grade={firstEntry.quality} gradeMap={data.grades} />

                {groupedByDetail.map(function (clump, i) {
                  var name              = clump[0].measure_detail;
                  var comparisonValue   = _.chain(clump)
                                           .findWhere({'which': 'comparison'})
                                           .value()
                                           .value.value;
                  var interventionValue = _.chain(clump)
                                           .findWhere({'which': 'intervention'})
                                           .value()
                                           .value.value;

                  console.log(name, comparisonValue, interventionValue)

                  if (interventionValue < comparisonValue) {
                    var stackedValue = comparisonValue - interventionValue;
                    return (
                      <div key={i}>
                        <strong>{name}</strong> <span className='light'>less common with <strong>{intervention}</strong></span>
                        <ProgressBar>
                          <ProgressBar bsSize="xsmall" className='better' label={"%(percent)s% taking " + intervention} now={interventionValue} key={1} />
                          <ProgressBar bsSize="xsmall" label={comparisonValue + '% on ' + comparison} now={stackedValue} key={2} />
                        </ProgressBar>
                      </div>
                    );
                  }
                  else {
                    var stackedValue = interventionValue - comparisonValue;
                    return (
                      <div key={i}>
                        <strong>{name}</strong> <span className='light'>as or more common with <strong>{intervention}</strong></span>
                        <ProgressBar>
                          <ProgressBar bsSize="xsmall" label={"%(percent)s% on " + comparison} now={comparisonValue} key={1} />
                          <ProgressBar bsSize="xsmall" className='worse' label={interventionValue + '% on ' + intervention} now={stackedValue} key={2} />
                          
                        </ProgressBar>
                      </div>
                    );
                  }
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