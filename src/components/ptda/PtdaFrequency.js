

import React from 'react'

var PtdaMedicationSquare = require('./PtdaMedicationSquare');

// PtDA frequency card

var PtdaFrequency extends React.Component {
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

export default PtdaFrequency;