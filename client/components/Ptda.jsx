/** @jsx React.DOM */

var React = require('react/addons');



// Ptda medication square

var PtdaMedicationSquare = React.createClass({
  propTypes: {
  	content: React.PropTypes.object.isRequired,
    disabled: React.PropTypes.bool,
    handleClick: React.PropTypes.func,
    medication: React.PropTypes.object.isRequired,
    selected: React.PropTypes.bool
  },

  getDefaultProps: function() {
  	return {
  		selected: false
  	}
  },

  render: function() {
  	var medication = this.props.medication;

  	var cx = React.addons.classSet;
    var classes = cx({
      'disabled': this.props.disabled,
      'selected': this.props.selected
    });

    return (
    	<td className={classes} onClick={this.handleClick.bind(this, medication.name)}>
    		<h4>
          {medication.name_generic}<br />
          {medication.names_brand.map(function(name) {
            return (<div key={name}>({name})</div>);
          })}
        </h4>
        {this.props.content}
      </td>
    );
  },

  handleClick: function(name) {
  	this.props.handleClick && this.props.handleClick(name);
  }
});



// PtDA cost card

var PtdaCost = React.createClass({
  propTypes: {
    active: React.PropTypes.bool,
    medications: React.PropTypes.array.isRequired,
    disabledMedications: React.PropTypes.object,
    selectedMedication: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      disabledMedications: {}
    }
  },

  render: function() {
    var disabledMedications = this.props.disabledMedications;
    var medications = this.props.medications;
    var handleClick = this.props.handleClick;

    var markup = [];
    var squares = [];
    var counter = 0;

    for (var i = 0; i < medications.length; i++) {
      var medication = medications[i];
      var disabled = disabledMedications[medication.name];
      var selected = this.props.selectedMedication == medication.name;
      
      var specialContent =
        <h5>
          {medication.ptda.cost.min != medication.ptda.cost.max ?
            <span>${medication.ptda.cost.min}-${medication.ptda.cost.max}</span> :
            <span>${medication.ptda.cost.max}</span>
          }
        </h5>;

      squares.push(<PtdaMedicationSquare
						      	key={medication.name}
      							medication={medication}
      							content={specialContent} 
      							disabled={disabled}
      							selected={selected}
      							handleClick={handleClick} />)

      counter++;
      if (counter % 4 == 0) {
        markup.push(<tr key={counter}>{squares}</tr>);
        squares = [];
      }
    }
    markup.unshift(
    	<tr key={'cost-oral'} className='dosage-form'>
    		<td colSpan='4'>
    			By mouth (pills, tablets, or capsules)
    		</td>
    	</tr>
    );
    markup.splice(2,0,
    	<tr key={'cost-injection'} className='dosage-form'>
    		<td colSpan='4'>
    			Injection, taken at home or at a clinic or hospital
    		</td>
    	</tr>
    );
    markup.splice(4,0,
    	<tr key={'cost-infusion'} className='dosage-form'>
    		<td colSpan='4'>
    			By vein (IV infusion), taken at home or at a clinic or hospital
    		</td>
    	</tr>
    );

    var cx = React.addons.classSet;
    var classes = cx({
      'ptda-card cost': true,
      'active': this.props.active
    });

    return (
      <section className={classes}>
        <table>
          <thead>
            <th colSpan="4">
              <h2>Cost</h2>
              <h3>
                Average costs per month.<br />
                What you pay will depend on your insurance.
              </h3>
            </th>
          </thead>
          <tbody>
            {markup}
          </tbody>
        </table>
      </section>
    );
  }
});

// PtDA onset card

var PtdaOnset = React.createClass({
  propTypes: {
  	active: React.PropTypes.bool,
    medications: React.PropTypes.array.isRequired,
    disabledMedications: React.PropTypes.object,
    selectedMedication: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      disabledMedications: {}
    }
  },

  render: function() {
    var disabledMedications = this.props.disabledMedications;
    var medications = this.props.medications;
    var handleClick = this.props.handleClick;

    var markup = [];
    var squares = [];
    var counter = 0;

    for (var i = 0; i < medications.length; i++) {
      var medication = medications[i];
      var disabled = disabledMedications[medication.name];
      var selected = this.props.selectedMedication == medication.name;

      var specialContent =
        <h5>
          {medication.ptda.onset.max > 1 &&
            <span>
              {medication.ptda.onset.min}-{medication.ptda.onset.max} {medication.ptda.onset.unit}s
            </span>
          }
        </h5>;

      squares.push(<PtdaMedicationSquare
						      	key={medication.name}
      							medication={medication}
      							content={specialContent} 
      							disabled={disabled}
      							selected={selected}
      							handleClick={handleClick} />)

      counter++;
      if (counter % 4 == 0) {
        markup.push(<tr key={counter}>{squares}</tr>);
        squares = [];
      }
    }
    markup.unshift(
    	<tr key={'onset-oral'} className='dosage-form'>
    		<td colSpan='4'>
    			By mouth (pills, tablets, or capsules)
    		</td>
    	</tr>
    );
    markup.splice(2,0,
    	<tr key={'onset-injection'} className='dosage-form'>
    		<td colSpan='4'>
    			Injection, taken at home or at a clinic or hospital
    		</td>
    	</tr>
    );
    markup.splice(4,0,
    	<tr key={'onset-infusion'} className='dosage-form'>
    		<td colSpan='4'>
    			By vein (IV infusion), taken at home or at a clinic or hospital
    		</td>
    	</tr>
    );

    return (
      <section className='ptda-card onset'>
        <table>
          <thead>
            <th colSpan="4">
              <h2>How Soon?</h2>
              <h3>
                These medicines do not work right away. In general,<br />
                these medications begin to work in between 2 and 12 weeks.
              </h3>
            </th>
          </thead>
          <tbody>
            {markup}
          </tbody>
        </table>
      </section>
    );
  }
});



// PtDA frequency card

var PtdaFrequency = React.createClass({
  propTypes: {
  	active: React.PropTypes.bool,
    medications: React.PropTypes.array.isRequired,
    disabledMedications: React.PropTypes.object,
    selectedMedication: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      disabledMedications: {}
    }
  },

  render: function() {
    var disabledMedications = this.props.disabledMedications;
    var medications = this.props.medications;
    var handleClick = this.props.handleClick;

    var markup = [];
    var squares = [];
    var counter = 0;

    for (var i = 0; i < medications.length; i++) {
      var medication = medications[i];
      var disabled = disabledMedications[medication.name];
      var selected = this.props.selectedMedication == medication.name;

      var specialContent =
        <h5>
          {medication.ptda.frequency.dose == 1 ? 'Once ' : 'Twice '}
          <br />
          {medication.ptda.frequency.multiple > 1 ?
            <span>every {medication.ptda.frequency.multiple} {medication.ptda.frequency.unit}s</span> :
            <span>a {medication.ptda.frequency.unit}</span>
          }
        </h5>;

      squares.push(<PtdaMedicationSquare
      							key={medication.name}
	    							medication={medication}
	    							content={specialContent} 
	    							disabled={disabled}
	    							selected={selected}
	    							handleClick={handleClick} />)

      counter++;
      if (counter % 4 == 0) {
        markup.push(<tr key={counter}>{squares}</tr>);
        squares = [];
      }
    }
    markup.unshift(
    	<tr key={'frequency-oral'} className='dosage-form'>
    		<td colSpan='4'>
    			By mouth (pills, tablets, or capsules)
    		</td>
    	</tr>
    );
    markup.splice(2,0,
    	<tr key={'frequency-injection'} className='dosage-form'>
    		<td colSpan='4'>
    			Injection, taken at home or at a clinic or hospital
    		</td>
    	</tr>
    );
    markup.splice(4,0,
    	<tr key={'frequency-infusion'} className='dosage-form'>
    		<td colSpan='4'>
    			By vein (IV infusion), taken at home or at a clinic or hospital
    		</td>
    	</tr>
    );

    return (
      <section className='ptda-card frequency'>
        <table>
          <thead>
            <th colSpan="4">
              <h2>How Often?</h2>
              <h3>
                Each medication is taken on a different schedule.<br />
                Some need to be taken at a hospital or clinic.
              </h3>
            </th>
          </thead>
          <tbody>
            {markup}
          </tbody>
        </table>
      </section>
    );
  }
});



// PtDA medication mini-card

var PtdaMini = React.createClass({
	propTypes: {
  	medication: React.PropTypes.object.isRequired,
    risks: React.PropTypes.object.isRequired,
    disabled: React.PropTypes.bool
  },

	render: function () {
		var medication = this.props.medication;
    var risks = this.props.risks;
    
    var cx = React.addons.classSet;
    var classes = cx({
      'mini': true
    });
    
    return (
      <section className={classes}>
        <div className="row name">
          <h2 className="col-sm-6">
            {medication.name}<br />
            <small>{medication.name_phonetic}</small>
          </h2>
        	{medication.name.toLowerCase() != medication.name_generic.toLowerCase() &&
            <h3 className="col-sm-6">
              ({medication.name_generic})<br />
              <small>{medication.name_generic_phonetic}</small>
            </h3>
          }
        </div>
      	<div className="row">
          <div className="col-sm-3 cost">
          	<h3>Cost</h3>
            <h4>
              {medication.ptda.cost.min != medication.ptda.cost.max ?
                <span>${medication.ptda.cost.min}-${medication.ptda.cost.max}</span> :
                <span>${medication.ptda.cost.max}</span>
              }
            </h4>
          </div>
          <div className="col-sm-3 onset">
          	<h3>How Soon?</h3>
            <h4>
              {medication.ptda.onset.max > 1 &&
                <span>
                  {medication.ptda.onset.min}-{medication.ptda.onset.max} {medication.ptda.onset.unit}s
                </span>
              }
            </h4>
          </div>
          <div className="col-sm-3 frequency">
          	<h3>How Often?</h3>
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
        </div>
        <div className="row">
          <div className="col-sm-6 side-effects">
          	<h3>Side Effects</h3>
            <h4>
              {medication.ptda.side_effects.common.map(function (effect) {
                return (<span key={effect}>{effect}</span>);
              })}
              {medication.ptda.side_effects.rare.map(function (effect) {
                return (<span key={effect}>(rare) {effect}</span>);
              })}
            </h4>
          </div>
          <div className="col-sm-6 risks">
	          <h3>Other Considerations</h3>
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
      </section>
    );
  }
});



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
      medications: [
        {
          "name": "Methotrexate",
          "name_generic": "methotrexate",
          "name_common": "Methotrexate",
          "name_phonetic": "meth-OH-trex-ate",
          "name_generic_phonetic": "meth-OH-trex-ate",
          "names_brand": [
            "Otrexup",
            "Rheumatrex",
            "Trexall",
            "Rasuvo"
          ],
          "class": [
            "DMARD"
          ],
          "generic_available": true,
          "forms": [
            {
              "name": "tablet",
              "name": "injection"
            }
          ],
          "ptda": {
            "cost": {
              "min": 35,
              "max": 395
            },
            "onset": {
              "unit": "week",
              "min": 4,
              "max": 6
            },
            "frequency": {
              "unit": "week",
              "dose": 1,
              "multiple": 1
            },
            "side_effects": {
              "common": [
                "upset stomach",
                "diarrhea",
                "headache",
                "rash",
                "liver inflammation",
                "cold symptoms"
              ],
              "rare": [
                "lung inflammation"
              ]
            },
            "risks": [
              {
                "name": "tb",
                "risk": 0
              },
              {
                "name": "pregnancy",
                "risk": 2
              },
              {
                "name": "alcohol",
                "risk": 2
              },
              {
                "name": "liver_disease",
                "risk": 2
              }
            ]
          },
          "spl": [
            {
              "name": "Trexall tablet",
              "setid": "e942f8db-510f-44d6-acb5-b822196f5e8c"
            },
            {
              "name": "Rheumatrex tablet",
              "setid": "2cb70aa1-f73a-41c8-9a7f-edbcf1a06efd"
            },
            {
              "name": "generic tablet",
              "setid": "70c09984-2b36-424f-8b27-3fd0cd4e833d"
            }
          ]
        },
        {
          "name": "Hydroxychloroquine",
          "name_generic": "hydroxychloroquine",
          "name_common": "Hydroxychloroquine",
          "name_phonetic": "high-droks-ee-KLOR-oh-kwine",
          "name_generic_phonetic": "high-droks-ee-KLOR-oh-kwine",
          "class": [
            "DMARD",
            "Antimalarial"
          ],
          "generic_available": true,
          "names_brand": [
            "Plaquenil"
          ],
          "forms": [
            {
              "name": "tablet"
            }
          ],
          "ptda": {
            "cost": {
              "min": 430,
              "max": 675
            },
            "onset": {
              "unit": "week",
              "min": 4,
              "max": 8
            },
            "frequency": {
              "unit": "day",
              "dose": 1,
              "multiple": 1
            },
            "side_effects": {
              "common": [
                "upset stomach",
                "diarrhea",
                "headache",
                "rash",
                "liver inflammation",
                "cold symptoms"
              ],
              "rare": [
                "severe liver injury"
              ]
            },
            "risks": [
              {
                "name": "tb",
                "risk": 0
              },
              {
                "name": "pregnancy",
                "risk": 0
              },
              {
                "name": "alcohol",
                "risk": 0
              },
              {
                "name": "liver_disease",
                "risk": 0
              }
            ]
          }
        },
        {
          "name": "Leflunomide",
          "name_generic": "leflunomide",
          "name_common": "Leflunomide",
          "name_phonetic": "leh-FLUH-no-mide",
          "name_generic_phonetic": "leh-FLUH-no-mide",
          "class": [
            "DMARD",
            "Immune system modulator"
          ],
          "generic_available": true,
          "names_brand": [
            "Arava"
          ],
          "forms": [
            {
              "name": "tablet"
            }
          ],
          "ptda": {
            "cost": {
              "min": 430,
              "max": 675
            },
            "onset": {
              "unit": "week",
              "min": 4,
              "max": 8
            },
            "frequency": {
              "unit": "day",
              "dose": 1,
              "multiple": 1
            },
            "side_effects": {
              "common": [
                "upset stomach",
                "diarrhea",
                "headache",
                "rash",
                "liver inflammation",
                "cold symptoms"
              ],
              "rare": [
                "severe liver injury"
              ]
            },
            "risks": [
              {
                "name": "tb",
                "risk": 0
              },
              {
                "name": "pregnancy",
                "risk": 2
              },
              {
                "name": "alcohol",
                "risk": 2
              },
              {
                "name": "liver_disease",
                "risk": 2
              }
            ]
          }
        },
        {
          "name": "Sulfasalazine",
          "name_generic": "sulfasalazine",
          "name_common": "Sulfasalazine",
          "name_phonetic": "suhl-fa-SAL-uh-zeen",
          "name_generic_phonetic": "suhl-fa-SAL-uh-zeen",
          "class": [
            "DMARD"
          ],
          "generic_available": true,
          "names_brand": [
            "Azulfidine"
          ],
          "forms": [
            {
              "name": "tablet"
            }
          ],
          "ptda": {
            "cost": {
              "min": 20,
              "max": 155
            },
            "onset": {
              "unit": "week",
              "min": 4,
              "max": 12
            },
            "frequency": {
              "unit": "day",
              "dose": 2,
              "multiple": 1
            },
            "side_effects": {
              "common": [
                "upset stomach",
                "diarrhea",
                "headache",
                "rash",
                "liver inflammation",
                "cold symptoms"
              ],
              "rare": [
                "severe skin reaction",
                "low blood counts"
              ]
            },
            "risks": [
              {
                "name": "tb",
                "risk": 0
              },
              {
                "name": "pregnancy",
                "risk": 0
              },
              {
                "name": "alcohol",
                "risk": 0
              },
              {
                "name": "liver_disease",
                "risk": 2
              }
            ]
          }
        },
        {
          "name": "Simponi",
          "name_generic": "golimumab",
          "name_common": "Simponi",
          "name_phonetic": "SIM-puh-nee",
          "name_generic_phonetic": "go-LIM-oo-mab",
          "class": [
            "DMARD",
            "TNF inhibitor"
          ],
          "generic_available": true,
          "names_brand": [
            "Simponi"
          ],
          "forms": [
            {
              "name": "injection"
            }
          ],
          "ptda": {
            "cost": {
              "min": 1985,
              "max": 1985
            },
            "onset": {
              "unit": "week",
              "min": 2,
              "max": 4
            },
            "frequency": {
              "unit": "month",
              "dose": 1,
              "multiple": 1
            },
            "side_effects": {
              "common": [
                "redness or soreness where needle enters skin",
                "upset stomach",
                "headache",
                "dizziness",
                "high blood pressure"
              ],
              "rare": [
                "reactivation of tuberculosis",
                "serious infection that needs antibiotic by vein in hospital",
                "cancer (most often skin or blood, like lymphoma"
              ]
            },
            "risks": [
              {
                "name": "tb",
                "risk": 2
              },
              {
                "name": "pregnancy",
                "risk": 1
              },
              {
                "name": "alcohol",
                "risk": 0
              },
              {
                "name": "liver_disease",
                "risk": 0
              }
            ]
          }
        },
        {
          "name": "Humira",
          "name_generic": "adalimumab",
          "name_common": "Humira",
          "name_phonetic": "hew-MEER-uh",
          "name_generic_phonetic": "ad-uh-LIH-muh-mab",
          "class": [
            "DMARD",
            "Biologic",
            "TNF blocker"
          ],
          "generic_available": false,
          "names_brand": [
            "Humira"
          ],
          "ptda": {
            "cost": {
              "min": 1830,
              "max": 1830
            },
            "onset": {
              "unit": "week",
              "min": 2,
              "max": 4
            },
            "frequency": {
              "unit": "month",
              "dose": 2,
              "multiple": 1
            },
            "side_effects": {
              "common": [
                "redness or soreness where needle enters skin",
                "upset stomach",
                "headache",
                "dizziness",
                "high blood pressure"
              ],
              "rare": [
                "reactivation of tuberculosis",
                "serious infection that needs antibiotic by vein in hospital",
                "cancer (most often skin or blood, like lymphoma"
              ]
            },
            "risks": [
              {
                "name": "tb",
                "risk": 2
              },
              {
                "name": "pregnancy",
                "risk": 1
              },
              {
                "name": "alcohol",
                "risk": 0
              },
              {
                "name": "liver_disease",
                "risk": 0
              }
            ]
          }
        },
        {
          "name": "Cimzia",
          "name_generic": "certolizumab",
          "name_common": "Cimzia",
          "name_phonetic": "SIM-zee-uh",
          "name_generic_phonetic": "sir-toh-LIZ-uh-mab",
          "class": [
            "DMARD",
            "TNF inhibitor"
          ],
          "generic_available": false,
          "names_brand": [
            "Cimzia"
          ],
          "ptda": {
            "cost": {
              "min": 3510,
              "max": 3510
            },
            "onset": {
              "unit": "week",
              "min": 2,
              "max": 4
            },
            "frequency": {
              "unit": "month",
              "dose": 2,
              "multiple": 1
            },
            "side_effects": {
              "common": [
                "redness or soreness where needle enters skin",
                "upset stomach",
                "headache",
                "dizziness",
                "high blood pressure"
              ],
              "rare": [
                "reactivation of tuberculosis",
                "serious infection that needs antibiotic by vein in hospital",
                "cancer (most often skin or blood, like lymphoma"
              ]
            },
            "risks": [
              {
                "name": "tb",
                "risk": 2
              },
              {
                "name": "pregnancy",
                "risk": 1
              },
              {
                "name": "alcohol",
                "risk": 0
              },
              {
                "name": "liver_disease",
                "risk": 0
              }
            ]
          }
        },
        {
          "name": "Enbrel",
          "name_generic": "etanercept",
          "name_common": "Enbrel",
          "name_phonetic": "EN-brel",
          "name_generic_phonetic": "eh-TAN-er-sept",
          "class": [
            "DMARD",
            "TNF blocker",
            "Immune system modulator"
          ],
          "generic_available": false,
          "names_brand": [
            "Enbrel"
          ],
          "names_for_query": [
            "Enbrel",
            "etanercept"
          ],
          "forms": [
            {
              "name": "injection"
            }
          ],
          "ptda": {
            "cost": {
              "min": 1865,
              "max": 1865
            },
            "onset": {
              "unit": "week",
              "min": 2,
              "max": 4
            },
            "frequency": {
              "unit": "week",
              "dose": 1,
              "multiple": 1
            },
            "side_effects": {
              "common": [
                "redness or soreness where needle enters skin",
                "upset stomach",
                "headache",
                "dizziness",
                "high blood pressure"
              ],
              "rare": [
                "reactivation of tuberculosis",
                "serious infection that needs antibiotic by vein in hospital",
                "cancer (most often skin or blood, like lymphoma"
              ]
            },
            "risks": [
              {
                "name": "tb",
                "risk": 2
              },
              {
                "name": "pregnancy",
                "risk": 1
              },
              {
                "name": "alcohol",
                "risk": 0
              },
              {
                "name": "liver_disease",
                "risk": 0
              }
            ]
          }
        },
        {
          "name": "Rituxan",
          "name_generic": "rituximab",
          "name_common": "Rituxan",
          "name_phonetic": "rye-TUX-an",
          "name_generic_phonetic": "rye-TUX-ih-mab",
          "class": [
            "DMARD",
            "Biologic"
          ],
          "generic_available": false,
          "names_brand": [
            "Rituxan"
          ],
          "forms": [
            {
              "name": "intravenous"
            }
          ],
          "ptda": {
            "cost": {
              "min": 1105,
              "max": 1105
            },
            "onset": {
              "unit": "week",
              "min": 2,
              "max": 12
            },
            "frequency": {
              "unit": "week",
              "dose": 2,
              "multiple": 2
            },
            "side_effects": {
              "common": [
                "reaction to infusion",
                "upset stomach",
                "headache",
                "dizziness",
                "high blood pressure"
              ],
              "rare": [
                "reactivation of tuberculosis",
                "serious infection that needs antibiotic by vein in hospital",
                "cancer (most often skin or blood, like lymphoma",
                "severe infusion reaction"
              ]
            },
            "risks": [
              {
                "name": "tb",
                "risk": 2
              },
              {
                "name": "pregnancy",
                "risk": 1
              },
              {
                "name": "alcohol",
                "risk": 0
              },
              {
                "name": "liver_disease",
                "risk": 0
              }
            ]
          }
        },
        {
          "name": "Remicade",
          "name_generic": "infliximab",
          "name_common": "Remicade",
          "name_phonetic": "REM-ih-kaid",
          "name_generic_phonetic": "in-FLIX-ih-mab",
          "class": [
            "DMARD",
            "TNF inhibitor"
          ],
          "generic_available": false,
          "names_brand": [
            "Remicade"
          ],
          "forms": [
            {
              "name": "intravenous"
            }
          ],
          "ptda": {
            "cost": {
              "min": 790,
              "max": 3765
            },
            "onset": {
              "unit": "week",
              "min": 2,
              "max": 4
            },
            "frequency": {
              "unit": "month",
              "dose": 1,
              "multiple": 2
            },
            "side_effects": {
              "common": [
                "reaction to infusion",
                "upset stomach",
                "headache",
                "dizziness",
                "high blood pressure"
              ],
              "rare": [
                "reactivation of tuberculosis",
                "serious infection that needs antibiotic by vein in hospital",
                "cancer (most often skin or blood, like lymphoma",
                "severe infusion reaction"
              ]
            },
            "risks": [
              {
                "name": "tb",
                "risk": 2
              },
              {
                "name": "pregnancy",
                "risk": 1
              },
              {
                "name": "alcohol",
                "risk": 0
              },
              {
                "name": "liver_disease",
                "risk": 0
              }
            ]
          }
        },
        {
          "name": "Orencia",
          "name_generic": "abatacept",
          "name_common": "Orencia",
          "name_phonetic": "or-EN-see-uh",
          "name_generic_phonetic": "a-BAH-tuh-sept",
          "class": [
            "DMARD",
            "Biologic"
          ],
          "generic_available": false,
          "names_brand": [
            "Orencia"
          ],
          "forms": [
            {
              "name": "intravenous"
            }
          ],
          "ptda": {
            "cost": {
              "min": 1185,
              "max": 2365
            },
            "onset": {
              "unit": "week",
              "min": 2,
              "max": 4
            },
            "frequency": {
              "unit": "month",
              "dose": 1,
              "multiple": 1
            },
            "side_effects": {
              "common": [
                "reaction to infusion",
                "upset stomach",
                "headache",
                "dizziness",
                "high blood pressure"
              ],
              "rare": [
                "reactivation of tuberculosis",
                "serious infection that needs antibiotic by vein in hospital",
                "cancer (most often skin or blood, like lymphoma",
                "severe infusion reaction"
              ]
            },
            "risks": [
              {
                "name": "tb",
                "risk": 2
              },
              {
                "name": "pregnancy",
                "risk": 1
              },
              {
                "name": "alcohol",
                "risk": 0
              },
              {
                "name": "liver_disease",
                "risk": 0
              }
            ]
          }
        },
        {
          "name": "Actemra",
          "name_generic": "tocilizumab",
          "name_common": "Actemra",
          "name_phonetic": "ak-TEM-ra",
          "name_generic_phonetic": "toh-sil-IZ-oo-mab",
          "class": [
            "DMARD",
            "Biologic",
            "IL6 inhibitor"
          ],
          "generic_available": false,
          "names_brand": [
            "Actemra"
          ],
          "forms": [
            {
              "name": "intravenous"
            }
          ],
          "ptda": {
            "cost": {
              "min": 1115,
              "max": 2230
            },
            "onset": {
              "unit": "week",
              "min": 2,
              "max": 4
            },
            "frequency": {
              "unit": "month",
              "dose": 1,
              "multiple": 1
            },
            "side_effects": {
              "common": [
                "reaction to infusion",
                "upset stomach",
                "headache",
                "dizziness",
                "high blood pressure"
              ],
              "rare": [
                "reactivation of tuberculosis",
                "serious infection that needs antibiotic by vein in hospital",
                "cancer (most often skin or blood, like lymphoma",
                "severe infusion reaction"
              ]
            },
            "risks": [
              {
                "name": "tb",
                "risk": 2
              },
              {
                "name": "pregnancy",
                "risk": 1
              },
              {
                "name": "alcohol",
                "risk": 0
              },
              {
                "name": "liver_disease",
                "risk": 0
              }
            ]
          }
        }
      ],
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

    var disabledMedications = this.state.disabledMedications;
    var selectedMedication = this.state.selectedMedication;
    var medicationMap = this.state.medicationMap;

    return (
      <div>
        <div className="container ptda">
          <h1>PtDA tailoring demo</h1>
          {this.renderRiskButtons(risks)}

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
          </section>

          <PtdaOptions
          	medications={medications}
            disabledMedications={disabledMedications}
            risks={risks} />
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
      <section className="row buttons">
        <div className="col-sm-5">
          <h2>Filter for people concerned about:</h2>

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
        </div>
        <div className="col-sm-7">
        	<div className="floating">
	        	{selectedMedication && 
	    				<PtdaMini
	      				medication={medications[medicationMap[selectedMedication]]}
	      				risks={risks} />
	      		}
      		</div>
        </div>
      </section>
    );
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