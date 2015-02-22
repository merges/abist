/** @jsx React.DOM */

var React = require('react/addons');

var medications = require('../Data.jsx');

// Adverse events

var AdverseEvents = React.createClass({

  getDefaultProps: function () {
    return {
      medications: medications
    };
  },

  getInitialState: function () {
    // Create an object for medication names which can be used to query openFDA
    //
    // medicationNames = {
    //   'Methotrexate': ['methotrexate', 'rasuvo', 'trexall', ...],
    //   ...
    // }

  	var medicationNames = {};
    this.props.medications.forEach(function(medication) {
      var name = medication.name;

      // Create an array for the names by which this medication goes.
      medicationNames[name] = [];

      // Add the generic name.
      medicationNames[name].push(medication.name_generic.toLowerCase());

      // Add the brand names.
      if (medication.names_brand) {
        medication.names_brand.forEach(function(brandName) {
          medicationNames[name].push(brandName.toLowerCase());
        });
      }
    });

    return {
      medicationNames: medicationNames,
      medicationCharts: {},
      medicationData: {},
      medicationTotals: {}
    }
  },

  componentDidMount: function() {
    var medicationNames = this.state.medicationNames;
    var sendQuery = this.sendQuery;

    Object.keys(medicationNames).map(function(name) {
      sendQuery(name, medicationNames[name]);
    });
  },

  componentDidUpdate: function() {
    this.renderCharts();
  },

  render: function () {
    var medicationNames = this.state.medicationNames;
    var medicationTotals = this.state.medicationTotals;

    return (
      <div className="adverse-events">
        <div className="header">
          <h1>Adverse events prototype</h1>
        </div>

        {Object.keys(medicationNames).map(function(name, i) {
          return (
            <section>
              <div>
                <h3>{i+1} <strong>{name}</strong> <span className="light">{medicationTotals[name]}</span></h3>
                <div ref={'chart-' + name}></div>
              </div>
            </section>
          );
        })}
      </div>
    );
  },

  renderCharts: function() {
    var medicationNames = this.state.medicationNames;
    var renderChart = this.renderChart;
    Object.keys(medicationNames).forEach(function(name) {
      renderChart(name);
    });
  },

  renderQueryResults: function(name) {
    var medicationData = this.state.medicationData;
    var medicationTotals = this.state.medicationTotals;

    if (medicationData[name]) {
      var data = medicationData[name];
      return (
        <ul>
          {Object.keys(data).map(function(i) {
            var reaction = data[i];
            console.log(reaction);
            return (
              <li>
                {reaction.term} <strong>{reaction.count / medicationTotals[name]}</strong>
              </li>
            );
          })}
        </ul>
      );
    }
  },

  getChartData: function(name) {
    // c3 requires data and labels separately, in this form:
    //    labels = [label0, label1, label2, ...]
    //    data = [
    //      ["Drug rate", value0, value1, ...],
    //      ["Placebo rate", placebo_value0, placebo_value1, ...],
    //    ]

    var data = this.state.medicationData[name];
    var total = this.state.medicationTotals[name];

    var adverseLabels = [];
    var adverseValues = [];

    adverseValues.push(name + " reports");

    data.forEach(function(item) {
      adverseLabels.push(item.term.toLowerCase());
      adverseValues.push(item.count / total);
    });

    return ({
      data: [adverseValues],
      labels: adverseLabels,
      total: total,
      source: null
    });
  },

  renderChart: function(name) {
    var medicationCharts = this.state.medicationCharts;
    var medicationData = this.state.medicationData;
    var medicationTotals = this.state.medicationTotals;

    var readyToRender = !medicationCharts[name] &&
                        medicationData[name] &&
                        medicationTotals[name] &&
                        this.refs['chart-' + name];

    var chartHeight = 460;

    if (readyToRender) {
      var chartData = this.getChartData(name);
      var chartElement = this.refs['chart-' + name].getDOMNode();

      var chart = c3.generate({
          bindto: chartElement,
          data: {
            type: 'bar',
            columns: chartData.data
          },
          padding: {
            left: 180
          },
          axis: {
            rotated: true,
            x: {
              type: 'categorized',
              categories: chartData.labels
            },
            y: {
              min: 0,
              max: .9,
              padding: {
                top: 0,
                bottom: 0
              },
              tick: {
                format: d3.format('%')
              }
            }
          },
          color: {
            pattern: ['#7655bd', '#bababa']
          },
          bar: {
            width: {
              ratio: .5
            }
          },
          labels: true,
          size: {
            height: chartHeight
          },
          legend: {
            show: false
          },
          zoom: {
            enabled: false
          }
        });

      var medicationCharts = this.state.medicationCharts;
      medicationCharts[name] = chart;
      this.setState({
        medicationCharts: medicationCharts
      });
    }
  },

  sendQuery: function(name, medicationList, offline) {
    if (offline) {
      console.log('offline query for', name);

      // Offline / mock data
      var total = {"meta":{"disclaimer":"openFDA is a beta research project and not for clinical use. While we make every effort to ensure that data is accurate, you should assume all results are unvalidated.","license":"http://open.fda.gov/license","last_updated":"2015-01-21","results":{"skip":0,"limit":1,"total":113679}}};
      var data = {"meta":{"disclaimer":"openFDA is a beta research project and not for clinical use. While we make every effort to ensure that data is accurate, you should assume all results are unvalidated.","license":"http://open.fda.gov/license","last_updated":"2015-01-21"},"results":[{"term":"INJECTION SITE PAIN","count":8618},{"term":"ARTHRALGIA","count":6156},{"term":"DRUG INEFFECTIVE","count":5732},{"term":"RHEUMATOID ARTHRITIS","count":4923},{"term":"PYREXIA","count":4498},{"term":"NAUSEA","count":4335},{"term":"HEADACHE","count":4228},{"term":"INJECTION SITE ERYTHEMA","count":4208},{"term":"PAIN","count":4203},{"term":"FATIGUE","count":4082},{"term":"PNEUMONIA","count":3552},{"term":"PAIN IN EXTREMITY","count":3518},{"term":"DYSPNOEA","count":3153},{"term":"DIARRHOEA","count":2459},{"term":"VOMITING","count":2356}]};

      var medicationData = this.state.medicationData;
      var medicationTotals = this.state.medicationTotals;
      medicationData[name] = data.results;
      medicationTotals[name] = total.meta.results.total;

      this.setState({
        medicationData: medicationData,
        medicationTotals: medicationTotals
      });
    }
    else {
      var endpoint = 'https://api.fda.gov/drug/event.json?';
      var apiKey = 'OoYA4HLz6ksoiZegL3xxJbHPjScSqOpeUpp1Gajg';
      var reactionLimit = 25;

      var queryPrefix = endpoint
                      + 'api_key='
                      + apiKey
                      + '&search='
                      + 'patient.drug.medicinalproduct:'
                      + '(';

      // Construct drug name query.
      for (var i = 0; i < medicationList.length; i++) {
        var drugName = medicationList[i].replace(/\s/g, "+");
        // Split names on slashes, which are actually two medication names.
        drugName = drugName.replace(/\//g, '"+AND+"');
        queryPrefix = queryPrefix + '("' + drugName + '")+';
      }
      queryPrefix = queryPrefix.substring(0, queryPrefix.length - 1) + ')';

      var countReactionsSuffix = '&count=patient.reaction.reactionmeddrapt.exact'
                               + '&limit='
                               + reactionLimit;

      var totalSuffix = '&limit=1';

      var queryForReactions = queryPrefix + countReactionsSuffix;
      var queryForTotal = queryPrefix + totalSuffix;

      var medicationData = this.state.medicationData;
      var medicationTotals = this.state.medicationTotals;
      var instance = this;

      $.getJSON(queryForReactions)
      .then(function(data) {
        medicationData[name] = data.results;
        instance.setState({
          medicationData: medicationData
        });
      })
      .fail(function() {
        console.log('FAILED');
      });

      $.getJSON(queryForTotal)
      .then(function(data) {
        medicationTotals[name] = data.meta.results.total;
        instance.setState({
          medicationTotals: medicationTotals
        });
      })
      .fail(function() {
        console.log('FAILED');
      });
    }
  }

});

module.exports = AdverseEvents;