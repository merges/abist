

import React from 'react'

var PtdaMedicationSquare = require('./PtdaMedicationSquare');

// PtDA onset card

var PtdaOnset extends React.Component {
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
                these medicines begin to work in between 2 and 12 weeks.
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

export default PtdaOnset;