/** @jsx React.DOM */

var React = require('react/addons');

var PtdaConsiderations = require('./PtdaConsiderations');
var PtdaCost = require('./PtdaCost');
var PtdaFrequency = require('./PtdaFrequency');
var PtdaMedicationSquare = require('./PtdaMedicationSquare');
var PtdaMini = require('./PtdaMini');
var PtdaOnset = require('./PtdaOnset');
var PtdaSideEffects = require('./PtdaSideEffects');

var Modal = require('react-bootstrap').Modal;

var medications = require('../Data.jsx');



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

      	<div className="row header">
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
    this.props.medications.forEach(function (medication, index) {
    	medicationMap[medication.name] = index;
    });

    return {
      activeCard: null,
      disabledMedications: {},
      medicationMap: medicationMap,
      selectedRisks: {},
      selectedMedication: null
    }
  },

  render: function () {
    var medications = this.props.medications;
    var risks = this.props.risks;
    var risksFriendly = this.props.risksFriendly;

    var disabledMedications = this.state.disabledMedications;
    var selectedMedication = this.state.selectedMedication;
    var medicationMap = this.state.medicationMap;

    return (
      <div>
        <section className="header">
          <div className="row">
            <div className="col-sm-3">
              <h1>PtDA tailoring demo</h1>
            </div>
            <div className="col-sm-6">
              {this.renderRiskButtons(risks)}
            </div>
          </div>
        </section>
        <div className="container ptda">
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

          <section className="cards">
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
          </section>

          <div className="row">
            <PtdaOptions
            	medications={medications}
              disabledMedications={disabledMedications}
              risks={risks} />
          </div>
        </div>
      </div>
    );
  },

  renderRiskButtons: function (risks) {
    var filterRisks = this.filterRisks;
    var risksForButtons = Object.keys(risks);
    var risksFriendly = this.props.risksFriendly;
    var selectedRisks = this.state.selectedRisks;

    var medications = this.props.medications;
    var selectedMedication = this.state.selectedMedication;
    var medicationMap = this.state.medicationMap;

    var cx = React.addons.classSet;

    return (
      <section className="buttons">
        {risksForButtons.map(function (item) {
          var classes = cx({
            'btn btn-default': true,
            'active': selectedRisks[item]
          });
          return (
            <a className={classes} key={item} onClick={filterRisks.bind(null, item)}>
              {risksFriendly[item]}
            </a>
          );
        })}
      </section>
    );
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
  },

  filterRisks: function (risk) {
    var medications = this.props.medications;
    var selectedRisks = this.state.selectedRisks;

    selectedRisks[risk] = !selectedRisks[risk];

    var disabledMedications = {};
    if (Object.keys(selectedRisks).length > 0) {
      medications.forEach(function(item) {
        for (var risk in selectedRisks) {
          if (selectedRisks[risk]) {
            for (var i in item.ptda.risks) {
              var drugRiskToCheck = item.ptda.risks[i];
              if (drugRiskToCheck.name == risk && drugRiskToCheck.risk == 2) {
                disabledMedications[item.name] = true;
                return;
              }
            }
          }
        }
      });
    }

    this.setState({
      disabledMedications: disabledMedications,
      selectedRisks: selectedRisks
    });
  }
});

module.exports = Ptda;