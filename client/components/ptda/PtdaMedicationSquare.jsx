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
          {medication.names_brand.slice(0,1).map(function(name) {
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

module.exports = PtdaMedicationSquare;