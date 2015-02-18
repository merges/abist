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

  render: function () {
    return (
      <div className="adverse-events">
        <section className="header">
          <h1>Adverse events prototype</h1>
        </section>
        {this.renderQueryResults()}
      </div>
    );
  },

  renderQueryResults: function() {
    var medicationNames = this.state.medicationNames;
    var medicationData = this.state.medicationData;
    var medicationTotals = this.state.medicationTotals;

    return (
      <div>
        {Object.keys(medicationNames).map(function(name, i) {
          if (medicationData[name]) {
            var data = medicationData[name];
            return (
              <section>
                <h3>{i} <strong>{name}</strong></h3>
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
              </section>
            );
          }
        })}
      </div>
    );
  },

  sendQuery: function(name, medicationList) {
    var endpoint = 'https://api.fda.gov/drug/event.json?';
    var apiKey = 'OoYA4HLz6ksoiZegL3xxJbHPjScSqOpeUpp1Gajg';
    var threshold = 3;

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
                             + threshold;

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
});

module.exports = AdverseEvents;