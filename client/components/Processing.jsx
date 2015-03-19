/** @jsx React.DOM */

var React = require('react/addons');

var medications = require('./Data.jsx');

// Processing / data processing tests

// var url = 'https://spreadsheets.google.com/feeds/list/' + key + '/od6/public/values';

var Processing = React.createClass({

  getDefaultProps: function () {
    return {
      medications: medications
    };
  },

  getInitialState: function() {
    return {
      measures: {},
      metrics: {},
      grades: {},
      data: {},
      side_effects: {}
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
          entry['which'] = value.gsx$which;
          entry['measure'] = value.gsx$measure;
          entry['metric'] = value.gsx$metric;
          entry['value'] = value.gsx$value;
          entry['value_ci_low'] = value.gsx$valuecilow;
          entry['value_ci_high'] = value.gsx$valuecihigh;
          entry['grade'] = value.gsx$grade;
          entry['n_total'] = value.gsx$ntotal;
          entry['duration_low'] = value.gsx$durationlow;
          entry['duration_high'] = value.gsx$durationhigh;
          entry['duration_interval'] = value.gsx$durationinterval;
          entry['intervention'] = value.gsx$intervention;
          entry['comparison'] = value.gsx$comparison;
          entry['intervention_dosage'] = value.gsx$interventiondosage;
          entry['dosage_form'] = value.gsx$dosageform;
          entry['dosage_frequency'] = value.gsx$dosagefrequency;
          entry['dosage_interval'] = value.gsx$dosageinterval;
          entry['source'] = value.gsx$source;
          entry['notes'] = value.gsx$notes;
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
          entry['name'] = key;
          entry['name_short'] = value.gsx$nameshort.$t;
          entry['name_long'] = value.gsx$namelong.$t;
          entry['description'] = value.gsx$description.$t;
          entry['tags'] = value.gsx$tags.$t && value.gsx$tags.$t.split(',');
          entry['kind'] = value.gsx$kind.$t;
          entry['variable'] = value.gsx$variable.$t;
          entry['assessor'] = value.gsx$assessor.$t;
          entry['related_measures'] = value.gsx$relatedmeasures.$t && value.gsx$relatedmeasures.$t.split(',');
          entry['included_measures'] = value.gsx$includedmeasures.$t && value.gsx$includedmeasures.$t.split(',');
          entry['source'] = value.gsx$source.$t;
          entry['notes'] = value.gsx$notes.$t;
      measures[key] = entry;

      // Populate tags object based on any applied to this measure
      if (measures[key]['tags'].length > 0) {
        measures[key]['tags'].forEach(function (tag) {
          // If there's no entry for this particular tag, create an object to house measure that match that tag.
          !tagMap[tag] && (tagMap[tag] = {});
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

  renderDataByTag: function(tags, data) {
    if (tags && data != {}) {
      // Use tags to organize search through data for matching measures

      Object.keys(tags).map(function (tag) {
        Object.keys(data).map(function (source) {
          data[source].map(function (entry) {
            if (tags[entry.measure]) {
              console.log(source, tag, entry.measure);
            }
          });
        });
      });
    }

    // Object.keys(data).map(function (source) {
    //   return (
    //     <section className='data'>
    //       <h2>{source} data</h2>
    //       <ul>
    //         {data[source].map(function (entry, i) {
    //           return (
    //             <li key={i}>
    //               <h3>{i}</h3>
    //               <p>{entry.which}</p>
    //               <div>
    //                 <ul>
    //                   {Object.keys(entry).map(function (key, i) {
    //                     return (
    //                       <li key={i}>
    //                         <small>{key}</small>
    //                         {entry[key]}
    //                       </li>
    //                     );
    //                   })}
    //                 </ul>
    //               </div>
    //             </li>
    //           );
    //         })}
    //       </ul>
    //     </section>
    //   );
    // });
  },

  render: function() {
    var medications = this.props.medications;

    var cx = React.addons.classSet;
    var classes = cx({
      'processing': true
    });

    var grades = this.state.grades;
    var measures = this.state.measures;
    var data = this.state.data;
    var tags = this.state.tags;

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

        {this.renderDataByTag(tags, data)}

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
});

module.exports = Processing;