/** @jsx React.DOM */

var React = require('react/addons');
var _ = require('underscore');

// Data
var get = require('../data/get.js');
var medications = require('../data/medications.js');
var mockData = require('../data/mock.js');

var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;

var OutcomeAdverseEvents = require('./OutcomeAdverseEvents.jsx');
var OutcomeRelativeComparison = require('./OutcomeRelativeComparison.jsx');
var OutcomeTimeline = require('./OutcomeTimeline.jsx');

var PtdaConsiderations = require('./ptda/PtdaConsiderations');
var PtdaCost = require('./ptda/PtdaCost');
var PtdaFrequency = require('./ptda/PtdaFrequency');
var PtdaMedicationSquare = require('./ptda/PtdaMedicationSquare');
var PtdaMini = require('./ptda/PtdaMini');
var PtdaOnset = require('./ptda/PtdaOnset');
var PtdaSideEffects = require('./ptda/PtdaSideEffects');

String.prototype.capitalizeFirstletter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// Navigator experiment

var Navigator = React.createClass({

  getDefaultProps: function () {
    return {
      offline: false,
      medications: medications,
      preferences: {
        'alcohol': {
          'key': 'key',
          'name': 'Alcohol-friendly',
          'type': 'boolean',
          'description': 'If you drink alcohol'
        },
        // 'cost': {
        //   'key': 'cost',
        //   'name': 'Cost',
        //   'type': 'number',
        //   'description': 'average cost per month'
        // },
        // 'class': {
        //   'key': 'class',
        //   'name': 'Drug class',
        //   'type': 'list',
        //   'description': 'Drug classes'
        // },
        'forms': {
          'key': 'forms',
          'name': 'Dosage form',
          'type': 'list',
          'description': 'preferred way of taking your medicine'
        },
        'generic_available': {
          'key': 'generic_available',
          'name': 'Generic available (less expensive)',
          'type': 'boolean',
          'description': 'A cheaper, generic version is available'
        },
        'liver_disease': {
          'key': 'liver_disease',
          'name': 'Safer for liver disease',
          'type': 'boolean',
          'description': 'if you have liver disease'
        },
        'pregnancy': {
          'key': 'pregnancy',
          'name': 'Safer for pregnancy',
          'type': 'boolean',
          'description': 'if you’re pregnant or considering it'
        },
        'tb': {
          'key': 'tb',
          'name': 'Safer for tuberculosis',
          'type': 'boolean',
          'description': 'if you have or might be exposed to tuberculosis'
        }
      },
      risks: {
        "tb": "if you have or might be exposed to tuberculosis",
        "pregnancy": "if you’re pregnant or considering it",
        "liver_disease": "if you have liver disease",
        "alcohol": "if you drink alcohol"
      },
      risksFriendly: {
        "tb": "Tuberculosis",
        "pregnancy": "Pregnancy",
        "liver_disease": "Liver disease",
        "alcohol": "Alcohol"
      }
    };
  },

  getInitialState: function () {
    var getDosageForms = function(medications) {
      var dosageForms = {};
      medications.map(function(medication) {
        if (medication.forms) {
          medication.forms.forEach(function(form) {
            dosageForms[form.name] = false;
          });
        }
      });
      return dosageForms;
    };

    var getClasses = function(medications) {
      var classes = {};
      medications.map(function(medication) {
        if (medication.class) {
          medication.class.forEach(function(name) {
            classes[name] = false;
          });
        }
      });
      return classes;
    };

    var getDisabledMedications = function(medications) {
      var disabled = {};
      medications.forEach(function(medication) {
        disabled[medication.name] = false;
      });
      return disabled;
    };

    return {
      data: {},

      // Medication filtering-related
      disabledMedications: getDisabledMedications(medications),
      menuOpen: false,
      preferences: this.props.preferences,
      preferencesSelected: {
        alcohol: false,
        class: getClasses(this.props.medications),
        cost: null,
        forms: getDosageForms(this.props.medications),
        generic_available: false,
        liver_disease: false,
        pregnancy: false,
        tb: false
      },

      // User interaction-related
      selectedTag: null,
      selectedMeasure: null
    }
  },

  componentDidMount: function() {
    var instance = this;

    if (this.props.offline) {
      // Use mock data
      this.setState({
        data: mockData,
        selectedMeasure: 'acr_50',
        selectedTag: 'improvement'
      });
    }
    else {
      // Query spreadsheets
      this.getData()
      .done(function(data) {
        if (instance.isMounted) {
          instance.setState({data: data})
          if (data.tags['improvement'] && data.measures['acr_50'] && data.grades && data.data != {}) {
            instance.setState({
              selectedMeasure: 'acr_50',
              selectedTag: 'improvement',
              // selectedMeasure: 'ae',
              // selectedTag: 'adverse event'
            });
          }
        }
      });
    }
  },

  getData: function() {
    var urlTagDescriptions = get.getSheetUrl(get.sheets.tagDescriptions);
    var urlMeasures = get.getSheetUrl(get.sheets.measures);
    var urlMetrics = get.getSheetUrl(get.sheets.metrics);
    var urlGrades = get.getSheetUrl(get.sheets.grades);
    var urlTagDescriptions = get.getSheetUrl(get.sheets.tagDescriptions);

    var allData = {};
    var deferred = new $.Deferred;

    $.when(
      // Get GRADE
      $.getJSON(urlGrades).done(function (data) {
        allData['grades'] = get.processGrades(data);
      }),

      // Get measures & tags
      $.getJSON(urlMeasures).done(function (data) {
        // var newStateItems = get.processMeasures(data);
        allData['measures'] = get.processMeasures(data).measures;
        allData['tags'] = get.processMeasures(data).tags;
      }),

      // Get metrics
      $.getJSON(urlMetrics).done(function (data) {
        allData['metrics'] = get.processMetrics(data);
      }),

      // Get tag descriptions
      $.getJSON(urlTagDescriptions).done(function (data) {
        allData['tagDescriptions'] = get.processTagDescriptions(data);
      }),

      // Get data
      $.when(Object.keys(get.sheets.data).forEach(function (source) {
        var url = get.getSheetUrl(get.sheets.data[source]);
        $.getJSON(url).done(function (data) {
          !allData['data'] && (allData['data'] = {});
          allData['data'][source] = get.processData(data);
        });
      })
      ).done(function() {
        return true;
      })
    ).done(function() {
      deferred.resolve(allData);
    });

    return deferred.promise();
  },

  handleDrugFilterClick: function(key, selectedValue) {
    var preferencesSelected = this.state.drugPreferencesSelected;
    if (selectedValue) {
      Object.keys(preferencesSelected[key]).forEach(function(pref) {
        preferencesSelected[key][pref] = false;
      });
      preferencesSelected[key][selectedValue] = true;
    }
    else {
      preferencesSelected[key] = !preferencesSelected[key];
    }
    this.setState({
      userHasFiltered: true,
      preferencesSelected: preferencesSelected
    });
  },

  filterDrugs: function(drugs, preferencesSelected) {
    var disabledDrugs = {};

    drugs.forEach(function(drug, i) {
      var drugFeatures = {};

      // 1. Examine all the preferences for a match
      for (var preference in preferencesSelected) {
        if (preferencesSelected[preference] && preferencesSelected[preference] != null) {
          var filter = drugFilters[preference];
          var options = preferencesSelected[preference];
          drugFeatures[preference] = filter.isMatch(drug, options);
        }
      }

      // 2. Check if the drug should be disabled
      var keepDrug = true;
      for (var preference in preferencesSelected) {
        if (preferencesSelected[preference] != null) {
          for (var feature in drugFeatures) {
            if (preferencesSelected[preference] && !drugFeatures[preference]) {
              keepDrug = false;
            }
          }
        }
      }
      disabledDrugs[drug.name] = !keepDrug;
    });

    return disabledDrugs;
  },

  togglePreferenceControls: function (direction) {
    // var isOpen = this.state.menuOpen;
    // isOpen = !isOpen;
    // this.setState({
    //   menuOpen: isOpen
    // });

    if (direction == 'open') {
      this.setState({
        menuOpen: true
      });
    }
    if (direction == 'close') {
      this.setState({
        menuOpen: false
      });
    }
  },

  togglePreferenceControlsOpen: function() {
    this.setState({
      menuOpen: true
    });
  },

  togglePreferenceControlsClose: function() {
    this.setState({
      menuOpen: false
    });
  },

  renderPreferenceControls: function(preferences) {
    var filterPreference = this.filterPreference;
    var toggleOpen = this.togglePreferenceControlsOpen;
    var toggleClose = this.togglePreferenceControlsClose;

    var preferences = this.props.preferences;
    var preferencesSelected = this.state.preferencesSelected;

    var cx = React.addons.classSet;

    return (
      <div className='filter-controls'
        onMouseEnter={toggleOpen}
        onMouseLeave={toggleClose}>
          <h3 className='brief-header'>Filter medications to match your preferences and needs</h3>

          {Object.keys(preferences).map(function(key) {
            var preference = preferences[key];

            // Boolean preferences become a push button
            if (preference.type == 'boolean') {
              var preferenceClasses = cx({
                'button': true,
                'active': preferencesSelected[key]
              });
              return (
                <section>
                  <a className={preferenceClasses} key={key} onClick={filterPreference.bind(null, key, false)}>
                    {preference.name}
                  </a>
                  {/*<span className='description'>{preference.description}</span>*/}
                </section>
              );
            }
            // List preferences become a list
            else if (preference.type == 'list') {
              // Get the possible options for this preference from this.state.preferencesSelected.
              // There is a function in getInitialState() that iterates through the provided medications,
              // collecting the "options" they provide for vis à vis this preference.
              var options = Object.keys(preferencesSelected[key]);

              return (
                <section key={key}>
                  {preference.name}
                  {/*<span className='description'>{preference.description}</span>*/}

                  {options.map(function(option, i) {
                    var optionClasses = cx({
                      'option': true,
                      'active': !preferencesSelected[key][option]
                    });
                    return (
                      <div>
                        <input type='checkbox'
                          className={optionClasses}
                          key={option}
                          value={option}
                          checked={!preferencesSelected[key][option]}
                          onChange={filterPreference.bind(null, key, option)}>
                            {option}
                        </input>
                      </div>
                    );
                  })}
                </section>
              );
            }
            else {
              return (
                <section>
                  {preference.name}
                  <span className='description'>{preference.description}</span>
                </section>
              );
            }
          })}
      </div>
    );
  },

  filterPreference: function (preferenceKey, optionKey, event) {
    if (this.state.menuOpen) {
      event.stopPropagation();
    }

    var disabledMedications = {};
    var medications = this.props.medications;
    var preferencesSelected = this.state.preferencesSelected;

    // Toggle the preference. If there's an 'option' provided, the preference is a list type,
    // for example dosage form. So we use the 'preference' to access the dosage forms object,
    // and use the preference to set true/false on the appropriate dosage form.
    //
    // forms: {
    //   tablet: true,
    //   injection: true
    // }
    //

    // TOGGLE PREFERENCES
    if (optionKey) {
      preferencesSelected[preferenceKey][optionKey] = !preferencesSelected[preferenceKey][optionKey];
    }
    else {
      preferencesSelected[preferenceKey] = !preferencesSelected[preferenceKey];
    }

    // Check each medication against the selected preferences and options,
    // disabling any that doesn't satisfy.
    //
    medications.forEach(function(medication, i) {
      var medicationMatchingPreferences = {};

      // 1. Examine all the preferences for a match.
      //
      for (var preference in preferencesSelected) {
        if (preferencesSelected[preference]) {

          // a. Simple boolean preference
          if (typeof preferencesSelected[preference] === 'boolean') {

            // Look for a matching key in the medication object
            // Boolean? e.g. 'generic_available' -- inverse match
            if (medication[preference] == false) {
              medicationMatchingPreferences[preference] = true;
              // disabledMedications[medication.name] = true;
            }
            // Not a key in medication object, so check ptda.risks
            else {
              for (var risk in medication.ptda.risks) {
                if (medication.ptda.risks[risk].name.toLowerCase() == preference.toLowerCase() && medication.ptda.risks[risk].risk == 2) {
                  medicationMatchingPreferences[preference] = true;
                  // disabledMedications[medication.name] = true;
                }
              }
            }
          }

          // b. List preference
          else if (typeof preferencesSelected[preference] === 'object') {

            // The user chose one or more options (to avoid), so the medication must match
            // each option in order to get disabled.
            var selectedOptions = {};
            var medicationMatchingOptions = {};

            // Check each option for a match
            for (var option in preferencesSelected[preference]) {

              // Option is selected
              if (preferencesSelected[preference][option]) {
                selectedOptions[option] = true;

                // Look for a matching key in the medication object
                if (medication[preference]) {

                  // Is it an array or an object?
                  if (typeof medication[preference] === 'object') {

                    // Array
                    if (Array.isArray(medication[preference])) {
                      var list = medication[preference];

                      // Check for our option in the list
                      for (var item in list) {
                        // Straight up list item?
                        if (typeof list[item] === 'string') {
                          if (list[item].toLowerCase() == option.toLowerCase()) {
                            medicationMatchingOptions[option] = true;
                          }
                          else {
                            medicationMatchingOptions[list[item].toLowerCase()] = true;
                          }
                        }
                        // Object? Look for a 'name' that we'll check against
                        else if (list[item].hasOwnProperty('name')) {
                          if (list[item].name.toLowerCase() == option.toLowerCase()) {
                            medicationMatchingOptions[option] = true;
                          }
                          else {
                            medicationMatchingOptions[list[item].name.toLowerCase()] = true;
                          }
                        }
                      }
                    }
                    // Object
                    else {
                      for (var item in Object.keys(medication[preference])) {
                        if (list[item].toLowerCase() == option.toLowerCase()) {
                          medicationMatchingOptions[option] = true;
                        }
                        else {
                          medicationMatchingOptions[list[item].toLowerCase()] = true;
                        }
                      }
                      // // Check for our option in the object
                      // if (medication[preference][optionKey]) {
                      //   medicationMatchingOptions[option] = true;
                      // }
                    }
                  }
                }
              }
            }

            // Check if the drug should be disabled based on one of the options matching.
            if (Object.keys(selectedOptions).length > 0) {
              // Disabled options present in the drug? Disable it.
              for (var selected in selectedOptions) {
                for (var option in medicationMatchingOptions) {
                  if (medicationMatchingOptions[option] && selectedOptions[option]) {
                    medicationMatchingPreferences[preference] = true;
                  }
                }
              }
              // Wait! Does the drug have other options that are NOT disabled? Don't disable it!
              for (var option in medicationMatchingOptions) {
                if (medicationMatchingOptions[option] && !selectedOptions[option]) {
                  medicationMatchingPreferences[preference] = false;
                }
              }
            }
          }
        }
      }

      // 2. Check if the drug should be disabled.
      //
      if (Object.keys(preferencesSelected).length > 0) {
        var disableMedication = false;

        // Disabled options present in the drug? Disable it.
        for (var selected in preferencesSelected) {
          for (var preference in medicationMatchingPreferences) {
            if (medicationMatchingPreferences[preference] && preferencesSelected[preference]) {
              disableMedication = true;
            }
          }
        }
        // Wait! Does the drug have other preferences that are NOT disabled? Don't disable it!
        for (var preference in medicationMatchingPreferences) {
          if (medicationMatchingPreferences[preference] && !preferencesSelected[preference]) {
            disableMedication = false;
          }
        }

        // Add the medication to disabledMedications.
        if (disableMedication) {
          disabledMedications[medication.name] = true;
        }
        else {
          disabledMedications[medication.name] = false;
        }
      }
    });

    this.setState({
      disabledMedications: disabledMedications,
      preferencesSelected: preferencesSelected
    });
  },

  getDataByTag: function(selectedTag) {
    var data = this.state.data.data;
    var tags = this.state.data.tags;
    var dataByTag = JSON.parse(JSON.stringify(tags));

    // Each tag (pain, function, etc.)
    Object.keys(tags).map(function (tag) {
      // Each source (sheet of data)
      Object.keys(data).map(function (source) {
        // Each entry in the source data (line of sheet)
        data[source].map(function (entry) {
          // Entry records an outcome in a measure that is associated with one of the tags?
          // e.g. tags['pain']['patient_pain'] or ['improvement']['acr_50']
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
  },

  handleMedicationClick: function(key) {
    var disabledMedications = this.state.disabledMedications;
    disabledMedications[key] = !disabledMedications[key];
    this.setState({
      disabledMedications: disabledMedications
    });
  },

  renderPreferredMedicationName: function(medication) {
    if (medication.name_common.toLowerCase() == medication.name_generic.toLowerCase()) {
      return (
        <span>
          <strong>{medication.name_generic.toLowerCase()}</strong>
        </span>
      );
    }
    else {
      return (
        <span>
          {medication.name_common}<br />
          <strong>{medication.name_generic}</strong>
        </span>
      );
    }
  },

  renderMedicationBar: function(medications) {
  	var disabledMedications = this.state.disabledMedications;
    var handleMedicationClick = this.handleMedicationClick;
    var renderPreferredMedicationName = this.renderPreferredMedicationName;

    if (medications) {
      return (
        <div className='medication-cards'>
          <h3 className='brief-header'>Medications that match the selected preferences and needs</h3>
          <ul>
            {Object.keys(medications).map(function (medication, i) {
            	var medication = medications[medication];
              return (
                <li key={i} className={(disabledMedications[medication.name] === true) && 'disabled'}>
                  <a
                    onClick={handleMedicationClick.bind(null, medication.name)}>
                      {renderPreferredMedicationName(medication)}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  },

  handleMeasureSelect: function(key) {
    this.setState({
      selectedMeasure: key
    });
  },

  renderMeasureBar: function(selectedTag, selectedMeasure) {
    var tags = this.state.data.tags;
    var tagDescriptions = this.state.data.tagDescriptions;
    var measures = this.state.data.measures;

    if (selectedTag) {
      var tagMeasures = tags[selectedTag];
      return (
        <div>
          <div><strong>{tagDescriptions[selectedTag].name_friendly}</strong> research is done using lots of different measures. Click each one to see examples of findings.</div>
          <Nav className='tag-navigation' bsStyle="pills" activeKey={selectedMeasure && selectedMeasure} onSelect={this.handleMeasureSelect}>
            {Object.keys(tagMeasures).map(function (measure, i) {
              return (<NavItem key={i} eventKey={measure}>{measures[measure] ? measures[measure].name_friendly : measure}</NavItem>);
            })}
          </Nav>
        </div>
      );
    }
  },

  handleTagSelect: function(key) {
    this.setState({
      selectedTag: key,
      selectedMeasure: null
    });
  },

  renderTagBar: function(selectedTag) {
    var tags = this.state.data.tags;
    var tagDescriptions = this.state.data.tagDescriptions;

    if (tags && tagDescriptions) {
      return (
        <Nav className='tag-navigation' bsStyle="pills" activeKey={selectedTag && selectedTag} onSelect={this.handleTagSelect}>
          {Object.keys(tags).map(function (tag, i) {
            return (<NavItem key={i} eventKey={tag}>{tagDescriptions[tag] ? tagDescriptions[tag].name_short : tag}</NavItem>);
          })}
        </Nav>
      );
    }
  },

  renderTagDescription: function(selectedTag) {
    var tagDescriptions = this.state.data.tagDescriptions;

    if (selectedTag && tagDescriptions) {
      return (
        <div className='panel'>
          <h2 className='tag-description'>
            <strong>{tagDescriptions[selectedTag] ? tagDescriptions[selectedTag].name_friendly : selectedTag}</strong>
            {tagDescriptions[selectedTag] && <p>{tagDescriptions[selectedTag].description}</p>}
          </h2>
        </div>
      );
    }
  },

  renderDataToJSON: function(data) {
    return (
      <div>
        <div>grades: {JSON.stringify(data.grades)}</div>
        <hr />
        <div>measures: {JSON.stringify(data.measures)}</div>
        <hr />
        <div>metrics: {JSON.stringify(data.metrics)}</div>
        <hr />
        <div>tags: {JSON.stringify(data.tags)}</div>
        <hr />
        <div>tagDescriptions: {JSON.stringify(data.tagDescriptions)}</div>
        <hr />
        <div>data: {JSON.stringify(data.data)}</div>
      </div>
    );
  },

  renderMeasure: function(selectedTag, selectedMeasure) {
    var medications = this.props.medications;
    var data = this.state.data;
    var disabledMedications = this.state.disabledMedications;

    if (selectedMeasure == 'discontinued_ae') {
      return (
        <OutcomeRelativeComparison
          data={data}
          dataByTag={this.getDataByTag(selectedTag)}
          medications={medications}
          disabledMedications={disabledMedications}
          selectedTag={selectedTag}
          selectedMeasure={selectedMeasure} />
      );
    }
    else if (selectedMeasure == 'ae') {
      return (
        <OutcomeAdverseEvents
          data={data}
          dataByTag={this.getDataByTag(selectedTag)}
          medications={medications}
          disabledMedications={disabledMedications}
          selectedTag={selectedTag}
          selectedMeasure={selectedMeasure} />
      );
    }
    return(
      <OutcomeTimeline
        data={data}
        medications={medications}
        disabledMedications={disabledMedications}
        selectedTag={selectedTag}
        selectedMeasure={selectedMeasure} />
    );
  },

  render: function() {
    var cx = React.addons.classSet;
    var navigatorClasses = cx({
      'navigator': true,
      'mobile': this.state.mobile,
      'no-scroll': this.state.mobile && this.state.menuOpen
    });
    var drugPickerClasses = cx({
      'drug-picker': true,
      'open': this.state.menuOpen == true,
      'closed': this.state.menuOpen == false
    });
    var detailsClasses = cx({
      'details': true,
      'closed': this.state.menuOpen == true,
      'open': this.state.menuOpen == false
    });

    var medications         = this.props.medications;
    var preferences         = this.props.preferences;
    var risks               = this.props.risks;
    var risksFriendly       = this.props.risksFriendly;
    var disabledMedications = this.state.disabledMedications;
    var data                = this.state.data;
    var selectedMeasure     = this.state.selectedMeasure;
    var selectedTag         = this.state.selectedTag;

    if (data != {} && data['grades'] && data['metrics'] && data['measures'] && data['tags'] && data['tagDescriptions'] && data['data'] != {}) {
      // return (
      //   <div className='container-fluid'>
      //     <div className={navigatorClasses}>
      //       {this.renderDataToJSON(data)}
      //     </div>
      //   </div>
      // );
      return (
        <div className='container-fluid'>
          <div className={navigatorClasses}>
          	<section className={drugPickerClasses}>
          		{this.renderPreferenceControls(preferences)}
          	</section>

            <section className='medication-list'>
              {this.renderMedicationBar(medications)}
            </section>

            <section className={detailsClasses}>
              <h3 className='brief-header'>Look at evidence about the selected medications, in various categories</h3>

              {this.renderTagBar(selectedTag)}
              {this.renderTagDescription(selectedTag)}
              {this.renderMeasureBar(selectedTag, selectedMeasure)}
              {this.renderMeasure(selectedTag, selectedMeasure)}

              <section>
                See the individual data items in <a href='https://docs.google.com/spreadsheets/d/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/' target='_top'>this Google Spreadsheet</a>
              </section>
           	</section>
          </div>
        </div>
      );
    }
    return (<div><h1>Loading</h1></div>);
  }

});

module.exports = Navigator;