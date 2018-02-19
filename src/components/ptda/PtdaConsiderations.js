

import React from 'react'

var PtdaMedicationSquare = require('./PtdaMedicationSquare');

// PtDA considerations/risks card

var PtdaConsiderations extends React.Component {
  propTypes: {
    active: React.PropTypes.bool,
    medications: React.PropTypes.array.isRequired,
    risks: React.PropTypes.object.isRequired,
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
    var risks = this.props.risks;
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
          {medication.ptda.risks.map(function (medication) {
            if (medication.risk == 2) {
              return (<p key={medication.name} className="unsafe">{risks[medication.name]}</p>);
            }
            else if (medication.risk == 0) {
              return (<p key={medication.name} className="safe">{risks[medication.name]}</p>);
            }
            else {
              return (<p key={medication.name} className="unsure">{risks[medication.name]}</p>);
            }
          })}
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
      <tr key={'considerations-infusion'} className='dosage-form'>
        <td colSpan='4'>
          By vein (IV infusion), taken at home or at a clinic or hospital
        </td>
      </tr>
    );

    return (
      <section className='ptda-card risks'>
        <table>
          <thead>
            <th colSpan="4">
              <h2>Considerations</h2>
              <h3>
                It is very important to talk to your doctor about these issues<br />
                before you choose a medicine.
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

export default PtdaConsiderations;