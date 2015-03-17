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
      csr: {},
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
      csr: {
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

  },

  processData: function(data) {
    // console.log(data.feed);
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
    });
    
    this.setState({
      measures: measures
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
                          <small>tags</small><br />
                          {item.tags.join(',')}
                        </li>
                      }
                      {item.notes &&
                        <li>
                          <small>notes</small><br />
                          {item.notes}
                        </li>
                      }
                      {item.kind &&
                        <li>
                          <small>kind</small><br />
                          {item.kind}
                        </li>
                      }
                      {item.assessor &&
                        <li>
                          <small>assessor</small><br />
                          {item.assessor}
                        </li>
                      }
                      {item.variable &&
                        <li>
                          <small>variable</small><br />
                          {item.variable}
                        </li>
                      }
                      {item.included_measures &&
                        <li>
                          <small>included_measures</small><br />
                          {item.included_measures.join(', ')}
                        </li>
                      }
                      {item.related_measures &&
                        <li>
                          <small>related_measures</small><br />
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