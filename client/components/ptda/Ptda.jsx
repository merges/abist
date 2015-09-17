/** @jsx React.DOM */

var React = require('react/addons');

// // Detect mobile if we're on client side.
var isMobile = require('ismobilejs');
var mobile;
if (typeof window !== 'undefined') {
  mobile = isMobile.any;
}

var PtdaConsiderations = require('./PtdaConsiderations');
var PtdaCost = require('./PtdaCost');
var PtdaFrequency = require('./PtdaFrequency');
var PtdaMedicationSquare = require('./PtdaMedicationSquare');
var PtdaMini = require('./PtdaMini');
var PtdaOnset = require('./PtdaOnset');
var PtdaSideEffects = require('./PtdaSideEffects');

var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var Modal = require('react-bootstrap').Modal;

var medications = require('../../data/drugs.js');

// PtDA option

var PtdaOption = React.createClass({
	propTypes: {
  	medication: React.PropTypes.object.isRequired,
    risks: React.PropTypes.object.isRequired,
    showDescriptions: React.PropTypes.bool,
    disabled: React.PropTypes.bool
  },

	render: function () {
		var medication = this.props.medication;
    var risks = this.props.risks;
    var showDescriptions = this.props.showDescriptions;
    var disabled = this.props.disabled;

    var cx = React.addons.classSet;
    var classes = cx({
      'option': true,
      'disabled': this.props.disabled
    });

    return (
      <section className={classes}>
        <div className="row name">
          <h2 className="col-sm-2">
            {medication.name}<br />
            <small>{medication.name_phonetic}</small>
          </h2>
          {medication.name.toLowerCase() != medication.name_generic.toLowerCase() &&
            <h3 className="col-sm-3">
              ({medication.name_generic})<br />
              <small>{medication.name_generic_phonetic}</small>
            </h3>
          }
        </div>

      	<div className="row option-header">
          <div className="col-sm-2">
            <h4>Cost</h4>
          </div>
          <div className="col-sm-2">
            <h4>How soon does it work?</h4>
          </div>
          <div className="col-sm-2">
            <h4>How often?</h4>
          </div>
          <div className="col-sm-4">
            <h4>Side effects</h4>
          </div>
          <div className="col-sm-2">
            <h4>Other considerations</h4>
          </div>
        </div>

        {!disabled && showDescriptions &&
        	<div className="row header-description">
	          <div className="col-sm-2">
	            <h5>Average cost per month. What you pay will depend on your insurance.</h5>
	          </div>
	          <div className="col-sm-2">
	            <h5>These medicines don’t start working right away.</h5>
	          </div>
	          <div className="col-sm-2">
	            <h5>Each medicine is taken on a different schedule.</h5>
	          </div>
	          <div className="col-sm-4">
	            <h5>Some side effects go away after your body adjusts to the medicine.</h5>
	          </div>
	          <div className="col-sm-2">
	            <h5>Certain people can’t use some medicines.</h5>
	          </div>
	        </div>
        }

        {!disabled &&
        	<div className="row">
	          <div className="col-sm-2 cost">
	            <h4>
	              {medication.ptda.cost.min != medication.ptda.cost.max ?
	                <span>${medication.ptda.cost.min}-${medication.ptda.cost.max}</span> :
	                <span>${medication.ptda.cost.max}</span>
	              }
	            </h4>
	          </div>
	          <div className="col-sm-2 onset">
	            <h4>
	              {medication.ptda.onset.max > 1 &&
	                <span>
	                  {medication.ptda.onset.min}-{medication.ptda.onset.max} {medication.ptda.onset.unit}s
	                </span>
	              }
	            </h4>
	          </div>
	          <div className="col-sm-2 frequency">
	            <h4>
	              {medication.ptda.frequency.dose &&
	                <span>
	                  {medication.ptda.frequency.dose == 1 ? 'Once ' : 'Twice '}
	                  {medication.ptda.frequency.multiple > 1 ?
	                    <span>every {medication.ptda.frequency.multiple} {medication.ptda.frequency.unit}s</span> :
	                    <span>a {medication.ptda.frequency.unit}</span>
	                  }
	                </span>
	              }
	            </h4>
	          </div>
	          <div className="col-sm-4 side-effects">
	            <h4>
	              {medication.ptda.side_effects.common.map(function (effect) {
	                return (<p key={effect}>{effect}</p>);
	              })}
	              <br />
	              <small>Rare</small><br />
	              {medication.ptda.side_effects.rare.map(function (effect) {
	                return (<p key={effect}>{effect}</p>);
	              })}
	            </h4>
	          </div>
	          <div className="col-sm-2 risks">
	            <h4>
	              {medication.ptda.risks.map(function (medication) {
	                if (medication.risk == 2) {
	                  return (<p key={medication.name} className="unsafe">Unsafe {risks[medication.name]}</p>);
	                }
	                else if (medication.risk == 0) {
	                  return (<p key={medication.name} className="safe">Safe {risks[medication.name]}</p>);
	                }
	                else {
	                  return (<p key={medication.name} className="unsure">Might not be safe {risks[medication.name]}</p>);
	                }
	              })}
	            </h4>
	          </div>
	        </div>
        }
      </section>
    );
  }
});



// PtDA options list

var PtdaOptions = React.createClass({
	propTypes: {
  	active: React.PropTypes.bool,
    medications: React.PropTypes.array.isRequired,
    risks: React.PropTypes.object.isRequired,
    disabledMedications: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      disabledMedications: {}
    }
  },

	render: function () {
		var disabledMedications = this.props.disabledMedications;
		var medications = this.props.medications;
    var risks = this.props.risks;
    var showDescriptions = true;

   	return (
      <section className="options">
        {medications.map(function(medication) {
        	if (showDescriptions) {
        		showDescriptions = false;
        		return (
        			<PtdaOption
        				key={medication.name}
        				medication={medication}
        				risks={risks}
						    showDescriptions
						    disabled={disabledMedications[medication.name]} />
        		);
        	}
        	return (
      			<PtdaOption
      				key={medication.name}
      				medication={medication}
      				risks={risks}
					    disabled={disabledMedications[medication.name]} />
      		);
      	})}
      </section>
    );
  }
});



// PtDA

var Ptda = React.createClass({

  getDefaultProps: function () {
    return {
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
          'name': 'Generic available',
          'type': 'boolean',
          'description': 'A cheaper, generic version is available'
        },
        'liver_disease': {
          'key': 'liver_disease',
          'name': 'Liver disease',
          'type': 'boolean',
          'description': 'if you have liver disease'
        },
        'pregnancy': {
          'key': 'pregnancy',
          'name': 'Pregnancy',
          'type': 'boolean',
          'description': 'if you’re pregnant or considering it'
        },
        'tb': {
          'key': 'tb',
          'name': 'Tuberculosis',
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
  	var medicationMap = {};
    this.props.medications.forEach(function(medication, index) {
    	medicationMap[medication.name] = index;
    });

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

    return {
      activeCard: null,
      disabledMedications: {},
      medicationMap: medicationMap,
      menuOpen: null,
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
      selectedMedication: null
    }
  },

  componentDidMount: function() {
    if (this.isMounted) {
      this.setState({
        mobile: isMobile.any
      });
    }
  },

  render: function() {
    var medications = this.props.medications;
    var preferences = this.props.preferences;
    var risks = this.props.risks;
    var risksFriendly = this.props.risksFriendly;

    var disabledMedications = this.state.disabledMedications;
    var selectedMedication = this.state.selectedMedication;
    var medicationMap = this.state.medicationMap;

    var cx = React.addons.classSet;
    var cardContainerClasses = cx({
      'card-container': true,
      'open': this.state.menuOpen == true,
      'closed': this.state.menuOpen == false
    });
    var ptdaClasses = cx({
      'ptda': true,
      'mobile': this.state.mobile,
      'no-scroll': this.state.mobile && this.state.menuOpen
    });

    return (
      <div>
        <div className={ptdaClasses}>
          <div className="header">
            <h1>RA treatment decision aid demo</h1>
            <a className="mobile-toggle" onClick={this.togglePreferenceControls}>
              {!this.state.menuOpen ? 'Filter your options' : 'Close filter'}
            </a>
          </div>
          {this.renderPreferenceControls(preferences)}
          <section>
            {selectedMedication &&
              <Modal
                title='Medication'
                backdrop={true}
                animation={false}
                onRequestHide={this.handleModalHide}>
                  <div className="modal-body">
                    <PtdaMini
                      medication={medications[medicationMap[selectedMedication]]}
                      risks={risks} />
                  </div>
              </Modal>
            }

            <div className={cardContainerClasses}>
              {
              /*
              <div>
                An attempt to be vaguely issue-centric.
                <ul>
                  <li>**Pregnant or planning to become pregnant <strong>On/off toggle</strong></li>
                  <li>**Interference with life/dosing schedule/location <strong>Frequency/injection or not?</strong></li>
                  <li>**Cost <strong>Cost tolerance—add your copay and see</strong></li>
                  <li>**Alcohol-friendly (so to speak) <strong>Do you like to drink?</strong></li>
                  <li>??Avoid side effects <strong>Anything you absolutely don’t want to feel</strong></li>
                </ul>
              </div>
              */
              }
              <div className="cards">
                <PtdaCost
                	active
                	medications={medications}
                	disabledMedications={disabledMedications}
                	selectedMedication={selectedMedication}
                	handleClick={this.handleMedicationClick} />
                <PtdaOnset
                	medications={medications}
                	disabledMedications={disabledMedications}
                	selectedMedication={selectedMedication}
                	handleClick={this.handleMedicationClick} />
                <PtdaFrequency
                	medications={medications}
                	disabledMedications={disabledMedications}
                	selectedMedication={selectedMedication}
                	handleClick={this.handleMedicationClick} />
                <PtdaConsiderations
                  medications={medications}
                  risks={risksFriendly}
                  disabledMedications={disabledMedications}
                  selectedMedication={selectedMedication}
                  handleClick={this.handleMedicationClick} />
                <PtdaSideEffects
                  medications={medications}
                  disabledMedications={disabledMedications}
                  selectedMedication={selectedMedication}
                  handleClick={this.handleMedicationClick} />
              </div>
            </div>
          </section>

          <section>
            {/*
              <PtdaOptions
              medications={medications}
              disabledMedications={disabledMedications}
              risks={risks} />
            */}
          </section>
        </div>
      </div>
    );
  },

  togglePreferenceControls: function () {
    var isOpen = this.state.menuOpen;
    isOpen = !isOpen;
    this.setState({
      menuOpen: isOpen
    })
  },

  renderPreferenceControls: function (preferences) {
    var filterPreference = this.filterPreference;
    var togglePreferenceControls = this.togglePreferenceControls;

    var preferences = this.props.preferences;
    var preferencesSelected = this.state.preferencesSelected;

    var cx = React.addons.classSet;
    var preferenceControlClasses = cx({
      'preference-controls': true,
      'open': this.state.menuOpen == true,
      'closed': this.state.menuOpen == false
    });

    return (
      <div className={preferenceControlClasses}>
        <h2 onClick={togglePreferenceControls}>
          Filter your options
          <strong>{this.state.menuOpen? '‹' : '›'}</strong>
        </h2>

        {Object.keys(preferences).map(function(key) {
          var preference = preferences[key];

          // Boolean preferences become a push button
          if (preference.type == 'boolean') {
            var preferenceClasses = cx({
              'preference': true,
              'active': preferencesSelected[key]
            });
            return (
              <section className={preferenceClasses} key={key} onClick={filterPreference.bind(null, key, false)}>
                {preference.name}
                <span className='description'>{preference.description}</span>
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
              <section>
                {preference.name}
                <span className='description'>{preference.description}</span>

                {options.map(function(option, i) {
                  var optionClasses = cx({
                    'option': true,
                    'active': !preferencesSelected[key][option]
                  });
                  return (
                    <div
                      className={optionClasses}
                      key={option}
                      onClick={filterPreference.bind(null, key, option)}>
                        <strong>› </strong>{option}
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

  handleModalHide: function () {
    this.setState({
      selectedMedication: null
    });
  },

  handleMedicationClick: function (name) {
    var selected = name != this.state.selectedMedication ? name : null;
  	this.setState({
  		selectedMedication: selected
  	});
  }

});

module.exports = Ptda;