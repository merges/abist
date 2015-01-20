/** @jsx React.DOM */

var React = require('react/addons');

var PtdaMedicationSquare = require('./PtdaMedicationSquare');

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

module.exports = PtdaCost;