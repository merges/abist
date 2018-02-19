

import React from 'react'

// PtDA medication mini-card

var PtdaMini extends React.Component {
  propTypes: {
    medication: React.PropTypes.object.isRequired,
    risks: React.PropTypes.object.isRequired,
    disabled: React.PropTypes.bool
  },

  render: function () {
    var medication = this.props.medication;
    var risks = this.props.risks;

    var cx = require('classnames');
    var classes = cx({
      'mini': true
    });

    return (
      <section className={classes}>
        <div className="row name">
          <h2>
            {medication.name}<br />
            <small>{medication.name_phonetic}</small>
          </h2>
          {medication.name.toLowerCase() != medication.name_generic.toLowerCase() &&
            <h3>
              ({medication.name_generic})<br />
              <small>{medication.name_generic_phonetic}</small>
            </h3>
          }
        </div>
        <div className="row content">
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

export default PtdaMini;