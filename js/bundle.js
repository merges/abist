(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var App = React.createClass({displayName: "App",
	render: function() {
		return (
    	React.createElement("div", null, 
				React.createElement(RouteHandler, React.__spread({},  this.props)), 

	      React.createElement("nav", {className: "site-wide-nav"}, 
	      	React.createElement("a", {href: "/"}, 
	    			React.createElement("span", {className: "fa fa-home fa-fw"}), 
	    			"Adam Baker IS thesis project website"
	    		)
	      )
	    )
    );
  }
});

module.exports = App;
}).call(this,require("/Users/adam/Documents/merges/abist/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/client/components/App.jsx","/client/components")
},{"/Users/adam/Documents/merges/abist/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":15,"buffer":undefined,"react-router":undefined,"react/addons":undefined}],2:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var medications = [
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
        "name": "tablet (by mouth)"
      },
      {
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
        "name": "tablet (by mouth)"
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
        "name": "tablet (by mouth)"
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
        "name": "tablet (by mouth)"
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
    "generic_available": false,
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
    "forms": [
      {
        "name": "injection"
      }
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
    "forms": [
      {
        "name": "injection"
      }
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
        "name": "infusion (by vein at clinic)"
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
    "name_phonetic": "REM-ih-kade",
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
        "name": "infusion (by vein at clinic)"
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
        "name": "infusion (by vein at clinic)"
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
        "name": "infusion (by vein at clinic)"
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
];

module.exports = medications;
}).call(this,require("/Users/adam/Documents/merges/abist/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/client/components/Data.jsx","/client/components")
},{"/Users/adam/Documents/merges/abist/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":15,"buffer":undefined}],3:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/** @jsx React.DOM */

var React = require('react/addons');

var Experiment = React.createClass({displayName: "Experiment",

  getInitialState: function() {
    return {
      showDetail: false
    }
  },

  componentWillMount: function() {
    var processData = this.processData;

    // $.getJSON('/itemsData', function(itemsDataJson) {
    //   processData(itemsDataJson);
    // });
  },

  toggleDetail: function() {
    this.setState({
      showDetail: true
    });
  },

  renderDescription: function() {
    return (
      React.createElement("section", null, 
        React.createElement("section", {className: "description"}, 
          React.createElement("p", {className: "emphasize"}, "This is the online home of my thesis project, an evolving prototype application to demonstrate ", React.createElement("strong", null, "how data from medical evidence can be extracted, encoded, harmonized and translated, and made “user-friendly” to laypeople through contemporary user interface design."), " The prototype will focus on one important ", React.createElement("strong", null, "issue"), " facing people with rheumatoid arthritis (RA), probably either ", React.createElement("em", null, "ability to exercise"), " or ", React.createElement("em", null, "ability to cook or work with my hands"), "."
          ), 
          !this.state.showDetail &&
            React.createElement("p", null, React.createElement("a", {onClick: this.toggleDetail}, "Read more about my thesis project")), 
          

          this.state.showDetail &&
            React.createElement("div", null, 
              React.createElement("p", {className: "pull-quote"}, "I have two or three options to treat my rheumatoid arthritis. They vary in cost, dosage form, and probably in other ways I don’t even know yet. But what I really want to know is: Which one will help me the most to continue my job and exercise as much as I do, and work the best for the rest of my life? I love to cook and play tennis."), 
              React.createElement("p", null, "My prototype will try to help the person in that scenario explore and understand what the evidence has to say about that issue. If she goes with option A, what will it mean for her? What about option B? And option C? Bringing together that evidence is a tough challenge—and that’s the meat of my thesis project, which will try to answer the following questions:"), 
              React.createElement("ol", null, 
                React.createElement("li", null, "How can evidence be ", React.createElement("strong", null, "broken down"), " or its ", React.createElement("strong", null, "key discoveries extracted as data"), ", focusing on patient-important data, and be ", React.createElement("strong", null, "easily"), " encoded for machine-readability?"), 
                React.createElement("li", null, "Can a patient-important issue-oriented ", React.createElement("strong", null, "translation or harmonization layer"), " (a data thesaurus, if you will) be built to “bring together” these heterogeneous, machine-readable encoded data, for use in a Web-based application?"), 
                React.createElement("li", null, "How can different kinds of information from these sources (outcome data, adverse event data, treatment regimens, cost data, testimonials, or whatever else may be appropriate) be ", React.createElement("strong", null, "designed and presented"), " in ways that correspond to the mental models and issues facing real people with rheumatoid arthritis?"), 
                React.createElement("li", null, "What are the best ways to design a user interface to query, explore, tailor to the user, and make sense of the evidence?")
              ), 
              React.createElement("p", null, "I want to find answers to these questions, and reusable ", React.createElement("strong", null, "patterns, methods, designs, and findings"), " that can be used by other designers, technologists, patient educators, medical practictioners, and so on. While my prototype will be built with real people with RA (patients adn non-experts) as the “north star” to guide ", React.createElement("strong", null, "all"), " the work, my audience is people who want to make tools to help people who want to know what their options are, and what the evidence has to say about what choosing one will mean for them."), 
              React.createElement("img", {src: "./images/p_conceptual.png", className: "img-responsive"})
            )
          
        )
      )
    );
  },

  render: function() {
    return (
      React.createElement("div", {className: "experiment"}, 
        React.createElement("section", null, 
          React.createElement("h1", null, 
            "Adam Baker Independent Studies thesis project", 
            React.createElement("p", {className: "annotation"}, "I’m a thesis student in the University of Waterloo’s ", React.createElement("a", {href: "//uwaterloo.ca/independent-studies/"}, "Independent Studies"), " program, head of design at ", React.createElement("a", {href: "//iodine.com"}, "Iodine"), ", and designer on the ", React.createElement("a", {href: "//open.fda.gov/"}, "openFDA"), " team. My thesis project work is independent and self-funded. ", React.createElement("a", {href: "mailto:ab+thesis@merges.net"}, "Contact me by email."))
          )

        ), 

        this.renderDescription(), 

        React.createElement("nav", null, 
          React.createElement("h2", null, React.createElement("a", {href: "http://abist.tumblr.com/"}, "Progress reports (blog)")), 
          React.createElement("h2", null, 
            React.createElement("a", {href: "/ptda"}, "RA treatment decision aid demo"), 
            React.createElement("p", null, "This is an interactive, tailorable digital derivation of a ", React.createElement("a", {href: "//www.ncbi.nlm.nih.gov/pubmed/25649726"}, "low-literacy decision aid about RA medications"), " designed by one of my supervisors, Dr. Jennifer Barton, and her colleagues at UCSF and elsewhere. I developed it in the first few weeks of my thesis work, as a testbed for technology choices and to explore ideas that will be used in my eventual RA prototype.")
          ), 
          React.createElement("h2", null, 
            React.createElement("a", {href: "/adverse"}, "RA DMARD adverse events prototype"), 
            React.createElement("p", null, "This is a prototype to explore querying an FDA database for reported adverse events where at least one of 12 commonly used disease-modifying antirheumatic drugs was being used to treat RA.")
          )
        )
      )
    );
  }

});

module.exports = Experiment;
}).call(this,require("/Users/adam/Documents/merges/abist/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/client/components/Experiment.jsx","/client/components")
},{"/Users/adam/Documents/merges/abist/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":15,"buffer":undefined,"react/addons":undefined}],4:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/** @jsx React.DOM */

var React = require('react/addons');

var medications = require('../Data.jsx');

// Adverse events

var AdverseEvents = React.createClass({displayName: "AdverseEvents",

  getDefaultProps: function () {
    return {
      medications: medications
    };
  },

  getInitialState: function () {
    // Create an object for medication names which can be used to query openFDA
    //
    // medicationNames = {
    //   'Methotrexate': ['methotrexate', 'rasuvo', 'trexall', ...],
    //   ...
    // }

  	var medicationNames = {};
    this.props.medications.forEach(function(medication) {
      var name = medication.name;

      // Create an array for the names by which this medication goes.
      medicationNames[name] = [];

      // Add the generic name.
      medicationNames[name].push(medication.name_generic.toLowerCase());

      // Add the brand names.
      if (medication.names_brand) {
        medication.names_brand.forEach(function(brandName) {
          medicationNames[name].push(brandName.toLowerCase());
        });
      }
    });

    return {
      medicationNames: medicationNames,
      medicationCharts: {},
      medicationData: {},
      medicationTotals: {}
    }
  },

  componentDidMount: function() {
    var medicationNames = this.state.medicationNames;
    var sendQuery = this.sendQuery;

    Object.keys(medicationNames).map(function(name) {
      sendQuery(name, medicationNames[name]);
    });
  },

  componentDidUpdate: function() {
    this.renderCharts();
  },

  render: function () {
    var medicationNames = this.state.medicationNames;
    var medicationTotals = this.state.medicationTotals;

    return (
      React.createElement("div", {className: "adverse-events"}, 
        React.createElement("div", {className: "header"}, 
          React.createElement("h1", null, "RA DMARD adverse events prototype")
        ), 

        Object.keys(medicationNames).map(function(name, i) {
          return (
            React.createElement("section", null, 
              React.createElement("div", null, 
                React.createElement("h3", null, i+1, " ", React.createElement("strong", null, name), " ", React.createElement("span", {className: "light"}, medicationTotals[name])), 
                React.createElement("div", {ref: 'chart-' + name})
              )
            )
          );
        })
      )
    );
  },

  renderCharts: function() {
    var medicationNames = this.state.medicationNames;
    var renderChart = this.renderChart;
    Object.keys(medicationNames).forEach(function(name) {
      renderChart(name);
    });
  },

  renderQueryResults: function(name) {
    var medicationData = this.state.medicationData;
    var medicationTotals = this.state.medicationTotals;

    if (medicationData[name]) {
      var data = medicationData[name];
      return (
        React.createElement("ul", null, 
          Object.keys(data).map(function(i) {
            var reaction = data[i];
            return (
              React.createElement("li", null, 
                reaction.term, " ", React.createElement("strong", null, reaction.count / medicationTotals[name])
              )
            );
          })
        )
      );
    }
  },

  getChartData: function(name) {
    // c3 requires data and labels separately, in this form:
    //    labels = [label0, label1, label2, ...]
    //    data = [
    //      ["Drug rate", value0, value1, ...],
    //      ["Placebo rate", placebo_value0, placebo_value1, ...],
    //    ]

    var data = this.state.medicationData[name];
    var total = this.state.medicationTotals[name];

    var adverseLabels = [];
    var adverseValues = [];

    adverseValues.push(name + " reports");

    data.forEach(function(item) {
      adverseLabels.push(item.term.toLowerCase());
      adverseValues.push(item.count / total);
    });

    return ({
      data: [adverseValues],
      labels: adverseLabels,
      total: total,
      source: null
    });
  },

  renderChart: function(name) {
    var medicationCharts = this.state.medicationCharts;
    var medicationData = this.state.medicationData;
    var medicationTotals = this.state.medicationTotals;

    var readyToRender = !medicationCharts[name] &&
                        medicationData[name] &&
                        medicationTotals[name] &&
                        this.refs['chart-' + name];

    var chartHeight = 460;

    if (readyToRender) {
      var chartData = this.getChartData(name);
      var chartElement = this.refs['chart-' + name].getDOMNode();

      var chart = c3.generate({
          bindto: chartElement,
          data: {
            type: 'bar',
            columns: chartData.data
          },
          padding: {
            left: 180
          },
          axis: {
            rotated: true,
            x: {
              type: 'categorized',
              categories: chartData.labels
            },
            y: {
              min: 0,
              max: .9,
              padding: {
                top: 0,
                bottom: 0
              },
              tick: {
                format: d3.format('%')
              }
            }
          },
          color: {
            pattern: ['#7655bd', '#bababa']
          },
          bar: {
            width: {
              ratio: .5
            }
          },
          labels: true,
          size: {
            height: chartHeight
          },
          legend: {
            show: false
          },
          zoom: {
            enabled: false
          }
        });

      var medicationCharts = this.state.medicationCharts;
      medicationCharts[name] = chart;
      this.setState({
        medicationCharts: medicationCharts
      });
    }
  },

  sendQuery: function(name, medicationList, offline) {
    if (offline) {
      // console.log('offline query for', name);

      // Offline / mock data
      var total = {"meta":{"disclaimer":"openFDA is a beta research project and not for clinical use. While we make every effort to ensure that data is accurate, you should assume all results are unvalidated.","license":"http://open.fda.gov/license","last_updated":"2015-01-21","results":{"skip":0,"limit":1,"total":113679}}};
      var data = {"meta":{"disclaimer":"openFDA is a beta research project and not for clinical use. While we make every effort to ensure that data is accurate, you should assume all results are unvalidated.","license":"http://open.fda.gov/license","last_updated":"2015-01-21"},"results":[{"term":"INJECTION SITE PAIN","count":8618},{"term":"ARTHRALGIA","count":6156},{"term":"DRUG INEFFECTIVE","count":5732},{"term":"RHEUMATOID ARTHRITIS","count":4923},{"term":"PYREXIA","count":4498},{"term":"NAUSEA","count":4335},{"term":"HEADACHE","count":4228},{"term":"INJECTION SITE ERYTHEMA","count":4208},{"term":"PAIN","count":4203},{"term":"FATIGUE","count":4082},{"term":"PNEUMONIA","count":3552},{"term":"PAIN IN EXTREMITY","count":3518},{"term":"DYSPNOEA","count":3153},{"term":"DIARRHOEA","count":2459},{"term":"VOMITING","count":2356}]};

      var medicationData = this.state.medicationData;
      var medicationTotals = this.state.medicationTotals;
      medicationData[name] = data.results;
      medicationTotals[name] = total.meta.results.total;

      this.setState({
        medicationData: medicationData,
        medicationTotals: medicationTotals
      });
    }
    else {
      var endpoint = 'https://api.fda.gov/drug/event.json?';
      var apiKey = 'OoYA4HLz6ksoiZegL3xxJbHPjScSqOpeUpp1Gajg';
      var reactionLimit = 25;

      var queryPrefix = endpoint
                      + 'api_key='
                      + apiKey
                      + '&search='
                      + 'patient.drug.drugindication:"rheumatoid+arthritis"'
                      + '+AND+'
                      + 'patient.drug.medicinalproduct:'
                      + '(';

          // Construct drug name query.
          for (var i = 0; i < medicationList.length; i++) {
            var drugName = medicationList[i].replace(/\s/g, "+");
            // Split names on slashes, which are actually two medication names.
            drugName = drugName.replace(/\//g, '"+AND+"');
            queryPrefix = queryPrefix + '("' + drugName + '")+';
          }

          queryPrefix = queryPrefix.substring(0, queryPrefix.length - 1) + ')';

      var countReactionsSuffix = '&count=patient.reaction.reactionmeddrapt.exact'
                               + '&limit='
                               + reactionLimit;

      var totalSuffix = '&limit=1';

      var queryForReactions = queryPrefix + countReactionsSuffix;
      var queryForTotal = queryPrefix + totalSuffix;

      var medicationData = this.state.medicationData;
      var medicationTotals = this.state.medicationTotals;
      var instance = this;

      $.getJSON(queryForReactions)
      .then(function(data) {
        medicationData[name] = data.results;
        instance.setState({
          medicationData: medicationData
        });
      })
      .fail(function() {
        console.error('FAILED');
      });

      $.getJSON(queryForTotal)
      .then(function(data) {
        medicationTotals[name] = data.meta.results.total;
        instance.setState({
          medicationTotals: medicationTotals
        });
      })
      .fail(function() {
        console.error('FAILED');
      });
    }
  }

});

module.exports = AdverseEvents;
}).call(this,require("/Users/adam/Documents/merges/abist/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/client/components/adverse/AdverseEvents.jsx","/client/components/adverse")
},{"../Data.jsx":2,"/Users/adam/Documents/merges/abist/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":15,"buffer":undefined,"react/addons":undefined}],5:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/** @jsx React.DOM */

var React = require('react/addons');

// // Detect mobile if we're on client side.
var isMobile = require('ismobilejs');
var mobile;
if (typeof window !== 'undefined') {
  mobile = isMobile.any;
}

var PtdaConsiderations = require('./PtdaConsiderations');
var PtdaCost = require('./PtdaCost');
var PtdaFrequency = require('./PtdaFrequency');
var PtdaMedicationSquare = require('./PtdaMedicationSquare');
var PtdaMini = require('./PtdaMini');
var PtdaOnset = require('./PtdaOnset');
var PtdaSideEffects = require('./PtdaSideEffects');

var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var Modal = require('react-bootstrap').Modal;

var medications = require('../Data.jsx');

// PtDA option

var PtdaOption = React.createClass({displayName: "PtdaOption",
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
      React.createElement("section", {className: classes}, 
        React.createElement("div", {className: "row name"}, 
          React.createElement("h2", {className: "col-sm-2"}, 
            medication.name, React.createElement("br", null), 
            React.createElement("small", null, medication.name_phonetic)
          ), 
          medication.name.toLowerCase() != medication.name_generic.toLowerCase() &&
            React.createElement("h3", {className: "col-sm-3"}, 
              "(", medication.name_generic, ")", React.createElement("br", null), 
              React.createElement("small", null, medication.name_generic_phonetic)
            )
          
        ), 

      	React.createElement("div", {className: "row option-header"}, 
          React.createElement("div", {className: "col-sm-2"}, 
            React.createElement("h4", null, "Cost")
          ), 
          React.createElement("div", {className: "col-sm-2"}, 
            React.createElement("h4", null, "How soon does it work?")
          ), 
          React.createElement("div", {className: "col-sm-2"}, 
            React.createElement("h4", null, "How often?")
          ), 
          React.createElement("div", {className: "col-sm-4"}, 
            React.createElement("h4", null, "Side effects")
          ), 
          React.createElement("div", {className: "col-sm-2"}, 
            React.createElement("h4", null, "Other considerations")
          )
        ), 

        !disabled && showDescriptions &&
        	React.createElement("div", {className: "row header-description"}, 
	          React.createElement("div", {className: "col-sm-2"}, 
	            React.createElement("h5", null, "Average cost per month. What you pay will depend on your insurance.")
	          ), 
	          React.createElement("div", {className: "col-sm-2"}, 
	            React.createElement("h5", null, "These medicines don’t start working right away.")
	          ), 
	          React.createElement("div", {className: "col-sm-2"}, 
	            React.createElement("h5", null, "Each medicine is taken on a different schedule.")
	          ), 
	          React.createElement("div", {className: "col-sm-4"}, 
	            React.createElement("h5", null, "Some side effects go away after your body adjusts to the medicine.")
	          ), 
	          React.createElement("div", {className: "col-sm-2"}, 
	            React.createElement("h5", null, "Certain people can’t use some medicines.")
	          )
	        ), 
        

        !disabled &&
        	React.createElement("div", {className: "row"}, 
	          React.createElement("div", {className: "col-sm-2 cost"}, 
	            React.createElement("h4", null, 
	              medication.ptda.cost.min != medication.ptda.cost.max ?
	                React.createElement("span", null, "$", medication.ptda.cost.min, "-$", medication.ptda.cost.max) :
	                React.createElement("span", null, "$", medication.ptda.cost.max)
	              
	            )
	          ), 
	          React.createElement("div", {className: "col-sm-2 onset"}, 
	            React.createElement("h4", null, 
	              medication.ptda.onset.max > 1 &&
	                React.createElement("span", null, 
	                  medication.ptda.onset.min, "-", medication.ptda.onset.max, " ", medication.ptda.onset.unit, "s"
	                )
	              
	            )
	          ), 
	          React.createElement("div", {className: "col-sm-2 frequency"}, 
	            React.createElement("h4", null, 
	              medication.ptda.frequency.dose &&
	                React.createElement("span", null, 
	                  medication.ptda.frequency.dose == 1 ? 'Once ' : 'Twice ', 
	                  medication.ptda.frequency.multiple > 1 ?
	                    React.createElement("span", null, "every ", medication.ptda.frequency.multiple, " ", medication.ptda.frequency.unit, "s") :
	                    React.createElement("span", null, "a ", medication.ptda.frequency.unit)
	                  
	                )
	              
	            )
	          ), 
	          React.createElement("div", {className: "col-sm-4 side-effects"}, 
	            React.createElement("h4", null, 
	              medication.ptda.side_effects.common.map(function (effect) {
	                return (React.createElement("p", {key: effect}, effect));
	              }), 
	              React.createElement("br", null), 
	              React.createElement("small", null, "Rare"), React.createElement("br", null), 
	              medication.ptda.side_effects.rare.map(function (effect) {
	                return (React.createElement("p", {key: effect}, effect));
	              })
	            )
	          ), 
	          React.createElement("div", {className: "col-sm-2 risks"}, 
	            React.createElement("h4", null, 
	              medication.ptda.risks.map(function (medication) {
	                if (medication.risk == 2) {
	                  return (React.createElement("p", {key: medication.name, className: "unsafe"}, "Unsafe ", risks[medication.name]));
	                }
	                else if (medication.risk == 0) {
	                  return (React.createElement("p", {key: medication.name, className: "safe"}, "Safe ", risks[medication.name]));
	                }
	                else {
	                  return (React.createElement("p", {key: medication.name, className: "unsure"}, "Might not be safe ", risks[medication.name]));
	                }
	              })
	            )
	          )
	        )
        
      )
    );
  }
});



// PtDA options list

var PtdaOptions = React.createClass({displayName: "PtdaOptions",
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
      React.createElement("section", {className: "options"}, 
        medications.map(function(medication) {
        	if (showDescriptions) {
        		showDescriptions = false;
        		return (
        			React.createElement(PtdaOption, {
        				key: medication.name, 
        				medication: medication, 
        				risks: risks, 
						    showDescriptions: true, 
						    disabled: disabledMedications[medication.name]})
        		);
        	}
        	return (
      			React.createElement(PtdaOption, {
      				key: medication.name, 
      				medication: medication, 
      				risks: risks, 
					    disabled: disabledMedications[medication.name]})
      		);
      	})
      )
    );
  }
});



// PtDA

var Ptda = React.createClass({displayName: "Ptda",

  getDefaultProps: function () {
    return {
      medications: medications,
      preferences: {
        'alcohol': {
          'key': 'key',
          'name': 'Alcohol-friendly',
          'type': 'boolean',
          'description': 'If you drink alcohol'
        },
        // 'cost': {
        //   'key': 'cost',
        //   'name': 'Cost',
        //   'type': 'number',
        //   'description': 'average cost per month'
        // },
        // 'class': {
        //   'key': 'class',
        //   'name': 'Drug class',
        //   'type': 'list',
        //   'description': 'Drug classes'
        // },
        'forms': {
          'key': 'forms',
          'name': 'Dosage form',
          'type': 'list',
          'description': 'preferred way of taking your medicine'
        },
        'generic_available': {
          'key': 'generic_available',
          'name': 'Generic available',
          'type': 'boolean',
          'description': 'A cheaper, generic version is available'
        },
        'liver_disease': {
          'key': 'liver_disease',
          'name': 'Liver disease',
          'type': 'boolean',
          'description': 'if you have liver disease'
        },
        'pregnancy': {
          'key': 'pregnancy',
          'name': 'Pregnancy',
          'type': 'boolean',
          'description': 'if you’re pregnant or considering it'
        },
        'tb': {
          'key': 'tb',
          'name': 'Tuberculosis',
          'type': 'boolean',
          'description': 'if you have or might be exposed to tuberculosis'
        }
      },
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
    this.props.medications.forEach(function(medication, index) {
    	medicationMap[medication.name] = index;
    });

    var getDosageForms = function(medications) {
      var dosageForms = {};
      medications.map(function(medication) {
        if (medication.forms) {
          medication.forms.forEach(function(form) {
            dosageForms[form.name] = false;
          });
        }
      });
      return dosageForms;
    };

    var getClasses = function(medications) {
      var classes = {};
      medications.map(function(medication) {
        if (medication.class) {
          medication.class.forEach(function(name) {
            classes[name] = false;
          });
        }
      });
      return classes;
    };

    return {
      activeCard: null,
      disabledMedications: {},
      medicationMap: medicationMap,
      menuOpen: null,
      preferences: this.props.preferences,
      preferencesSelected: {
        alcohol: false,
        class: getClasses(this.props.medications),
        cost: null,
        forms: getDosageForms(this.props.medications),
        generic_available: false,
        liver_disease: false,
        pregnancy: false,
        tb: false
      },
      selectedMedication: null
    }
  },

  componentDidMount: function() {
    if (this.isMounted) {
      this.setState({
        mobile: isMobile.any
      });
    }
  },

  render: function() {
    var medications = this.props.medications;
    var preferences = this.props.preferences;
    var risks = this.props.risks;
    var risksFriendly = this.props.risksFriendly;

    var disabledMedications = this.state.disabledMedications;
    var selectedMedication = this.state.selectedMedication;
    var medicationMap = this.state.medicationMap;

    var cx = React.addons.classSet;
    var cardContainerClasses = cx({
      'card-container': true,
      'open': this.state.menuOpen == true,
      'closed': this.state.menuOpen == false
    });
    var ptdaClasses = cx({
      'ptda': true,
      'mobile': this.state.mobile,
      'no-scroll': this.state.mobile && this.state.menuOpen
    });

    return (
      React.createElement("div", null, 
        React.createElement("div", {className: ptdaClasses}, 
          React.createElement("div", {className: "header"}, 
            React.createElement("h1", null, "RA treatment decision aid demo"), 
            React.createElement("a", {className: "mobile-toggle", onClick: this.togglePreferenceControls}, 
              !this.state.menuOpen ? 'Filter your options' : 'Close filter'
            )
          ), 
          this.renderPreferenceControls(preferences), 
          React.createElement("section", null, 
            selectedMedication &&
              React.createElement(Modal, {
                title: "Medication", 
                backdrop: true, 
                animation: false, 
                onRequestHide: this.handleModalHide}, 
                  React.createElement("div", {className: "modal-body"}, 
                    React.createElement(PtdaMini, {
                      medication: medications[medicationMap[selectedMedication]], 
                      risks: risks})
                  )
              ), 
            

            React.createElement("div", {className: cardContainerClasses}, 
              
              /*
              <div>
                An attempt to be vaguely issue-centric.
                <ul>
                  <li>**Pregnant or planning to become pregnant <strong>On/off toggle</strong></li>
                  <li>**Interference with life/dosing schedule/location <strong>Frequency/injection or not?</strong></li>
                  <li>**Cost <strong>Cost tolerance—add your copay and see</strong></li>
                  <li>**Alcohol-friendly (so to speak) <strong>Do you like to drink?</strong></li>
                  <li>??Avoid side effects <strong>Anything you absolutely don’t want to feel</strong></li>
                </ul>
              </div>
              */
              
              React.createElement("div", {className: "cards"}, 
                React.createElement(PtdaCost, {
                	active: true, 
                	medications: medications, 
                	disabledMedications: disabledMedications, 
                	selectedMedication: selectedMedication, 
                	handleClick: this.handleMedicationClick}), 
                React.createElement(PtdaOnset, {
                	medications: medications, 
                	disabledMedications: disabledMedications, 
                	selectedMedication: selectedMedication, 
                	handleClick: this.handleMedicationClick}), 
                React.createElement(PtdaFrequency, {
                	medications: medications, 
                	disabledMedications: disabledMedications, 
                	selectedMedication: selectedMedication, 
                	handleClick: this.handleMedicationClick}), 
                React.createElement(PtdaConsiderations, {
                  medications: medications, 
                  risks: risksFriendly, 
                  disabledMedications: disabledMedications, 
                  selectedMedication: selectedMedication, 
                  handleClick: this.handleMedicationClick}), 
                React.createElement(PtdaSideEffects, {
                  medications: medications, 
                  disabledMedications: disabledMedications, 
                  selectedMedication: selectedMedication, 
                  handleClick: this.handleMedicationClick})
              )
            )
          ), 

          React.createElement("section", null
            /*
              <PtdaOptions
              medications={medications}
              disabledMedications={disabledMedications}
              risks={risks} />
            */
          )
        )
      )
    );
  },

  togglePreferenceControls: function () {
    var isOpen = this.state.menuOpen;
    isOpen = !isOpen;
    this.setState({
      menuOpen: isOpen
    })
  },

  renderPreferenceControls: function (preferences) {
    var filterPreference = this.filterPreference;
    var togglePreferenceControls = this.togglePreferenceControls;

    var preferences = this.props.preferences;
    var preferencesSelected = this.state.preferencesSelected;

    var cx = React.addons.classSet;
    var preferenceControlClasses = cx({
      'preference-controls': true,
      'open': this.state.menuOpen == true,
      'closed': this.state.menuOpen == false
    });

    return (
      React.createElement("div", {className: preferenceControlClasses}, 
        React.createElement("h2", {onClick: togglePreferenceControls}, 
          "Filter your options", 
          React.createElement("strong", null, this.state.menuOpen? '‹' : '›')
        ), 

        Object.keys(preferences).map(function(key) {
          var preference = preferences[key];

          // Boolean preferences become a push button
          if (preference.type == 'boolean') {
            var preferenceClasses = cx({
              'preference': true,
              'active': preferencesSelected[key]
            });
            return (
              React.createElement("section", {className: preferenceClasses, key: key, onClick: filterPreference.bind(null, key, false)}, 
                preference.name, 
                React.createElement("span", {className: "description"}, preference.description)
              )
            );
          }
          // List preferences become a list
          else if (preference.type == 'list') {
            // Get the possible options for this preference from this.state.preferencesSelected.
            // There is a function in getInitialState() that iterates through the provided medications,
            // collecting the "options" they provide for vis à vis this preference.
            var options = Object.keys(preferencesSelected[key]);

            return (
              React.createElement("section", null, 
                preference.name, 
                React.createElement("span", {className: "description"}, preference.description), 

                options.map(function(option, i) {
                  var optionClasses = cx({
                    'option': true,
                    'active': !preferencesSelected[key][option]
                  });
                  return (
                    React.createElement("div", {
                      className: optionClasses, 
                      key: option, 
                      onClick: filterPreference.bind(null, key, option)}, 
                        React.createElement("strong", null, "› "), option
                    )
                  );
                })
              )
            );
          }
          else {
            return (
              React.createElement("section", null, 
                preference.name, 
                React.createElement("span", {className: "description"}, preference.description)
              )
            );
          }
        })
      )
    );
  },

  filterPreference: function (preferenceKey, optionKey, event) {
    if (this.state.menuOpen) {
      event.stopPropagation();
    }

    var disabledMedications = {};
    var medications = this.props.medications;
    var preferencesSelected = this.state.preferencesSelected;

    // Toggle the preference. If there's an 'option' provided, the preference is a list type,
    // for example dosage form. So we use the 'preference' to access the dosage forms object,
    // and use the preference to set true/false on the appropriate dosage form.
    //
    // forms: {
    //   tablet: true,
    //   injection: true
    // }
    //

    // TOGGLE PREFERENCES
    if (optionKey) {
      preferencesSelected[preferenceKey][optionKey] = !preferencesSelected[preferenceKey][optionKey];
    }
    else {
      preferencesSelected[preferenceKey] = !preferencesSelected[preferenceKey];
    }

    // Check each medication against the selected preferences and options,
    // disabling any that doesn't satisfy.
    //
    medications.forEach(function(medication, i) {
      var medicationMatchingPreferences = {};

      // 1. Examine all the preferences for a match.
      //
      for (var preference in preferencesSelected) {
        if (preferencesSelected[preference]) {
          
          // a. Simple boolean preference
          if (typeof preferencesSelected[preference] === 'boolean') {

            // Look for a matching key in the medication object
            // Boolean? e.g. 'generic_available' -- inverse match
            if (medication[preference] == false) {
              medicationMatchingPreferences[preference] = true;
              // disabledMedications[medication.name] = true;
            }
            // Not a key in medication object, so check ptda.risks
            else {
              for (var risk in medication.ptda.risks) {
                if (medication.ptda.risks[risk].name.toLowerCase() == preference.toLowerCase() && medication.ptda.risks[risk].risk == 2) {
                  medicationMatchingPreferences[preference] = true;
                  // disabledMedications[medication.name] = true;
                }
              }
            }
          }

          // b. List preference
          else if (typeof preferencesSelected[preference] === 'object') {

            // The user chose one or more options (to avoid), so the medication must match
            // each option in order to get disabled.
            var selectedOptions = {};
            var medicationMatchingOptions = {};
            
            // Check each option for a match
            for (var option in preferencesSelected[preference]) {

              // Option is selected
              if (preferencesSelected[preference][option]) {
                selectedOptions[option] = true;

                // Look for a matching key in the medication object
                if (medication[preference]) {

                  // Is it an array or an object?
                  if (typeof medication[preference] === 'object') {

                    // Array
                    if (Array.isArray(medication[preference])) {
                      var list = medication[preference];

                      // Check for our option in the list
                      for (var item in list) {
                        // Straight up list item?
                        if (typeof list[item] === 'string') {
                          if (list[item].toLowerCase() == option.toLowerCase()) {
                            medicationMatchingOptions[option] = true;
                          }
                          else {
                            medicationMatchingOptions[list[item].toLowerCase()] = true;
                          }
                        }
                        // Object? Look for a 'name' that we'll check against
                        else if (list[item].hasOwnProperty('name')) {
                          if (list[item].name.toLowerCase() == option.toLowerCase()) {
                            medicationMatchingOptions[option] = true;
                          }
                          else {
                            medicationMatchingOptions[list[item].name.toLowerCase()] = true;
                          }
                        }
                      }
                    }
                    // Object
                    else {
                      for (var item in Object.keys(medication[preference])) {
                        if (list[item].toLowerCase() == option.toLowerCase()) {
                          medicationMatchingOptions[option] = true;
                        }
                        else {
                          medicationMatchingOptions[list[item].toLowerCase()] = true;
                        }
                      }
                      // // Check for our option in the object
                      // if (medication[preference][optionKey]) {
                      //   medicationMatchingOptions[option] = true;
                      // }
                    }
                  }
                }
              }
            }            

            // Check if the drug should be disabled based on one of the options matching.
            if (Object.keys(selectedOptions).length > 0) {
              // Disabled options present in the drug? Disable it.
              for (var selected in selectedOptions) {
                for (var option in medicationMatchingOptions) {
                  if (medicationMatchingOptions[option] && selectedOptions[option]) {
                    medicationMatchingPreferences[preference] = true;
                  }
                }
              }
              // Wait! Does the drug have other options that are NOT disabled? Don't disable it!
              for (var option in medicationMatchingOptions) {
                if (medicationMatchingOptions[option] && !selectedOptions[option]) {
                  medicationMatchingPreferences[preference] = false;
                }
              }
            }
          }
        }
      }

      // 2. Check if the drug should be disabled.
      //
      if (Object.keys(preferencesSelected).length > 0) {
        var disableMedication = false;

        // Disabled options present in the drug? Disable it.
        for (var selected in preferencesSelected) {
          for (var preference in medicationMatchingPreferences) {
            if (medicationMatchingPreferences[preference] && preferencesSelected[preference]) {
              disableMedication = true;
            }
          }
        }
        // Wait! Does the drug have other preferences that are NOT disabled? Don't disable it!
        for (var preference in medicationMatchingPreferences) {
          if (medicationMatchingPreferences[preference] && !preferencesSelected[preference]) {
            disableMedication = false;
          }
        }

        // Add the medication to disabledMedications.
        if (disableMedication) {
          disabledMedications[medication.name] = true;
        }
        else {
          disabledMedications[medication.name] = false;
        }
      }
    });

    this.setState({
      disabledMedications: disabledMedications,
      preferencesSelected: preferencesSelected
    });
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
  }

});

module.exports = Ptda;
}).call(this,require("/Users/adam/Documents/merges/abist/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/client/components/ptda/Ptda.jsx","/client/components/ptda")
},{"../Data.jsx":2,"./PtdaConsiderations":6,"./PtdaCost":7,"./PtdaFrequency":8,"./PtdaMedicationSquare":9,"./PtdaMini":10,"./PtdaOnset":11,"./PtdaSideEffects":12,"/Users/adam/Documents/merges/abist/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":15,"buffer":undefined,"ismobilejs":undefined,"react-bootstrap":undefined,"react/addons":undefined}],6:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/** @jsx React.DOM */

var React = require('react/addons');

var PtdaMedicationSquare = require('./PtdaMedicationSquare');

// PtDA considerations/risks card

var PtdaConsiderations = React.createClass({displayName: "PtdaConsiderations",
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
        React.createElement("h5", null, 
          medication.ptda.risks.map(function (medication) {
            if (medication.risk == 2) {
              return (React.createElement("p", {key: medication.name, className: "unsafe"}, risks[medication.name]));
            }
            else if (medication.risk == 0) {
              return (React.createElement("p", {key: medication.name, className: "safe"}, risks[medication.name]));
            }
            else {
              return (React.createElement("p", {key: medication.name, className: "unsure"}, risks[medication.name]));
            }
          })
        );

      squares.push(React.createElement(PtdaMedicationSquare, {
                    key: medication.name, 
                    medication: medication, 
                    content: specialContent, 
                    disabled: disabled, 
                    selected: selected, 
                    handleClick: handleClick}))

      counter++;
      if (counter % 4 == 0) {
        markup.push(React.createElement("tr", {key: counter}, squares));
        squares = [];
      }
    }
    markup.unshift(
      React.createElement("tr", {key: 'onset-oral', className: "dosage-form"}, 
        React.createElement("td", {colSpan: "4"}, 
          "By mouth (pills, tablets, or capsules)"
        )
      )
    );
    markup.splice(2,0,
      React.createElement("tr", {key: 'onset-injection', className: "dosage-form"}, 
        React.createElement("td", {colSpan: "4"}, 
          "Injection, taken at home or at a clinic or hospital"
        )
      )
    );
    markup.splice(4,0,
      React.createElement("tr", {key: 'considerations-infusion', className: "dosage-form"}, 
        React.createElement("td", {colSpan: "4"}, 
          "By vein (IV infusion), taken at home or at a clinic or hospital"
        )
      )
    );

    return (
      React.createElement("section", {className: "ptda-card risks"}, 
        React.createElement("table", null, 
          React.createElement("thead", null, 
            React.createElement("th", {colSpan: "4"}, 
              React.createElement("h2", null, "Considerations"), 
              React.createElement("h3", null, 
                "It is very important to talk to your doctor about these issues", React.createElement("br", null), 
                "before you choose a medicine."
              )
            )
          ), 
          React.createElement("tbody", null, 
            markup
          )
        )
      )
    );
  }
});

module.exports = PtdaConsiderations;
}).call(this,require("/Users/adam/Documents/merges/abist/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/client/components/ptda/PtdaConsiderations.jsx","/client/components/ptda")
},{"./PtdaMedicationSquare":9,"/Users/adam/Documents/merges/abist/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":15,"buffer":undefined,"react/addons":undefined}],7:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/** @jsx React.DOM */

var React = require('react/addons');

var PtdaMedicationSquare = require('./PtdaMedicationSquare');

// PtDA cost card

var PtdaCost = React.createClass({displayName: "PtdaCost",
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
        React.createElement("h5", null, 
          medication.ptda.cost.min != medication.ptda.cost.max ?
            React.createElement("span", null, "$", medication.ptda.cost.min, "-$", medication.ptda.cost.max) :
            React.createElement("span", null, "$", medication.ptda.cost.max)
          
        );

      squares.push(React.createElement(PtdaMedicationSquare, {
                    key: medication.name, 
                    medication: medication, 
                    content: specialContent, 
                    disabled: disabled, 
                    selected: selected, 
                    handleClick: handleClick}))

      counter++;
      if (counter % 4 == 0) {
        markup.push(React.createElement("tr", {key: counter}, squares));
        squares = [];
      }
    }
    markup.unshift(
      React.createElement("tr", {key: 'cost-oral', className: "dosage-form"}, 
        React.createElement("td", {colSpan: "4"}, 
          "By mouth (pills, tablets, or capsules)"
        )
      )
    );
    markup.splice(2,0,
      React.createElement("tr", {key: 'cost-injection', className: "dosage-form"}, 
        React.createElement("td", {colSpan: "4"}, 
          "Injection, taken at home or at a clinic or hospital"
        )
      )
    );
    markup.splice(4,0,
      React.createElement("tr", {key: 'cost-infusion', className: "dosage-form"}, 
        React.createElement("td", {colSpan: "4"}, 
          "By vein (IV infusion), taken at home or at a clinic or hospital"
        )
      )
    );

    var cx = React.addons.classSet;
    var classes = cx({
      'ptda-card cost': true,
      'active': this.props.active
    });

    return (
      React.createElement("section", {className: classes}, 
        React.createElement("table", null, 
          React.createElement("thead", null, 
            React.createElement("th", {colSpan: "4"}, 
              React.createElement("h2", null, "Cost"), 
              React.createElement("h3", null, 
                "Average costs per month.", React.createElement("br", null), 
                "What you pay will depend on your insurance."
              )
            )
          ), 
          React.createElement("tbody", null, 
            markup
          )
        )
      )
    );
  }
});

module.exports = PtdaCost;
}).call(this,require("/Users/adam/Documents/merges/abist/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/client/components/ptda/PtdaCost.jsx","/client/components/ptda")
},{"./PtdaMedicationSquare":9,"/Users/adam/Documents/merges/abist/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":15,"buffer":undefined,"react/addons":undefined}],8:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/** @jsx React.DOM */

var React = require('react/addons');

var PtdaMedicationSquare = require('./PtdaMedicationSquare');

// PtDA frequency card

var PtdaFrequency = React.createClass({displayName: "PtdaFrequency",
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
        React.createElement("h5", null, 
          medication.ptda.frequency.dose == 1 ? 'Once ' : 'Twice ', 
          React.createElement("br", null), 
          medication.ptda.frequency.multiple > 1 ?
            React.createElement("span", null, "every ", medication.ptda.frequency.multiple, " ", medication.ptda.frequency.unit, "s") :
            React.createElement("span", null, "a ", medication.ptda.frequency.unit)
          
        );

      squares.push(React.createElement(PtdaMedicationSquare, {
                    key: medication.name, 
                    medication: medication, 
                    content: specialContent, 
                    disabled: disabled, 
                    selected: selected, 
                    handleClick: handleClick}))

      counter++;
      if (counter % 4 == 0) {
        markup.push(React.createElement("tr", {key: counter}, squares));
        squares = [];
      }
    }
    markup.unshift(
      React.createElement("tr", {key: 'frequency-oral', className: "dosage-form"}, 
        React.createElement("td", {colSpan: "4"}, 
          "By mouth (pills, tablets, or capsules)"
        )
      )
    );
    markup.splice(2,0,
      React.createElement("tr", {key: 'frequency-injection', className: "dosage-form"}, 
        React.createElement("td", {colSpan: "4"}, 
          "Injection, taken at home or at a clinic or hospital"
        )
      )
    );
    markup.splice(4,0,
      React.createElement("tr", {key: 'frequency-infusion', className: "dosage-form"}, 
        React.createElement("td", {colSpan: "4"}, 
          "By vein (IV infusion), taken at home or at a clinic or hospital"
        )
      )
    );

    return (
      React.createElement("section", {className: "ptda-card frequency"}, 
        React.createElement("table", null, 
          React.createElement("thead", null, 
            React.createElement("th", {colSpan: "4"}, 
              React.createElement("h2", null, "How Often?"), 
              React.createElement("h3", null, 
                "Each medication is taken on a different schedule.", React.createElement("br", null), 
                "Some need to be taken at a hospital or clinic."
              )
            )
          ), 
          React.createElement("tbody", null, 
            markup
          )
        )
      )
    );
  }
});

module.exports = PtdaFrequency;
}).call(this,require("/Users/adam/Documents/merges/abist/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/client/components/ptda/PtdaFrequency.jsx","/client/components/ptda")
},{"./PtdaMedicationSquare":9,"/Users/adam/Documents/merges/abist/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":15,"buffer":undefined,"react/addons":undefined}],9:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/** @jsx React.DOM */

var React = require('react/addons');

// Ptda medication square

var PtdaMedicationSquare = React.createClass({displayName: "PtdaMedicationSquare",
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
      React.createElement("td", {className: classes, onClick: this.handleClick.bind(this, medication.name)}, 
        React.createElement("h4", null, 
          medication.name_generic, React.createElement("br", null), 
          medication.names_brand.slice(0,1).map(function(name) {
            return (React.createElement("div", {key: name}, "(", name, ")"));
          })
        ), 
        this.props.content
      )
    );
  },

  handleClick: function(name) {
    this.props.handleClick && this.props.handleClick(name);
  }
});

module.exports = PtdaMedicationSquare;
}).call(this,require("/Users/adam/Documents/merges/abist/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/client/components/ptda/PtdaMedicationSquare.jsx","/client/components/ptda")
},{"/Users/adam/Documents/merges/abist/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":15,"buffer":undefined,"react/addons":undefined}],10:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/** @jsx React.DOM */

var React = require('react/addons');

// PtDA medication mini-card

var PtdaMini = React.createClass({displayName: "PtdaMini",
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
      React.createElement("section", {className: classes}, 
        React.createElement("div", {className: "row name"}, 
          React.createElement("h2", null, 
            medication.name, React.createElement("br", null), 
            React.createElement("small", null, medication.name_phonetic)
          ), 
          medication.name.toLowerCase() != medication.name_generic.toLowerCase() &&
            React.createElement("h3", null, 
              "(", medication.name_generic, ")", React.createElement("br", null), 
              React.createElement("small", null, medication.name_generic_phonetic)
            )
          
        ), 
        React.createElement("div", {className: "row content"}, 
          React.createElement("div", {className: "col-sm-3 cost"}, 
            React.createElement("h3", null, "Cost"), 
            React.createElement("h4", null, 
              medication.ptda.cost.min != medication.ptda.cost.max ?
                React.createElement("span", null, "$", medication.ptda.cost.min, "-$", medication.ptda.cost.max) :
                React.createElement("span", null, "$", medication.ptda.cost.max)
              
            )
          ), 
          React.createElement("div", {className: "col-sm-3 onset"}, 
            React.createElement("h3", null, "How Soon?"), 
            React.createElement("h4", null, 
              medication.ptda.onset.max > 1 &&
                React.createElement("span", null, 
                  medication.ptda.onset.min, "-", medication.ptda.onset.max, " ", medication.ptda.onset.unit, "s"
                )
              
            )
          ), 
          React.createElement("div", {className: "col-sm-3 frequency"}, 
            React.createElement("h3", null, "How Often?"), 
            React.createElement("h4", null, 
              medication.ptda.frequency.dose &&
                React.createElement("span", null, 
                  medication.ptda.frequency.dose == 1 ? 'Once ' : 'Twice ', 
                  medication.ptda.frequency.multiple > 1 ?
                    React.createElement("span", null, "every ", medication.ptda.frequency.multiple, " ", medication.ptda.frequency.unit, "s") :
                    React.createElement("span", null, "a ", medication.ptda.frequency.unit)
                  
                )
              
            )
          )
        ), 
        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col-sm-6 side-effects"}, 
            React.createElement("h3", null, "Side Effects"), 
            React.createElement("h4", null, 
              medication.ptda.side_effects.common.map(function (effect) {
                return (React.createElement("span", {key: effect}, effect));
              }), 
              medication.ptda.side_effects.rare.map(function (effect) {
                return (React.createElement("span", {key: effect}, "(rare) ", effect));
              })
            )
          ), 
          React.createElement("div", {className: "col-sm-6 risks"}, 
            React.createElement("h3", null, "Other Considerations"), 
            React.createElement("h4", null, 
              medication.ptda.risks.map(function (medication) {
                if (medication.risk == 2) {
                  return (React.createElement("p", {key: medication.name, className: "unsafe"}, "Unsafe ", risks[medication.name]));
                }
                else if (medication.risk == 0) {
                  return (React.createElement("p", {key: medication.name, className: "safe"}, "Safe ", risks[medication.name]));
                }
                else {
                  return (React.createElement("p", {key: medication.name, className: "unsure"}, "Might not be safe ", risks[medication.name]));
                }
              })
            )
          )
        )
      )
    );
  }
});

module.exports = PtdaMini;
}).call(this,require("/Users/adam/Documents/merges/abist/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/client/components/ptda/PtdaMini.jsx","/client/components/ptda")
},{"/Users/adam/Documents/merges/abist/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":15,"buffer":undefined,"react/addons":undefined}],11:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/** @jsx React.DOM */

var React = require('react/addons');

var PtdaMedicationSquare = require('./PtdaMedicationSquare');

// PtDA onset card

var PtdaOnset = React.createClass({displayName: "PtdaOnset",
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
        React.createElement("h5", null, 
          medication.ptda.onset.max > 1 &&
            React.createElement("span", null, 
              medication.ptda.onset.min, "-", medication.ptda.onset.max, " ", medication.ptda.onset.unit, "s"
            )
          
        );

      squares.push(React.createElement(PtdaMedicationSquare, {
                    key: medication.name, 
                    medication: medication, 
                    content: specialContent, 
                    disabled: disabled, 
                    selected: selected, 
                    handleClick: handleClick}))

      counter++;
      if (counter % 4 == 0) {
        markup.push(React.createElement("tr", {key: counter}, squares));
        squares = [];
      }
    }
    markup.unshift(
      React.createElement("tr", {key: 'onset-oral', className: "dosage-form"}, 
        React.createElement("td", {colSpan: "4"}, 
          "By mouth (pills, tablets, or capsules)"
        )
      )
    );
    markup.splice(2,0,
      React.createElement("tr", {key: 'onset-injection', className: "dosage-form"}, 
        React.createElement("td", {colSpan: "4"}, 
          "Injection, taken at home or at a clinic or hospital"
        )
      )
    );
    markup.splice(4,0,
      React.createElement("tr", {key: 'onset-infusion', className: "dosage-form"}, 
        React.createElement("td", {colSpan: "4"}, 
          "By vein (IV infusion), taken at home or at a clinic or hospital"
        )
      )
    );

    return (
      React.createElement("section", {className: "ptda-card onset"}, 
        React.createElement("table", null, 
          React.createElement("thead", null, 
            React.createElement("th", {colSpan: "4"}, 
              React.createElement("h2", null, "How Soon?"), 
              React.createElement("h3", null, 
                "These medicines do not work right away. In general,", React.createElement("br", null), 
                "these medicines begin to work in between 2 and 12 weeks."
              )
            )
          ), 
          React.createElement("tbody", null, 
            markup
          )
        )
      )
    );
  }
});

module.exports = PtdaOnset;
}).call(this,require("/Users/adam/Documents/merges/abist/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/client/components/ptda/PtdaOnset.jsx","/client/components/ptda")
},{"./PtdaMedicationSquare":9,"/Users/adam/Documents/merges/abist/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":15,"buffer":undefined,"react/addons":undefined}],12:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/** @jsx React.DOM */

var React = require('react/addons');

var PtdaMedicationSquare = require('./PtdaMedicationSquare');

// PtDA side effects card

var PtdaSideEffects = React.createClass({displayName: "PtdaSideEffects",
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
        React.createElement("h5", null, 
          React.createElement("ul", null, 
          medication.ptda.side_effects.common.map(function (effect) {
            return (React.createElement("li", {key: effect}, effect));
          }), 
          medication.ptda.side_effects.rare.map(function (effect) {
            return (React.createElement("li", {key: effect}, effect, " (rare)"));
          })
          )
        );

      squares.push(React.createElement(PtdaMedicationSquare, {
                    key: medication.name, 
                    medication: medication, 
                    content: specialContent, 
                    disabled: disabled, 
                    selected: selected, 
                    handleClick: handleClick}))

      counter++;
      if (counter % 4 == 0) {
        markup.push(React.createElement("tr", {key: counter}, squares));
        squares = [];
      }
    }
    markup.unshift(
      React.createElement("tr", {key: 'onset-oral', className: "dosage-form"}, 
        React.createElement("td", {colSpan: "4"}, 
          "By mouth (pills, tablets, or capsules)"
        )
      )
    );
    markup.splice(2,0,
      React.createElement("tr", {key: 'onset-injection', className: "dosage-form"}, 
        React.createElement("td", {colSpan: "4"}, 
          "Injection, taken at home or at a clinic or hospital"
        )
      )
    );
    markup.splice(4,0,
      React.createElement("tr", {key: 'onset-infusion', className: "dosage-form"}, 
        React.createElement("td", {colSpan: "4"}, 
          "By vein (IV infusion), taken at home or at a clinic or hospital"
        )
      )
    );

    return (
      React.createElement("section", {className: "ptda-card side-effects"}, 
        React.createElement("table", null, 
          React.createElement("thead", null, 
            React.createElement("th", {colSpan: "4"}, 
              React.createElement("h2", null, "Side effects"), 
              React.createElement("h3", null, 
                React.createElement("br", null)
              )
            )
          ), 
          React.createElement("tbody", null, 
            markup
          )
        )
      )
    );
  }
});

module.exports = PtdaSideEffects;
}).call(this,require("/Users/adam/Documents/merges/abist/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/client/components/ptda/PtdaSideEffects.jsx","/client/components/ptda")
},{"./PtdaMedicationSquare":9,"/Users/adam/Documents/merges/abist/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":15,"buffer":undefined,"react/addons":undefined}],13:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// client.js

var React = require('react/addons');
var Router = require('react-router');
var routes = require('../routes.jsx');

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(React.createElement(Handler, null), document.getElementById('app'));
});
}).call(this,require("/Users/adam/Documents/merges/abist/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/client/js/client.js","/client/js")
},{"../routes.jsx":14,"/Users/adam/Documents/merges/abist/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":15,"buffer":undefined,"react-router":undefined,"react/addons":undefined}],14:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// routes.jsx

var React = require('react/addons');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var AdverseEvents = require('./components/adverse/AdverseEvents.jsx');
var App = require('./components/App.jsx');
var Experiment = require('./components/Experiment.jsx');
var Ptda = require('./components/ptda/Ptda.jsx');

var routes = (
  React.createElement(Route, {name: "home", path: "/", handler: App}, 
    React.createElement(DefaultRoute, {name: "experiment", handler: Experiment}), 
    React.createElement(Route, {name: "ptda", path: "/ptda", handler: Ptda}), 
    React.createElement(Route, {name: "adverse", path: "/adverse", handler: AdverseEvents})
  )
);

module.exports = routes;
}).call(this,require("/Users/adam/Documents/merges/abist/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/client/routes.jsx","/client")
},{"./components/App.jsx":1,"./components/Experiment.jsx":3,"./components/adverse/AdverseEvents.jsx":4,"./components/ptda/Ptda.jsx":5,"/Users/adam/Documents/merges/abist/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":15,"buffer":undefined,"react-router":undefined,"react/addons":undefined}],15:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.once = noop;
process.off = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

}).call(this,require("/Users/adam/Documents/merges/abist/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js","/node_modules/browserify/node_modules/insert-module-globals/node_modules/process")
},{"/Users/adam/Documents/merges/abist/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":15,"buffer":undefined}]},{},[13]);
