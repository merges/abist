/** @jsx React.DOM */

var DocumentTitle = require('react-document-title');
var React = require('react/addons');

var PageTitle = "PtDA";

var Ptda = React.createClass({

  getDefaultProps: function() {
    return {
      "medications": [
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
          "name": "Enbrel",
          "name_generic": "etanercept",
          "name_common": "Enbrel",
          "name_phonetic": "EN-brell",
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
        }
      ]
    };
  },

  render: function() {
    var medications = this.props.medications;

    return (
      <DocumentTitle title={PageTitle}>
        <div className="container ptda">
          <h1>PtDA replication</h1>
          {this.renderOptions(medications)}
        </div>
      </DocumentTitle>
    );
  },

  renderOptions: function(medications) {
    return (
      <section className="options">
        <div className="row">
          <div className="col-sm-2 cost">
            <h4>Cost</h4>
          </div>
          <div className="col-sm-2 onset">
            <h4>How soon does it work?</h4>
          </div>
          <div className="col-sm-2 frequency">
            <h4>How often?</h4>
          </div>
          <div className="col-sm-3 side-effects">
            <h4>Side effects</h4>
          </div>
          <div className="col-sm-2 risks">
            <h4>Other considerations</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2 cost">
            <h5>Average cost per month. What you pay will depend on your insurance.</h5>
          </div>
          <div className="col-sm-2 onset">
            <h5>These medicines don’t start working right away.</h5>
          </div>
          <div className="col-sm-2 frequency">
            <h5>Each medicine is taken on a different schedule.</h5>
          </div>
          <div className="col-sm-3 side-effects">
            <h5>Some side effects go away after your body adjusts to the medicine.</h5>
          </div>
          <div className="col-sm-2 risks">
            <h5>Certain people can’t use some medicines.</h5>
          </div>
        </div>
        {medications.map(function(item) {
          return (
            <section key={item.name} className="option">
              <div className="row name">
                <h2 className="col-sm-2">
                  {item.name}<br />
                  <small>{item.name_phonetic}</small>
                </h2>
                {item.name.toLowerCase() != item.name_generic.toLowerCase() && 
                  <h3 className="col-sm-3">
                    ({item.name_generic})<br />
                    <small>{item.name_generic_phonetic}</small>
                  </h3>
                }
              </div>
              <div className="row">
                <div className="col-sm-2 cost">
                  <h4>
                    {item.ptda.cost.min != item.ptda.cost.max ?
                      <span>${item.ptda.cost.min}-${item.ptda.cost.max}</span> :
                      <span>${item.ptda.cost.max}</span>
                    }
                  </h4>
                </div>
                <div className="col-sm-2 onset">
                  <h4>
                    {item.ptda.onset.max > 1 &&
                      <span>
                        {item.ptda.onset.min}-{item.ptda.onset.max} {item.ptda.onset.unit + 's'}
                      </span>
                    }
                  </h4>
                </div>
                <div className="col-sm-2 frequency">
                  <h4>
                    {item.ptda.frequency.dose &&
                      <span>
                        {item.ptda.frequency.dose}x<br />
                        every&nbsp;
                        {item.ptda.frequency.multiple > 1 ?
                          <span>{item.ptda.frequency.multiple} {item.ptda.frequency.unit} + 's'</span> :
                          <span>{item.ptda.frequency.unit}</span>
                        }
                      </span>
                    }
                  </h4>
                </div>
                <div className="col-sm-3 side-effects">
                  <h4>
                    <small>Common</small><br />
                    {item.ptda.side_effects.common.map(function(effect) {
                      return(<p>{effect}</p>)
                    })}
                    <br />
                    <small>Rare</small><br />
                    {item.ptda.side_effects.rare.map(function(effect) {
                      return(<p>{effect}</p>)
                    })} 
                  </h4>
                </div>
                <div className="col-sm-2 risks">
                  <h4>
                    TK
                  </h4>
                </div>
              </div> 
            </section>
          )})
        }
      </section>
    );
  }

});

module.exports = Ptda;