/** @jsx React.DOM */

var React = require('react/addons');

var medications = require('./Data.jsx');

var AbsoluteFrequency = require('./visualizations/AbsoluteFrequency.jsx');
var GradeQuality = require('./visualizations/GradeQuality.jsx');

// Processing / data processing tests

String.prototype.capitalizeFirstletter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

var Processing = React.createClass({

  getDefaultProps: function () {
    return {
      medications: medications
    };
  },

  getInitialState: function() {
    return {
      // measures: {},
      // metrics: {},
      // grades: {},
      data: {}
      // side_effects: {}
    };
  },

  componentDidMount: function() {
    var instance = this;
    var processData = this.processData;

    var sheets = {
      measures: 'o5079mk',
      metrics: 'ojmf289',
      grades: 'oo3g5h2',
      data: {
        biologics: 'oij9tdp',
        hydroxycholoroquine: 'oozzuoc',
        etanercept: 'oogh8lu',
        methotrexate: 'oa4uchu'
      },
      side_effects: {
        celecoxib: 'od6'
      }
    };

    // Visit this with a browser to get the worksheet unique IDs
    var xmlListing = 'https://spreadsheets.google.com/feeds/worksheets/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/private/full';

    var key  = '1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0';
    var base = 'https://spreadsheets.google.com/feeds/list/'
             + key
             + '/';
    var end  = '/public/values?alt=json';

    // Get measures
    var processMeasures = this.processMeasures;
    var urlMeasures = base + sheets.measures + end;
    $.getJSON(urlMeasures, processMeasures);

    // Get metrics
    // var processMetrics = this.processMetrics;
    // var urlMetrics = base + sheets.metrics + end;
    // $.getJSON(urlMetrics, processData);

    // Get GRADE levels
    var processGrades = this.processGrades;
    var urlGrades = base + sheets.grades + end;
    $.getJSON(urlGrades, processGrades);

    // Get GRADE levels
    var processGrades = this.processGrades;
    var urlGrades = base + sheets.grades + end;
    $.getJSON(urlGrades, processGrades);

    // Get data
    // Loop through the data source spreadsheets, projecting each one into a more useful format.
    var processData = this.processData;
    Object.keys(sheets.data).forEach(function (source) {
      var urlData = base + sheets.data[source] + end;
      $.getJSON(urlData, processData);
    });
  },

  processData: function(data) {
    var processedData = [];

    $.each(data.feed.entry, function (index, value) {
      if (index == 0) {
        return;
      }
      var entry = {};
          entry['which']                = value.gsx$which ? value.gsx$which.$t : null;
          entry['measure']              = value.gsx$measure ? value.gsx$measure.$t : null;
          entry['metric']               = value.gsx$metric ? value.gsx$metric.$t : null;
          entry['value']                = value.gsx$value ? parseFloat(value.gsx$value.$t) : null;
          entry['value_ci_low']         = value.gsx$valuecilow ? parseFloat(value.gsx$valuecilow.$t) : null;
          entry['value_ci_high']        = value.gsx$valuecihigh ? parseFloat(value.gsx$valuecihigh.$t) : null;
          entry['grade']                = value.gsx$grade ? value.gsx$grade.$t : null;
          entry['n_total']              = value.gsx$ntotal ? parseFloat(value.gsx$ntotal.$t) : null;
          entry['duration_low']         = value.gsx$durationlow ? value.gsx$durationlow.$t : null;
          entry['duration_high']        = value.gsx$durationhigh ? value.gsx$durationhigh.$t : null;
          entry['duration_interval']    = value.gsx$durationinterval ? value.gsx$durationinterval.$t : null;
          entry['intervention']         = value.gsx$intervention ? value.gsx$intervention.$t.split(',') : null;
          entry['comparison']           = value.gsx$comparison ? value.gsx$comparison.$t.split(',') : null;
          entry['intervention_dosage']  = value.gsx$interventiondosage ? value.gsx$interventiondosage.$t : null;
          entry['dosage_form']          = value.gsx$dosageform ? value.gsx$dosageform.$t.split(',') : null;
          entry['dosage_frequency']     = value.gsx$dosagefrequency ? value.gsx$dosagefrequency.$t : null;
          entry['dosage_interval']      = value.gsx$dosageinterval ? value.gsx$dosageinterval.$t : null;
          entry['source']               = value.gsx$source ? value.gsx$source.$t : null;
          entry['notes']                = value.gsx$notes ? value.gsx$notes.$t : null;
      processedData.push(entry);
    });

    // Get the sheet title, which will be used as its unique key
    var title = data.feed.title.$t;
    var newData = this.state.data;
        newData[title] = processedData;

    this.setState({
      data: newData
    });
  },

  processGrades: function(data) {
    var grades = {};

    $.each(data.feed.entry, function (index, value) {
      if (index == 0) {
        return;
      }
      var key = value.gsx$grade.$t;
      var entry = {};
          entry['grade'] = key;
          entry['description'] = value.gsx$description.$t;
          entry['description_friendly'] = value.gsx$descriptionfriendly.$t;
          entry['name_friendly'] = value.gsx$namefriendly.$t;
          entry['notes'] = value.gsx$namefriendly.$t;
          entry['source'] = value.gsx$source.$t;
      grades[key] = entry;
    });

    this.setState({
      grades: grades
    });
  },

  processMeasures: function(data) {
    var measures = {};
    var tagMap = {};

    $.each(data.feed.entry, function (index, value) {
      if (index == 0) {
        return;
      }
      var key = value.gsx$name.$t;
      var entry = {};
          entry['name']                 = key;
          entry['name_short']           = value.gsx$nameshort.$t;
          entry['name_long']            = value.gsx$namelong.$t;
          entry['description']          = value.gsx$description.$t;
          entry['tags']                 = value.gsx$tags.$t && value.gsx$tags.$t.split(',');
          entry['kind']                 = value.gsx$kind.$t;
          entry['variable']             = value.gsx$variable.$t;
          entry['assessor']             = value.gsx$assessor.$t;
          entry['related_measures']     = value.gsx$relatedmeasures.$t && value.gsx$relatedmeasures.$t.split(',');
          entry['included_measures']    = value.gsx$includedmeasures.$t && value.gsx$includedmeasures.$t.split(',');
          entry['source']               = value.gsx$source.$t;
          entry['notes']                = value.gsx$notes.$t;
      measures[key] = entry;

      // Populate tags object based on any applied to this measure
      if (measures[key]['tags'].length > 0) {
        measures[key]['tags'].forEach(function (tag) {
          // If there's no entry for this particular tag, create an object to house
          // corresponding measures and data that match that tag.
          if (!tagMap[tag]) {
            tagMap[tag] = {};
            // tagMap[tag]['data'] = [];
          }
          tagMap[tag][key] = true;
        });
      }
    });

    this.setState({
      measures: measures,
      tags: tagMap
    });
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
                        );
                      })}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      );
    });
  },

  renderDataByTag: function(data, tags, grades, measures) {

    // Reproject data by tag
    var getDataByTag = function(tags, data) {
      var dataByTag = JSON.parse(JSON.stringify(tags));

      // Loop
      // Each tag (pain, function, etc.)
      Object.keys(tags).map(function (tag) {
        // Each source
        Object.keys(data).map(function (source) {
          // Each entry in the source data
          data[source].map(function (entry) {
            // Entry has a measure that is associated with one of the tags?
            // e.g. tags['pain']['patient_pain']
            if (tags[tag][entry.measure]) {
              // Create a place for data about each measure
              dataByTag[tag][entry.measure] === true && (dataByTag[tag][entry.measure] = {});
              !dataByTag[tag][entry.measure]['data'] && (dataByTag[tag][entry.measure]['data'] = []);

              dataByTag[tag][entry.measure]['data'].push(entry);
            }
          });
        });
      });
      return dataByTag;
    }

    var dataByTag = getDataByTag(tags, data);


    /*
        Comparison == key.
        <li> is match on measure, intervention, comparison
    */

    // TODO reproject data into comparison-intervention groups

    return Object.keys(dataByTag).map(function (tag) {
      return (
        <section key={tag} className='data'>
          <h2><strong>{tag.capitalizeFirstletter()}</strong></h2>
          <div>
            {Object.keys(dataByTag[tag]).map(function (measure, i) {
              var entries = dataByTag[tag][measure].data;
              if (entries) {
                var keyIntervention;
                var keyComparison;
                var reprojected = {};

                entries.forEach(function (entry, i) {
                  // Comparison row is key, sets up rest…
                  var key;

                  if (entry.which == 'comparison') {
                    key = entry.measure + entry.comparison + entry.intervention;
                    reprojected[key] = {};
                    reprojected[key]['intervention']        = entry.intervention.join(' + ');
                    reprojected[key]['comparison']          = entry.comparison.join(' + ');

                    // TODO follow-up display calculator function / component
                    reprojected[key]['follow_up']           = entry.duration_low + '-' + entry.duration_high + ' ' + entry.duration_interval + 's';

                    // TODO metric display calculator functions / components
                    reprojected[key]['assumed_risk_metric'] = entry.metric;
                    reprojected[key]['assumed_risk']        = (
                      <span>
                        {entry.which}<br />
                        <strong>{entry.value}</strong>
                        <AbsoluteFrequency frequency={entry.value} metric={entry.metric} breakpoint={20} />
                      </span>
                    );
                    reprojected[key]['n']                   = entry.n_total;
                    // TODO quality calculator function / component
                    reprojected[key]['quality']             = (
                      <span>
                        <strong>{entry.grade}</strong><br />
                        <small>{entry.grade != 'undefined' && grades[entry.grade].name_friendly}</small>
                        <GradeQuality grade={entry.grade} gradeMap={grades} />
                      </span>
                    );
                  }

                  // TODO generalize!
                  else if (entry.which == 'intervention') {
                    key = entry.measure + entry.comparison + entry.intervention;

                    // Already set up an object with comparison
                    if (reprojected[key]) {
                      // Non-comparison rows fill out remaining detail
                      (entry.metric == 'ar_100' || entry.metric == 'ar_1000') && (reprojected[key]['corresponding_risk']  = (
                        <span>
                          <strong>{entry.value}</strong><br />
                          ({entry.value_ci_low} to {entry.value_ci_high})
                          <AbsoluteFrequency frequency={entry.value} metric={entry.metric} breakpoint={20} />
                        </span>
                      ));
                      (entry.metric == 'rr' || entry.metric == 'or') && (reprojected[key]['relative_effect'] = (
                        <span>
                          <strong>{entry.value}</strong><br />
                          ({entry.value_ci_low} to {entry.value_ci_high})
                        </span>
                      ));
                      (entry.metric == 'abs_difference') && (reprojected[key]['absolute_benefit'] = (
                        <span>
                          <strong>{Math.round(entry.value * 100) + '%'}</strong><br />
                          ({Math.round(entry.value_ci_low * 100) + '%'} to {Math.round(entry.value_ci_high * 100) + '%'})
                        </span>
                      ));
                      (entry.metric == 'rel_difference') && (reprojected[key]['relative_change'] = (
                        <span>
                          <strong>{Math.round(entry.value * 100) + '%'}</strong><br />
                          ({Math.round(entry.value_ci_low * 100) + '%'} to {Math.round(entry.value_ci_high * 100) + '%'})
                        </span>
                      ));
                    }

                    // This is an entry with no corresponding 'comparison'
                    else {
                      reprojected[key] = {};
                      reprojected[key]['intervention']        = entry.intervention.join(' + ');
                      reprojected[key]['comparison']          = entry.comparison.join(' + ');

                      // TODO follow-up display calculator function / component
                      reprojected[key]['follow_up']           = entry.duration_low + '-' + entry.duration_high + ' ' + entry.duration_interval + 's';

                      // NO ASSUMED RISK BECAUSE NO COMPARISON

                      // TODO metric display calculator functions / components
                      reprojected[key]['assumed_risk_metric'] = entry.metric;
                      reprojected[key]['corresponding_risk']        = (
                        <span>
                          {entry.which}<br />
                          <strong>{entry.value}</strong>
                          <AbsoluteFrequency frequency={entry.value} metric={entry.metric} breakpoint={20} />
                        </span>
                      );


                      reprojected[key]['n']                   = entry.n_total;
                      // TODO quality calculator function / component
                      reprojected[key]['quality']             = (
                        <span>
                          <strong>{entry.grade}</strong><br />
                          <small>{grades[entry.grade].name_friendly}</small>
                          <GradeQuality grade={entry.grade} gradeMap={grades} />
                        </span>
                      );
                      // Non-comparison rows fill out remaining detail
                      (entry.metric == 'ar_100' || entry.metric == 'ar_1000') && (reprojected[key]['corresponding_risk']  = (
                        <span>
                          {entry.which}<br />
                          <strong>{entry.value}</strong>
                          ({entry.value_ci_low} to {entry.value_ci_high})
                          <AbsoluteFrequency frequency={entry.value} metric={entry.metric} breakpoint={20} />
                        </span>
                      ));
                      // (entry.metric == 'rr' || entry.metric == 'or') && (reprojected[key]['relative_effect'] = (
                      //   <span>
                      //     <strong>{entry.value}</strong><br />
                      //     ({entry.value_ci_low} to {entry.value_ci_high})
                      //   </span>
                      // ));
                      (entry.metric == 'abs_difference') && (reprojected[key]['absolute_benefit'] = (
                        <span>
                          <strong>{Math.round(entry.value * 100) + '%'}</strong><br />
                          ({Math.round(entry.value_ci_low * 100) + '%'} to {Math.round(entry.value_ci_high * 100) + '%'})
                        </span>
                      ));
                      (entry.metric == 'rel_difference') && (reprojected[key]['relative_change'] = (
                        <span>
                          <strong>{Math.round(entry.value * 100) + '%'}</strong><br />
                          ({Math.round(entry.value_ci_low * 100) + '%'} to {Math.round(entry.value_ci_high * 100) + '%'})
                        </span>
                      ));
                    }
                  }
                });

                return (
                  <ul key={measure}>
                    <li>
                      <h3>
                        <strong>{measures[measure].name_short}</strong><br />
                        {measures[measure].name_long}
                      </h3>
                    </li>
                    <li>
                      <h3>Intervention</h3>
                      <h3>Comparison</h3>
                      <h3>Follow-up</h3>
                      <h3>
                        Assumed risk<br />
                        (95% CI)<br />
                        <strong>Comparison</strong>
                      </h3>
                      <h3>
                        Corresponding risk<br />
                        (95% CI)<br />
                        <strong>Intervention</strong>
                      </h3>
                      <h3>Relative effect (95% CI)</h3>
                      <h3>Absolute treatment benefit (95% CI)</h3>
                      <h3>Relative percent change (95% CI)</h3>
                      <h3>Quality of the evidence</h3>
                    </li>
                    {Object.keys(reprojected).map(function (data, i) {
                      var entry = reprojected[data];
                      return (
                        <li key={i}>
                          <h4>{entry.intervention}</h4>
                          <h4>{entry.comparison}</h4>
                          <h4>{entry.follow_up}</h4>
                          <h4>
                            {entry.assumed_risk}<br />
                            <small>{entry.assumed_risk_metric}</small>
                          </h4>
                          <h4>{entry.corresponding_risk}</h4>
                          <h4>{entry.relative_effect}</h4>
                          <h4>{entry.absolute_benefit}</h4>
                          <h4>{entry.relative_change}</h4>
                          <h4>{entry.quality}</h4>
                        </li>
                      );
                    })}
                  </ul>
                );
              }
            })}
          </div>
        </section>
      );
    });
  },

  render: function() {
    var medications = this.props.medications;

    var cx = React.addons.classSet;
    var classes = cx({
      'processing': true
    });

    var grades = this.state.grades;
    var measures = this.state.measures;
    var tags = this.state.tags;
    var data = this.state.data;

    if (grades && measures && tags && data != {}) {
      return (
        <div className={classes}>
          <div className='header'>
            <h1>Spreadsheets as backend demo</h1>
          </div>

          <section>
            <h2>Live connection to <a href='https://docs.google.com/spreadsheets/d/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/' target='_top'>data in a Google Spreadsheet</a></h2>
            <p>My prototype will demonstrate use of a shareable, editable, and open (transparently accessible) spreadsheet as the ‘home’ of its data, instead of a closed, difficult to access and update database. That includes evidence extracted from the literature, descriptions of measures and metrics, harmonization tables, and so forth.</p>
            <p>The summaries below are connected to <a href='https://docs.google.com/spreadsheets/d/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/' target='_top'>data in a Google Spreadsheet</a> where I am encoding medical evidence. Updates made in those spreadsheets are instantly applied here.</p>
          </section>

          {this.renderDataByTag(data, tags, grades, measures)}

          <section className='grades'>
            <h2>GRADE working group levels of evidence</h2>
            <ul>
              {Object.keys(grades).map(function (key, i) {
                var item = grades[key];
                return (
                  <li key={i}>
                    <h3>{item.grade} <strong>{item.name_friendly}</strong></h3>
                    <div>
                      <p>{item.description} {item.source && <a href={item.source}>Source</a>}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className='measures'>
            <h2>Measures</h2>
            <ul>
              {Object.keys(measures).map(function (key, i) {
                var item = measures[key];
                return (
                  <li key={i}>
                    <h3>
                      <strong>{item.name_short}</strong><br />
                      {item.name_long}
                    </h3>
                    <p>
                      {item.description && item.description}
                      {item.source && <span> - <a href={item.source}>Source</a></span>}
                    </p>
                    <div>
                      <ul>
                        {item.tags &&
                          <li>
                            <small>tags</small>
                            {item.tags.join(',')}
                          </li>
                        }
                        {item.notes &&
                          <li>
                            <small>notes</small>
                            {item.notes}
                          </li>
                        }
                        {item.kind &&
                          <li>
                            <small>kind</small>
                            {item.kind}
                          </li>
                        }
                        {item.assessor &&
                          <li>
                            <small>assessor</small>
                            {item.assessor}
                          </li>
                        }
                        {item.variable &&
                          <li>
                            <small>variable</small>
                            {item.variable}
                          </li>
                        }
                        {item.included_measures &&
                          <li>
                            <small>included_measures</small>
                            {item.included_measures.join(', ')}
                          </li>
                        }
                        {item.related_measures &&
                          <li>
                            <small>related_measures</small>
                            {item.related_measures.join(', ')}
                          </li>
                        }
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      );
    }
    return (<noscript />);
  }
});

module.exports = Processing;