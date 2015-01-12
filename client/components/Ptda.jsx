/** @jsx React.DOM */

var React = require('react/addons');

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
    return {
      risksSelected: {}
    }
  },

  render: function () {
    return (
      <div>
        <div className="container ptda">
          <h1>PtDA</h1>
          {this.renderRiskButtons(this.props.risks)}
          {this.renderOptions(this.props.medications)}
        </div>
      </div>
    );
  },

  renderRiskButtons: function (risks) {
    var filterRisks = this.filterRisks;
    var risks = Object.keys(risks);
    var risksFriendly = this.props.risksFriendly;
    var risksSelected = this.state.risksSelected;

    var cx = React.addons.classSet;
    
    return (
      <section className="row buttons">
        <div className="col-sm-12">
          <h2>Filter for people concerned about:</h2>

          {risks.map(function (item) {
            var classes = cx({
              'btn btn-default': true,
              'active': risksSelected[item]
            });

            return (
              <a className={classes} key={item} onClick={filterRisks.bind(null, item)}>
                {risksFriendly[item]}
              </a>
            );
          })}
        </div>
      </section>
    );
  },

  filterRisks: function (risk) {
    var risksSelected = this.state.risksSelected;
    
    if (risksSelected[risk]) {
      risksSelected[risk] = false;
    }
    else {
      risksSelected[risk] = true;
    }

    this.setState({
      risksSelected: risksSelected
    });
  },

  renderOptions: function (medications) {
    var counter = 0;
    var risks = this.props.risks;
    var risksSelected = this.state.risksSelected;

    return (
      <section className="options">
        {medications.map(function(item) {
          // TODO(merges)
          // Generalize and simplify this logic.
          if (Object.keys(risksSelected).length > 0) {
            for (var risk in risksSelected) {
              if (risksSelected[risk]) {
                for (var i in item.ptda.risks) {
                  var drugRiskToCheck = item.ptda.risks[i];
                  console.log(drugRiskToCheck.name, risk);
                  if (drugRiskToCheck.name == risk && drugRiskToCheck.risk == 2) {
                    return (
                      <section key={item.name} className="option disabled">
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
                      </section>
                    );
                  }
                }
              }
            }
          }
          
          var flag = false;
          if (counter == 0) {
            flag = true;
          }
          counter++;

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
              
              {flag &&
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
                        {item.ptda.onset.min}-{item.ptda.onset.max} {item.ptda.onset.unit}s
                      </span>
                    }
                  </h4>
                </div>
                <div className="col-sm-2 frequency">
                  <h4>
                    {item.ptda.frequency.dose &&
                      <span>
                        {item.ptda.frequency.dose == 1 ? 'Once ' : 'Twice '}
                        {item.ptda.frequency.multiple > 1 ?
                          <span>every {item.ptda.frequency.multiple} {item.ptda.frequency.unit}s</span> :
                          <span>a {item.ptda.frequency.unit}</span>
                        }
                      </span>
                    }
                  </h4>
                </div>
                <div className="col-sm-4 side-effects">
                  <h4>
                    {item.ptda.side_effects.common.map(function (effect) {
                      return (<p key={effect}>{effect}</p>);
                    })}
                    <br />
                    <small>Rare</small><br />
                    {item.ptda.side_effects.rare.map(function (effect) {
                      return (<p key={effect}>{effect}</p>);
                    })}
                  </h4>
                </div>
                <div className="col-sm-2 risks">
                  <h4>
                    {item.ptda.risks.map(function (item) {
                      if (item.risk == 2) {
                        return (<p key={item.name} className="unsafe">Unsafe {risks[item.name]}</p>);
                      }
                      else if (item.risk == 0) {
                        return (<p key={item.name} className="safe">Safe {risks[item.name]}</p>);
                      }
                      else {
                        return (<p key={item.name} className="unsure">Might not be safe {risks[item.name]}</p>);
                      }
                    })}
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