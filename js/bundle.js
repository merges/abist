(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

// var EvidenceData = require('./EvidenceData.jsx')

var App = React.createClass({displayName: "App",

	// getDefaultProps: function() {
	// 	return {
	// 		data: EvidenceData.getAndProcessData()
	// 	}
	// },

	render: function() {
		return (
    	React.createElement("div", null, 
				React.createElement(RouteHandler, React.__spread({},  this.props))

	      /*
	      <nav className='site-wide-nav'>
	      	<a href='/'>
	    			<span className="fa fa-home fa-fw"></span>
	    			Adam Baker IS thesis project website
	    		</a>
	      </nav>
	    	*/
	    )
    );
  }

});

module.exports = App;
},{"react-router":"react-router","react/addons":"react/addons"}],2:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react/addons');

var Experiment = React.createClass({displayName: "Experiment",

  getInitialState: function() {
    return {
      showDetail: false
    }
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
            React.createElement("a", {href: "/navigator"}, "Interactive medication navigator and evidence display"), 
            React.createElement("p", null, "This demo combines something like a medication decision aid (filter medications by preferences) with display of various kinds of evidence—improvement outcomes, adverse effects, etc.")
          ), 
          React.createElement("h2", null, 
            React.createElement("a", {href: "/processing"}, "Data live from a Google Spreadsheet"), 
            React.createElement("p", null, "This is a demo, in a style similar to the GRADE and Cochrane summary of findings tables, of data from multiple sources being displayed side by side in a UI. The data live in an editable Google spreadsheet. This also demonstrates a very preliminary, and simplistic, harmonization: Instead of organizing data by study, or by drug, or some other typical scheme, they are organized according to high-level concepts like ", React.createElement("em", null, "work"), " and ", React.createElement("em", null, "improvement"), ". Any appropriate measures are thus grouped and presented under those concepts. The demo also features the first few reusable components I hope to make (such as widgets for displaying absolute risk frequency and for showing intervention details like dosage).")
          ), 
           React.createElement("h2", null, 
            React.createElement("a", {href: "/visualization-sketches"}, "Visualization sketches"), 
            React.createElement("p", null, "This page has evolving, non-interactive sketches of visualizations and ways of presenting evidence/data.")
          ), 
          React.createElement("h2", null, 
            React.createElement("a", {href: "/ptda"}, "RA treatment decision aid demo"), 
            React.createElement("p", null, "This is an interactive, tailorable digital derivation of a ", React.createElement("a", {href: "//www.ncbi.nlm.nih.gov/pubmed/25649726"}, "low-literacy decision aid about RA medications"), " designed by one of my supervisors, Dr. Jennifer Barton, and her colleagues at UCSF and elsewhere. I developed it in the first few weeks of my thesis work, as a testbed for technology choices and to explore ideas that will be used in my eventual RA prototype.")
          ), 
          React.createElement("h2", null, 
            React.createElement("a", {href: "/adverse"}, "RA DMARD adverse events prototype"), 
            React.createElement("p", null, "This is a prototype to explore querying an FDA database for reported adverse events where at least one of 12 commonly used disease-modifying antirheumatic drugs was being used to treat RA.")
          ), 
          React.createElement("h2", null, 
            React.createElement("a", {href: "/visualization-tests"}, "Visualization tests"), 
            React.createElement("p", null, "A page with test cases for visualization widgets.")
          )
        ), 

        React.createElement("nav", null, 
          React.createElement("p", null, React.createElement("a", {href: "http://www.browserstack.com/"}, "BrowserStack"), " has been kind enough to give me a free account to test this project across many browsers and platforms.")
        )
      )
    );
  }

});

module.exports = Experiment;
},{"react/addons":"react/addons"}],3:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react/addons')
var _ = require('lodash')

// Data
var get = require('../data/get.js')
var medications = require('../data/medications.js')
var preferences = require('../data/preferences.js')
var mockData = require('../data/mock.js')

var Nav = require('react-bootstrap').Nav
var NavItem = require('react-bootstrap').NavItem

var Sticky = require('react-sticky')

var OutcomeAdverseEvents = require('./OutcomeAdverseEvents.jsx')
var OutcomeDifferences = require('./OutcomeDifferences.jsx')
var OutcomeRelativeComparison = require('./OutcomeRelativeComparison.jsx')
var OutcomeTimeline = require('./OutcomeTimeline.jsx')

String.prototype.capitalizeFirstletter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

var ScrollTo = React.createClass({displayName: "ScrollTo",

  propTypes: {
    to: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      React.createElement("a", {onClick: this.props.onClick.bind(null, this.props.to), className: "scroll-down"}, 
        React.createElement("i", {className: "ss-icon ss-navigatedown"})
      )
    )
  }

})

var DosageForm = React.createClass({displayName: "DosageForm",

  propTypes: {
    form: React.PropTypes.string.isRequired
  },

  checkForSubstring: function(form, canonical) {
    return form.toLowerCase().indexOf(canonical) >= 0
  },

  render: function() {
    var form = this.props.form

    var cx = React.addons.classSet
    var classes = cx({
      'ss-icon': true,
      'ss-hospital': this.checkForSubstring(form, 'infusion'),
      'ss-syringe': this.checkForSubstring(form, 'injection'),
      'ss-pill': this.checkForSubstring(form, 'tablet')
    })

    return (
      React.createElement("div", {className: "dosage-form"}, 
        React.createElement("span", {className: classes}), 
        React.createElement("span", {className: "form-name"}, form)
      )
    )
  }

})

var MedicationCard = React.createClass({displayName: "MedicationCard",

  propTypes: {
    medication: React.PropTypes.object.isRequired,
    preferences: React.PropTypes.object,
    preferencesSelected: React.PropTypes.object
  },

  renderPreferredMedicationName: function (medication) {
    if (medication.name_common.toLowerCase() == medication.name_generic.toLowerCase()) {
      return (
        React.createElement("span", {className: "medication-name"}, 
          React.createElement("strong", null, medication.name_generic.toLowerCase())
        )
      )
    }
    else {
      return (
        React.createElement("span", {className: "medication-name"}, 
          React.createElement("strong", null, medication.name_generic), React.createElement("br", null), 
          React.createElement("span", {className: "light"}, medication.name_common)
        )
      )
    }
  },

  renderPreferences: function (preferences, preferencesSelected) {
    if (preferences && preferencesSelected) {
      var medication = this.props.medication
      return (
        React.createElement("div", {className: "preferences"}, 
          _.map(preferencesSelected, function (value, key) {
            // Check medication for this key, to see if it has a hit
            // e.g. medication[risks.alcohol] = 0 (ok), 1 (unsure), 2 (bad)
            // e.g. medication[generic_available]
            // e.g. medication[preferences[key]]
            // e.g. methotrexate[risks.alcohol]

            // Is a the preference true or non-empty?
            if (value) {
              // Does the preference exist in our preferences object, and is there a function to look for a match?
              if (preferences[key] && preferences[key].isMatch) {
                var isMatch = preferences[key].isMatch
                var lookupKey = preferences[key].key
                var match = isMatch(_.get(medication, lookupKey), value)
              }
            }

            // If we get an "unsafe"
            if (match == 'unsafe') {
              return (React.createElement("p", {key: medication.name + key}, "Not ", preferences[key].name.toLowerCase()))
            }
            // If we get an "unknown"
            if (match == 'unknown') {
              return (React.createElement("p", {key: medication.name + key}, "No information about whether ", preferences[key].name.toLowerCase()))
            }
            // If we get a "false" i.e. for a boolean, it's not true
            if (match === false) {
              return (React.createElement("p", {key: medication.name + key}, "No ", preferences[key].name.toLowerCase()))
            }
            // TODO handle dosage form properly
          })
        )
      )
    }
  },

  render: function() {
    var medication = this.props.medication
    var preferences = this.props.preferences
    var preferencesSelected = this.props.preferencesSelected

    return (
      React.createElement("div", null, 
        React.createElement("div", {className: "dosage-forms"}, 
          medication.forms.map(function (form, i) {
            return (
              React.createElement(DosageForm, {key: i, form: form.name})
            )
          })
        ), 
        this.renderPreferredMedicationName(medication), 

        React.createElement("div", {className: "cost"}, 
          React.createElement("span", {className: "light"}, "Monthly cost is about"), React.createElement("br", null), 
          medication.ptda.cost.min != medication.ptda.cost.max ?
            React.createElement("span", null, "$", medication.ptda.cost.min, "-$", medication.ptda.cost.max) :
            React.createElement("span", null, "$", medication.ptda.cost.max)
          
        ), 

        React.createElement("div", {className: "frequency"}, 
          medication.ptda.frequency.dose &&
            React.createElement("span", null, 
              React.createElement("span", {className: "ss-icon ss-calendar inline-block space-r"}), 
              medication.ptda.frequency.dose == 1 ? 'once ' : 'twice ', 
              medication.ptda.frequency.multiple > 1 ?
                React.createElement("span", null, "every ", medication.ptda.frequency.multiple, " ", medication.ptda.frequency.unit, "s") :
                React.createElement("span", null, "a ", medication.ptda.frequency.unit)
              
            )
          
        ), 

        this.renderPreferences(preferences, preferencesSelected)
      )
    )
  }

})

// Navigator experiment

var Navigator = React.createClass({displayName: "Navigator",

  getDefaultProps: function () {
    return {
      medications: medications,
      preferences: preferences
    }
  },

  getInitialState: function () {
    var getDosageForms = function(medications) {
      var dosageForms = {}
      medications.map(function(medication) {
        if (medication.forms) {
          medication.forms.forEach(function(form) {
            dosageForms[form.name] = false
          })
        }
      })
      return dosageForms
    }

    var getClasses = function(medications) {
      var classes = {}
      medications.map(function(medication) {
        if (medication.class) {
          medication.class.forEach(function(name) {
            classes[name] = false
          })
        }
      })
      return classes
    }

    var getDisabledMedications = function(medications) {
      var disabled = {}
      medications.forEach(function(medication) {
        disabled[medication.name] = false
      })
      return disabled
    }



    return {
      data: {},
      dev: this.props.query.dev ? true : false,
      offline: this.props.query.offline ? true : false,

      // Medication filtering-related
      disabledMedications: getDisabledMedications(medications),
      menuOpen: false,
      preferences: this.props.preferences,
      preferencesSelected: {
        alcohol: false,
        cancer_treatment: false,
        class: getClasses(this.props.medications),
        cost: null,
        forms: getDosageForms(this.props.medications),
        generic_available: false,
        heart_failure: false,
        kdieny_disease: false,
        liver_disease: false,
        pregnancy: false,
        tb: false
      },

      // User interaction-related
      offsets: {
        medications: 99999,
        results: 99999
      },
      selectedTag: null,
      selectedMeasure: null,
      stickyHolderHeight: 0
    }
  },

  componentDidMount: function () {
    var instance = this

    if (this.state.offline) {
      // Use mock data
      this.setState({
        data: mockData,
        selectedMeasure: 'acr_50',
        selectedTag: 'improvement'
      })
    }
    else {
      // Query spreadsheets
      this.getData()
      .done(function(data) {
        if (instance.isMounted) {
          instance.setState({data: data})
          if (data.tags['improvement'] && data.measures['acr_50'] && data.grades && data.data != {}) {
            instance.setState({
              selectedMeasure: 'acr_50',
              selectedTag: 'improvement',
              // selectedMeasure: 'ae',
              // selectedTag: 'adverse event'
            })
          }
        }
      })
    }
  },

  handleStickyStateChange: function() {
    this.setStickyHeaderOffsets()
  },

  setStickyHeaderOffsets: function() {
    var stickyHolderHeight = this.refs['stickyHolder'].getDOMNode().offsetHeight
    var offsets = {
      medications: this.getOffsetTop('medications') - stickyHolderHeight,
      results: this.getOffsetTop('results') - stickyHolderHeight
    }
    this.setState({
      offsets: offsets
    })
  },

  // setStickyHolderHeight: function() {
  //   var heights = {
  //     filterControls: this.refs['stickyFilterControls'].getDOMNode().offsetHeight,
  //     medications: this.refs['stickyMedications'].getDOMNode().offsetHeight
  //   }

  //   if (heights.filterControls > 0 || heights.medications > 0) {
  //     var stickyHolderHeight = this.refs['stickyHolder'].getDOMNode().offsetHeight
  //     console.log('stickyHolderHeight', stickyHolderHeight)
  //     this.setState({
  //       stickyHolderHeight: stickyHolderHeight
  //     })
  //   }
  // },

  // getOffsetTopPlusStickyHeader: function (ref) {
  //   return this.getOffsetTop() + this.state.stickyHolderHeight
  // },

  getOffsetTop: function (ref) {
    if (this.refs[ref]) {
      var element = this.refs[ref].getDOMNode()
      return Math.ceil($(element).offset().top)
    }
    return 99999
  },

  scrollSmoothlyToElement: function (ref) {
    var stickyHolderHeight = this.refs['stickyHolder'].getDOMNode().offsetHeight
    var newScrollTop = this.getOffsetTop(ref) - stickyHolderHeight
    $('html, body').animate({
      scrollTop: newScrollTop
    }, 450)
  },

  getData: function () {
    var urlTagDescriptions = get.getSheetUrl(get.sheets.tagDescriptions)
    var urlMeasures = get.getSheetUrl(get.sheets.measures)
    var urlMetrics = get.getSheetUrl(get.sheets.metrics)
    var urlGrades = get.getSheetUrl(get.sheets.grades)
    var urlTagDescriptions = get.getSheetUrl(get.sheets.tagDescriptions)

    var allData = {}
    var deferred = new $.Deferred

    $.when(
      // Get GRADE
      $.getJSON(urlGrades + '&callback=?').done(function (data) {
        allData['grades'] = get.processGrades(data)
      }),

      // Get measures & tags
      $.getJSON(urlMeasures + '&callback=?').done(function (data) {
        // var newStateItems = get.processMeasures(data)
        allData['measures'] = get.processMeasures(data).measures
        allData['tags'] = get.processMeasures(data).tags
      }),

      // Get metrics
      $.getJSON(urlMetrics + '&callback=?').done(function (data) {
        allData['metrics'] = get.processMetrics(data)
      }),

      // Get tag descriptions
      $.getJSON(urlTagDescriptions + '&callback=?').done(function (data) {
        allData['tagDescriptions'] = get.processTagDescriptions(data)
      }),

      // Get data
      $.when(Object.keys(get.sheets.data).forEach(function (source) {
        var url = get.getSheetUrl(get.sheets.data[source])
        $.getJSON(url + '&callback=?').done(function (data) {
          !allData['data'] && (allData['data'] = {})
          allData['data'][source] = get.processData(data)
        })
      })
      ).done(function() {
        return true
      })
    )
    .done(function() {
      deferred.resolve(allData)
    })

    return deferred.promise()
  },

  handleDrugFilterClick: function (key, selectedValue) {
    var preferencesSelected = this.state.drugPreferencesSelected
    if (selectedValue) {
      Object.keys(preferencesSelected[key]).forEach(function(pref) {
        preferencesSelected[key][pref] = false
      })
      preferencesSelected[key][selectedValue] = true
    }
    else {
      preferencesSelected[key] = !preferencesSelected[key]
    }
    this.setState({
      userHasFiltered: true,
      preferencesSelected: preferencesSelected
    })
  },

  filterDrugs: function (drugs, preferencesSelected) {
    var disabledDrugs = {}

    drugs.forEach(function(drug, i) {
      var drugFeatures = {}

      // 1. Examine all the preferences for a match
      for (var preference in preferencesSelected) {
        if (preferencesSelected[preference] && preferencesSelected[preference] != null) {
          var filter = drugFilters[preference]
          var options = preferencesSelected[preference]
          drugFeatures[preference] = filter.isMatch(drug, options)
        }
      }

      // 2. Check if the drug should be disabled
      var keepDrug = true
      for (var preference in preferencesSelected) {
        if (preferencesSelected[preference] != null) {
          for (var feature in drugFeatures) {
            if (preferencesSelected[preference] && !drugFeatures[preference]) {
              keepDrug = false
            }
          }
        }
      }
      disabledDrugs[drug.name] = !keepDrug
    })

    return disabledDrugs
  },

  togglePreferenceControls: function (direction) {
    // var isOpen = this.state.menuOpen
    // isOpen = !isOpen
    // this.setState({
    //   menuOpen: isOpen
    // })

    if (direction == 'open') {
      this.setState({
        menuOpen: true
      })
    }
    if (direction == 'close') {
      this.setState({
        menuOpen: false
      })
    }
  },

  togglePreferenceControlsOpen: function () {
    this.setState({
      menuOpen: true
    })
  },

  togglePreferenceControlsClose: function () {
    this.setState({
      menuOpen: false
    })
  },

  renderPreferenceControls: function (preferences) {
    var filterPreference = this.filterPreference
    var toggleOpen = this.togglePreferenceControlsOpen
    var toggleClose = this.togglePreferenceControlsClose

    var preferences = this.props.preferences
    var preferencesSelected = this.state.preferencesSelected

    var cx = React.addons.classSet

    return (
      React.createElement("div", {className: "filter-controls"}, 
          Object.keys(preferences).map(function(key) {
            var preference = preferences[key]

            // Boolean preferences become a push button
            if (preference.type == 'boolean') {
              var preferenceClasses = cx({
                'button': true,
                'active': preferencesSelected[key]
              })
              return (
                React.createElement("section", {key: preference.name}, 
                  React.createElement("a", {className: preferenceClasses, key: key, onClick: filterPreference.bind(null, key, false)}, 
                    preference.name
                  )
                  /*<span className='description'>{preference.description}</span>*/
                )
              )
            }
            // List preferences become a list
            else if (preference.type == 'list') {
              // Get the possible options for this preference from this.state.preferencesSelected.
              // There is a function in getInitialState() that iterates through the provided medications,
              // collecting the "options" they provide for vis à vis this preference.
              var options = Object.keys(preferencesSelected[key])

              return (
                React.createElement("section", {key: key}, 
                  React.createElement("div", {className: "flex-container"}, 
                    options.map(function(option, i) {
                      var optionClasses = cx({
                        'button option': true,
                        'active': !preferencesSelected[key][option]
                      })
                      // return (
                      //   <div>
                      //     <input type='checkbox'
                      //       className={optionClasses}
                      //       key={option}
                      //       value={option}
                      //       checked={!preferencesSelected[key][option]}
                      //       onChange={filterPreference.bind(null, key, option)}>
                      //         {option}
                      //     </input>
                      //   </div>
                      // )
                      return (
                        React.createElement("a", {className: optionClasses, key: option, onClick: filterPreference.bind(null, key, option)}, 
                          React.createElement(DosageForm, {form: option})
                        )
                      )
                    })
                  )
                )
              )
            }
            else {
              return (
                React.createElement("section", null, 
                  preference.name, 
                  React.createElement("span", {className: "description"}, preference.description)
                )
              )
            }
          })
      )
    )
  },

  filterPreference: function (preferenceKey, optionKey, event) {
    if (this.state.menuOpen) {
      event.stopPropagation()
    }

    var disabledMedications = {}
    var medications = this.props.medications
    var preferences = this.props.preferences
    var preferencesSelected = this.state.preferencesSelected

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
      preferencesSelected[preferenceKey][optionKey] = !preferencesSelected[preferenceKey][optionKey]
    }
    else {
      preferencesSelected[preferenceKey] = !preferencesSelected[preferenceKey]
    }

    // Check each medication against the selected preferences and options,
    // disabling any that doesn't satisfy.
    //
    medications.forEach(function(medication, i) {
      var medicationMatchingPreferences = {}

      // 1. Examine all the preferences for a match.
      //
      for (var preference in preferencesSelected) {
        if (preferencesSelected[preference]) {

          // a. Simple boolean preference
          if (typeof preferencesSelected[preference] === 'boolean') {

            // Look for a matching key in the medication object
            // Boolean? e.g. 'generic_available' -- inverse match
            if (medication[preference] == false) {
              medicationMatchingPreferences[preference] = true
              // disabledMedications[medication.name] = true
            }
            // Not a key in medication object, so check ptda.risks
            else {
              // Look for key in right place
              if (preferences[preference] && preferences[preference].isMatch) {
                var isMatch = preferences[preference].isMatch
                var lookupKey = preferences[preference].key
                var result = _.get(medication, lookupKey)
                var match = isMatch(_.get(medication, lookupKey))

                if (match == 'unsafe') {
                  medicationMatchingPreferences[preference] = true
                }
              }
            }
          }

          // b. List preference
          else if (typeof preferencesSelected[preference] === 'object') {

            // The user chose one or more options (to avoid), so the medication must match
            // each option in order to get disabled.
            var selectedOptions = {}
            var medicationMatchingOptions = {}

            // Check each option for a match
            for (var option in preferencesSelected[preference]) {

              // Option is selected
              if (preferencesSelected[preference][option]) {
                selectedOptions[option] = true

                // Look for a matching key in the medication object
                if (medication[preference]) {

                  // Is it an array or an object?
                  if (typeof medication[preference] === 'object') {

                    // Array
                    if (Array.isArray(medication[preference])) {
                      var list = medication[preference]

                      // Check for our option in the list
                      for (var item in list) {
                        // Straight up list item?
                        if (typeof list[item] === 'string') {
                          if (list[item].toLowerCase() == option.toLowerCase()) {
                            medicationMatchingOptions[option] = true
                          }
                          else {
                            medicationMatchingOptions[list[item].toLowerCase()] = true
                          }
                        }
                        // Object? Look for a 'name' that we'll check against
                        else if (list[item].hasOwnProperty('name')) {
                          if (list[item].name.toLowerCase() == option.toLowerCase()) {
                            medicationMatchingOptions[option] = true
                          }
                          else {
                            medicationMatchingOptions[list[item].name.toLowerCase()] = true
                          }
                        }
                      }
                    }
                    // Object
                    else {
                      for (var item in Object.keys(medication[preference])) {
                        if (list[item].toLowerCase() == option.toLowerCase()) {
                          medicationMatchingOptions[option] = true
                        }
                        else {
                          medicationMatchingOptions[list[item].toLowerCase()] = true
                        }
                      }
                      // // Check for our option in the object
                      // if (medication[preference][optionKey]) {
                      //   medicationMatchingOptions[option] = true
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
                    medicationMatchingPreferences[preference] = true
                  }
                }
              }
              // Wait! Does the drug have other options that are NOT disabled? Don't disable it!
              for (var option in medicationMatchingOptions) {
                if (medicationMatchingOptions[option] && !selectedOptions[option]) {
                  medicationMatchingPreferences[preference] = false
                }
              }
            }
          }
        }
      }

      // 2. Check if the drug should be disabled.
      //
      if (Object.keys(preferencesSelected).length > 0) {
        var disableMedication = false

        // Disabled options present in the drug? Disable it.
        for (var selected in preferencesSelected) {
          for (var preference in medicationMatchingPreferences) {
            if (medicationMatchingPreferences[preference] && preferencesSelected[preference]) {
              disableMedication = true
            }
          }
        }
        // Wait! Does the drug have other preferences that are NOT disabled? Don't disable it!
        for (var preference in medicationMatchingPreferences) {
          if (medicationMatchingPreferences[preference] && !preferencesSelected[preference]) {
            disableMedication = false
          }
        }

        // Add the medication to disabledMedications.
        if (disableMedication) {
          disabledMedications[medication.name] = true
        }
        else {
          disabledMedications[medication.name] = false
        }
      }
    })

    this.setState({
      disabledMedications: disabledMedications,
      preferencesSelected: preferencesSelected
    })
  },

  getDataByTag: function (selectedTag) {
    var data = this.state.data.data
    var tags = this.state.data.tags
    var dataByTag = JSON.parse(JSON.stringify(tags))

    // Each tag (pain, function, etc.)
    Object.keys(tags).map(function (tag) {
      // Each source (sheet of data)
      Object.keys(data).map(function (source) {
        // Each entry in the source data (line of sheet)
        data[source].map(function (entry) {
          // Entry records an outcome in a measure that is associated with one of the tags?
          // e.g. tags['pain']['patient_pain'] or ['improvement']['acr_50']
          if (tags[tag][entry.measure]) {
            // Create a place for data about each measure
            dataByTag[tag][entry.measure] === true && (dataByTag[tag][entry.measure] = {})
            !dataByTag[tag][entry.measure]['data'] && (dataByTag[tag][entry.measure]['data'] = [])

            dataByTag[tag][entry.measure]['data'].push(entry)
          }
        })
      })
    })

    return dataByTag
  },

  handleMedicationClick: function (key) {
    var disabledMedications = this.state.disabledMedications
    disabledMedications[key] = !disabledMedications[key]
    this.setState({
      disabledMedications: disabledMedications
    })
  },

  renderMedicationBar: function (medications) {
  	var disabledMedications = this.state.disabledMedications
    var handleMedicationClick = this.handleMedicationClick
    var renderPreferredMedicationName = this.renderPreferredMedicationName
    var preferences = this.props.preferences
    var preferencesSelected = this.state.preferencesSelected

    if (medications) {
      return (
        React.createElement("div", {className: "medication-cards"}, 
          React.createElement("ul", null, 
            Object.keys(medications).map(function (medication, i) {
            	var medication = medications[medication]
              return (
                React.createElement("li", {key: i, className: (disabledMedications[medication.name] === true) && 'disabled'}, 
                  React.createElement("a", {
                    onClick: handleMedicationClick.bind(null, medication.name)}, 
                      React.createElement(MedicationCard, {medication: medication, preferences: preferences, preferencesSelected: preferencesSelected})
                  )
                )
              )
            })
          )
        )
      )
    }
  },

  handleMeasureSelect: function (key) {
    this.setState({
      selectedMeasure: key
    })
  },

  renderMeasureBar: function (selectedTag, selectedMeasure) {
    var tags = this.state.data.tags
    var tagDescriptions = this.state.data.tagDescriptions
    var measures = this.state.data.measures

    if (selectedTag) {
      var tagMeasures = tags[selectedTag]
      return (
        React.createElement("div", null, 
          React.createElement(Nav, {className: "tag-navigation", bsStyle: "pills", activeKey: selectedMeasure && selectedMeasure, onSelect: this.handleMeasureSelect}, 
            Object.keys(tagMeasures).map(function (measure, i) {
              return (React.createElement(NavItem, {key: i, eventKey: measure}, measures[measure] ? measures[measure].name_friendly : measure))
            })
          )
        )
      )
    }
  },

  handleTagSelect: function (key) {
    this.setState({
      selectedTag: key,
      selectedMeasure: null
    })
  },

  renderTagBar: function (selectedTag) {
    var tags = this.state.data.tags
    var tagDescriptions = this.state.data.tagDescriptions

    if (tags && tagDescriptions) {
      return (
        React.createElement(Nav, {className: "tag-navigation large", bsStyle: "pills", activeKey: selectedTag && selectedTag, onSelect: this.handleTagSelect}, 
          Object.keys(tags).map(function (tag, i) {
            return (React.createElement(NavItem, {key: i, eventKey: tag}, tagDescriptions[tag] ? tagDescriptions[tag].name_short : tag))
          })
        )
      )
    }
  },

  renderTagDescription: function (selectedTag) {
    var tagDescriptions = this.state.data.tagDescriptions

    if (selectedTag && tagDescriptions) {
      return (
        React.createElement("div", {className: "panel"}, 
          React.createElement("h2", {className: "tag-description"}, 
            React.createElement("strong", null, tagDescriptions[selectedTag] ? tagDescriptions[selectedTag].name_friendly : selectedTag), 
            tagDescriptions[selectedTag] && React.createElement("p", null, tagDescriptions[selectedTag].description)
          )
        )
      )
    }
  },

  renderDataToJSON: function (data) {
    return (
      React.createElement("div", null, 
        React.createElement("div", null, "grades: ", JSON.stringify(data.grades)), 
        React.createElement("hr", null), 
        React.createElement("div", null, "measures: ", JSON.stringify(data.measures)), 
        React.createElement("hr", null), 
        React.createElement("div", null, "metrics: ", JSON.stringify(data.metrics)), 
        React.createElement("hr", null), 
        React.createElement("div", null, "tags: ", JSON.stringify(data.tags)), 
        React.createElement("hr", null), 
        React.createElement("div", null, "tagDescriptions: ", JSON.stringify(data.tagDescriptions)), 
        React.createElement("hr", null), 
        React.createElement("div", null, "data: ", JSON.stringify(data.data))
      )
    )
  },

  renderMeasure: function (selectedTag, selectedMeasure) {
    var medications = this.props.medications
    var data = this.state.data
    var disabledMedications = this.state.disabledMedications

    if (selectedMeasure == 'patient_pain') {
      return (
        React.createElement(OutcomeDifferences, {
          data: data, 
          dataByTag: this.getDataByTag(selectedTag), 
          medications: medications, 
          disabledMedications: disabledMedications, 
          selectedTag: selectedTag, 
          selectedMeasure: selectedMeasure})
      )
    }
    if (selectedMeasure == 'discontinued_ae') {
      return (
        React.createElement(OutcomeRelativeComparison, {
          data: data, 
          dataByTag: this.getDataByTag(selectedTag), 
          medications: medications, 
          disabledMedications: disabledMedications, 
          selectedTag: selectedTag, 
          selectedMeasure: selectedMeasure})
      )
    }
    if (selectedMeasure == 'ae') {
      return (
        React.createElement(OutcomeAdverseEvents, {
          data: data, 
          dataByTag: this.getDataByTag(selectedTag), 
          medications: medications, 
          disabledMedications: disabledMedications, 
          selectedTag: selectedTag, 
          selectedMeasure: selectedMeasure})
      )
    }
    return(
      React.createElement(OutcomeTimeline, {
        data: data, 
        medications: medications, 
        disabledMedications: disabledMedications, 
        selectedTag: selectedTag, 
        selectedMeasure: selectedMeasure})
    )
  },

  handleShortcutClick: function (tag, measure) {
    this.setState({
      selectedTag: tag,
      selectedMeasure: measure,
    })
  },

  render: function () {
    var cx = React.addons.classSet
    var navigatorClasses = cx({
      'navigator': true,
      'dev row': this.state.dev,
      'mobile': this.state.mobile,
      'no-scroll': this.state.mobile && this.state.menuOpen
    })
    var drugPickerClasses = cx({
      'drug-picker': true,
      'col-md-2 col-lg-1': this.state.dev,
      'open': this.state.menuOpen == true,
      'closed': this.state.menuOpen == false
    })
    var medicationListClasses = cx({
      'medication-list': true,
      'col-md-2 col-lg-1': this.state.dev
    })
    var detailsClasses = cx({
      'details': true,
      'col-md-9 col-lg-10': this.state.dev,
      'closed': this.state.menuOpen == true,
      'open': this.state.menuOpen == false
    })

    var medications         = this.props.medications
    var preferences         = this.props.preferences
    var disabledMedications = this.state.disabledMedications
    var data                = this.state.data
    var selectedMeasure     = this.state.selectedMeasure
    var selectedTag         = this.state.selectedTag

    if (data != {} && data['grades'] && data['metrics'] && data['measures'] && data['tags'] && data['tagDescriptions'] && data['data'] != {}) {
      // return (
      //   <div className='container-fluid'>
      //     <div className={navigatorClasses}>
      //       {this.renderDataToJSON(data)}
      //     </div>
      //   </div>
      // )
      if (this.state.dev) {
        return (
          React.createElement("div", {className: "container-fluid"}, 
            React.createElement("div", {className: navigatorClasses}, 
            	React.createElement("section", {className: drugPickerClasses}, 
            		this.renderPreferenceControls(preferences)
            	), 

              React.createElement("section", {className: medicationListClasses}, 
                this.renderMedicationBar(medications)
              ), 

              React.createElement("section", {className: detailsClasses}, 
                React.createElement("h3", {className: "brief-header"}, 
                  "Look at evidence about the selected medications, in various categories.", React.createElement("br", null), 
                  "e.g.&nbsp", 
                  React.createElement("a", {onClick: this.handleShortcutClick.bind(null, 'improvement', 'acr_50')}, "ACR50 from multiple sources"), " - ", React.createElement("a", {onClick: this.handleShortcutClick.bind(null, 'adverse event', 'discontinued_ae')}, "Withdrawl due to AE (RR comparison)"), " - ", React.createElement("a", {onClick: this.handleShortcutClick.bind(null, 'adverse event', 'ae')}, "Side effects (etanercept only)")
                ), 

                this.renderTagBar(selectedTag), 
                this.renderTagDescription(selectedTag), 
                this.renderMeasureBar(selectedTag, selectedMeasure), 
                this.renderMeasure(selectedTag, selectedMeasure), 

                React.createElement("section", null, 
                  "See the individual data items in ", React.createElement("a", {href: "https://docs.google.com/spreadsheets/d/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/", target: "_top"}, "this Google Spreadsheet")
                )
             	)
            )
          )
        )
      }

      else {
        var selectedPreferenceItems = []
        _.each(this.state.preferencesSelected, function(value, key) {
          value == true && selectedPreferenceItems.push(key)
        })

        return (
          React.createElement("div", {className: "navigator"}, 
            React.createElement("section", {className: "full-screen intro", ref: "intro"}, 
              React.createElement("div", {className: "spread"}, 
                React.createElement("div", null, 
                  React.createElement("h1", null, "This app shows you findings from medical research about rheumatoid arthritis treatments."), 
                  React.createElement("h2", null, "They work differently for different people, are taken on different schedules, and vary in cost and side effects."), 
                  React.createElement(ScrollTo, {to: "controls", onClick: this.scrollSmoothlyToElement})
                )
              )
            ), 

            React.createElement("section", {className: "full-screen controls", ref: "controls"}, 
              React.createElement("div", {className: "spread"}, 
                React.createElement("div", null, 
                  React.createElement("h1", null, "A lot of medications treat RA, but only some might match your needs."), 
                  React.createElement("h2", null, "Choose a few preferences, and move on to see medications that work out."), 
                  this.renderPreferenceControls(preferences), 
                  React.createElement(ScrollTo, {to: "medications", onClick: this.scrollSmoothlyToElement})
                )
              )
            ), 

            React.createElement("section", {className: "full-screen medications", ref: "medications"}, 
              React.createElement("div", {className: "spread"}, 
                React.createElement("div", null, 
                  React.createElement("h1", null, "These medications match your needs and preferences"), 
                  React.createElement("section", {className: medicationListClasses}, 
                    this.renderMedicationBar(medications)
                  ), 
                  React.createElement(ScrollTo, {to: "results", onClick: this.scrollSmoothlyToElement})
                )
              )
            ), 

            React.createElement("section", {className: "full-screen results", ref: "results"}, 
              React.createElement("div", {className: "spread"}, 
                React.createElement("div", null, 
                  React.createElement("section", {className: detailsClasses}, 
                    this.renderTagBar(selectedTag), 
                    /*this.renderTagDescription(selectedTag)*/
                    this.renderMeasureBar(selectedTag, selectedMeasure), 
                    this.renderMeasure(selectedTag, selectedMeasure)
                  )
                )
              )
            ), 

            React.createElement("div", {className: "sticky-holder", ref: "stickyHolder"}, 
              React.createElement(Sticky, {
                ref: "stickyFilterControls", 
                className: "sticky-filter-controls", 
                onStickyStateChange: this.handleStickyStateChange, 
                stickyClass: "stuck", 
                stickyStyle: {position: 'relative'}, 
                topOffset: this.state.offsets['medications']}, 
                  this.renderPreferenceControls(preferences)
              ), 
              React.createElement(Sticky, {
                ref: "stickyMedications", 
                className: "sticky-medications", 
                onStickyStateChange: this.handleStickyStateChange, 
                stickyClass: "stuck", 
                stickyStyle: {position: 'relative'}, 
                topOffset: this.state.offsets['results']}, 
                  this.renderMedicationBar(medications)
              )
            )
          )
        )
      }
    }
    return (
      React.createElement("div", {className: "navigator"}, 
        React.createElement("section", {className: "full-screen intro", ref: "intro"}, 
          React.createElement("div", {className: "spread"}, 
            React.createElement("div", null, 
              React.createElement("h1", null, "Loading")
            )
          )
        )
      )
    )
  }

})

module.exports = Navigator
},{"../data/get.js":30,"../data/medications.js":31,"../data/mock.js":32,"../data/preferences.js":33,"./OutcomeAdverseEvents.jsx":4,"./OutcomeDifferences.jsx":5,"./OutcomeRelativeComparison.jsx":6,"./OutcomeTimeline.jsx":7,"lodash":"lodash","react-bootstrap":"react-bootstrap","react-sticky":"react-sticky","react/addons":"react/addons"}],4:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react/addons');
var _ = require('lodash');

// Data
var get = require('../data/get.js');

var AbsoluteFrequency = require('./visualizations/AbsoluteFrequency.jsx');
var AbsoluteRiskComparison = require('./visualizations/AbsoluteRiskComparison.jsx');
var Difference = require('./visualizations/Difference.jsx');
var GradeQuality = require('./visualizations/GradeQuality.jsx');
var Intervention = require('./visualizations/Intervention.jsx');
var Population = require('./visualizations/Population.jsx');
var RelativeRiskComparison = require('./visualizations/RelativeRiskComparison.jsx');
var RiskRelativeToBaseline = require('./visualizations/RiskRelativeToBaseline.jsx');
var Source = require('./visualizations/Source.jsx');

var ProgressBar = require('react-bootstrap').ProgressBar;

// Outcome adverse events

var OutcomeAdverseEvents = React.createClass({displayName: "OutcomeAdverseEvents",
  propTypes: {
    data: React.PropTypes.object.isRequired,
    dataByTag: React.PropTypes.object.isRequired,
    disabledMedications: React.PropTypes.object,
    medications: React.PropTypes.array.isRequired
  },

  renderDataByMeasure: function(selectedMeasure) {
    var measures = this.props.data.measures;
    var dataByTag = this.props.dataByTag;
    var renderEntry = this.renderEntry;

    var renderAbsoluteRiskComparison = function(entries, measure) {
      var sources = {};

      Object.keys(entries).map(function (key) {
        var entry = entries[key];

        if (entry.which == 'comparison') {
          if (!sources[entry.comparison.parts]) {
            sources[entry.comparison.parts] = {};
            sources[entry.comparison.parts]['items'] = [];
          }
          sources[entry.comparison.parts]['baseline'] = entry.comparison;

          // Check to see that we have absolute risk
          if (entry.intervention.ar) {
            sources[entry.comparison.parts].items.push(entry.intervention);
          }
        }
      });

      return Object.keys(sources).map(function (comparison) {
        if (sources[comparison].items.length > 1) {
          return (
            React.createElement("div", {className: "visualization-rr"}, 
              React.createElement(RelativeRiskComparison, {
                  baseline: sources[comparison].baseline, 
                items: sources[comparison].items, 
                measure: measure})
            )
          );
        }
      })
    };

    var renderRiskRelativeToBaselineComparison = function(entries, measure) {
      var sources = {};

      Object.keys(entries).map(function (key) {
        var entry = entries[key];

        if (entry.which == 'comparison') {
          if (!sources[entry.comparison.parts]) {
            sources[entry.comparison.parts] = {};
            sources[entry.comparison.parts]['items'] = [];
          }
          sources[entry.comparison.parts]['comparison'] = entry.comparison;

          // Check to see that we have relative risk
          if (entry.intervention.rr) {
            sources[entry.comparison.parts].items.push(entry.intervention);
          }
        }
      });

      return Object.keys(sources).map(function (comparison) {
        if (sources[comparison].items.length > 1) {
          return (
            React.createElement("div", {className: "visualization-rr"}, 
              React.createElement(RiskRelativeToBaseline, {
                comparison: sources[comparison].comparison, 
                items: sources[comparison].items, 
                measure: measure, 
                measures: measures})
            )
          );
        }
      })
    };

    var measure = selectedMeasure;
    var tag = this.props.selectedTag;
    var measureData = dataByTag[tag][selectedMeasure].data;

    // debugger;

    if (measureData) {
      var medications = this.props.medications;
      var disabledMedications = this.props.disabledMedications;
      var entries = get.filterEntriesByMedication(get.getEntriesForMeasure(measureData), medications, disabledMedications);

      return (
        React.createElement("div", {key: measure}, 
          renderRiskRelativeToBaselineComparison(entries, measure)
        )
      );
    }
  },



  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'adverse-events': true,
      'results': true
    });

    var data                = this.props.data;
    var medications         = this.props.medications;
    var selectedMeasure     = this.props.selectedMeasure;
    var selectedTag         = this.props.selectedTag;
    var measureData         = this.props.dataByTag[selectedTag][selectedMeasure].data;
    var disabledMedications = this.props.disabledMedications;

    if (measureData) {
      // return (
      //   <AbsoluteRiskComparison />
      // );

      measureData = get.filterEntriesByMedication(measureData, medications, disabledMedications)
      
      var groupedMeasureData = _.groupBy(measureData, function (entry) {
        return entry.comparison + entry.intervention;
      });

      return (
        React.createElement("section", {className: classes}, 
          _.map(groupedMeasureData, function (group) {
            var firstEntry = group[0];
            var comparison = firstEntry.comparison.join(' + ');
            var intervention = firstEntry.intervention.join(' + ');
            
            var groupedByDetail = _.chain(group)
                                  .groupBy(function (entry) {
                                    return entry.measure_detail;
                                  })
                                  .sortBy(function (clump) {
                                    return _.max(clump, function (part) {
                                      return part.value.value;
                                    });
                                  })
                                  .value();

            return (
              React.createElement("div", {key: group}, 
                React.createElement("h4", null, 
                  "When ", React.createElement("strong", null, intervention), " was compared with ", React.createElement("strong", null, comparison), " for people with RA", React.createElement("br", null), 
                  React.createElement("span", {className: "light"}, "these were the most common side effects")
                ), 
                React.createElement(Source, {source: firstEntry.source, kind: firstEntry.kind}), 
                React.createElement(GradeQuality, {grade: firstEntry.quality, gradeMap: data.grades}), 

                groupedByDetail.map(function (clump, i) {
                  var name              = clump[0].measure_detail;
                  var comparisonValue   = _.chain(clump)
                                           .findWhere({'which': 'comparison'})
                                           .value()
                                           .value.value;
                  var interventionValue = _.chain(clump)
                                           .findWhere({'which': 'intervention'})
                                           .value()
                                           .value.value;

                  if (interventionValue < comparisonValue) {
                    var stackedValue = comparisonValue - interventionValue;
                    return (
                      React.createElement("div", {key: i}, 
                        React.createElement("strong", null, name), React.createElement("br", null), 
                        React.createElement("span", {className: "light"}, "less common with ", React.createElement("strong", null, intervention)), 
                        React.createElement(ProgressBar, null, 
                          React.createElement(ProgressBar, {bsSize: "xsmall", className: "better", label: "%(percent)s% taking " + intervention, now: interventionValue, key: 1}), 
                          React.createElement(ProgressBar, {bsSize: "xsmall", label: comparisonValue + '% on ' + comparison, now: stackedValue, key: 2})
                        )
                      )
                    );
                  }
                  else {
                    var stackedValue = interventionValue - comparisonValue;
                    return (
                      React.createElement("div", {key: i}, 
                        React.createElement("strong", null, name), React.createElement("br", null), 
                        React.createElement("span", {className: "light"}, "as or more common with ", React.createElement("strong", null, intervention)), 
                        React.createElement(ProgressBar, null, 
                          React.createElement(ProgressBar, {bsSize: "xsmall", label: "%(percent)s% on " + comparison, now: comparisonValue, key: 1}), 
                          React.createElement(ProgressBar, {bsSize: "xsmall", className: "worse", label: interventionValue + '% on ' + intervention, now: stackedValue, key: 2})
                          
                        )
                      )
                    );
                  }
                })
              )
            );
          })
        )
      );
    }
    return (React.createElement("noscript", null));
  }
});

module.exports = OutcomeAdverseEvents;
},{"../data/get.js":30,"./visualizations/AbsoluteFrequency.jsx":18,"./visualizations/AbsoluteRiskComparison.jsx":19,"./visualizations/Difference.jsx":20,"./visualizations/GradeQuality.jsx":21,"./visualizations/Intervention.jsx":22,"./visualizations/Population.jsx":23,"./visualizations/RelativeRiskComparison.jsx":24,"./visualizations/RiskRelativeToBaseline.jsx":25,"./visualizations/Source.jsx":26,"lodash":"lodash","react-bootstrap":"react-bootstrap","react/addons":"react/addons"}],5:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react/addons');
var cx = React.addons.classSet
var _ = require('lodash');
var get = require('../data/get.js');

var AbsoluteFrequency = require('./visualizations/AbsoluteFrequency.jsx');
var Difference = require('./visualizations/Difference.jsx');
var GradeQuality = require('./visualizations/GradeQuality.jsx');
var Intervention = require('./visualizations/Intervention.jsx');
var Population = require('./visualizations/Population.jsx');
var Source = require('./visualizations/Source.jsx');
var VisualAnalogScale = require('./visualizations/VisualAnalogScale.jsx');

// Outcome differences

var OutcomeDifferences = React.createClass({displayName: "OutcomeDifferences",
  propTypes: {
    data: React.PropTypes.object.isRequired,
    dataByTag: React.PropTypes.object.isRequired,
    disabledMedications: React.PropTypes.object,
    medications: React.PropTypes.array.isRequired
  },

  renderDataByMeasure: function(selectedMeasure) {
    var measures = this.props.data.measures; 
    var dataByTag = this.props.dataByTag;
    var measure = selectedMeasure;
    var tag = this.props.selectedTag;
    var measureData = dataByTag[tag][selectedMeasure].data;
    var grades = this.props.data.grades;

    if (measureData) {
      var medications = this.props.medications;
      var disabledMedications = this.props.disabledMedications;
      var entries = get.filterEntriesByMedication(get.getEntriesForMeasure(measureData), medications, disabledMedications);

      var sortedEntries = _.sortBy(entries, function(entry) {
        if (entry.intervention) {
          return entry.intervention.parts[0]
        }
      })

      return sortedEntries.map(function(entry, i) {
        if (entry.intervention && entry.intervention['mean_score_difference']) {
          var value = entry.intervention['mean_score_difference'].value.value

          if (value != null) {
            var entryStyle = {
              marginBottom: '15px'
            }
            var inlineStyle = {
              display: 'inline-block',
              marginLeft: '15px'
            }

            return (
              React.createElement("div", {key: i, style: entryStyle}, 
                React.createElement("span", {style: {display: 'inline-block'}}, 
                  React.createElement(Intervention, {intervention: entry.intervention.parts.join(' + '), dosage: entry.intervention.dosage}), 
                  entry.comparison &&
                    React.createElement("div", {className: "light"}, 
                      "vs.", React.createElement("br", null), 
                      entry.comparison.parts.join(' + ')
                    ), 
                  
                  React.createElement(VisualAnalogScale, {key: i, value: value})
                ), 
                React.createElement("span", {style: inlineStyle}, 
                  React.createElement(Source, {source: entry.source, kind: entry.kind})
                ), 
                React.createElement("span", {style: inlineStyle}, 
                  React.createElement(GradeQuality, {grade: entry.quality, gradeMap: grades})
                )
              )
            )
          }
        }
      })
    }
  },

  render: function() {
    var classes = cx({
      'processing': true,
      'results': true
    });

    var selectedMeasure = this.props.selectedMeasure;
    
    return (
      React.createElement("div", {className: classes}, 
        selectedMeasure !== null && this.renderDataByMeasure(selectedMeasure)
      )
    );
  }

});

module.exports = OutcomeDifferences;
},{"../data/get.js":30,"./visualizations/AbsoluteFrequency.jsx":18,"./visualizations/Difference.jsx":20,"./visualizations/GradeQuality.jsx":21,"./visualizations/Intervention.jsx":22,"./visualizations/Population.jsx":23,"./visualizations/Source.jsx":26,"./visualizations/VisualAnalogScale.jsx":27,"lodash":"lodash","react/addons":"react/addons"}],6:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react/addons');
var _ = require('lodash');
var get = require('../data/get.js');

var AbsoluteFrequency = require('./visualizations/AbsoluteFrequency.jsx');
var Difference = require('./visualizations/Difference.jsx');
var GradeQuality = require('./visualizations/GradeQuality.jsx');
var Intervention = require('./visualizations/Intervention.jsx');
var Population = require('./visualizations/Population.jsx');
var RelativeRiskComparison = require('./visualizations/RelativeRiskComparison.jsx');
var RiskRelativeToBaseline = require('./visualizations/RiskRelativeToBaseline.jsx');
var Source = require('./visualizations/Source.jsx');

// Outcome relative comparison

var OutcomeRelativeComparison = React.createClass({displayName: "OutcomeRelativeComparison",
	propTypes: {
    data: React.PropTypes.object.isRequired,
		disabledMedications: React.PropTypes.object,
    medications: React.PropTypes.array.isRequired
	},

  renderDataBySource: function(data) {
    Object.keys(data).map(function (source) {
      return (
        React.createElement("section", {className: "data"}, 
          React.createElement("h2", null, source, " data"), 
          React.createElement("ul", null, 
            data[source].map(function (entry, i) {
              return (
                React.createElement("li", {key: i}, 
                  React.createElement("h3", null, i), 
                  React.createElement("p", null, entry.which), 
                  React.createElement("div", null, 
                    React.createElement("ul", null, 
                      Object.keys(entry).map(function (key, i) {
                        return (
                          React.createElement("li", {key: i}, 
                            React.createElement("small", null, key), 
                            entry[key]
                          )
                        );
                      })
                    )
                  )
                )
              );
            })
          )
        )
      );
    });
  },

  renderFollowUpTime: function(duration, measure) {
    var low = duration.low;
    var high = duration.high;
    var interval = duration.interval;

    (low && !high) && (high = low);
    (!low && high) && (low = high);

    var durationString = low == high ? low : low + ' to ' + high;
    var intervalString = low > 1 ? interval + 's' : interval;

    return (
      React.createElement("div", null, 
        React.createElement("strong", null, durationString, " ", intervalString), React.createElement("br", null), 
        React.createElement("span", {className: "light"}, "Researchers looked at ", measure ? measure : 'this', " ", durationString, " ", intervalString, " after people started treatment.")
      )
    );
  },

  renderValue: function(results, metric, comparisonResults) {
    // results = the data/finding, passed as part of an entry as population / intervention / comparison
    // metric (optional) = the preferred metric to render. often helpful if a specific metric is required. otherwise there's logic to render all of them.
    // comparisonResults = a pair dataset used for relative comparisons, i.e. the "comparison" to an intervention
    // preferredKind = what kind of value to show — a difference/comparison…

    var grades = this.props.data.grades;
    var measures = this.props.data.measures;
    var metrics = this.props.data.metrics;
    var tags = this.props.data.tags;
    var selectedTag = this.props.data.selectedTag;

    var renderAbsoluteRisk = this.renderAbsoluteRisk;
    var renderDifference = this.renderDifference;
    var renderPercentage = this.renderPercentage;
    var renderNumber = this.renderNumber;

    var renderAppropriateVisualization = function(results, metric, measure) {
      if (metrics[metric]) {
        if (metrics[metric].presentation == 'frequency') {
          return renderAbsoluteRisk(results, metric, measure, comparisonResults);
        }
        if (metrics[metric].presentation == 'percentage') {
          return renderPercentage(results, metric, measure);
        }
        if (metrics[metric].presentation == 'difference') {
          return renderDifference(results, metric, measure);
        }
        else {
          return renderNumber(results, metric, measure);
        }
      }
    };

    if (metric) {
    	if (results[metric]) {
        return renderAppropriateVisualization(results, metric, results[metric].measure);
      }
    }
    else {
    	// Iterate through all the keys (ar_1000, ar_100, etc.) to see whether we can render a value for each
      return Object.keys(results).map(function (metric) {
        // If we know how to render this kind of metric
        if (metrics[metric]) {
          // For now, only render absolute-kind of metrics
          if (!comparisonResults) {
          	if (metrics[metric].kind == 'absolute') {
          		return renderAppropriateVisualization(results, metric, results[metric].measure);
            }
            else if (metrics[metric].kind == 'relative') {
            	return renderAppropriateVisualization(results, metric, results[metric].measure);
            }
          }
        }
      });
    }
  },

  renderNumber: function(results, metric, measure) {
    var metrics = this.props.data.metrics;
    var data = results[metric];

    return (
      React.createElement("div", null, 
        React.createElement("small", null, metrics[metric].name_short), React.createElement("br", null), 
        React.createElement("strong", null, data.value.value), " ", metric == 'ar_100' && React.createElement("span", {className: "light"}, "of 100 people", React.createElement("br", null)), " ", metric == 'ar_1000' && React.createElement("span", {className: "light"}, "of 1000 people", React.createElement("br", null)), 
        data.value.value_ci_low && data.value.value_ci_high &&
          React.createElement("span", null, "(", data.value.value_ci_low, " to ", data.value.value_ci_high, ")")
        
      )
    );
  },

  renderPercentage: function(results, metric, measure) {
    var metrics = this.props.data.metrics;
    var data = results[metric];

    return (
      React.createElement("div", null, 
        results.parts && React.createElement("span", null, results.parts.join(' + '), React.createElement("br", null)), 
        React.createElement("small", null, metrics[metric].name_short), React.createElement("br", null), 
        React.createElement("strong", null, Math.round(data.value.value * 100) + '%'), React.createElement("br", null), 
        data.value.value_ci_low && data.value.value_ci_high &&
          React.createElement("span", null, "(", Math.round(data.value.value_ci_low * 100) + '%', " to ", Math.round(data.value.value_ci_high * 100) + '%', ")")
        
      )
    );
  },

  renderAbsoluteRisk: function(results, metric, measure, comparisonResults) {
    var measures = this.props.data.measures;

    var measure = results[metric].measure;
    var data = results[metric].value;

    var baseline = comparisonResults ? comparisonResults[metric].value.value : null;

    return (
      React.createElement("div", null, 
        React.createElement("strong", null, data.value && (metric == 'ar_1000' ? Math.floor(data.value * 0.1) : data.value)), " ", React.createElement("span", {className: "light"}, "of 100 people"), 
        React.createElement(AbsoluteFrequency, {frequency: data.value, metric: metric, denominator: 100, breakpoint: 10, baseline: baseline})
      )
    );
  },

  renderDifference: function(results, metric, measure) {
    var measures = this.props.data.measures;
    var metrics = this.props.data.metrics;

    var measure = results[metric].measure;
    var data = results[metric].value;

    return (
      React.createElement("div", null, 
        results.parts && React.createElement("span", null, results.parts.join(' + '), React.createElement("br", null)), 
        React.createElement("span", {className: "light"}, "Outcome: ", measures[measure].name_friendly), React.createElement("br", null), 
        React.createElement("small", null, metrics[metric].name_short), React.createElement("br", null), 
        data.value && React.createElement(Difference, {value: data.value, metric: metric}), 
        data.value_ci_low && data.value_ci_high &&
          React.createElement("span", null, "(", data.value_ci_low, " to ", data.value_ci_high, ")")
        
      )
    );
  },

  getDataByTag: function(tags, data) {
    var dataByTag = JSON.parse(JSON.stringify(tags));

    // Each tag (pain, function, etc.)
    Object.keys(tags).map(function (tag) {
      // Each source (sheet of data)
      Object.keys(data).map(function (source) {
        // Each entry in the source data (line of sheet)
        data[source].map(function (entry) {
          // Entry records an outcome in a measure that is associated with one of the tags?
          // e.g. tags['pain']['patient_pain'] or ['improvement']['acr_50']
          if (tags[tag][entry.measure]) {
            // Create a place for data about each measure
            dataByTag[tag][entry.measure] === true && (dataByTag[tag][entry.measure] = {});
            !dataByTag[tag][entry.measure]['data'] && (dataByTag[tag][entry.measure]['data'] = []);

            dataByTag[tag][entry.measure]['data'].push(entry);
          }
        });
      });
    });

    return dataByTag;
  },

  getDurationAsWeeks: function(duration) {
		// Should average to get common duration? Or use one end of range?
		// i.e. if 4 to 12 weeks, use 4, 12, or 8?

		if (duration.interval == 'month') {
			return duration.low * 4;
		}
		else if (duration.interval == 'week') {
			return duration.low;
		}
	},

  groupEntriesByDuration: function(entries, boundary) {
  	var getDurationAsWeeks = this.getDurationAsWeeks;

  	var entriesByDuration = {};

  	Object.keys(entries).forEach(function (entry) {
  		var currentEntry = entries[entry];

  		if (currentEntry.duration.low) {
  			var numberOfWeeks = getDurationAsWeeks(currentEntry.duration);

  			if (!entriesByDuration[numberOfWeeks]) {
  				entriesByDuration[numberOfWeeks] = [];
  			}
  			entriesByDuration[numberOfWeeks].push(currentEntry);
  		}
  	});

  	return entriesByDuration;
  },

  renderDataByMeasure: function(selectedMeasure) {
    var measures = this.props.data.measures;
    var renderEntry = this.renderEntry;

    var renderRelativeRiskComparison = function(entries, measure) {
      var sources = {};

      Object.keys(entries).map(function (key) {
        var entry = entries[key];

        if (entry.which == 'comparison') {
          if (!sources[entry.comparison.parts]) {
            sources[entry.comparison.parts] = {};
            sources[entry.comparison.parts]['items'] = [];
          }
          sources[entry.comparison.parts]['baseline'] = entry.comparison;

          // Check to see that we have relative risk
          if (entry.intervention.rr) {
            sources[entry.comparison.parts].items.push(entry.intervention);
          }
        }
      });

      return Object.keys(sources).map(function (comparison) {
        if (sources[comparison].items.length > 1) {
          return (
            React.createElement("div", {className: "visualization-rr"}, 
              React.createElement(RelativeRiskComparison, {
                  baseline: sources[comparison].baseline, 
                items: sources[comparison].items, 
                measure: measure})
            )
          );
        }
      })
    };

    var renderRiskRelativeToBaselineComparison = function(entries, measure) {
      var sources = {};

      Object.keys(entries).map(function (key) {
        var entry = entries[key];

        if (entry.which == 'comparison') {
          if (!sources[entry.comparison.parts]) {
            sources[entry.comparison.parts] = {};
            sources[entry.comparison.parts]['items'] = [];
          }
          sources[entry.comparison.parts]['comparison'] = entry.comparison;

          // Check to see that we have relative risk
          if (entry.intervention.rr) {
            sources[entry.comparison.parts].items.push(entry.intervention);
          }
        }
      });

      return Object.keys(sources).map(function (comparison) {
        if (sources[comparison].items.length > 1) {
          return (
            React.createElement("div", {className: "visualization-rr"}, 
              React.createElement(RiskRelativeToBaseline, {
                comparison: sources[comparison].comparison, 
                items: sources[comparison].items, 
                measure: measure, 
                measures: measures})
            )
          );
        }
      })
    };

    var dataByTag = this.props.dataByTag;
    var measure = selectedMeasure;
    var tag = this.props.selectedTag;
    var measureData = dataByTag[tag][selectedMeasure].data;

    if (measureData) {
      var medications = this.props.medications;
      var disabledMedications = this.props.disabledMedications;
      var entries = get.filterEntriesByMedication(get.getEntriesForMeasure(measureData), medications, disabledMedications);

      return (
        React.createElement("div", {key: measure}, 
          renderRiskRelativeToBaselineComparison(entries, measure)
        )
      );
    }
  },

  render: function() {
    var cx = React.addons.classSet;

    var classes = cx({
      'processing': true,
      'results': true
    });

    var selectedMeasure = this.props.selectedMeasure;
    
    return (
      React.createElement("div", {className: classes}, 
        selectedMeasure !== null && this.renderDataByMeasure(selectedMeasure)
      )
    );
  }
});

module.exports = OutcomeRelativeComparison;
},{"../data/get.js":30,"./visualizations/AbsoluteFrequency.jsx":18,"./visualizations/Difference.jsx":20,"./visualizations/GradeQuality.jsx":21,"./visualizations/Intervention.jsx":22,"./visualizations/Population.jsx":23,"./visualizations/RelativeRiskComparison.jsx":24,"./visualizations/RiskRelativeToBaseline.jsx":25,"./visualizations/Source.jsx":26,"lodash":"lodash","react/addons":"react/addons"}],7:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react/addons')
var _ = require('lodash')

// Data
var get = require('../data/get.js')

var AbsoluteFrequency = require('./visualizations/AbsoluteFrequency.jsx')
var Difference = require('./visualizations/Difference.jsx')
var GradeQuality = require('./visualizations/GradeQuality.jsx')
var Intervention = require('./visualizations/Intervention.jsx')
var Population = require('./visualizations/Population.jsx')
var RelativeRiskComparison = require('./visualizations/RelativeRiskComparison.jsx')
var RiskRelativeToBaseline = require('./visualizations/RiskRelativeToBaseline.jsx')
var Source = require('./visualizations/Source.jsx')

// Outcome timeline test

var OutcomeTimeline = React.createClass({displayName: "OutcomeTimeline",
	propTypes: {
    data: React.PropTypes.object.isRequired,
		disabledMedications: React.PropTypes.object,
    medications: React.PropTypes.array.isRequired
	},

  getInitialState: function() {
    return {
      keyMedication: null
    }
  },

  componentWillReceiveProps: function() {
    this.setState({
      keyMedication: null
    })
  },

  renderDataBySource: function(data) {
    Object.keys(data).map(function (source) {
      return (
        React.createElement("section", {className: "data"}, 
          React.createElement("h2", null, source, " data"), 
          React.createElement("ul", null, 
            data[source].map(function (entry, i) {
              return (
                React.createElement("li", {key: i}, 
                  React.createElement("h3", null, i), 
                  React.createElement("p", null, entry.which), 
                  React.createElement("div", null, 
                    React.createElement("ul", null, 
                      Object.keys(entry).map(function (key, i) {
                        return (
                          React.createElement("li", {key: i}, 
                            React.createElement("small", null, key), 
                            entry[key]
                          )
                        )
                      })
                    )
                  )
                )
              )
            })
          )
        )
      )
    })
  },

  renderFollowUpTime: function(duration, measure) {
    var low = duration.low
    var high = duration.high
    var interval = duration.interval

    (low && !high) && (high = low)
    (!low && high) && (low = high)

    var durationString = low == high ? low : low + ' to ' + high
    var intervalString = low > 1 ? interval + 's' : interval

    return (
      React.createElement("div", null, 
        React.createElement("strong", null, durationString, " ", intervalString), React.createElement("br", null), 
        React.createElement("span", {className: "light"}, "Researchers looked at ", measure ? measure : 'this', " ", durationString, " ", intervalString, " after people started treatment.")
      )
    )
  },

  renderValue: function(results, metric, comparisonResults) {
    // results = the data/finding, passed as part of an entry as population / intervention / comparison
    // metric (optional) = the preferred metric to render. often helpful if a specific metric is required. otherwise there's logic to render all of them.
    // comparisonResults = a pair dataset used for relative comparisons, i.e. the "comparison" to an intervention
    // preferredKind = what kind of value to show — a difference/comparison…

    var grades = this.props.data.grades
    var measures = this.props.data.measures
    var metrics = this.props.data.metrics
    var tags = this.props.data.tags
    var selectedTag = this.props.data.selectedTag

    var renderAbsoluteRisk = this.renderAbsoluteRisk
    var renderDifference = this.renderDifference
    var renderPercentage = this.renderPercentage
    var renderNumber = this.renderNumber

    var renderAppropriateVisualization = function(results, metric, measure) {
      if (metrics[metric]) {
        if (metrics[metric].presentation == 'frequency') {
          return renderAbsoluteRisk(results, metric, measure, comparisonResults)
        }
        if (metrics[metric].presentation == 'percentage') {
          return renderPercentage(results, metric, measure)
        }
        if (metrics[metric].presentation == 'difference') {
          return renderDifference(results, metric, measure)
        }
        else {
          return renderNumber(results, metric, measure)
        }
      }
    }

    if (metric) {
    	if (results[metric]) {
        return renderAppropriateVisualization(results, metric, results[metric].measure)
      }
    }
    else {
      // Prefer an ar_100/ar_1000, but don't render other things
      if (results['ar_100']) {
        return renderAppropriateVisualization(results, 'ar_100', results['ar_100'].measure)
      }
      if (results['ar_1000']) {
        return renderAppropriateVisualization(results, 'ar_1000', results['ar_1000'].measure)
      }
    	// Otherwise terate through all the keys (ar_1000, ar_100, etc.) to see whether we can render a value for each
      return Object.keys(results).map(function (metric) {
        // console.log('looping')
        // If we know how to render this kind of metric
        if (metrics[metric]) {
          // For now, only render absolute-kind of metrics
          if (!comparisonResults) {
          	if (metrics[metric].kind == 'absolute') {
          		return renderAppropriateVisualization(results, metric, results[metric].measure)
            }
            else if (metrics[metric].kind == 'relative') {
            	return renderAppropriateVisualization(results, metric, results[metric].measure)
            }
          }
        }
      })
    }
  },

  renderNumber: function(results, metric, measure) {
    var metrics = this.props.data.metrics
    var data = results[metric]

    return (
      React.createElement("div", null, 
        React.createElement("small", null, metrics[metric].name_short), React.createElement("br", null), 
        React.createElement("strong", null, data.value.value), " ", metric == 'ar_100' && React.createElement("span", {className: "light"}, "of 100 people", React.createElement("br", null)), " ", metric == 'ar_1000' && React.createElement("span", {className: "light"}, "of 1000 people", React.createElement("br", null)), 
        data.value.value_ci_low && data.value.value_ci_high &&
          React.createElement("span", null, "(", data.value.value_ci_low, " to ", data.value.value_ci_high, ")")
        
      )
    )
  },

  renderPercentage: function(results, metric, measure) {
    var metrics = this.props.data.metrics
    var data = results[metric]

    return (
      React.createElement("div", null, 
        results.parts && React.createElement("span", null, results.parts.join(' + '), React.createElement("br", null)), 
        React.createElement("small", null, metrics[metric].name_short), React.createElement("br", null), 
        React.createElement("strong", null, Math.round(data.value.value * 100) + '%'), React.createElement("br", null), 
        data.value.value_ci_low && data.value.value_ci_high &&
          React.createElement("span", null, "(", Math.round(data.value.value_ci_low * 100) + '%', " to ", Math.round(data.value.value_ci_high * 100) + '%', ")")
        
      )
    )
  },

  renderAbsoluteRisk: function(results, metric, measure, comparisonResults) {
    var measures = this.props.data.measures

    var measure = results[metric].measure
    var data = results[metric].value

    var baseline = comparisonResults ? comparisonResults[metric].value.value : null

    return (
      React.createElement("div", null, 
        React.createElement("strong", null, data.value && (metric == 'ar_1000' ? Math.floor(data.value * 0.1) : data.value)), " ", React.createElement("span", {className: "light"}, "of 100 people"), 
        React.createElement(AbsoluteFrequency, {frequency: data.value, metric: metric, denominator: 100, breakpoint: 10, baseline: baseline})
      )
    )
  },

  renderDifference: function(results, metric, measure) {
    var measures = this.props.data.measures
    var metrics = this.props.data.metrics

    var measure = results[metric].measure
    var data = results[metric].value

    return (
      React.createElement("div", null, 
        results.parts && React.createElement("span", null, results.parts.join(' + '), React.createElement("br", null)), 
        React.createElement("span", {className: "light"}, "Outcome: ", measures[measure].name_friendly), React.createElement("br", null), 
        React.createElement("small", null, metrics[metric].name_short), React.createElement("br", null), 
        data.value && React.createElement(Difference, {value: data.value, metric: metric}), 
        data.value_ci_low && data.value_ci_high &&
          React.createElement("span", null, "(", data.value_ci_low, " to ", data.value_ci_high, ")")
        
      )
    )
  },

  getDataByTag: function(tags, data) {
    var dataByTag = JSON.parse(JSON.stringify(tags))

    // Each tag (pain, function, etc.)
    Object.keys(tags).map(function (tag) {
      // Each source (sheet of data)
      Object.keys(data).map(function (source) {
        // Each entry in the source data (line of sheet)
        data[source].map(function (entry) {
          // Entry records an outcome in a measure that is associated with one of the tags?
          // e.g. tags['pain']['patient_pain'] or ['improvement']['acr_50']
          if (tags[tag][entry.measure]) {
            // Create a place for data about each measure
            dataByTag[tag][entry.measure] === true && (dataByTag[tag][entry.measure] = {})
            !dataByTag[tag][entry.measure]['data'] && (dataByTag[tag][entry.measure]['data'] = [])

            dataByTag[tag][entry.measure]['data'].push(entry)
          }
        })
      })
    })

    return dataByTag
  },

  getDurationAsWeeks: function(duration) {
		// Should average to get common duration? Or use one end of range?
		// i.e. if 4 to 12 weeks, use 4, 12, or 8?

    if (duration.high) {
      if (duration.interval == 'year') {
        return duration.high * 52
      }
      if (duration.interval == 'month') {
        return duration.high * 4
      }
      if (duration.interval == 'week') {
        return duration.high
      }
    }
    else if (duration.low) {
      if (duration.interval == 'year') {
        return duration.low * 52
      }
      if (duration.interval == 'month') {
        return duration.low * 4
      }
      if (duration.interval == 'week') {
        return duration.low
      }
    }
    return ('an unknown number of')
	},

  getDurationsFromEntries: function(entries) {
    var getDurationAsWeeks = this.getDurationAsWeeks
    var durations = {}
    _.each(entries, function (entry) {
      if (entry.duration) {
        var numberOfWeeks = getDurationAsWeeks(entry.duration)
        durations[numberOfWeeks] = true
      }
    })
    return _.keys(durations)
  },

  getInterventionAsString: function(entry) {
    if (entry.intervention) {
      return entry.intervention.parts.join(' + ')
    }
  },

  getInterventionsFromEntries: function(entries) {
    var getInterventionAsString = this.getInterventionAsString
    var interventions = {}
    _.each(entries, function (entry) {
      if (entry.intervention) {
        interventions[getInterventionAsString(entry)] = entry
      }
    })
    return interventions
  },

  getWhichesFromEntries: function(entries) {
    var getPopulationAsString = this.getPopulationAsString
    var getInterventionAsString = this.getInterventionAsString

    var whiches = {}
    _.each(entries, function (entry) {
      if (entry.which == 'population' && entry.population) {
        whiches[getPopulationAsString(entry)] = entry
      }
      if (entry.which == 'intervention' && entry.intervention) {
        whiches[getInterventionAsString(entry)] = entry
      }
    })
    return whiches
  },

  groupEntriesByIntervention: function(entries) {
    var getInterventionAsString = this.getInterventionAsString
    return _.groupBy(entries, function (entry) {
      return getInterventionAsString(entry)
    })
  },

  getPopulationsFromEntries: function(entries) {
    var getPopulationAsString = this.getPopulationAsString
    var populations = {}
    _.each(entries, function (entry) {
      if (entry.population) {
        populations[getPopulationAsString(entry)] = entry
      }
    })
    return populations
  },

  getPopulationAsString: function(entry) {
    if (entry.population) {
      return entry.population.parts.join(' + ')
    }
  },

  groupEntriesByPopulation: function(entries) {
    var getPopulationAsString = this.getPopulationAsString
    return _.groupBy(entries, function (entry) {
      return getPopulationAsString(entry)
    })
  },

  getWhichAsString: function(entry) {
    var getPopulationAsString = this.getPopulationAsString
    var getInterventionAsString = this.getInterventionAsString

    if (entry.which == 'population' || entry.population) {
      return getPopulationAsString(entry)
    }
    if (entry.which == 'intervention' || entry.intervention) {
      return getInterventionAsString(entry)
    }
  },

  groupEntriesByWhich: function(entries) {
    var getWhichAsString = this.getWhichAsString
    return _.groupBy(entries, function (entry) {
      return getWhichAsString(entry)
    })
  },

  groupEntriesByDuration: function(entries) {
    var getDurationAsWeeks = this.getDurationAsWeeks
    return _.groupBy(entries, function (entry) {
      return getDurationAsWeeks(entry.duration)
    })
  },

  groupEntriesByInterventionAndDuration: function(entries) {
    var groupEntriesByDuration = this.groupEntriesByDuration
    var groupEntriesByIntervention = this.groupEntriesByIntervention
  
    var entriesByInterventionAndDuration = {}
    var entriesByIntervention = groupEntriesByIntervention(entries)
    _.each(entriesByIntervention, function (val, key) {
      var byDuration = groupEntriesByDuration(val)
      entriesByInterventionAndDuration[key] = byDuration
    })

    return entriesByInterventionAndDuration
  },

  groupEntriesByWhichAndDuration: function(entries) {
    var groupEntriesByDuration = this.groupEntriesByDuration
    var groupEntriesByWhich = this.groupEntriesByWhich
  
    var entriesByWhichAndDuration = {}
    var entriesByWhich = groupEntriesByWhich(entries)
    _.each(entriesByWhich, function (val, key) {
      var byDuration = groupEntriesByDuration(val)
      entriesByWhichAndDuration[key] = byDuration
    })

    return entriesByWhichAndDuration
  },

  // groupEntriesByDuration: function(entries, boundary) {
  // 	var getDurationAsWeeks = this.getDurationAsWeeks

  // 	var entriesByDuration = {}

  // 	Object.keys(entries).forEach(function (entry) {
  // 		var currentEntry = entries[entry]

  // 		if (currentEntry.duration) {
  // 			var numberOfWeeks = getDurationAsWeeks(currentEntry.duration)

  // 			if (!entriesByDuration[numberOfWeeks]) {
  // 				entriesByDuration[numberOfWeeks] = []
  // 			}
  // 			entriesByDuration[numberOfWeeks].push(currentEntry)
  // 		}
  // 	})
  // 	return entriesByDuration
  // },

  renderTimelineByMeasure: function(measures, direction) {
    var cx = React.addons.classSet

    var measureMap = this.props.data.measures
    var grades = this.props.data.grades
    var getInterventionAsString = this.getInterventionAsString
    var getDurationAsWeeks = this.getDurationAsWeeks
    var groupEntriesByDuration = this.groupEntriesByDuration
    var renderEntry = this.renderEntry
    var renderValue = this.renderValue

    var keyMedication = this.state.keyMedication

    var renderRelativeRiskComparison = function(entries, measure) {
      var sources = {}

      Object.keys(entries).map(function (key) {
        var entry = entries[key]

        if (entry.which == 'comparison') {
          if (!sources[entry.comparison.parts]) {
            sources[entry.comparison.parts] = {}
            sources[entry.comparison.parts]['items'] = []
          }
          sources[entry.comparison.parts]['baseline'] = entry.comparison

          // Check to see that we have relative risk
          if (entry.intervention.rr) {
            sources[entry.comparison.parts].items.push(entry.intervention)
          }
        }
      })

      return Object.keys(sources).map(function (comparison) {
        if (sources[comparison].items.length > 1) {
          return (
            React.createElement("ul", {className: "visualization-rr"}, 
              React.createElement("li", null, 
                React.createElement("h3", null, React.createElement("strong", null, "relative risk"), " › ", measureMap[measure].name_friendly)
              ), 
              React.createElement("li", null, 
                React.createElement(RelativeRiskComparison, {
                  baseline: sources[comparison].baseline, 
                  items: sources[comparison].items, 
                  measure: measure})
              )
            )
          )
        }
      })
    }

    var renderRiskRelativeToBaselineComparison = function(entries, measure) {
      var sources = {}

      Object.keys(entries).map(function (key) {
        var entry = entries[key]

        if (entry.which == 'comparison') {
          if (!sources[entry.comparison.parts]) {
            sources[entry.comparison.parts] = {}
            sources[entry.comparison.parts]['items'] = []
          }
          sources[entry.comparison.parts]['comparison'] = entry.comparison

          // Check to see that we have relative risk
          if (entry.intervention.rr) {
            sources[entry.comparison.parts].items.push(entry.intervention)
          }
        }
      })

      return Object.keys(sources).map(function (comparison) {
        if (sources[comparison].items.length > 1) {
          return (
            React.createElement("ul", {className: "visualization-rr"}, 
              React.createElement("li", null, 
                React.createElement("h3", null, React.createElement("strong", null, "relative risk"), " › ", measureMap[measure].name_friendly)
              ), 
              React.createElement("li", null, 
                React.createElement(RiskRelativeToBaseline, {
                  comparison: sources[comparison].comparison, 
                  items: sources[comparison].items, 
                  measure: measure, 
                  measures: measureMap})
              )
            )
          )
        }
      })
    }

    var measure = this.props.selectedMeasure
    var measureData = measure && measures[measure].data
    !direction && (direction = 'horizontal')

    // Render a timeline
    if (measure && measureData) {
      // console.log('rendering a timeline')

      var medications = this.props.medications
      var disabledMedications = this.props.disabledMedications

      // Vertical
      if (direction == 'vertical') {
        var durations = groupEntriesByDuration(get.filterEntriesByMedication(get.getEntriesForMeasure(measureData), medications, disabledMedications))

        return (
        	React.createElement("div", {key: 'outcome-timeline' + measure}, 
          	React.createElement("section", {className: "outcome-timeline"}, 
  		      	React.createElement("section", null, 
  		      		React.createElement("div", {className: "moment"}, 
  		      			React.createElement("section", null, 
  		        			React.createElement("div", {className: "title"}), 
  		        			React.createElement("div", {className: "line"}, 
  		        				React.createElement("div", {className: "bar"})
  		        			), 
  		        			React.createElement("div", {className: "description"}, "Treatment")
  		        		)
  		      		), 
  		      		React.createElement("div", {className: "moment-data"}, 
  		      			React.createElement("section", null, 
  			      			Object.keys(durations).map(function (numberOfWeeks) {
  				        		var entries = durations[numberOfWeeks]

  					        	return entries.map(function (entry, i) {
  					      			if (entry.intervention) {
  					      				return (
  							         		React.createElement("div", {key: i}, 
                              React.createElement(Intervention, {intervention: entry.intervention.parts.join(' + '), dosage: entry.intervention.dosage}), 
                              entry.comparison &&
                              	React.createElement("div", {className: "light"}, 
                              		"vs.", React.createElement("br", null), 
                              		entry.comparison.parts.join(' + ')
                              	), 
                              
                              React.createElement(Source, {source: entry.source, kind: entry.kind}), 
                              React.createElement(GradeQuality, {grade: entry.quality, gradeMap: grades})
                            )
  							         	)
  							        }
  						       	})
  									})
  								)
  			      	)
  			      ), 

              Object.keys(durations).map(function (timepoint) {
  			      	return (
  			      		React.createElement("section", {key: measure + timepoint}, 
  				      		React.createElement("div", {className: "moment"}, 
  				      			React.createElement("section", null, 
  				        			React.createElement("div", {className: "title"}, React.createElement("strong", null, "at ", timepoint, " weeks")), 
  				        			React.createElement("div", {className: "line"}, 
  				        				React.createElement("div", {className: "ball"})
  				        			), 
  				        			React.createElement("div", {className: "description"}, 
  				        				React.createElement("strong", null, measureMap[measure].name_short), " ", measureMap[measure].name_friendly, 
  					              measureMap[measure].description && React.createElement("p", null, measureMap[measure].description)
  				        			)
  				        		)
  				      		), 
  				      		React.createElement("div", {className: "moment-data"}, 
  							      React.createElement("section", null, 
  					      			Object.keys(durations).map(function (numberOfWeeks) {
  						        		var entries = durations[numberOfWeeks]
  						        		return entries.map(function (entry, i) {
                            if (entry.intervention && (getDurationAsWeeks(entry.duration) == timepoint)) {
  								      			return (
  									         		React.createElement("div", {key: i}, 
  									         			/* entry.intervention.ar_1000 ? renderValue(entry.intervention, 'ar_1000') : renderValue(entry.intervention, 'ar_100') */
                                  renderValue(entry.intervention)
  									         		)
  									         	)
  									        }
  									        else if (entry.intervention) {
  									        	return (React.createElement("div", {key: i}))
  									        }
  									      })
  											})
  										)
  							    )
  				      	)
  				      )
  						})
  					)
  		    )
  		  )
      }
      
      // Horizontal
      var entries = get.filterEntriesByMedication(get.getEntriesForMeasure(measureData), medications, disabledMedications)
      var populationEntries = get.filterEntriesToPopulationOnly(get.getEntriesForMeasure(measureData))

      if (entries.length == 0) {
        entries = populationEntries
        var entriesByDuration = groupEntriesByDuration(entries)
        var entriesByIntervention = this.groupEntriesByWhich(entries)
        var durations = this.getDurationsFromEntries(entries)
        var interventions = this.getWhichesFromEntries(entries)
        var interventionsSorted = _.keys(interventions).sort()
        var entriesByInterventionAndDuration = this.groupEntriesByWhichAndDuration(entries)
      }
      else {
        var entriesByDuration = groupEntriesByDuration(entries)
        var entriesByIntervention = this.groupEntriesByWhich(entries)
        var durations = this.getDurationsFromEntries(entries)
        var interventions = this.getInterventionsFromEntries(entries)
        var interventionsSorted = _.keys(interventions).sort()
        var entriesByInterventionAndDuration = this.groupEntriesByWhichAndDuration(entries)
      }

      // console.log('------------GROUPED ENTRIES------------')
      // _.each(entriesByInterventionAndDuration, function(val, key) {
      //   _.each(val, function(val, key) {
      //     console.log(val[0].intervention.parts.join(' + '), val[0].duration)
      //   })
      // })

      // console.log('------------ORIGINAL ENTRIES-------------')
      // _.each(entries, function(val, key) {
      //   console.log(val.intervention.parts.join(' + '), val.duration)
      // })

      // console.log('------------DURATIONS------------')
      // console.log(durations)

      // console.log(entriesByInterventionAndDuration)

      // console.log(interventionsSorted)

      var handleMomentDataCellHover = this.handleMomentDataCellHover

      return (
        React.createElement("div", {key: 'outcome-timeline' + measure}, 
          React.createElement("section", {className: "measure-description"}, 
            React.createElement("h3", null, measureMap[measure].name_long), 
            React.createElement("h4", null, "Researchers measure this and call it ", React.createElement("strong", null, measureMap[measure].name_short), ": ", measureMap[measure].description && measureMap[measure].description), 
            React.createElement("h5", null, 
              React.createElement("strong", null, "About this timeline."), React.createElement("br", null), 
              "When researchers study RA medications, they look at how people are doing a certain number of weeks after starting treatment. Each study checks in with people at a different time. This timeline shows the best guess of each treatment’s effects at whatever time the researchers followed up."
            )
          ), 

          React.createElement("section", {className: "outcome-timeline horizontal"}, 
            React.createElement("section", {className: "t-row timeline-header"}, 
              React.createElement("div", {className: "t-cell moment"}, 
                React.createElement("section", null, 
                  React.createElement("div", {className: "title strong"}, "Treatment group"), 
                  React.createElement("div", {className: "description"}, "This is the treatment or group of people that was studied. Sometimes it’s one medication, sometimes a combination. There isn’t always information about the dose.")
                )
              ), 
              durations.map(function (timepoint) {
                return (
                  React.createElement("div", {key: measure + timepoint, className: "t-cell moment"}, 
                    React.createElement("section", null, 
                      React.createElement("div", {className: "ball"}), 
                      React.createElement("div", {className: "title strong"}, "at ", timepoint, " weeks"), 
                      React.createElement("div", {className: "description"}, "This is the best guess of ", measureMap[measure].name_friendly, " at this time after starting treatment")
                    )
                  )
                )
              })
            ), 

            /* TODO: Separately and specially handle population. */

            _.map(interventionsSorted, function (intervention) {
              var entry = interventions[intervention];
              var rowClasses = cx({
                't-row': true,
                'active': keyMedication == intervention
              })
              return (
                React.createElement("section", {key: intervention, className: rowClasses}, 
                  React.createElement("div", {className: "t-cell subject"}, 
                    entry.which != 'population' && React.createElement(Intervention, {intervention: entry.intervention.parts.join(' + '), dosage: entry.intervention.dosage}), 
                    entry.which == 'population' && React.createElement(Population, {population: entry.population.parts.join(' + '), dosage: entry.dosage}), 
                    entry.comparison &&
                      {/*<div className='pull-tab light'>
                        vs.<br />
                        {entry.comparison.parts.join(' + ')}
                      </div>
                      TODO: display comparison appropriately */}, 
                    
                    React.createElement(Source, {source: entry.source, kind: entry.kind}), React.createElement("br", null), 
                    React.createElement(GradeQuality, {grade: entry.quality, gradeMap: grades})
                  ), 
                  durations.map(function (timepoint, i) {
                    if (entriesByInterventionAndDuration[intervention][timepoint]) {
                      var entry = entriesByInterventionAndDuration[intervention][timepoint][0]
                      if (entry.which != 'population' && entry.intervention) {
                        return (
                          React.createElement("div", {
                            key: intervention + timepoint, 
                            className: "t-cell moment-data", 
                            onMouseEnter: handleMomentDataCellHover.bind(null, intervention)}, 
                              React.createElement("section", null, 
                                renderValue(entry.intervention)
                              )
                          )
                        )
                      }
                      if (entry.which == 'population') {
                        return (
                          React.createElement("div", {key: intervention + timepoint, className: "t-cell moment-data"}, 
                            React.createElement("section", null, 
                              renderValue(entry.population)
                            )
                          )
                        )
                      }
                    }
                    else {
                      return (
                        React.createElement("div", {key: intervention + timepoint, className: "t-cell moment"}, React.createElement("span", {className: 
"light"}, "--"))
                      )
                    }
                  })
                )
              )
            })
          )
        )
      )
	  }
    if (measure) {
      return (
        React.createElement("div", {key: 'outcome-timeline' + measure}, 
          React.createElement("section", {className: "measure-description"}, 
            React.createElement("h3", null, measureMap[measure].name_long), 
            React.createElement("h4", null, "Researchers measure this and call it ", React.createElement("strong", null, measureMap[measure].name_short), ": ", measureMap[measure].description && measureMap[measure].description), 
            React.createElement("h4", null, React.createElement("strong", null, "This prototype doesn’t have enough data in it yet to show information for the medications you’ve selected."))
          )
        )
      )
    }
  },

  handleMomentDataCellHover: function(medicationName) {
    this.setState({
      keyMedication: medicationName
    })
  },

  renderTimelineByTag: function(data, tags, tag) {
    var dataByTag = this.getDataByTag(tags, data)
    var tagDescriptions = this.props.data.tagDescriptions

    return (
			React.createElement("div", null, 
				this.renderTimelineByMeasure(dataByTag[tag])
	    )
		)
  },

  render: function() {
    var cx = React.addons.classSet

    // Medication filtering-related
    var medications = this.props.medications
    var preferences = this.props.preferences
    var risks = this.props.risks
    var risksFriendly = this.props.risksFriendly
    var disabledMedications = this.props.disabledMedications

    var classes = cx({
      'processing': true,
      'results': true
    })

    // Data
    var grades          = this.props.data.grades
    var measures        = this.props.data.measures
    var metrics         = this.props.data.metrics
    var tags            = this.props.data.tags
    var tagDescriptions = this.props.data.tagDescriptions
    var data            = this.props.data.data

    var selectedTag     = this.props.selectedTag

    return (
      React.createElement("div", {className: classes}, 
        selectedTag !== null && this.renderTimelineByTag(data, tags, selectedTag)
      )
    )
  }
})

module.exports = OutcomeTimeline
},{"../data/get.js":30,"./visualizations/AbsoluteFrequency.jsx":18,"./visualizations/Difference.jsx":20,"./visualizations/GradeQuality.jsx":21,"./visualizations/Intervention.jsx":22,"./visualizations/Population.jsx":23,"./visualizations/RelativeRiskComparison.jsx":24,"./visualizations/RiskRelativeToBaseline.jsx":25,"./visualizations/Source.jsx":26,"lodash":"lodash","react/addons":"react/addons"}],8:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react/addons');

// Data
var get = require('../data/get.js');
var medications = require('../data/medications.js');
var mockData = require('../data/mock.js');

var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;

var AbsoluteFrequency = require('./visualizations/AbsoluteFrequency.jsx');
var Difference = require('./visualizations/Difference.jsx');
var GradeQuality = require('./visualizations/GradeQuality.jsx');
var Intervention = require('./visualizations/Intervention.jsx');
var Population = require('./visualizations/Population.jsx');
var RelativeRiskComparison = require('./visualizations/RelativeRiskComparison.jsx');
var RiskRelativeToBaseline = require('./visualizations/RiskRelativeToBaseline.jsx');
var Source = require('./visualizations/Source.jsx');

// Processing / data processing tests

String.prototype.capitalizeFirstletter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

var getNumber = function(value) {
	if (!isNaN(parseFloat(value))) {
		return parseFloat(value);
	}
	return null;
};

var Processing = React.createClass({displayName: "Processing",

	componentDidUpdate: function() {
		// React.findDOMNode(this.refs['data']).innerHTML = JSON.stringify(this.tempData, undefined, 0);
		// React.findDOMNode(this.refs['grades']).innerHTML = JSON.stringify(this.tempGrades, undefined, 0);
		// React.findDOMNode(this.refs['metrics']).innerHTML = JSON.stringify(this.tempMetrics, undefined, 0);
		// React.findDOMNode(this.refs['measures']).innerHTML = JSON.stringify(this.tempMeasures, undefined, 0);
		// React.findDOMNode(this.refs['tags']).innerHTML = JSON.stringify(this.tempTags, undefined, 0);
	},

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
      data: {},
  		selectedTag: null,

  		// Medication filtering-related
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
    var instance = this;

    // Get tag descriptions
    var urlTagDescriptions = get.getSheetUrl(get.sheets.tagDescriptions);
    $.getJSON(urlTagDescriptions).done(function (data) {
      instance.setState({grades: get.processTagDescriptions(data)});
    });

    // Get measures & tags
    var urlMeasures = get.getSheetUrl(get.sheets.measures);
    $.getJSON(urlMeasures).done(function (data) {
      var newStateItems = get.processMeasures(data);
      instance.setState({
        measures: newStateItems.measures,
        tags: newStateItems.tags
      });
    });

    // Get metrics
    var urlMetrics = get.getSheetUrl(get.sheets.metrics);
    $.getJSON(urlMetrics).done(function (data) {
      instance.setState({metrics: get.processMetrics(data)});
    });

    // Get GRADE levels
    // var processGrades = this.processGrades;
    var urlGrades = get.getSheetUrl(get.sheets.grades);
    $.getJSON(urlGrades).done(function (data) {
      instance.setState({grades: get.processGrades(data)});
    });

    // Get tag descriptions
    var urlTagDescriptions = get.getSheetUrl(get.sheets.tagDescriptions);
    $.getJSON(urlTagDescriptions).done(function (data) {
      instance.setState({tagDescriptions: get.processTagDescriptions(data)});
    });

    // Get data
    Object.keys(get.sheets.data).forEach(function (source) {
      var url = get.getSheetUrl(get.sheets.data[source]);
      $.getJSON(url).done(function (data) {
        var existingData = instance.state.data;
        existingData[source] = get.processData(data);
        instance.setState({data: existingData});
      });
    });
  },

  renderDataBySource: function(data) {
    Object.keys(data).map(function (source) {
      return (
        React.createElement("section", {className: "data"}, 
          React.createElement("h2", null, source, " data"), 
          React.createElement("ul", null, 
            data[source].map(function (entry, i) {
              return (
                React.createElement("li", {key: i}, 
                  React.createElement("h3", null, i), 
                  React.createElement("p", null, entry.which), 
                  React.createElement("div", null, 
                    React.createElement("ul", null, 
                      Object.keys(entry).map(function (key, i) {
                        return (
                          React.createElement("li", {key: i}, 
                            React.createElement("small", null, key), 
                            entry[key]
                          )
                        );
                      })
                    )
                  )
                )
              );
            })
          )
        )
      );
    });
  },

  renderFollowUpTime: function(duration, measure) {
  	var low = duration.low;
  	var high = duration.high;
  	var interval = duration.interval;

  	(low && !high) && (high = low);
  	(!low && high) && (low = high);

  	var durationString = low == high ? low : low + ' to ' + high;
  	var intervalString = low > 1 ? interval + 's' : interval;

  	return (
  		React.createElement("div", null, 
  			React.createElement("strong", null, durationString, " ", intervalString), React.createElement("br", null), 
				React.createElement("span", {className: "light"}, "Researchers looked at ", measure ? measure : 'this', " ", durationString, " ", intervalString, " after people started treatment.")
			)
  	);
  },

  renderValue: function(results, metric, comparisonResults) {
  	var grades = this.state.grades;
    var measures = this.state.measures;
    var metrics = this.state.metrics;
    var tags = this.state.tags;
    var selectedTag = this.state.selectedTag;

    var renderAbsoluteRisk = this.renderAbsoluteRisk;
    var renderDifference = this.renderDifference;
    var renderPercentage = this.renderPercentage;
    var renderNumber = this.renderNumber;

    var renderAppropriateVisualization = function(results, metric, measure) {
    	if (metrics[metric]) {
	  		if (metrics[metric].presentation == 'frequency') {
	  			return renderAbsoluteRisk(results, metric, measure, comparisonResults);
	  		}
	  		if (metrics[metric].presentation == 'percentage') {
	    		return renderPercentage(results, metric, measure);
	    	}
	    	if (metrics[metric].presentation == 'difference') {
	    		return renderDifference(results, metric, measure);
	    	}
	  		else {
	  			return renderNumber(results, metric, measure);
	  		}
	  	}
    };

    if (metric) {
    	if (results[metric]) {
    		return renderAppropriateVisualization(results, metric, results[metric].measure);
	  	}
    }
    else {
	    return Object.keys(results).map(function (metric) {
	    	if (metrics[metric]) {
	    		return renderAppropriateVisualization(results, metric, results[metric].measure);
		  	}
	  	});
	  }
  },

  renderNumber: function(results, metric, measure) {
  	var metrics = this.state.metrics;
  	var data = results[metric];

  	return (
			React.createElement("div", null, 
	    	results.parts && React.createElement("span", null, results.parts.join(' + '), React.createElement("br", null)), 
	    	React.createElement("small", null, metrics[metric].name_short), React.createElement("br", null), 
	      React.createElement("strong", null, data.value.value), " ", metric == 'ar_100' && React.createElement("span", {className: "light"}, "of 100 people", React.createElement("br", null)), " ", metric == 'ar_1000' && React.createElement("span", {className: "light"}, "of 1000 people", React.createElement("br", null)), 
	      data.value.value_ci_low && data.value.value_ci_high &&
	      	React.createElement("span", null, "(", data.value.value_ci_low, " to ", data.value.value_ci_high, ")")
	      
	    )
		);
  },

  renderPercentage: function(results, metric, measure) {
  	var metrics = this.state.metrics;
  	var data = results[metric];

  	return (
  		React.createElement("div", null, 
	    	results.parts && React.createElement("span", null, results.parts.join(' + '), React.createElement("br", null)), 
	      React.createElement("small", null, metrics[metric].name_short), React.createElement("br", null), 
	      React.createElement("strong", null, Math.round(data.value.value * 100) + '%'), React.createElement("br", null), 
	      data.value.value_ci_low && data.value.value_ci_high &&
	      	React.createElement("span", null, "(", Math.round(data.value.value_ci_low * 100) + '%', " to ", Math.round(data.value.value_ci_high * 100) + '%', ")")
	      
	    )
  	);
  },

  renderAbsoluteRisk: function(results, metric, measure, comparisonResults) {
  	var measures = this.state.measures;

  	var measure = results[metric].measure;
  	var data = results[metric].value;

  	var baseline = comparisonResults ? comparisonResults[metric].value.value : null;

		return (
  		React.createElement("div", null, 
        results.parts && React.createElement("span", null, results.parts.join(' + '), React.createElement("br", null)), 
        React.createElement("span", {className: "light"}, "Outcome: ", measures[measure].name_short), React.createElement("br", null), 
        React.createElement("strong", null, data.value && data.value), " ", metric == 'ar_100' && React.createElement("span", {className: "light"}, "of 100 people"), " ", metric == 'ar_1000' && React.createElement("span", {className: "light"}, "of 1000 people"), 
        React.createElement(AbsoluteFrequency, {frequency: data.value, metric: metric, denominator: 100, breakpoint: 20, baseline: baseline}), 
        data.value_ci_low && data.value_ci_high &&
	      	React.createElement("span", null, "(", data.value_ci_low, " to ", data.value_ci_high, ")")
	      
      )
  	);
  },

  renderDifference: function(results, metric, measure) {
  	var measures = this.state.measures;
  	var metrics = this.state.metrics;

  	var measure = results[metric].measure;
  	var data = results[metric].value;

    return (
    	React.createElement("div", null, 
        results.parts && React.createElement("span", null, results.parts.join(' + '), React.createElement("br", null)), 
        React.createElement("span", {className: "light"}, "Outcome: ", measures[measure].name_friendly), React.createElement("br", null), 
        React.createElement("small", null, metrics[metric].name_short), React.createElement("br", null), 
        data.value && React.createElement(Difference, {value: data.value, metric: metric}), 
        data.value_ci_low && data.value_ci_high &&
          React.createElement("span", null, "(", data.value_ci_low, " to ", data.value_ci_high, ")")
        
      )
    );
  },

  getDataByTag: function(tags, data) {
  	var dataByTag = JSON.parse(JSON.stringify(tags));

    // Each tag (pain, function, etc.)
    Object.keys(tags).map(function (tag) {
      // Each source (sheet of data)
      Object.keys(data).map(function (source) {
        // Each entry in the source data (line of sheet)
        data[source].map(function (entry) {
          // Entry records an outcome in a measure that is associated with one of the tags?
          // e.g. tags['pain']['patient_pain'] or ['improvement']['acr_50']
          if (tags[tag][entry.measure]) {
            // Create a place for data about each measure
            dataByTag[tag][entry.measure] === true && (dataByTag[tag][entry.measure] = {});
            !dataByTag[tag][entry.measure]['data'] && (dataByTag[tag][entry.measure]['data'] = []);

            dataByTag[tag][entry.measure]['data'].push(entry);
          }
        });
      });
    });

    return dataByTag;
  },

  getEntriesForMeasure: function(entries) {
  	/*
				PROCESSING DIFFERENT KINDS OF 'FINDINGS', PIVOTED AROUND A MEASURE.

				Here data are reprojected around a measure—for example, ACR 50 (50% improvement
				in RA symptoms). We iterate over the rows that show 'acr_50' as the 'measure', and
				reorganize the data into a sensible chunk.

				Each measure here is used to describe an outcome, a data point from research:
				the result of a study or an estimate of effect. It may be a way of describing what was observed
				when a treatment was administered, or a placebo, what happened to a population of people
				over time, an estimate of effect derived as a result of an analysis of multiple studies.

				Importantly, each row describes a certain MEASURE (outcome) using a certain METRIC.
				Multiple rows might be used to report the *same measure* with *multiple metrics*.
				For example, the same outcome might be recorded as a frequency, as a percent change,
				and as a relative risk ratio compared to some baseline.

				For example:

					ROW 1
					- measure: 'acr_50'
					- metric: 'ar_100' (absolute risk out of 100, a.k.a. frequency)
					- value: '23'

					ROW 2
					- measure: 'acr_50'
					- metric: 'abs_difference' (absolute change or difference, a.k.a. absolute treatment benefit)
					- value: '0.15'

					ROW 3
					- measure: 'acr_50'
					- metric: 'rr'
					- value: '3.0'

				With three rows referring to the same measure, we need a way of knowing what "finding"
				we're looking at, so we can group all the data together, and pick and choose the metrics
				we need for our UI. So, each row also has information about the treatment, population, comparison,
				and other information necessary to know what finding we're talking about. In effect, each row
				contains almost all the information necessary to 'recreate' a minimal understanding of the
				experiment or study that produced the result. For example, the row might

					ROW 1
					- intervention: 'methotrexate'
					- comparison: 'placebo'
					- measure: 'acr_50'
					- metric: 'ar_100' (absolute risk out of 100, a.k.a. frequency)
					- value: '23'

					ROW 2
					- intervention: 'methotrexate'
					- comparison: 'placebo'
					- measure: 'acr_50'
					- metric: 'abs_difference' (absolute change or difference, a.k.a. absolute treatment benefit)
					- value: '0.15'

					ROW 3
					- intervention: 'methotrexate'
					- comparison: 'placebo'
					- measure: 'acr_50'
					- metric: 'rr'
					- value: '3.0'

				The 'intervention' and 'comparison' fields (columns in the spreadsheet) describe (basically)
				the treatment that was administered and what comparison was made. There are other fields that
				elaborate on the treatment and comparison, but effectively, here's what we can learn from
				the example above:

					- Methotrexate was the treatment, and results compared to treatment with a placebo.
					- The outcome (ACR 50) was achieved by (or estimated at) 15 of 100 patients.
					- The absolute treatment benefit (difference) compared to placebo was 15%.
					- The relative risk (likelihood of experiencing that outcome) was 3.0.

				It is possible from this information to *infer* the comparison (placebo) data. With an absolute
				risk (frequency) of 23 of 100 (23%), and an absolute treatment benefit of 15%:

				  23%		absolute risk
				 -15%		absolute treatment benefit (absolute difference)
				-----
				   8%		placebo's absolute risk

				Similarly, the relative risk of 3.0 tells us that the absolute risk of the comparison (placebo)
				would be:

					23%		absolute risk
				 ÷ 3 		relative risk
				-----
					~8% 	placebo's absolute risk

				However, in most cases where a comparison is involved, the data for the comparison are ALSO
				recorded in a row in the spreadsheet. So, here's rows 0 through 3, all of which describe a
				single "finding".

					ROW 0
					- intervention: 'methotrexate'
					- comparison: 'placebo'
					- measure: 'acr_50'
					- metric: 'ar_100' (absolute risk out of 100, a.k.a. frequency)
					- value: '8'

					ROW 1
					- intervention: 'methotrexate'
					- comparison: 'placebo'
					- measure: 'acr_50'
					- metric: 'ar_100' (absolute risk out of 100, a.k.a. frequency)
					- value: '23'

					ROW 2
					- intervention: 'methotrexate'
					- comparison: 'placebo'
					- measure: 'acr_50'
					- metric: 'abs_difference' (absolute change or difference, a.k.a. absolute treatment benefit)
					- value: '0.15'

					ROW 3
					- intervention: 'methotrexate'
					- comparison: 'placebo'
					- measure: 'acr_50'
					- metric: 'rr'
					- value: '3.0'

				So, now there appears to be no way to distinguish between rows 0 and 1. Both say that the
				intervention was methotrexate, and the comparison was placebo, and report ACR 50, with the
				same metric. But one says the value was '8' and the other says '23'. Which was the methotrexate
				value, and which was the placebo value?

				Each row has a field called 'which', which tells us *which* of the intervention or comparison
				this particular row refers to. So:

					ROW 0
					- which: 'comparison'
					- intervention: 'methotrexate'
					- comparison: 'placebo'
					- measure: 'acr_50'
					- metric: 'ar_100' (absolute risk out of 100, a.k.a. frequency)
					- value: '8'

					ROW 1
					- which: 'intervention'
					- intervention: 'methotrexate'
					- comparison: 'placebo'
					- measure: 'acr_50'
					- metric: 'ar_100' (absolute risk out of 100, a.k.a. frequency)
					- value: '23'

					ROW 2
					- which: 'intervention'
					- intervention: 'methotrexate'
					- comparison: 'placebo'
					- measure: 'acr_50'
					- metric: 'abs_difference' (absolute change or difference, a.k.a. absolute treatment benefit)
					- value: '0.15'

					ROW 3
					- which: 'intervention'
					- intervention: 'methotrexate'
					- comparison: 'placebo'
					- measure: 'acr_50'
					- metric: 'rr'
					- value: '3.0'

				Now we know that row 0 refers to the comparison (placebo) and all the other rows refer to
				the intervention (methotrexate). We can use this to group all those rows together—they all refer
				to a finding: How methotrexate compares to placebo in terms of the ACR 50 outcome.

				(Of course, 'methotrexate' and 'placebo' and 'ACR 50' alone are insufficient to describe
				the study at hand, so other fields are also used to group a finding around a measure.
				For example population, dosage, duration of study/follow-up time, and data source.)

				TYPICAL CASES

				In general, there are a few standard cases we'll encounter and need to deal with in order
				to gather and reproject data around a measure. They are:

					1. intervention only
					2. comparison + intervention
					3. population
					- ...

				1. INTERVENTION ONLY

				If *only* an intervention is specified, then no comparison information is available. In such
				cases, we should assume that the only kinds of metrics that will be reported are absolute
				numbers, rather than information about change. For example, if there's no comparison, there
				is no way to report any kind of difference or relative value. We might see this in the case
				of side effects from clinical trials, where the data source (a drug product label or monograph)
				might just say that a certain side effect occurred at a certain frequency. For example:

					ROW FROM SIDE EFFECTS SPREADSHEET
					- which: 'intervention'
					- intervention: 'celecoxib'
					- measure: 'ae'
					- measure_detail: 'Nausea'
					- metric: 'percentage'
					- value: '0.07'

				In intervention-only cases, we want to reproject the data around a key which is sufficient
				to describe the intervention:

					key = measure + intervention + dosage + source (+ measure_detail)

				All the metrics that are used to describe that specific outcome are grouped under that key.

				2. COMPARISON + INTERVENTION

				In comparison cases, it's likely we have more rows and multiple metrics describing the measure
				(outcome) of interest. In a single data source we might even have many interventions compared
				to placebo. For example, in the Cochrane review of systematic reviews of biologic DMARDs for
				RA, estimates of effect are reported for 6 drugs (interventions) compared to placebo,
				for two measures (ACR 50 and discontinuation due to an adverse event), and using many metrics,
				some absolute risk frequency, some relative differences, etc.

				Because there may be many rows that need to be "grouped" to describe the relevant findings,
				we use a key that includes the comparison:

					key = measure + comparison + intervention + dosage + source (+ measure_detail)

				TODO: describe how the "study details" are recorded/divided

				3. POPULATION

				TODO: describe this case


				OUTPUT

				Ultimately, we want to end up with reprojected data that is organized around 'finding groups',
				so to speak, which we can then use for visualizations and comparisons etc.

				TODO: Better description of this.

				For example:

				'acr_50' = {
					'placebo-methotrexate (oral, parenteral) (5 mg-25 mg / week)-52 52 week-http://www.ncbi.nlm.nih.gov/pubmed/24916606': {},
					'dmard only-etanercept (subcutaneous) (25 mg 2x / week)-6 24 month-http://www.ncbi.nlm.nih.gov/pubmed/23728649': {}
				}

				Each object in the 'acr_50' object is a unique group of findings, possibly including multiple measures.

    */

    // If there are no entries for this measure, stop.
    //
  	if (!entries || entries.length == 0) {
  		return;
  	}

    var reprojected = {};

   	entries.forEach(function (entry, i) {

      // Construct a key based on the properties of this entry.
      //
      var key = entry.measure
      				+ entry.comparison
      				+ entry.intervention
      				+ entry.population
      				+ entry.duration_low + entry.duration_high + entry.duration_interval
      				+ entry.source;


     	// Check to see if we already have an object for this key a.k.a. 'finding group.' This will be true when:
      //
      // - We already encountered a row for the 'comparison'
      // - We already saw an entry for this measure, reported with a different metric
      //
      // It's a new object.
      //
      if (!reprojected[key]) {
      	// Set up an empty object to hold the data
	     	//
      	reprojected[key] = {};

	      // Populate Basic details of the 'finding group'
	      //
	      // reprojected[key]['n']                   				= entry.n_total;
	      reprojected[key]['measure']             					= entry.measure;					// Repeated for later convenience of use
	      reprojected[key]['quality']             					= entry.grade;
	    	reprojected[key]['source']												= entry.source;
	      reprojected[key]['kind']                					= entry.kind;

	      // Duration / follow-up
	      //
	      reprojected[key]['duration']											= entry.duration;
	      // reprojected[key]['follow_up']          		 		= renderFollowUpTime(entry.duration_low, entry.duration_high, entry.duration_interval);
      }

      // Describe what kind of 'finding group' this is—a high level distinction
      // used to decide how to present data in the UI later.
      //
     	// COMPARISON + INTERVENTION CASE
      // If we encounter a row whose 'which' == 'comparison', we know that we have a full on intervention-comparison case,
      // and can mark this 'finding group' as such.
      //
      if (entry.which == 'comparison' || entry.which == 'population') {
	      reprojected[key]['which'] = entry.which;
      }

      // Details of the comparison, intervention, or population
      //
      if (!reprojected[key][entry.which]) {
      	reprojected[key][entry.which]          						= {};
      }
      reprojected[key][entry.which]['which']								= entry.which;
      reprojected[key][entry.which]['parts']								= entry[entry.which]; 			// Array 		// = entry.comparison.join(' + ');
      reprojected[key][entry.which]['dosage']								= entry.dosage;
      reprojected[key][entry.which]['notes']								= entry.notes;


      // Metrics and values
      //
      if (!reprojected[key][entry.which][entry.metric]) {
    		reprojected[key][entry.which][entry.metric]	= {};
    	}
			reprojected[key][entry.which][entry.metric]['value']	= entry.value;					// Object with all confidence bounds, etc. if reported.
      reprojected[key][entry.which][entry.metric]['which']	= entry.which;					// Repeated here because they're useful and can be passed to UI elements
      reprojected[key][entry.which][entry.metric]['measure']= entry.measure;				// Repeated here because they're useful and can be passed to UI elements
    });

		return reprojected;
  },

  renderEntry: function(entry, uniqueKey) {
  	var grades = this.state.grades;
    var measures = this.state.measures;
    var metrics = this.state.metrics;
    var tags = this.state.tags;
    var selectedTag = this.state.selectedTag;

		var cx = React.addons.classSet;
    var entryClasses = cx({
      'entry': true,
      'population': entry.which == 'population'
    });

    if (entry.which == 'comparison') {
    	return (
    		React.createElement("li", {key: uniqueKey, className: entryClasses}, 
	        React.createElement("h4", null, 
	        	React.createElement(Intervention, {intervention: entry.intervention.parts.join(' + '), dosage: entry.intervention.dosage}), 
	        	React.createElement(Source, {source: entry.source, kind: entry.kind})
	        ), 
	        React.createElement("h4", null, 
	        	React.createElement(Intervention, {intervention: entry.comparison.parts.join(' + '), dosage: entry.comparison.dosage})
	        ), 
	        React.createElement("h4", null, this.renderFollowUpTime(entry.duration, measures[entry.measure].name_short)), 
	        React.createElement("h4", null, 
	        	this.renderValue(entry.comparison)
	        ), 
	        React.createElement("h4", null, 
	        	this.renderValue(entry.intervention, 'ar_100', entry.comparison), 
	        	this.renderValue(entry.intervention, 'ar_1000', entry.comparison), 
	        	this.renderValue(entry.intervention, 'mean_score', entry.comparison), 
	        	this.renderValue(entry.intervention, 'mean_score_difference', entry.comparison)
	        ), 
	        React.createElement("h4", null, 
	        	this.renderValue(entry.intervention, 'rr'), 
	        	this.renderValue(entry.intervention, 'or')
	        ), 
	        React.createElement("h4", null, this.renderValue(entry.intervention, 'abs_difference')), 
	        React.createElement("h4", null, this.renderValue(entry.intervention, 'rel_difference')), 
	        React.createElement("h4", null, React.createElement(GradeQuality, {grade: entry.quality, gradeMap: grades}))
	      )
    	);
    }
    if (entry.which == 'population') {
    	return (
	      React.createElement("li", {key: uniqueKey, className: entryClasses}, 
	        React.createElement("h4", null, 
	        	React.createElement(Population, {population: entry.population.parts.join(' + '), dosage: entry.dosage}), 
	          React.createElement(Source, {source: entry.source, kind: entry.kind})
	        ), 
	        React.createElement("h4", null), 
	        React.createElement("h4", null, this.renderFollowUpTime(entry.duration, measures[entry.measure].name_short)), 
	        React.createElement("h4", null), 
	        React.createElement("h4", null, 
	        	this.renderValue(entry.population)
	        ), 
	        React.createElement("h4", null, 
	        	this.renderValue(entry.population, 'rr'), 
	        	this.renderValue(entry.population, 'or')
	        ), 
	        React.createElement("h4", null, this.renderValue(entry.population, 'abs_difference')), 
	        React.createElement("h4", null, this.renderValue(entry.population, 'rel_difference')), 
	        React.createElement("h4", null, React.createElement(GradeQuality, {grade: entry.quality, gradeMap: grades}))
	      )
	    );
    }
    return (
      React.createElement("li", {key: uniqueKey, className: entryClasses}, 
        React.createElement("h4", null, 
        	React.createElement(Intervention, {intervention: entry.intervention.parts.join(' + '), dosage: entry.intervention.dosage}), 
          React.createElement(Source, {source: entry.source, kind: entry.kind})
        ), 
        React.createElement("h4", null), 
        React.createElement("h4", null, this.renderFollowUpTime(entry.duration, measures[entry.measure].name_short)), 
        React.createElement("h4", null), 
        React.createElement("h4", null, 
        	this.renderValue(entry.intervention)
        ), 
        React.createElement("h4", null, 
        	this.renderValue(entry.intervention, 'rr'), 
        	this.renderValue(entry.intervention, 'or')
        ), 
        React.createElement("h4", null, this.renderValue(entry.intervention, 'abs_difference')), 
        React.createElement("h4", null, this.renderValue(entry.intervention, 'rel_difference')), 
        React.createElement("h4", null, React.createElement(GradeQuality, {grade: entry.quality, gradeMap: grades}))
      )
    );
  },

  renderDataByMeasure: function(measures) {
  	var measureMap = this.state.measures;
  	var getEntriesForMeasure = this.getEntriesForMeasure;
  	var renderEntry = this.renderEntry;

  	var renderRelativeRiskComparison = function(entries, measure) {
	  	var sources = {};

  		Object.keys(entries).map(function (key) {
  			var entry = entries[key];

	      if (entry.which == 'comparison') {
	      	if (!sources[entry.comparison.parts]) {
	      		sources[entry.comparison.parts] = {};
	      		sources[entry.comparison.parts]['items'] = [];
	      	}
	      	sources[entry.comparison.parts]['baseline'] = entry.comparison;

	      	// Check to see that we have relative risk
	      	if (entry.intervention.rr) {
	      		sources[entry.comparison.parts].items.push(entry.intervention);
	      	}
	      }
	    });

	    return Object.keys(sources).map(function (comparison) {
	    	if (sources[comparison].items.length > 1) {
	    		return (
	    			React.createElement("ul", {className: "visualization-rr"}, 
	    				React.createElement("li", null, 
	    					React.createElement("h3", null, React.createElement("strong", null, "relative risk"), " › ", measureMap[measure].name_friendly)
	    				), 
	    				React.createElement("li", null, 
			    			React.createElement(RelativeRiskComparison, {
			    				baseline: sources[comparison].baseline, 
			    				items: sources[comparison].items, 
			    				measure: measure})
			    		)
			    	)
	    		);
	    	}
	    })
		};

		var renderRiskRelativeToBaselineComparison = function(entries, measure) {
	  	var sources = {};

  		Object.keys(entries).map(function (key) {
  			var entry = entries[key];

	      if (entry.which == 'comparison') {
	      	if (!sources[entry.comparison.parts]) {
	      		sources[entry.comparison.parts] = {};
	      		sources[entry.comparison.parts]['items'] = [];
	      	}
	      	sources[entry.comparison.parts]['comparison'] = entry.comparison;

	      	// Check to see that we have relative risk
	      	if (entry.intervention.rr) {
	      		sources[entry.comparison.parts].items.push(entry.intervention);
	      	}
	      }
	    });

	    return Object.keys(sources).map(function (comparison) {
	    	if (sources[comparison].items.length > 1) {
	    		return (
	    			React.createElement("ul", {className: "visualization-rr"}, 
	    				React.createElement("li", null, 
	    					React.createElement("h3", null, React.createElement("strong", null, "relative risk"), " › ", measureMap[measure].name_friendly)
	    				), 
	    				React.createElement("li", null, 
			    			React.createElement(RiskRelativeToBaseline, {
			    				comparison: sources[comparison].comparison, 
			    				items: sources[comparison].items, 
			    				measure: measure, 
			    				measures: measureMap})
			    		)
			    	)
	    		);
	    	}
	    })
		};

  	return Object.keys(measures).map(function (measure) {
  		var measureData = measures[measure].data;

  		if (measureData) {
  			var entries = getEntriesForMeasure(measureData);

  			return (
	  			React.createElement("div", {key: measure}, 
		    		React.createElement("h3", null, 
		          React.createElement("strong", null, measureMap[measure].name_short), " ", measureMap[measure].name_friendly && React.createElement("span", null, "| ", measureMap[measure].name_friendly), 
		          measureMap[measure].description && React.createElement("p", null, measureMap[measure].description)
		        ), 

		     		(measure == 'acr_20' || measure == 'acr_50' || measure == 'discontinued_ae') && renderRiskRelativeToBaselineComparison(entries, measure), 

		        React.createElement("ul", null, 
		          React.createElement("li", null, 
		            React.createElement("h3", {className: "text"}, "Intervention / Population"), 
		            React.createElement("h3", {className: "text"}, "Comparison"), 
		            React.createElement("h3", {className: "text"}, "Follow-up"), 
		            React.createElement("h3", null, 
		              "Assumed risk", React.createElement("br", null), 
		              React.createElement("small", null, "The expected number. (Usually for people in the control, placebo (sugar pill), or comparison group.)")
		            ), 
		            React.createElement("h3", null, 
		              "Corresponding risk", React.createElement("br", null), 
		              "(95% CI)", React.createElement("br", null), 
		              React.createElement("small", null, "The number found by researchers when looking at the ", React.createElement("em", null, "intervention"), ". (Usually shows how effective the intervention was.)")
		            ), 
		            React.createElement("h3", {className: "text"}, "Relative effect (95% CI)"), 
		            React.createElement("h3", {className: "text"}, "Absolute treatment benefit (95% CI)"), 
		            React.createElement("h3", {className: "text"}, "Relative percent change (95% CI)"), 
		            React.createElement("h3", null, "Quality of the evidence (GRADE)")
		          ), 

		          Object.keys(entries).map(function (entry, i) {
		          	return renderEntry(entries[entry], entry + i);
		          })
		        )
		    	)
	  		);
			}
		});
  },

  renderDataByTag: function(data, tags, tag) {
		var dataByTag = this.getDataByTag(tags, data);
		var tagDescriptions = this.state.tagDescriptions;

		return (
      React.createElement("section", {key: tag, className: "data"}, 
        React.createElement("h2", null, 
        	React.createElement("strong", null, tagDescriptions[tag] ? tagDescriptions[tag].name_friendly : tag), 
        	tagDescriptions[tag] && React.createElement("p", null, tagDescriptions[tag].description)
        ), 
        React.createElement("div", null, 
        	this.renderDataByMeasure(dataByTag[tag])
        )
      )
    );
  },

  renderGrades: function(grades) {
  	return (
  		React.createElement("section", {className: "grades"}, 
        React.createElement("h2", null, "GRADE working group levels of evidence"), 
        React.createElement("ul", null, 
          Object.keys(grades).map(function (key, i) {
            var item = grades[key];
            return (
              React.createElement("li", {key: i}, 
                React.createElement("h3", null, item.grade, " ", React.createElement("strong", null, item.name_friendly)), 
                React.createElement("div", null, 
                  React.createElement("p", null, item.description, " ", item.source && React.createElement("a", {href: item.source}, "Source"))
                )
              )
            );
          })
        )
      )
  	);
  },

  renderMeasures: function(measures) {
  	return (
  		React.createElement("section", {className: "measures"}, 
        React.createElement("h2", null, "Measures"), 
        React.createElement("ul", null, 
          Object.keys(measures).map(function (key, i) {
            var item = measures[key];
            return (
              React.createElement("li", {key: i}, 
                React.createElement("h3", null, 
                  React.createElement("strong", null, item.name_short), React.createElement("br", null), 
                  item.name_long
                ), 
                React.createElement("p", null, 
                  item.description && item.description, 
                  item.source && React.createElement("span", null, " - ", React.createElement("a", {href: item.source}, "Source"))
                ), 
                React.createElement("div", null, 
                  React.createElement("ul", null, 
                    item.tags &&
                      React.createElement("li", null, 
                        React.createElement("small", null, "tags"), 
                        item.tags.join(',')
                      ), 
                    
                    item.notes &&
                      React.createElement("li", null, 
                        React.createElement("small", null, "notes"), 
                        item.notes
                      ), 
                    
                    item.kind &&
                      React.createElement("li", null, 
                        React.createElement("small", null, "kind"), 
                        item.kind
                      ), 
                    
                    item.assessor &&
                      React.createElement("li", null, 
                        React.createElement("small", null, "assessor"), 
                        item.assessor
                      ), 
                    
                    item.variable &&
                      React.createElement("li", null, 
                        React.createElement("small", null, "variable"), 
                        item.variable
                      ), 
                    
                    item.included_measures &&
                      React.createElement("li", null, 
                        React.createElement("small", null, "included_measures"), 
                        item.included_measures.join(', ')
                      ), 
                    
                    item.related_measures &&
                      React.createElement("li", null, 
                        React.createElement("small", null, "related_measures"), 
                        item.related_measures.join(', ')
                      )
                    
                  )
                )
              )
            );
          })
        )
      )
  	);
  },

	handleTagSelect: function(key) {
		this.setState({
			selectedTag: key
		});
	},

  renderTagBar: function(tags) {
  	var selectedTag = this.state.selectedTag;
  	var tagDescriptions = this.state.tagDescriptions;

  	if (tagDescriptions) {
	  	return (
		  	React.createElement(Nav, {className: "tag-navigation", bsStyle: "pills", activeKey: selectedTag && selectedTag, onSelect: this.handleTagSelect}, 
		  		Object.keys(tags).map(function (tag, i) {
		  			return (React.createElement(NavItem, {key: i, eventKey: tag}, tagDescriptions[tag] ? tagDescriptions[tag].name_short : tag));
		  		})
		    )
		  );
	  }
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
              React.createElement("section", {key: key}, 
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

  render: function() {
  	var cx = React.addons.classSet;

    // Data-related
    var grades = this.state.grades;
    var measures = this.state.measures;
    var metrics = this.state.metrics;
    var tags = this.state.tags;
    var data = this.state.data;
    var selectedTag = this.state.selectedTag;

    // Medication filtering-related
    var medications = this.props.medications;
    var preferences = this.props.preferences;
    var risks = this.props.risks;
    var risksFriendly = this.props.risksFriendly;
    var disabledMedications = this.state.disabledMedications;
    var selectedMedication = this.state.selectedMedication;
    var medicationMap = this.state.medicationMap;

    var classes = cx({
      'processing': true
    });

    if (grades && measures && tags && data != {}) {
      return (
        React.createElement("div", {className: classes}, 
          React.createElement("div", {className: "header"}, 
            React.createElement("h1", null, "Spreadsheets as backend demo")
            /*<a className="mobile-toggle" onClick={this.togglePreferenceControls}>
              {!this.state.menuOpen ? 'Filter your options' : 'Close filter'}
            </a>*/
          ), 

          /*this.renderPreferenceControls(preferences)*/

          React.createElement("section", null, 
            React.createElement("h2", null, "Live connection to ", React.createElement("a", {href: "https://docs.google.com/spreadsheets/d/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/", target: "_top"}, "data in a Google Spreadsheet")), 
            React.createElement("p", null, "My prototype will demonstrate use of a shareable, editable, and open (transparently accessible) spreadsheet as the ‘home’ of its data, instead of a closed, difficult to access and update database. That includes evidence extracted from the literature, descriptions of measures and metrics, harmonization tables, and so forth."), 
            React.createElement("p", null, "The summaries below are connected to ", React.createElement("a", {href: "https://docs.google.com/spreadsheets/d/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/", target: "_top"}, "data in a Google Spreadsheet"), " where I am encoding findings (data) from various sources. Updates to the spreadsheet are instantly visible here.")
          ), 



          this.renderTagBar(tags), 
          selectedTag && this.renderDataByTag(data, tags, selectedTag)

          /*this.renderGrades(grades)*/
          /*this.renderMeasures(measures)*/

          /*
          	<section>
	          	<h2>Grades</h2>
	          	<pre ref='grades'></pre>
	          	<h2>Measures</h2>
	          	<pre ref='measures'></pre>
	          	<h2>Metrics</h2>
	          	<pre ref='metrics'></pre>
	          	<h2>Tags</h2>
	          	<pre ref='tags'></pre>
	          	<h2>Data</h2>
	          	<pre ref='data'></pre>
	          </section>
	         */
        )
      );
    }
    return (React.createElement("noscript", null));
  }
});

module.exports = Processing;
},{"../data/get.js":30,"../data/medications.js":31,"../data/mock.js":32,"./visualizations/AbsoluteFrequency.jsx":18,"./visualizations/Difference.jsx":20,"./visualizations/GradeQuality.jsx":21,"./visualizations/Intervention.jsx":22,"./visualizations/Population.jsx":23,"./visualizations/RelativeRiskComparison.jsx":24,"./visualizations/RiskRelativeToBaseline.jsx":25,"./visualizations/Source.jsx":26,"react-bootstrap":"react-bootstrap","react/addons":"react/addons"}],9:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react/addons');

var medications = require('../../data/medications.js');

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
},{"../../data/medications.js":31,"react/addons":"react/addons"}],10:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react/addons');

// Data
var get = require('../../data/get.js');
var medications = require('../../data/medications.js');
var mockData = require('../../data/mock.js');

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
},{"../../data/get.js":30,"../../data/medications.js":31,"../../data/mock.js":32,"./PtdaConsiderations":11,"./PtdaCost":12,"./PtdaFrequency":13,"./PtdaMedicationSquare":14,"./PtdaMini":15,"./PtdaOnset":16,"./PtdaSideEffects":17,"ismobilejs":36,"react-bootstrap":"react-bootstrap","react/addons":"react/addons"}],11:[function(require,module,exports){
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
},{"./PtdaMedicationSquare":14,"react/addons":"react/addons"}],12:[function(require,module,exports){
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
},{"./PtdaMedicationSquare":14,"react/addons":"react/addons"}],13:[function(require,module,exports){
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
},{"./PtdaMedicationSquare":14,"react/addons":"react/addons"}],14:[function(require,module,exports){
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
},{"react/addons":"react/addons"}],15:[function(require,module,exports){
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
},{"react/addons":"react/addons"}],16:[function(require,module,exports){
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
},{"./PtdaMedicationSquare":14,"react/addons":"react/addons"}],17:[function(require,module,exports){
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
},{"./PtdaMedicationSquare":14,"react/addons":"react/addons"}],18:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react/addons');

// Absolute risk frequency icon array

var AbsoluteFrequency = React.createClass({displayName: "AbsoluteFrequency",
 
  propTypes: {
    baseline: React.PropTypes.number,
    breakpoint: React.PropTypes.number,
    denominator: React.PropTypes.number,
    frequency: React.PropTypes.number.isRequired,
    metric: React.PropTypes.string,
    classNames: React.PropTypes.string
  },

  render: function() {
    var cx = React.addons.classSet;

    var baseline = this.props.baseline;
    var breakpoint = this.props.breakpoint;
    var denominator = this.props.denominator;
    var frequency = this.props.frequency;

    // Set denominators and breakpoints based on supplied metric or values.
    //
    if (!this.props.metric && !this.props.denominator) {
      frequency < 1 && (frequency = frequency * 100);
      frequency > 1000 && (frequency = frequency * 0.1);

      !this.props.breakpoint && (breakpoint = 20);
      !this.props.denominator && (denominator = 100);

      if (frequency > 100) {
        !this.props.breakpoint && (breakpoint = 50);
        !this.props.denominator && (denominator = 1000);
      }
    }
    if (frequency < 1 && this.props.denominator) {
      // Prioritize the frequency, and forget the denominator—it shouldn't have been supplied.
      frequency = frequency * 100;
      denominator = 100;
      !this.props.breakpoint && (breakpoint = 20);
    }
    else if (this.props.metric == 'ar_100') {
      !this.props.breakpoint && (breakpoint = 20);
      !this.props.denominator && (denominator = 100);
    }
    else if (this.props.metric == 'ar_1000') {
      !this.props.breakpoint && (breakpoint = 50);
      !this.props.denominator && (denominator = 1000);

      // If a denominator of 100 is specified, divide and re-present as frequency per 100
      // for easier comparison, especially in small spaces.
      if (this.props.denominator == 100) {
        frequency = Math.floor(frequency * 0.1);
        baseline = Math.floor(baseline * 0.1);
        !this.props.breakpoint && (breakpoint = 20);
      }
    }

    var rows = [];
    var icons = [];
    var counter = 0;

    for (var i = 1; i <= denominator; i++) {
      var iconClasses = cx({
        'ss-icon ss-user': true,
        'highlight': i <= frequency,
        'lower': baseline && (frequency < baseline) && (i > frequency && i <= baseline),
        'higher': baseline && (i > baseline && i <= frequency)
      });
      icons.push(React.createElement("td", {key: i}, React.createElement("i", {className: iconClasses})));
      counter++;
      if (counter % breakpoint == 0) {
        rows.push(React.createElement("tr", {key: counter}, icons));
        icons = [];
      }
    }
    // Push leftover icons, in cases with unusual denominators
    if (icons.length > 0) {
      rows.push(React.createElement("tr", {key: counter}, icons));
    }

    var visualizationClasses = cx({
      'visualization absolute': true
    });

    if (frequency > denominator) {
      React.createElement("div", {className: visualizationClasses}, 
        "Can’t show an icon array when the frequency is greater than the denominator.", React.createElement("br", null), 
        React.createElement("strong", null, frequency, " > ", denominator)
      )
    }
    return (
      React.createElement("div", {className: visualizationClasses}, 
        React.createElement("table", null, 
          React.createElement("tbody", null, 
            rows
          )
        )
      )
    );
  }
});

module.exports = AbsoluteFrequency;
},{"react/addons":"react/addons"}],19:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react/addons');

var AbsoluteFrequency = require('./AbsoluteFrequency.jsx');

var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Popover = require('react-bootstrap').Popover;
var Tooltip = require('react-bootstrap').Tooltip;

// Absolute risk comparison

var AbsoluteRiskComparison = React.createClass({displayName: "AbsoluteRiskComparison",

  propTypes: {
    items: React.PropTypes.array.isRequred
  },

  getDefaultProps: function() {
    return {
      items: [{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"infection of any kind","measure":"ae","metric":"ar_100","grade":"","value":{"value":39,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"infection of any kind","measure":"ae","metric":"ar_100","grade":"","value":{"value":50,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"upper respiratory infection","measure":"ae","metric":"ar_100","grade":"","value":{"value":30,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"upper respiratory infection","measure":"ae","metric":"ar_100","grade":"","value":{"value":38,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"non-upper respiratory infection","measure":"ae","metric":"ar_100","grade":"","value":{"value":15,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"non-upper respiratory infection","measure":"ae","metric":"ar_100","grade":"","value":{"value":21,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"injection site reaction","measure":"ae","metric":"ar_100","grade":"","value":{"value":11,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"injection site reaction","measure":"ae","metric":"ar_100","grade":"","value":{"value":37,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"diarrhea","measure":"ae","metric":"ar_100","grade":"","value":{"value":9,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"diarrhea","measure":"ae","metric":"ar_100","grade":"","value":{"value":8,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"rash","measure":"ae","metric":"ar_100","grade":"","value":{"value":2,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"rash","measure":"ae","metric":"ar_100","grade":"","value":{"value":3,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"itching","measure":"ae","metric":"ar_100","grade":"","value":{"value":1,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"itching","measure":"ae","metric":"ar_100","grade":"","value":{"value":2,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"fever","measure":"ae","metric":"ar_100","grade":"","value":{"value":0,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"fever","measure":"ae","metric":"ar_100","grade":"","value":{"value":3,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"hives","measure":"ae","metric":"ar_100","grade":"","value":{"value":1,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"hives","measure":"ae","metric":"ar_100","grade":"","value":{"value":0,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"infection of any kind","measure":"ae","metric":"ar_100","grade":"","value":{"value":86,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"infection of any kind","measure":"ae","metric":"ar_100","grade":"","value":{"value":81,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"upper respiratory infection","measure":"ae","metric":"ar_100","grade":"","value":{"value":70,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"upper respiratory infection","measure":"ae","metric":"ar_100","grade":"","value":{"value":65,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"non-upper respiratory infection","measure":"ae","metric":"ar_100","grade":"","value":{"value":59,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"non-upper respiratory infection","measure":"ae","metric":"ar_100","grade":"","value":{"value":54,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"injection site reaction","measure":"ae","metric":"ar_100","grade":"","value":{"value":18,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"injection site reaction","measure":"ae","metric":"ar_100","grade":"","value":{"value":43,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"diarrhea","measure":"ae","metric":"ar_100","grade":"","value":{"value":16,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"diarrhea","measure":"ae","metric":"ar_100","grade":"","value":{"value":16,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"rash","measure":"ae","metric":"ar_100","grade":"","value":{"value":19,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"rash","measure":"ae","metric":"ar_100","grade":"","value":{"value":13,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"itching","measure":"ae","metric":"ar_100","grade":"","value":{"value":5,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"itching","measure":"ae","metric":"ar_100","grade":"","value":{"value":5,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"fever","measure":"ae","metric":"ar_100","grade":"","value":{"value":4,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"fever","measure":"ae","metric":"ar_100","grade":"","value":{"value":2,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"hives","measure":"ae","metric":"ar_100","grade":"","value":{"value":4,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"hives","measure":"ae","metric":"ar_100","grade":"","value":{"value":2,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"hypersensitivity","measure":"ae","metric":"ar_100","grade":"","value":{"value":1,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"hypersensitivity","measure":"ae","metric":"ar_100","grade":"","value":{"value":1,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"}],
      showTitle: true,
      showValues: false
    };
  },

  getInitialState: function() {
    return {
      iconArrayHoverRiskValue: null,
      pillHoverRiskValue: null
    };
  },

  getPopover: function(item) {
    var name =  item.measure_detail;
        name += ' (';
    item.which == 'comparison' ?
          name += item.comparison.join(' + ')
          :
          name += item.intervention.join(' + ');
        name += ')';

    return (
      React.createElement(Popover, {title: name}, 
        name, " ", React.createElement("span", {className: "ss-icon ss-user"}), " ", React.createElement("strong", null, item.value.value), " of 100"
      )
    );
  },

  makePill: function(item) {
    var cx = React.addons.classSet;

    var handlePillHover = this.handlePillHover;
    var handlePillHoverLeave = this.handlePillHoverLeave;

    var riskFrequency = item.value.value;

    var classes = cx({
      'pill': true,
      'active': riskFrequency <= this.state.iconArrayHoverRiskValue
    });

    var name =  item.measure_detail;
        name += ' (';
    item.which == 'comparison' ?
          name += item.comparison.join(' + ')
          :
          name += item.intervention.join(' + ');
        name += ')';

    return (
      React.createElement(OverlayTrigger, {
        delayHide: 300, 
        placement: "right", 
        overlay: this.getPopover(item), 
        key: name}, 
          React.createElement("div", {
            className: classes, 
            onMouseEnter: handlePillHover.bind(null, riskFrequency), 
            onMouseLeave: handlePillHoverLeave}, 
              name
          )
      )
    );
  },

  handlePillHover: function(value) {
    this.setState({
      pillHoverRiskValue: value
    });
  },

  handlePillHoverLeave: function(value) {
    this.setState({
      pillHoverRiskValue: null
    });
  },

  handleIconArrayHover: function(value) {
    this.setState({
      iconArrayHoverRiskValue: value
    });
  },

  handleIconArrayHoverLeave: function(value) {
    this.setState({
      iconArrayHoverRiskValue: null
    });
  },

  renderIconArray: function() {
    var cx = React.addons.classSet;
    var handleIconArrayHover = this.handleIconArrayHover;
    var handleIconArrayHoverLeave = this.handleIconArrayHoverLeave;

    var iconArray = [];
    for (var i = 1; i <= 100; i++) {
      var classes = cx({
        'ss-icon ss-user': true,
        'active': i <= this.state.iconArrayHoverRiskValue || i <= this.state.pillHoverRiskValue
      });
      iconArray.push(
        React.createElement("span", {
          key: i, 
          className: classes, 
          onMouseEnter: handleIconArrayHover.bind(null, i), 
          onMouseLeave: handleIconArrayHoverLeave}, 
            React.createElement("span", {className: "number"}, i)
        )
      );
    }

    return (
      React.createElement("div", {className: "icon-array"}, 
        iconArray
      )
    );
  },

  render: function() {
    var showValues = this.props.showValues;

    var items = this.props.items.sort(function(a, b) {
      return a.value.value - b.value.value;
    });

    var makePill = this.makePill;
    var pill;
    var groups = {};
    var previousPosition;
    var position;
    var threshold = 5;

    // Make the pills
    items.forEach(function(item) {
      position = item.value.value;

      console.log(position)

      // No previous position
      if (!previousPosition) {
        groups[position] = [];
        pill = makePill(item);
        groups[position].push(pill);
        previousPosition = position;
      }
      // Very close (within threshold range) to previous position
      else if (previousPosition && ((position - previousPosition) <= threshold)) {
        pill = makePill(item);
        groups[previousPosition].push(pill);
      }
      // Significantly different
      else {
        groups[position] = [];
        pill = makePill(item);
        groups[position].push(pill);
        previousPosition = position;
      }
    });

    console.log(groups)

    var pillGroups = [];
    Object.keys(groups).forEach(function(pos, i) {
      var style = {
        left: pos + '%'
      }

      pillGroups.push(
        React.createElement("li", {className: "item", style: style, key: i}, 
          groups[pos], 
          React.createElement("div", {className: "line"}), 
          showValues && React.createElement("div", {className: "legend"}, pos)
        )
      );
    });

    return (
      React.createElement("div", null, 
        React.createElement("div", {className: "visualization absolute-risk-comparison"}, 
          React.createElement("div", {className: "chart-holder"}, 
            React.createElement("ul", null, 
              pillGroups
            ), 
            React.createElement("div", {className: "axis-labels"}, 
              this.renderIconArray(), 
              React.createElement("div", {className: "axis-label left"}, 
                React.createElement("strong", null, "0 of 100"), 
                React.createElement("p", null, 
                  "At this end, no one is expected to experience"
                )
              ), 
              React.createElement("div", {className: "axis-label right"}, 
                React.createElement("strong", null, "100 of 100"), 
                React.createElement("p", null, 
                  "At this end, almost everyone is expected to experience"
                )
              )
            )
          )
        )
      )
    );
  }

});

module.exports = AbsoluteRiskComparison;
},{"./AbsoluteFrequency.jsx":18,"react-bootstrap":"react-bootstrap","react/addons":"react/addons"}],20:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react/addons');

// Simple difference display

var Difference = React.createClass({displayName: "Difference",
 
  propTypes: {
    value: React.PropTypes.number,
    low: React.PropTypes.number,
    high: React.PropTypes.number,
    metric: React.PropTypes.string
  },

  render: function() {
    var cx = React.addons.classSet;

    var value = this.props.value;

    var visualizationClasses = cx({
      'visualization difference': true,
      'up': value > 0,
      'down': value < 0
    });

    if (value > 0) {
      return (
        React.createElement("div", {className: visualizationClasses}, 
          React.createElement("span", {className: "ss-icon ss-directup"}), React.createElement("br", null), 
          React.createElement("strong", null, value)
        )
      );
    }
    if (value < 0) {
      return (
        React.createElement("div", {className: visualizationClasses}, 
          React.createElement("span", {className: "ss-icon ss-dropdown"}), React.createElement("br", null), 
          React.createElement("strong", null, value)
        )
      );
    }
    return (
      React.createElement("div", {className: visualizationClasses}, 
        React.createElement("strong", null, value)
      )
    );
  }
});

module.exports = Difference;
},{"react/addons":"react/addons"}],21:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react/addons');

var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Tooltip = require('react-bootstrap').Tooltip;

// GRADE level of evidence visualization

var GradeQuality = React.createClass({displayName: "GradeQuality",

  propTypes: {
    grade: React.PropTypes.string,
    gradeMap: React.PropTypes.object
  },

  render: function() {
    var cx = React.addons.classSet;
    var grade = this.props.grade;
    var grades = this.props.gradeMap;

    var visualizationClasses = cx({
      'visualization grade-quality': true
    });

    var getIcons = function(grade) {
      var icons = [];
      var gradeNumber = Math.floor(parseInt(grade));
      if (gradeNumber > 0) {
        for (var i = 1; i <= 4; i++) {
          var iconClasses = cx({
            'ss-icon ss-navigateright': true,
            'highlight': i <= gradeNumber
          });
          icons.push(React.createElement("i", {key: i, className: iconClasses}));
        }
      }
      else {
        icons.push(React.createElement("i", {key: i, className: "ss-icon ss-help highlight"}));
      }
      return icons;
    };

    var getTooltip = function(grade) {
      var tooltip;
      if (grade == 'X' || !grade) {
        tooltip = (
          React.createElement(Tooltip, null, 
            React.createElement("strong", null, "Not rated."), " This information hasn’t been quality rated according to GRADE."
          )
        );
      }
      else {
        tooltip = (
          React.createElement(Tooltip, null, 
            React.createElement("strong", null, grades[grade].name_friendly, "."), React.createElement("br", null), 
            grades[grade].description_friendly
          )
        );
      }
      return tooltip;
    };

    return (
      React.createElement("div", {className: visualizationClasses}, 
        React.createElement(OverlayTrigger, {delayHide: 150, placement: "right", overlay: getTooltip(grade)}, 
          React.createElement("div", null, 
            React.createElement("span", {className: "tiny-title"}, "Quality"), React.createElement("br", null), 
            React.createElement("span", null, getIcons(grade))
          )
        )
      )
    );
  }
});

module.exports = GradeQuality;
},{"react-bootstrap":"react-bootstrap","react/addons":"react/addons"}],22:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react/addons');

var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Tooltip = require('react-bootstrap').Tooltip;

// Intervention display with tooltip

var Intervention = React.createClass({displayName: "Intervention",
  
  propTypes: {
    intervention: React.PropTypes.string.isRequired,
    dosage: React.PropTypes.object
  },

  getDosageDescription: function(dosage) {
    var dosageDescription = '';
    var dosageInterval = parseInt(dosage['dosage_interval']);
    var dosageMultiple = dosage['dosage_multiple'] && parseInt(dosage['dosage_multiple']);
    
    // Quantity
    // e.g. 25 mg
    dosage.dosage.length < 10 && (dosageDescription += dosage.dosage + ' ');

    // Frequency
    // e.g. once || twice || 3 times
    if (dosage['dosage_frequency'] == 1) {
      dosageDescription += 'once ';
    }
    else if (dosage['dosage_frequency'] == 2) {
      dosageDescription += 'twice ';
    }
    else if (dosage['dosage_frequency'] > 2) {
      dosageDescription += dosage['dosage_frequency'] + ' times ';
    }

    // Interval
    // e.g. daily || weekly || monthly 
    if (!dosage['dosage_multiple'] || dosage['dosage_multiple'] == 1) {
      if (dosage['dosage_interval'] == 'day') {
        dosageDescription += 'daily';
      }
      else if (dosage['dosage_interval'] == 'week') {
        dosageDescription += 'weekly';
      }
      else if (dosage['dosage_interval'] == 'month') {
        dosageDescription += 'monthly';
      }
    }
    // e.g. every 2 weeks || every 5 months
    else {
      dosageDescription += 'every ';

      if (dosage['dosage_interval'] == 'day') {
        dosageDescription += dosage['dosage_multiple'] + ' days';
      }
      else if (dosage['dosage_interval'] == 'week') {
        dosageDescription += dosage['dosage_multiple'] + ' weeks';
      }
      else if (dosage['dosage_interval'] == 'month') {
        dosageDescription += dosage['dosage_multiple'] + ' months';
      } 
    }

    return dosageDescription;
  },

  getDosageFormDescription: function(dosage) {
    var dosageFormTranslationMap = {
      'iv': 'infusion (at a hospital or clinic)',
      'parenteral': 'injection (at home or at a clinic)',
      'subcutaneous': 'injection (at home or at a clinic)',
      'oral': 'pill, by mouth',
      'tablet': 'pill, by mouth'
    };

    var translated = dosage['dosage_form'].map(function (form) {
      return dosageFormTranslationMap[form];
    });

    return translated.join(', or ');
  },

  getTooltip: function(intervention, dosage) {
    return (
      React.createElement(Tooltip, null, 
        React.createElement("strong", null, intervention), React.createElement("br", null), 
        this.getDosageFormDescription(dosage), React.createElement("br", null), 
        this.getDosageDescription(dosage)
      )
    );
  },

  render: function() {
    var cx = React.addons.classSet;
    var visualizationClasses = cx({
      'intervention': true
    });

    var intervention = this.props.intervention;

    if (this.props.dosage) {
      return (
        React.createElement("div", {className: visualizationClasses}, 
          React.createElement(OverlayTrigger, {delayHide: 150, placement: "right", overlay: this.getTooltip(intervention, this.props.dosage)}, 
            React.createElement("span", null, 
              React.createElement("span", {className: "name"}, intervention), React.createElement("br", null), 
              React.createElement("span", {className: "dosage"}, this.getDosageDescription(this.props.dosage))
            )
          )
        )
      );
    }
    return (
      React.createElement("div", {className: visualizationClasses}, 
        React.createElement("span", {className: "name"}, intervention)
      )
    );
  }
});

module.exports = Intervention;
},{"react-bootstrap":"react-bootstrap","react/addons":"react/addons"}],23:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react/addons');

var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Tooltip = require('react-bootstrap').Tooltip;

// Intervention display with tooltip

var Population = React.createClass({displayName: "Population",
  
  propTypes: {
    population: React.PropTypes.string.isRequired,
    dosage: React.PropTypes.string
  },

  getTooltip: function(population, dosage) {
    return (
      React.createElement(Tooltip, null, 
        React.createElement("strong", null, population), React.createElement("br", null), 
        dosage
      )
    );
  },

  render: function() {
    var cx = React.addons.classSet;
    var visualizationClasses = cx({
      'population': true
    });

    var population = this.props.population;
    var dosage = this.props.dosage;

    return (
      React.createElement("div", {className: visualizationClasses}, 
        React.createElement(OverlayTrigger, {delayHide: 150, placement: "right", overlay: this.getTooltip(population, dosage)}, 
          React.createElement("span", {className: "name"}, 
            React.createElement("span", {className: "ss-icon ss-usergroup"}), 
            React.createElement("strong", null, population), 
            React.createElement("span", {className: "title"}, " group")
          )
        )
      )
    );
  }
});

module.exports = Population;
},{"react-bootstrap":"react-bootstrap","react/addons":"react/addons"}],24:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react/addons');

var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Tooltip = require('react-bootstrap').Tooltip;

// Intervention display with tooltip

var RelativeRiskComparison = React.createClass({displayName: "RelativeRiskComparison",

  propTypes: {
    baseline: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      baseline: {
        parts: 'placebo',
        ar_1000: {
          measure: 'acr_50',
          value: {
            value: 208
          }
        }
      },
      items: [{
        parts: 'abatacept',
        ar_1000: {
          value: {
            value: 437
          }
        },
        rr: {
          measure: 'acr_50',
          value: {
            value: 2.11
          }
        }
      },
      {
        parts: 'adalimumab',
        ar_1000: {
          value: {
            value: 491
          }
        },
        rr: {
          measure: 'acr_50',
          value: {
            value: 2.37
          }
        }
      },
      {
        parts: 'anakinra',
        ar_1000: {
          value: {
            value: 304
          }
        },
        rr: {
          measure: 'acr_50',
          value: {
            value: 1.47
          }
        }
      },
      {
        parts: 'etanercept',
        ar_1000: {
          value: {
            value: 565
          }
        },
        rr: {
          measure: 'acr_50',
          value: {
            value: 2.73
          }
        }
      },
      {
        parts: 'infliximab',
        ar_1000: {
          value: {
            value: 433
          }
        },
        rr: {
          measure: 'acr_50',
          value: {
            value: 2.09
          }
        }
      },
      {
        parts: 'rituximab',
        ar_1000: {
          value: {
            value: 518
          }
        },
        rr: {
          measure: 'acr_50',
          value: {
            value: 2.5
          }
        }
      }],
      measure: 'acr_50'
    };
  },

  getTooltip: function(value) {
    return (
      React.createElement(Tooltip, null, 
        React.createElement("strong", null, value)
      )
    );
  },

  makePill: function(item) {
    var ar100;
    if (item.ar_1000) {
      ar100 = Math.round(item.ar_1000.value.value / 10);
    }
    else {
      ar100 = item.ar_100.value.value;
    }
    return (
      React.createElement(OverlayTrigger, {delayHide: 150, placement: "right", overlay: this.getTooltip(ar100)}, 
        React.createElement("div", {className: "pill"}, 
         item.parts
        )
      )
    );
  },

  render: function() {
    var cx = React.addons.classSet;
    var visualizationClasses = cx({
      'visualization relative-risk-comparison': true
    });

    var items = this.props.items;

    // Get ranges and values
    var values = [];
    items.forEach(function(item) {
      values.push(item.rr.value.value);
    });
    var min = 0;
    var max = Math.max.apply(Math, values);
    var range = (max - min);

    // Set a difference threshold based on the range
    var threshold = 5;

    var getPosition = function(value) {
      return Math.floor(((value - min) * 100) / range);
    };

    // Sort entries
    var sortedItems = items.sort(function(a, b) {
      return a.rr.value.value - b.rr.value.value;
    });

    // Deprecated—placebo should be with all other items
    // // Put placebo into a pill group
    // groups['0'] = [makePill(this.props.baseline)]

    var makePill = this.makePill;

    var pill;
    var groups = {};
    var previousValue;
    var position;

    // Make the pills
    items.forEach(function(item) {
      var value = item.rr.value.value;

      // No previous position
      if (!previousValue) {
        // console.log('first')
        position = getPosition(value);
        groups[position] = [];

        pill = makePill(item);

        groups[position].push(pill);
        previousValue = value;
      }
      // Very close (within threshold range)
      else if (previousValue && ((value - previousValue) < threshold)) {
        // console.log('value below threshold', value, previousValue)
        pill = makePill(item);
        groups[position].push(pill);
        previousValue = value;
      }
      // Significantly different
      else {
        // console.log('significantly different', value)
        position = getPosition(value);
        groups[position] = [];
        pill = makePill(item);
        groups[position].push(pill);
        previousValue = value;
      }
    });

    var pillGroups = [];
    Object.keys(groups).forEach(function(group) {
      var style = {
        left: group + '%'
      }

      var legend;
      if (group == '0') {
        legend = 'baseline';
      }
      else {
        legend = '~' + ((group / 100) * max).toFixed(2) + 'x';
      }

      pillGroups.push(
        React.createElement("li", {className: "item", style: style}, 
          groups[group], 
          React.createElement("div", {className: "line"}), 
          React.createElement("div", {className: "legend"}, legend)
        )
      );
    });

    return (
      React.createElement("div", {className: visualizationClasses}, 
        React.createElement("ul", null, 
          pillGroups
        ), 
        React.createElement("div", {className: "note"}, "TODO: logarithmic scale")
      )
    );
  }
});

module.exports = RelativeRiskComparison;
},{"react-bootstrap":"react-bootstrap","react/addons":"react/addons"}],25:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react/addons');

var AbsoluteFrequency = require('./AbsoluteFrequency.jsx');

var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Popover = require('react-bootstrap').Popover;
var Tooltip = require('react-bootstrap').Tooltip;

// Intervention display with tooltip

var RiskRelativeToBaseline = React.createClass({displayName: "RiskRelativeToBaseline",
  
  propTypes: {
    comparison: React.PropTypes.object,
    items: React.PropTypes.array,
    measure: React.PropTypes.string,
    measures: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      showTitle: true,
      showValues: false,
      comparison: {
        parts: 'placebo',
        ar_1000: {
          measure: 'acr_50',
          value: {
            value: 207
          }
        }
      },
      items: [
        {
          parts: 'abatacept',
          ar_1000: {
            value: {
              value: 437
            }
          },
          rr: {
            measure: 'acr_50',
            value: {
              value: 2.11
            }
          }
        },
        {
          parts: 'adalimumab',
          ar_1000: {
            value: {
              value: 491
            }
          },
          rr: {
            measure: 'acr_50',
            value: {
              value: 2.37
            }
          }
        },
        {
          parts: 'anakinra',
          ar_1000: {
            value: {
              value: 304
            }
          },
          rr: {
            measure: 'acr_50',
            value: {
              value: 1.47
            }
          }
        },
        {
          parts: 'etanercept',
          ar_1000: {
            value: {
              value: 565
            }
          },
          rr: {
            measure: 'acr_50',
            value: {
              value: 2.73
            }
          }
        },
        {
          parts: 'infliximab',
          ar_1000: {
            value: {
              value: 433
            }
          },
          rr: {
            measure: 'acr_50',
            value: {
              value: 2.09
            }
          }
        },
        {
          parts: 'rituximab',
          ar_1000: {
            value: {
              value: 518
            }
          },
          rr: {
            measure: 'acr_50',
            value: {
              value: 2.5
            }
          }
        },
        {
          parts: 'methotrexate',
          ar_100: {
            value: {
              value: 23
            }
          },
          rr: {
            measure: 'acr_50',
            value: {
              value: 3.0
            }
          }
        }
      ],
      measure: 'acr_50',
      measures: {"tjc":{"name":"tjc","name_short":"TJC","name_long":"ACR tender joint count","name_friendly":"tender joint count","description":"\"An assessment of 28 or more joints. The joint count should be done by scoring several different aspects of tenderness, as assessed by pressure and joint manipulation on physical examination. The information on various types of tenderness should then be collapsed into a single tender-versus-nontender dichotomy.\"","tags":["pain","function"],"kind":"examination","variable":"interval","assessor":"clinician","related_measures":"","included_measures":"","source":"http://www.ncbi.nlm.nih.gov/pubmed/7779114","notes":""},"sjc":{"name":"sjc","name_short":"SJC","name_long":"ACR swollen joint count","name_friendly":"swollen joint count","description":"\"An assessment of 28 or more joints. Joints are classified as swollen or not swollen.\"","tags":["swelling","function"],"kind":"examination","variable":"interval","assessor":"clinician","related_measures":"","included_measures":"","source":"http://www.ncbi.nlm.nih.gov/pubmed/7779114","notes":""},"acr_tjc":{"name":"acr_tjc","name_short":"TJC","name_long":"ACR tender joint count","name_friendly":"tender joint count","description":"\"An assessment of 28 or more joints. The joint count should be done by scoring several different aspects of tenderness, as assessed by pressure and joint manipulation on physical examination. The information on various types of tenderness should then be collapsed into a single tender-versus-nontender dichotomy.\"","tags":["pain","function"],"kind":"examination","variable":"interval","assessor":"clinician","related_measures":"","included_measures":"","source":"http://www.ncbi.nlm.nih.gov/pubmed/7779114","notes":""},"acr_sjc":{"name":"acr_sjc","name_short":"SJC","name_long":"ACR swollen joint count","name_friendly":"swollen joint count","description":"\"An assessment of 28 or more joints. Joints are classified as swollen or not swollen.\"","tags":["swelling","function"],"kind":"examination","variable":"interval","assessor":"clinician","related_measures":"","included_measures":"","source":"http://www.ncbi.nlm.nih.gov/pubmed/7779114","notes":""},"patient_pain":{"name":"patient_pain","name_short":"pain","name_long":"Patient's assessment of pain","name_friendly":"patient's assessment of pain","description":"\"A horizontal visual analog scale (usually 10 cm) or Likert scale assessment of the patient's current level of pain.\"","tags":["pain"],"kind":"scale","variable":"continuous","assessor":"patient","related_measures":"","included_measures":"","source":"http://www.ncbi.nlm.nih.gov/pubmed/7779114","notes":""},"patient_global_das":{"name":"patient_global_das","name_short":"patient global assessment","name_long":"Patient's global assessment of disease activity","name_friendly":"patient's global assessment of disease activity","description":"\"The patient's overall assessment of how the arthritis is doing. One acceptable method for determining this is the question from the AIMS instrument: \"Considering all the ways your arthritis affects you, mark 'X' on the scale for how well you are doing.\" An anchored, horizontal, visual analog scale (usually 10 cm) should be provided. A Likert scale response is also acceptable.\"","tags":["well being"],"kind":"scale","variable":"continuous","assessor":"patient","related_measures":"","included_measures":"","source":"http://www.ncbi.nlm.nih.gov/pubmed/7779114","notes":""},"physician_global_das":{"name":"physician_global_das","name_short":"physician global assessment","name_long":"Physician's global assessent of disease activity","name_friendly":"physician's global assessent of disease activity","description":"\"A horizontal visual analog scale (usually 10 cm) or Likert scale measure of the physician's assessment of the patient's current disease activity.\"","tags":["well being"],"kind":"scale","variable":"continuous","assessor":"clinician","related_measures":"","included_measures":"","source":"http://www.ncbi.nlm.nih.gov/pubmed/7779114","notes":""},"patient_physical_function":{"name":"patient_physical_function","name_short":"physical function","name_long":"Patient's assessment of physical function","name_friendly":"patient's assessment of physical function","description":"\"Any patient self-assessment instrument which has been validated, has reliability, has been proven in RA trials to be sensitive to change, and which measures physical function in RA patients is acceptable. Instruments which have been demonstrated to be sensitive in RA trials include the AIMS, the HAQ, the Quality (or Index) of Well Being, the MHIQ, and the MACTAR.","tags":["function"],"kind":"composite","variable":"","assessor":"patient","related_measures":"","included_measures":["aims","haq","qwb","iwb","mhiq","mactar"],"source":"http://www.ncbi.nlm.nih.gov/pubmed/7779114","notes":""},"apr":{"name":"apr","name_short":"acute-phase reactant","name_long":"Laboratory test, an acute-phase reactant value","name_friendly":"acute-phase reactant value","description":"\"A Westergren erythrocyte sedimentation rate or a C-reactive protein level.\"","tags":["biomarker"],"kind":"assay","variable":"","assessor":"laboratory","related_measures":"","included_measures":["esr","crp"],"source":"","notes":""},"esr":{"name":"esr","name_short":"sed rate","name_long":"Laboratory test, erythrocyte sedimentation rate","name_friendly":"erythrocyte sedimentation rate","description":"A general laboratory test for inflammation, from any cause—including rheumatoid arthritis, infection, and even cancer","tags":["biomarker"],"kind":"assay","variable":"","assessor":"laboratory","related_measures":"","included_measures":"","source":"","notes":""},"sub_acr_20":{"name":"sub_acr_20","name_short":"less than ACR 20","name_long":"less than 20% improvement in RA symptoms","name_friendly":"less than 20% improvement","description":"less than 20% improvement in tender and swollen joint counts, and in at least three of five measures of disease activity or pain.","tags":["improvement"],"kind":"","variable":"","assessor":"","related_measures":"","included_measures":"","source":"","notes":""},"acr_20":{"name":"acr_20","name_short":"ACR 20","name_long":"20% improvement in RA symptoms","name_friendly":"20% improvement","description":"At least a 20% improvement in tender and swollen joint counts, and in at least three of five measures of disease activity or pain.","tags":["improvement"],"kind":"composite","variable":"dichotomous","assessor":"","related_measures":"","included_measures":["acr_tjc","acr_sjc","patient_pain","patient_global_das","physician_global_das","patient_physical_function","apr"],"source":"http://www.ncbi.nlm.nih.gov/pubmed/16273794","notes":""},"acr_50":{"name":"acr_50","name_short":"ACR 50","name_long":"50% improvement in RA symptoms","name_friendly":"50% improvement","description":"At least a 50% improvement in tender and swollen joint counts, and in at least three of five measures of disease activity or pain.","tags":["improvement"],"kind":"composite","variable":"dichotomous","assessor":"","related_measures":"","included_measures":["acr_tjc","acr_sjc","patient_pain","patient_global_das","physician_global_das","patient_physical_function","apr"],"source":"http://www.ncbi.nlm.nih.gov/pubmed/16273794","notes":""},"acr_70":{"name":"acr_70","name_short":"ACR 70","name_long":"70% improvement in RA symptoms","name_friendly":"70% improvement","description":"At least a 70% improvement in tender and swollen joint counts, and in at least three of five measures of disease activity or pain.","tags":["improvement"],"kind":"composite","variable":"dichotomous","assessor":"","related_measures":"","included_measures":["acr_tjc","acr_sjc","patient_pain","patient_global_das","physician_global_das","patient_physical_function","apr"],"source":"http://www.ncbi.nlm.nih.gov/pubmed/16273794","notes":""},"discontinued_ae":{"name":"discontinued_ae","name_short":"withdrawal","name_long":"withdrawal from a trial due to an adverse event or side effect","name_friendly":"discontinued due to an adverse event","description":"A participant left a study because of a side effect or \"adverse\" event","tags":["adverse event","well being"],"kind":"event","variable":"dichotomous","assessor":"clinician","related_measures":"","included_measures":"","source":"","notes":""},"discontinued_efficacy":{"name":"discontinued_efficacy","name_short":"withdrawal","name_long":"withdrawal from a trial due to lack of treatment efficacy","name_friendly":"discontinued due to lack of efficacy","description":"A participant left a study because they felt the medication wasn't working well","tags":["satisfaction"],"kind":"event","variable":"dichotomous","assessor":"clinician","related_measures":"","included_measures":"","source":"","notes":""},"serious_ae":{"name":"serious_ae","name_short":"adverse event","name_long":"","name_friendly":"serious adverse event","description":"","tags":["adverse event"],"kind":"event","variable":"dichotomous","assessor":"clinician","related_measures":"","included_measures":"","source":"","notes":""},"haq":{"name":"haq","name_short":"HAQ","name_long":"score on the Health Assessment Questionnaire","name_friendly":"Health Assessment Questionnaire","description":"","tags":["well being"],"kind":"questionnaire","variable":"","assessor":"patient","related_measures":"","included_measures":"","source":"","notes":""},"sf36_physical_20":{"name":"sf36_physical_20","name_short":"SF-36","name_long":"20% improvement on the SF-36 health questionnaire physical component","name_friendly":"SF-36 physical 20% improvement","description":"","tags":["function","improvement"],"kind":"questionnaire","variable":"dichotomous","assessor":"patient","related_measures":"","included_measures":"","source":"","notes":""},"sf36_mental_20":{"name":"sf36_mental_20","name_short":"SF-36","name_long":"20% improvement on the SF-36 health questionnaire mental component","name_friendly":"SF-36 mental 20% improvement","description":"","tags":["well being","improvement"],"kind":"questionnaire","variable":"dichotomous","assessor":"patient","related_measures":"","included_measures":"","source":"","notes":""},"remission":{"name":"remission","name_short":"remission","name_long":"disease remission","name_friendly":"remission","description":"","tags":["remission","improvement"],"kind":"event","variable":"dichotomous","assessor":"","related_measures":"","included_measures":"","source":"","notes":""},"permanent_work_disability":{"name":"permanent_work_disability","name_short":"permanent work disability","name_long":"RA-related permanent work disability","name_friendly":"permanent work disability","description":"","tags":["work","function"],"kind":"event","variable":"dichotomous","assessor":"","related_measures":"","included_measures":"","source":"","notes":""},"median_work_disability_days":{"name":"median_work_disability_days","name_short":"days off work","name_long":"days off work due to RA (median)","name_friendly":"days off work due to RA","description":"","tags":["work","function"],"kind":"count","variable":"interval","assessor":"","related_measures":"","included_measures":"","source":"","notes":""}}
    };
  },

  getInitialState: function() {
    return {
      iconArrayHoverRiskValue: null,
      pillHoverRiskValue: null
    };
  },

  getTooltip: function(value) {
    return (
      React.createElement(Tooltip, null, 
        React.createElement("strong", null, value)
      )
    );
  },

  getPopover: function(item, baselineFrequency) {
    var riskFrequency = this.getRiskFrequencyFromBaseline(item, baselineFrequency);
    
    return (
      React.createElement(Popover, {title: item.parts}, 
        "Estimated risk ", React.createElement("span", {className: "ss-icon ss-user"}), " ", React.createElement("strong", null, riskFrequency), " of 100", 
        React.createElement(AbsoluteFrequency, {frequency: riskFrequency, metric: 'ar_100', denominator: 100, breakpoint: 20, baseline: baselineFrequency})
      )
    );
  },

  makePill: function(item, baselineFrequency) {
    var cx = React.addons.classSet;

    var handlePillHover = this.handlePillHover;
    var handlePillHoverLeave = this.handlePillHoverLeave;
    
    var riskFrequency = this.getRiskFrequencyFromBaseline(item, baselineFrequency);
    
    var classes = cx({
      'pill': true,
      'active': riskFrequency <= this.state.iconArrayHoverRiskValue
    });

    return (
      React.createElement(OverlayTrigger, {
        delayHide: 700, 
        placement: "right", 
        overlay: this.getPopover(item, baselineFrequency), 
        key: item.parts}, 
          React.createElement("div", {
            className: classes, 
            onMouseEnter: handlePillHover.bind(null, riskFrequency), 
            onMouseLeave: handlePillHoverLeave.bind(null)}, 
              item.parts
          )
      )
    );
  },

  getRiskFrequencyAsFrequencyPer100: function(item) {
    var riskFrequency;
    if (item.ar_1000) {
      riskFrequency = Math.round(item.ar_1000.value.value / 10);
    }
    else if (item.ar_100) {
      riskFrequency = item.ar_100.value.value;
    }
    return riskFrequency;
  },

  getRiskFrequencyFromBaseline: function(item, baselineFrequency) {
    var relativeRisk;
    if (item.rr) {
      relativeRisk = item.rr.value.value;
    }
    else if (item.or) {
      relativeRisk = item.or.value.value;
    }
    else if (!item.or || !item.rr) {
      return baselineFrequency;
    }
    return Math.round(relativeRisk * baselineFrequency);
  },

  /*
      This component uses relative risk or odds ratio as a multiplier for
      a baseline absolute risk, which are then visualized and labeled with
      absolute risk. The baseline risk could be:

        - a disease prevalence or incidence
        - a trusted absolute risk of an estimate of treatment effect
        - etc.
  */

  handlePillHover: function(value) {
    this.setState({
      pillHoverRiskValue: value
    });
  },

  handlePillHoverLeave: function(value) {
    this.setState({
      pillHoverRiskValue: null
    });
  },

  handleIconArrayHover: function(value) {
    this.setState({
      iconArrayHoverRiskValue: value
    });
  },

  handleIconArrayHoverLeave: function(value) {
    this.setState({
      iconArrayHoverRiskValue: null
    });
  },

  renderIconArray: function() {
    var cx = React.addons.classSet;
    var handleIconArrayHover = this.handleIconArrayHover;
    var handleIconArrayHoverLeave = this.handleIconArrayHoverLeave;

    var iconArray = [];
    for (var i = 1; i <= 100; i++) {
      var classes = cx({
        'ss-icon ss-user': true,
        'active': i <= this.state.iconArrayHoverRiskValue || i <= this.state.pillHoverRiskValue
      });
      iconArray.push(
        React.createElement("span", {
          key: i, 
          className: classes, 
          onMouseEnter: handleIconArrayHover.bind(null, i), 
          onMouseLeave: handleIconArrayHoverLeave.bind(null)}, 
          React.createElement("span", {className: "number"}, i)
        )
      );
    }

    return (
      React.createElement("div", {className: "icon-array"}, 
        iconArray
      )
    );
  },

  render: function() {
    
    var cx = React.addons.classSet;
    var visualizationClasses = cx({
      'visualization risk-relative-to-baseline': true
    });

    var comparison = this.props.comparison;
    var items = this.props.items;
    var measure = this.props.measure;
    var measures = this.props.measures;
    var baselineFrequency = this.getRiskFrequencyAsFrequencyPer100(comparison);

    var showValues = this.props.showValues;

    // Get values from the supplied 'interventions'
    // and calculate the range.
    var values = [];
    items.forEach(function(item) {
      values.push(item.rr.value.value);
    });
    // var range = 1;
    
    var getPosition = function(value) {
      return Math.round(value * baselineFrequency);
    };

    // Sort entries
    var sortedItems = items.sort(function(a, b) {
      return a.rr.value.value - b.rr.value.value;
    });

    var makePill = this.makePill;
    var pill;
    var groups = {};
    var previousPosition;
    var position;
    var threshold = 5;

    // Put comparison / placebo into the first group
    previousPosition = getPosition(1);
    groups[previousPosition] = [makePill(comparison, baselineFrequency)]


    // Make the rest of the pills
    items.forEach(function(item) {
      var value = item.rr.value.value;
      position = getPosition(value);

      // No previous position      
      if (!previousPosition) {
        // console.log('first')
        groups[position] = [];
        pill = makePill(item, baselineFrequency);
        groups[position].push(pill);
        previousPosition = position;
      }
      // Very close (within threshold range) to previous position
      else if (previousPosition && ((position - previousPosition) <= threshold)) {
        // console.log('value below threshold', position, previousPosition)
        pill = makePill(item, baselineFrequency);
        groups[previousPosition].push(pill);
      }
      // Significantly different
      else {
        // console.log('significantly different', position)
        groups[position] = [];
        pill = makePill(item, baselineFrequency);
        groups[position].push(pill);
        previousPosition = position;
      }
    });

    var pillGroups = [];
    Object.keys(groups).forEach(function(group, i) {
      var style = {
        // Subtract one to get more accurat position in markup
        left: (group - 1) + '%'
      }
      
      var legend;
      if (i == 0) {
        legend = group + ' (baseline)';
      }
      else {
        legend = group;
      }

      pillGroups.push(
        React.createElement("li", {className: "item", style: style, key: i}, 
          groups[group], 
          React.createElement("div", {className: "line"}), 
          showValues && React.createElement("div", {className: "legend"}, legend)
        )
      );
    });

    return (
      React.createElement("div", null, 
        this.props.showTitle &&
          React.createElement("div", {className: "title"}, 
            React.createElement("h3", null, 
              "Estimated risk of ", React.createElement("strong", null, measures[measure].name_short, " - ", measures[measure].name_friendly), React.createElement("br", null), 
              "(compared with ", comparison.parts, ")"     
            ), 
            React.createElement("p", null, measures[measure].description), 
            React.createElement("p", null, "RR of intervention * baseline of comparison (", comparison.parts, ")")
          ), 
        
        React.createElement("div", {className: visualizationClasses}, 
          React.createElement("div", {className: "chart-holder"}, 
            React.createElement("ul", null, 
              pillGroups
            ), 
            React.createElement("div", {className: "axis-labels"}, 
              this.renderIconArray(), 
              React.createElement("div", {className: "axis-label left"}, 
                React.createElement("strong", null, "0 of 100"), 
                React.createElement("p", null, 
                  "At this extreme, no one is expected to have ", React.createElement("strong", null, measures[measure].name_friendly)
                )
              ), 
              React.createElement("div", {className: "axis-label right"}, 
                React.createElement("strong", null, "100 of 100"), 
                React.createElement("p", null, 
                  "At this extreme, almost everyone is expected to have ", React.createElement("strong", null, measures[measure].name_friendly)
                )
              )
            )
          )
        )
      )
    );
  }
});

module.exports = RiskRelativeToBaseline;
},{"./AbsoluteFrequency.jsx":18,"react-bootstrap":"react-bootstrap","react/addons":"react/addons"}],26:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react/addons');

var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Tooltip = require('react-bootstrap').Tooltip;

// Source tag

var Source = React.createClass({displayName: "Source",
  
  propTypes: {
    source: React.PropTypes.string,
    kind: React.PropTypes.string
  },

  getTooltip: function(kind) {
    var sourceToDescriptionMap = {
      'systematic review': 'A systematic review is a high-quality source. Researchers take a comprehensive, consistent look at as much data as they can find to produce a summary of what has been found so far.'
    }
    
    var tooltip = (React.createElement(Tooltip, null, "Click to see more information about the source."))
    if (sourceToDescriptionMap[kind]) {
      tooltip = (
        React.createElement(Tooltip, null, 
          sourceToDescriptionMap[kind]
        )
      )
    }
    return tooltip
  },

  render: function() {
    var source = this.props.source;
    var kind = this.props.kind;
    var getTooltip = this.getTooltip;
    
    if (source) {
      return (
        React.createElement(OverlayTrigger, {delayHide: 150, placement: "right", overlay: getTooltip(kind)}, 
          React.createElement("a", {className: "source", href: source, target: "_new"}, 
            React.createElement("span", {className: "tiny-title"}, "Source"), React.createElement("br", null), 
            kind ? React.createElement("span", null, kind, " »") : 'Click to see source'
          )
        )
      );
    }
    return (React.createElement("noscript", null));
  }
});

module.exports = Source;
},{"react-bootstrap":"react-bootstrap","react/addons":"react/addons"}],27:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react/addons');
var _ = require('lodash');
var cx = React.addons.classSet

// Visual analog scale as blocks (a la Mayo Clinic DAs)

var VisualAnalogScale = React.createClass({displayName: "VisualAnalogScale",
 
  propTypes: {
    value: React.PropTypes.number,
    range: React.PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      range: 100
    }
  },

  renderBlocks: function(value) {
    var roundedValue = Math.ceil(value / 10)

    return _.times(10, function(n) {
      var isFilledIn = function(n, value) {
        if (roundedValue < 0) {
          return (10 + roundedValue) <= (n)
        }
        return (n + 1) <= roundedValue
      }

      var blockStyle = {
        display: 'inline-block',
        position: 'relative',
        background: isFilledIn(n, value) ? '#9a9a9a' : '#efefef',
        width: '35px',
        height: '35px',
        marginRight: n <= 8 && '5px',
      }

      var iconName = cx({
        'ss-icon': true,
        'ss-plus': value > 0,
        'ss-hyphen': value < 0
      })
      var iconStyle = {
        fontSize: '150%',
        color: 'white',
        position: 'absolute',
        bottom: 0,
        right: 0,
      }

      return (
        React.createElement("div", {key: n, style: blockStyle}, 
          React.createElement("i", {className: iconName, style: iconStyle})
        )
      )
    })
  },

  render: function() {
    var visualizationClasses = cx({
      'visualization visual-analog-scale': true,
      'up': value > 0,
      'down': value < 0
    })

    var value = this.props.value;

    return (
      React.createElement("div", {className: visualizationClasses}, 
        this.renderBlocks(value)
      )
    );
  }
});

module.exports = VisualAnalogScale;
},{"lodash":"lodash","react/addons":"react/addons"}],28:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react/addons');

// Visualization sketches

var VisualizationSketches = React.createClass({displayName: "VisualizationSketches",

  render: function() {
    var medications = this.props.medications;

    var cx = React.addons.classSet;
    var classes = cx({
      'processing': true
    });

    return (
      React.createElement("div", {className: classes}, 
        React.createElement("div", {className: "header"}, 
          React.createElement("h1", null, "Visualization sketches")
        ), 

        React.createElement("section", null, 
          React.createElement("h2", null, "Warning: These are just sketches!"), 
          React.createElement("p", null, "These are drastic oversimplifications of the evidence which sits behind them. Yet, this is how the work must proceed. Explorations must happen, and totally wrong ideas made and thrown out!")
        ), 

        React.createElement("section", null, 
          React.createElement("h2", null, "Combination intervention + outcome + population observation over time"), 
          React.createElement("p", null, "This visualization shows the key findings from a study by Puolakka et al., ", React.createElement("a", {href: "http://onlinelibrary.wiley.com/doi/10.1002/art.20716/abstract", target: "_new"}, "Early suppression of disease activity is essential for maintenance of work capacity in patients with recent-onset rheumatoid arthritis."), " The article shows that five-year disability outcomes (days off work and permanent disability) are improved for people who have better response to treatment in the first six months on DMARDs. The analysis was part of a trial where triple therapy (hydroxychloroquine + methotrexate + sulfasalazine and prednisolone) was compared against treatment with sulfasalazine only and prednisolone if needed, with a switch to methotrexate after 6 months if response was inadequate with sulfasalazine."), 
          React.createElement("p", null, "I want to explore how both the treatment outcomes, and later observation of the treated populations, might be visualized."), 
          React.createElement("img", {src: "./images/visualizations/sketch_outcomeTimelineComparison.png", className: "img-responsive"})
        ), 

        React.createElement("section", null, 
          React.createElement("h2", null, "Relative risk of ACR 50 for biologics, and MTX, compared to assumed risk for placebo"), 
          React.createElement("p", null, "This visualization shows relative risk estimate of effect data from two systematic reviews, on ", React.createElement("a", {href: "http://www.ncbi.nlm.nih.gov/pubmed/24916606", target: "_new"}, "methotrexate for RA"), " and ", React.createElement("a", {href: "http://www.ncbi.nlm.nih.gov/pubmed/19821440", target: "_new"}, "biologic DMARDs for RA.")), 
          React.createElement("img", {src: "./images/visualizations/sketch_relativeRiskDMARDsACR50.png", className: "img-responsive"})
        ), 

        React.createElement("section", null, 
          React.createElement("h2", null, "Comparative risk frequency for ACR 50 for biologics, and MTX, and assumed risk for placebo"), 
          React.createElement("p", null, "This visualization shows absolute risk (frequency) estimate of effect (treatment benefit) data from two systematic reviews, on ", React.createElement("a", {href: "http://www.ncbi.nlm.nih.gov/pubmed/24916606", target: "_new"}, "methotrexate for RA"), " and ", React.createElement("a", {href: "http://www.ncbi.nlm.nih.gov/pubmed/19821440", target: "_new"}, "biologic DMARDs for RA.")), 
          React.createElement("img", {src: "./images/visualizations/sketch_comparativeRiskFrequencyDMARDsACR50.png", className: "img-responsive"})
        )

      )
    );
  }
});

module.exports = VisualizationSketches;
},{"react/addons":"react/addons"}],29:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react/addons');

var AbsoluteFrequency = require('./AbsoluteFrequency.jsx');
var RelativeRiskComparison = require('./RelativeRiskComparison.jsx');
var RiskRelativeToBaseline = require('./RiskRelativeToBaseline.jsx');
var VisualAnalogScale = require('./VisualAnalogScale.jsx');

// Visualization tests

var VisualizationTests = React.createClass({displayName: "VisualizationTests",

  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'processing': true
    });

    var sectionStyle = {
      marginBottom: '45px'
    };

    return (
      React.createElement("div", {className: classes}, 
        React.createElement("div", {className: "header"}, 
          React.createElement("h1", null, "Visualization tests")
        ), 

        React.createElement("div", {className: "container"}, 

          React.createElement("section", {style: sectionStyle}, 
            React.createElement("h2", null, "Visual analog scale"), 
            React.createElement(VisualAnalogScale, {value: -30.1}), 
            React.createElement(VisualAnalogScale, {value: -46.9}), 
            React.createElement(VisualAnalogScale, {value: 24.6})
          )
          
          /*
          <section style={sectionStyle}>
            <h2>Absolute risk, relative to baseline</h2>
            <RiskRelativeToBaseline />
          </section>
          */

          /*
            <section style={sectionStyle}>
              <h2>Relative risk comparison</h2>
              <RelativeRiskComparison />
            </section>
          */

          /*this.renderAbsoluteFrequency()*/

        )
      )
    );
  },

  renderAbsoluteFrequency: function() {
    return (
      React.createElement("div", null, 
        React.createElement("section", null, 
          React.createElement("h2", null, "Absolute risk frequency, out of 1000"), 
          React.createElement("h3", null, "242/1000"), 
          React.createElement(AbsoluteFrequency, {frequency: 242, metric: 'ar_1000', classNames: "better"}), 
          React.createElement("h3", null, "777/1000"), 
          React.createElement(AbsoluteFrequency, {frequency: 777, metric: 'ar_1000', classNames: "worse"}), 
          React.createElement("h3", null, "-1/1000"), 
          React.createElement(AbsoluteFrequency, {frequency: -1, metric: 'ar_1000'}), 
          React.createElement("h3", null, "0/1000"), 
          React.createElement(AbsoluteFrequency, {frequency: 0, metric: 'ar_1000'}), 
          React.createElement("h3", null, "1001/1000"), 
          React.createElement(AbsoluteFrequency, {frequency: 0, metric: 'ar_1000'})
        ), 

        React.createElement("section", null, 
          React.createElement("h2", null, "Absolute risk frequency, out of 100"), 
          React.createElement("h3", null, "24/100"), 
          React.createElement(AbsoluteFrequency, {frequency: 24, metric: 'ar_100', classNames: "better"}), 
          React.createElement("h3", null, "77/100"), 
          React.createElement(AbsoluteFrequency, {frequency: 77, metric: 'ar_100', classNames: "worse"}), 
          React.createElement("h3", null, "-1/100"), 
          React.createElement(AbsoluteFrequency, {frequency: -1, metric: 'ar_100'}), 
          React.createElement("h3", null, "0/100"), 
          React.createElement(AbsoluteFrequency, {frequency: 0, metric: 'ar_100'}), 
          React.createElement("h3", null, "101/100"), 
          React.createElement(AbsoluteFrequency, {frequency: 0, metric: 'ar_100'})
        ), 

        React.createElement("section", null, 
          React.createElement("h2", null, "Absolute risk frequency, no denominator supplied"), 
          React.createElement("h3", null, "0.16"), 
          React.createElement(AbsoluteFrequency, {frequency: 0.16}), 
          React.createElement("h3", null, "0.16787"), 
          React.createElement(AbsoluteFrequency, {frequency: 0.16787}), 
          React.createElement("h3", null, "141"), 
          React.createElement(AbsoluteFrequency, {frequency: 141}), 
          React.createElement("h3", null, "1238"), 
          React.createElement(AbsoluteFrequency, {frequency: 1238}), 
          React.createElement("h3", null, "0"), 
          React.createElement(AbsoluteFrequency, {frequency: 0})
        ), 

        React.createElement("section", null, 
          React.createElement("h2", null, "Absolute risk frequency, various denominators"), 
          React.createElement("h3", null, "5/20"), 
          React.createElement(AbsoluteFrequency, {frequency: 5, denominator: 20}), 
          React.createElement("h3", null, "0.16787/10"), 
          React.createElement(AbsoluteFrequency, {frequency: 0.16787, denominators: 10}), 
          React.createElement("h3", null, "17/75"), 
          React.createElement(AbsoluteFrequency, {frequency: 17, denominator: 75})
        )
      )
    );
  }
});

module.exports = VisualizationTests;
},{"./AbsoluteFrequency.jsx":18,"./RelativeRiskComparison.jsx":24,"./RiskRelativeToBaseline.jsx":25,"./VisualAnalogScale.jsx":27,"react/addons":"react/addons"}],30:[function(require,module,exports){
var _ = require('lodash');

var get = {

  sheets: {
    measures: 'o5079mk',
    metrics: 'ojmf289',
    grades: 'oo3g5h2',
    data: {
      biologics: 'oij9tdp',
      etanercept: 'oogh8lu',
      finraco: 'oclozwl',
      hydroxycholoroquine: 'oozzuoc',
      methotrexate: 'oa4uchu',
      tocilizumab: 'ociwrxy'
    },
    tagDescriptions: 'o2pd8py'
  },

  getSheetUrl: function(sheet) {
    // Visit this with a browser to get the worksheet unique IDs
    xmlListing = 'https://spreadsheets.google.com/feeds/worksheets/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/private/full';

    key  = '1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0';
    base = 'https://spreadsheets.google.com/feeds/list/'
         + key
         + '/';
    end  = '/public/values?alt=json';

    return base + sheet + end;
  },

  processTagDescriptions: function(data) {
    var tagDescriptions = {};

    $.each(data.feed.entry, function (index, value) {
      if (index == 0) {
        return;
      }
      var key = value.gsx$name.$t;
      var entry = {};
          entry['name'] = key;
          entry['description'] = value.gsx$description.$t;
          entry['name_friendly'] = value.gsx$namefriendly.$t;
          entry['name_short'] = value.gsx$nameshort.$t;
      tagDescriptions[key] = entry;
    });

    // this.setState({
    //   tagDescriptions: tagDescriptions
    // });
    return tagDescriptions;

    // this.tempTags = data;
  },

  processData: function(data) {

    var getNumber = function(value) {
      if (!isNaN(parseFloat(value))) {
        return parseFloat(value);
      }
      return null;
    };

    var processedData = [];

    $.each(data.feed.entry, function (index, value) {
      if (index == 0) {
        return;
      }
      var entry = {};
          // Key
          entry['which']                          = value.gsx$which ? value.gsx$which.$t : null;

          // Population / intervention / comparison
          entry['population']                     = value.gsx$population ? value.gsx$population.$t.split(',') : null;
          entry['intervention']                   = value.gsx$intervention ? value.gsx$intervention.$t.split(',') : null;
          entry['comparison']                     = value.gsx$comparison ? value.gsx$comparison.$t.split(',') : null;
          entry['n']                              = value.gsx$ntotal && getNumber(value.gsx$ntotal.$t);
          entry['n_type']                         = value.gsx$type && value.gsx$ntype.$t;

          // Outcome
          entry['measure_detail']                 = value.gsx$measuredetail ? value.gsx$measuredetail.$t : null;
          entry['measure']                        = value.gsx$measure ? value.gsx$measure.$t : null;
          entry['metric']                         = value.gsx$metric ? value.gsx$metric.$t : null;
          entry['grade']                          = value.gsx$grade ? value.gsx$grade.$t : null;

          // Value
          entry['value']                          = {};
          entry['value']['value']                   = value.gsx$value && getNumber(value.gsx$value.$t);
          entry['value']['value_ci_low']            = value.gsx$valuecilow && getNumber(value.gsx$valuecilow.$t);
          entry['value']['value_ci_high']           = value.gsx$valuecihigh && getNumber(value.gsx$valuecihigh.$t);
          entry['value']['value_sd']                = value.gsx$valuesd && getNumber(value.gsx$valuesd.$t);
          entry['value']['value_iqr_low']           = value.gsx$valueiqrlow && getNumber(value.gsx$valueiqrlow.$t);
          entry['value']['value_iqr_high']          = value.gsx$valueiqrhigh && getNumber(value.gsx$valueiqrhigh.$t);

          // Duration
          entry['duration']                       = {};
          entry['duration']['low']                  = value.gsx$durationlow ? value.gsx$durationlow.$t : null;
          entry['duration']['high']                 = value.gsx$durationhigh ? value.gsx$durationhigh.$t : null;
          entry['duration']['interval']             = value.gsx$durationinterval ? value.gsx$durationinterval.$t : null;

          // Dosage
          entry['dosage']                         = {};
          entry['dosage']['dosage']                 = value.gsx$dosage ? value.gsx$dosage.$t : null;
          entry['dosage']['dosage_form']            = value.gsx$dosageform ? value.gsx$dosageform.$t.split(',') : null;
          entry['dosage']['dosage_frequency']       = value.gsx$dosagefrequency ? value.gsx$dosagefrequency.$t : null;
          entry['dosage']['dosage_multiple']        = value.gsx$dosagemultiple ? value.gsx$dosagemultiple.$t : null;
          entry['dosage']['dosage_interval']        = value.gsx$dosageinterval ? value.gsx$dosageinterval.$t : null;

          // Evidence source and notes
          entry['source']                         = value.gsx$source ? value.gsx$source.$t : null;
          entry['notes']                          = value.gsx$notes ? value.gsx$notes.$t : null;
          entry['kind']                           = value.gsx$kind ? value.gsx$kind.$t : null;
      processedData.push(entry);
    });

    // Get the sheet title, which will be used as its unique key
    // e.g. 'CSR biologics'
    var title = data.feed.title.$t;
    // var newData = oldData;
    //     newData[title] = processedData;

    // this.setState({
    //   data: newData
    // });
    return processedData;

    // this.tempData = data;
  },

  processGrades: function(data) {
    var grades = {};

    $.each(data.feed.entry, function (index, value) {
      if (index == 0) {
        return;
      }
      var key = value.gsx$grade.$t;
      var entry = {};
          entry['grade'] = key;
          entry['description'] = value.gsx$description.$t;
          entry['description_friendly'] = value.gsx$descriptionfriendly.$t;
          entry['name_friendly'] = value.gsx$namefriendly.$t;
          entry['notes'] = value.gsx$namefriendly.$t;
          entry['source'] = value.gsx$source.$t;
      grades[key] = entry;
    });

    // this.setState({
    //   grades: grades
    // });
    return grades;

    // this.tempGrades = data;
  },

  processMeasures: function(data) {
    var measures = {};
    var tagMap = {};

    $.each(data.feed.entry, function (index, value) {
      if (index == 0) {
        return;
      }
      var key = value.gsx$name.$t;
      var entry = {};
          entry['name']                 = key;
          entry['name_short']           = value.gsx$nameshort.$t;
          entry['name_long']            = value.gsx$namelong.$t;
          entry['name_friendly']        = value.gsx$namefriendly.$t;
          entry['description']          = value.gsx$description.$t;
          entry['tags']                 = value.gsx$tags.$t && value.gsx$tags.$t.split(',');
          entry['kind']                 = value.gsx$kind.$t;
          entry['variable']             = value.gsx$variable.$t;
          entry['assessor']             = value.gsx$assessor.$t;
          entry['related_measures']     = value.gsx$relatedmeasures.$t && value.gsx$relatedmeasures.$t.split(',');
          entry['included_measures']    = value.gsx$includedmeasures.$t && value.gsx$includedmeasures.$t.split(',');
          entry['source']               = value.gsx$source.$t;
          entry['notes']                = value.gsx$notes.$t;
      measures[key] = entry;

      // Populate tags object based on any applied to this measure
      if (measures[key]['tags'].length > 0) {
        measures[key]['tags'].forEach(function (tag) {
          // If there's no entry for this particular tag, create an object to house
          // corresponding measures and data that match that tag.
          if (!tagMap[tag]) {
            tagMap[tag] = {};
            // tagMap[tag]['data'] = [];
          }
          tagMap[tag][key] = true;
        });
      }
    });

    // this.setState({
    //   measures: measures,
    //   tags: tagMap
    // });
    return {
      measures: measures,
      tags: tagMap
    };

    // this.tempMeasures = measures;
  },

  processMetrics: function(data) {
    var metrics = {};

    $.each(data.feed.entry, function (index, value) {
      if (index == 0) {
        return;
      }
      var key = value.gsx$name.$t;
      var entry = {};
          entry['name']                 = key;
          entry['name_short']           = value.gsx$nameshort.$t;
          entry['name_friendly']        = value.gsx$namefriendly.$t;
          entry['description']          = value.gsx$description.$t;
          entry['presentation']         = value.gsx$presentation.$t;
          entry['kind']                 = value.gsx$kind.$t;
          entry['source']               = value.gsx$source.$t;
          entry['notes']                = value.gsx$notes.$t;
      metrics[key] = entry;
    });

    // this.setState({
    //   metrics: metrics
    // });
    return metrics;

    // this.tempMetrics = data;
  },

  getEntriesForMeasure: function(entries) {
    /*
        PROCESSING DIFFERENT KINDS OF 'FINDINGS', PIVOTED AROUND A MEASURE.

        Here data are reprojected around a measure—for example, ACR 50 (50% improvement
        in RA symptoms). We iterate over the rows that show 'acr_50' as the 'measure', and
        reorganize the data into a sensible chunk.

        Each measure here is used to describe an outcome, a data point from research:
        the result of a study or an estimate of effect. It may be a way of describing what was observed
        when a treatment was administered, or a placebo, what happened to a population of people
        over time, an estimate of effect derived as a result of an analysis of multiple studies.

        Importantly, each row describes a certain MEASURE (outcome) using a certain METRIC.
        Multiple rows might be used to report the *same measure* with *multiple metrics*.
        For example, the same outcome might be recorded as a frequency, as a percent change,
        and as a relative risk ratio compared to some baseline.

        For example:

          ROW 1
          - measure: 'acr_50'
          - metric: 'ar_100' (absolute risk out of 100, a.k.a. frequency)
          - value: '23'

          ROW 2
          - measure: 'acr_50'
          - metric: 'abs_difference' (absolute change or difference, a.k.a. absolute treatment benefit)
          - value: '0.15'

          ROW 3
          - measure: 'acr_50'
          - metric: 'rr'
          - value: '3.0'

        With three rows referring to the same measure, we need a way of knowing what "finding"
        we're looking at, so we can group all the data together, and pick and choose the metrics
        we need for our UI. So, each row also has information about the treatment, population, comparison,
        and other information necessary to know what finding we're talking about. In effect, each row
        contains almost all the information necessary to 'recreate' a minimal understanding of the
        experiment or study that produced the result. For example, the row might

          ROW 1
          - intervention: 'methotrexate'
          - comparison: 'placebo'
          - measure: 'acr_50'
          - metric: 'ar_100' (absolute risk out of 100, a.k.a. frequency)
          - value: '23'

          ROW 2
          - intervention: 'methotrexate'
          - comparison: 'placebo'
          - measure: 'acr_50'
          - metric: 'abs_difference' (absolute change or difference, a.k.a. absolute treatment benefit)
          - value: '0.15'

          ROW 3
          - intervention: 'methotrexate'
          - comparison: 'placebo'
          - measure: 'acr_50'
          - metric: 'rr'
          - value: '3.0'

        The 'intervention' and 'comparison' fields (columns in the spreadsheet) describe (basically)
        the treatment that was administered and what comparison was made. There are other fields that
        elaborate on the treatment and comparison, but effectively, here's what we can learn from
        the example above:

          - Methotrexate was the treatment, and results compared to treatment with a placebo.
          - The outcome (ACR 50) was achieved by (or estimated at) 15 of 100 patients.
          - The absolute treatment benefit (difference) compared to placebo was 15%.
          - The relative risk (likelihood of experiencing that outcome) was 3.0.

        It is possible from this information to *infer* the comparison (placebo) data. With an absolute
        risk (frequency) of 23 of 100 (23%), and an absolute treatment benefit of 15%:

          23%   absolute risk
         -15%   absolute treatment benefit (absolute difference)
        -----
           8%   placebo's absolute risk

        Similarly, the relative risk of 3.0 tells us that the absolute risk of the comparison (placebo)
        would be:

          23%   absolute risk
         ÷ 3    relative risk
        -----
          ~8%   placebo's absolute risk

        However, in most cases where a comparison is involved, the data for the comparison are ALSO
        recorded in a row in the spreadsheet. So, here's rows 0 through 3, all of which describe a
        single "finding".

          ROW 0
          - intervention: 'methotrexate'
          - comparison: 'placebo'
          - measure: 'acr_50'
          - metric: 'ar_100' (absolute risk out of 100, a.k.a. frequency)
          - value: '8'

          ROW 1
          - intervention: 'methotrexate'
          - comparison: 'placebo'
          - measure: 'acr_50'
          - metric: 'ar_100' (absolute risk out of 100, a.k.a. frequency)
          - value: '23'

          ROW 2
          - intervention: 'methotrexate'
          - comparison: 'placebo'
          - measure: 'acr_50'
          - metric: 'abs_difference' (absolute change or difference, a.k.a. absolute treatment benefit)
          - value: '0.15'

          ROW 3
          - intervention: 'methotrexate'
          - comparison: 'placebo'
          - measure: 'acr_50'
          - metric: 'rr'
          - value: '3.0'

        So, now there appears to be no way to distinguish between rows 0 and 1. Both say that the
        intervention was methotrexate, and the comparison was placebo, and report ACR 50, with the
        same metric. But one says the value was '8' and the other says '23'. Which was the methotrexate
        value, and which was the placebo value?

        Each row has a field called 'which', which tells us *which* of the intervention or comparison
        this particular row refers to. So:

          ROW 0
          - which: 'comparison'
          - intervention: 'methotrexate'
          - comparison: 'placebo'
          - measure: 'acr_50'
          - metric: 'ar_100' (absolute risk out of 100, a.k.a. frequency)
          - value: '8'

          ROW 1
          - which: 'intervention'
          - intervention: 'methotrexate'
          - comparison: 'placebo'
          - measure: 'acr_50'
          - metric: 'ar_100' (absolute risk out of 100, a.k.a. frequency)
          - value: '23'

          ROW 2
          - which: 'intervention'
          - intervention: 'methotrexate'
          - comparison: 'placebo'
          - measure: 'acr_50'
          - metric: 'abs_difference' (absolute change or difference, a.k.a. absolute treatment benefit)
          - value: '0.15'

          ROW 3
          - which: 'intervention'
          - intervention: 'methotrexate'
          - comparison: 'placebo'
          - measure: 'acr_50'
          - metric: 'rr'
          - value: '3.0'

        Now we know that row 0 refers to the comparison (placebo) and all the other rows refer to
        the intervention (methotrexate). We can use this to group all those rows together—they all refer
        to a finding: How methotrexate compares to placebo in terms of the ACR 50 outcome.

        (Of course, 'methotrexate' and 'placebo' and 'ACR 50' alone are insufficient to describe
        the study at hand, so other fields are also used to group a finding around a measure.
        For example population, dosage, duration of study/follow-up time, and data source.)

        TYPICAL CASES

        In general, there are a few standard cases we'll encounter and need to deal with in order
        to gather and reproject data around a measure. They are:

          1. intervention only
          2. comparison + intervention
          3. population
          - ...

        1. INTERVENTION ONLY

        If *only* an intervention is specified, then no comparison information is available. In such
        cases, we should assume that the only kinds of metrics that will be reported are absolute
        numbers, rather than information about change. For example, if there's no comparison, there
        is no way to report any kind of difference or relative value. We might see this in the case
        of side effects from clinical trials, where the data source (a drug product label or monograph)
        might just say that a certain side effect occurred at a certain frequency. For example:

          ROW FROM SIDE EFFECTS SPREADSHEET
          - which: 'intervention'
          - intervention: 'celecoxib'
          - measure: 'ae'
          - measure_detail: 'Nausea'
          - metric: 'percentage'
          - value: '0.07'

        In intervention-only cases, we want to reproject the data around a key which is sufficient
        to describe the intervention:

          key = measure + intervention + dosage + source (+ measure_detail)

        All the metrics that are used to describe that specific outcome are grouped under that key.

        2. COMPARISON + INTERVENTION

        In comparison cases, it's likely we have more rows and multiple metrics describing the measure
        (outcome) of interest. In a single data source we might even have many interventions compared
        to placebo. For example, in the Cochrane review of systematic reviews of biologic DMARDs for
        RA, estimates of effect are reported for 6 drugs (interventions) compared to placebo,
        for two measures (ACR 50 and discontinuation due to an adverse event), and using many metrics,
        some absolute risk frequency, some relative differences, etc.

        Because there may be many rows that need to be "grouped" to describe the relevant findings,
        we use a key that includes the comparison:

          key = measure + comparison + intervention + dosage + source (+ measure_detail)

        TODO: describe how the "study details" are recorded/divided

        3. POPULATION

        TODO: describe this case


        OUTPUT

        Ultimately, we want to end up with reprojected data that is organized around 'finding groups',
        so to speak, which we can then use for visualizations and comparisons etc.

        TODO: Better description of this.

        For example:

        'acr_50' = {
          'placebo-methotrexate (oral, parenteral) (5 mg-25 mg / week)-52 52 week-http://www.ncbi.nlm.nih.gov/pubmed/24916606': {},
          'dmard only-etanercept (subcutaneous) (25 mg 2x / week)-6 24 month-http://www.ncbi.nlm.nih.gov/pubmed/23728649': {}
        }

        Each object in the 'acr_50' object is a unique group of findings, possibly including multiple measures.

    */

    // If there are no entries for this measure, stop.
    //
    if (!entries || entries.length == 0) {
      return;
    }

    var reprojected = {};

    entries.forEach(function (entry, i) {

      // Construct a key based on the properties of this entry.
      //
      var key = entry.measure
              + entry.measure_detail
              + entry.comparison
              + entry.intervention
              + entry.population
              + entry.duration_low + entry.duration_high + entry.duration_interval
              + entry.source;


      // Check to see if we already have an object for this key a.k.a. 'finding group.' This will be true when:
      //
      // - We already encountered a row for the 'comparison'
      // - We already saw an entry for this measure, reported with a different metric
      //
      // It's a new object.
      //
      if (!reprojected[key]) {
        // Set up an empty object to hold the data
        //
        reprojected[key] = {};

        // Populate Basic details of the 'finding group'
        //
        // reprojected[key]['n']                          = entry.n_total;
        reprojected[key]['measure']                       = entry.measure;          // Repeated for later convenience of use
        reprojected[key]['measure_detail']                = entry.measure_detail;          // Repeated for later convenience of use
        reprojected[key]['quality']                       = entry.grade;
        reprojected[key]['source']                        = entry.source;
        reprojected[key]['kind']                          = entry.kind;

        // Duration / follow-up
        //
        reprojected[key]['duration']                      = entry.duration;
        // reprojected[key]['follow_up']                  = renderFollowUpTime(entry.duration_low, entry.duration_high, entry.duration_interval);
      }

      // Describe what kind of 'finding group' this is—a high level distinction
      // used to decide how to present data in the UI later.
      //
      // COMPARISON + INTERVENTION CASE
      // If we encounter a row whose 'which' == 'comparison', we know that we have a full on intervention-comparison case,
      // and can mark this 'finding group' as such.
      //
      if (entry.which == 'comparison' || entry.which == 'population') {
        reprojected[key]['which'] = entry.which;
      }

      // Details of the comparison, intervention, or population
      //
      if (!reprojected[key][entry.which]) {
        reprojected[key][entry.which]                     = {};
      }
      reprojected[key][entry.which]['which']                = entry.which;
      reprojected[key][entry.which]['parts']                = entry[entry.which];       // Array    // = entry.comparison.join(' + ');
      reprojected[key][entry.which]['dosage']               = entry.dosage;
      reprojected[key][entry.which]['notes']                = entry.notes;

      // If there is a comparison listed for the entry, but there are no
      // comparison data (such as dosage, details, and so forth), we must
      // at least capture the basic comparison parts. This check ensures that
      // we do so.
      if (entry['comparison'][0].length > 0 && !reprojected[key]['comparison']) {
        reprojected[key]['comparison'] = {};
        reprojected[key]['comparison']['parts']             = entry['comparison'];
      }


      // Metrics and values
      //
      if (!reprojected[key][entry.which][entry.metric]) {
        reprojected[key][entry.which][entry.metric] = {};
      }
      reprojected[key][entry.which][entry.metric]['value']  = entry.value;          // Object with all confidence bounds, etc. if reported.
      reprojected[key][entry.which][entry.metric]['which']  = entry.which;          // Repeated here because they're useful and can be passed to UI elements
      reprojected[key][entry.which][entry.metric]['measure']= entry.measure;        // Repeated here because they're useful and can be passed to UI elements
    });

    return reprojected;
  },

  filterEntriesByMedication: function(entries, medications, disabledMedications) {
    // disabledMedications is an object with key value pairs like so:
    //
    // {
    //  "Methotrexate": true,
    //  "Simponi": false
    // }
    //
    // This function gets a simple list of medications that are not disabled,
    // i.e. whose value is false.

    var enabledMedicationNames = [];

    Object.keys(disabledMedications).forEach(function(key) {
      if (disabledMedications[key] === false) {

        // If the medication is not disabled, we want to add its name(s)—including
        // generic name and all brand names—to a list that we can use to filter
        // data entries. Typically the data entries list drugs by generic name,
        // but this is more comprehensive.

        var medicationObject = _.find(medications, function(medication) {
          return medication.name_common == key;
        });

        enabledMedicationNames.push(medicationObject.name_generic.toLowerCase());
        _.each(medicationObject.names_brand, function(nameBrand) {
          enabledMedicationNames.push(nameBrand.toLowerCase());
        });
      }
    });

    // Filter entries to only those in which the intervention included one of the
    // enabled medications.
    var filteredEntries = _.filter(entries, function(entry) {
      if (entry.intervention && entry.intervention.parts) {
        var intersection = _.intersection(entry.intervention.parts, enabledMedicationNames);
        return intersection.length > 0;
      }
      else if (entry.intervention) {
        var intersection = _.intersection(entry.intervention, enabledMedicationNames);
        return intersection.length > 0;
      }
    });
    return filteredEntries;
  },

  filterEntriesToPopulationOnly: function(entries) {
    // Filter entries to only those which are about populations.
    var filteredEntries = _.filter(entries, function(entry) {
      if (entry.which == 'population' && entry.population) {
        return true
      }
    })
    return filteredEntries;
  }

};

module.exports = get;
},{"lodash":"lodash"}],31:[function(require,module,exports){
var drugs = [
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
    "risks": {
      "tb": {
        "risk": 0
      },
      "pregnancy": {
        "risk": 2
      },
      "alcohol": {
        "risk": 2
      },
      "liver_disease": {
        "risk": 2
      },
      "heart_failure": {
        "risk": 0
      },
      "kidney_disease": {
        "risk": 2
      }
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
    },
    "risks": {
      "tb": {
        "risk": 0
      },
      "pregnancy": {
        "risk": 0
      },
      "alcohol": {
        "risk": 0
      },
      "liver_disease": {
        "risk": 0
      },
      "heart_failure": {
        "risk": 0
      }
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
    },
    "risks": {
      "tb": {
        "risk": 0
      },
      "pregnancy": {
        "risk": 2
      },
      "alcohol": {
        "risk": 2
      },
      "liver_disease": {
        "risk": 2
      },
      "heart_failure": {
        "risk": 0
      }
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
    },
    "risks": {
      "tb": {
        "risk": 0
      },
      "pregnancy": {
        "risk": 0
      },
      "alcohol": {
        "risk": 0
      },
      "liver_disease": {
        "risk": 0
      },
      "heart_failure": {
        "risk": 0
      }
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
    },
    "risks": {
      "tb": {
        "risk": 2
      },
      "pregnancy": {
        "risk": 1
      },
      "alcohol": {
        "risk": 0
      },
      "liver_disease": {
        "risk": 0
      },
      "heart_failure": {
        "risk": 2
      },
      "cancer": {
        "risk": 2
      },
      "kidney_disease": {
        "risk": 0
      }
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
    },
    "risks": {
      "tb": {
        "risk": 2
      },
      "pregnancy": {
        "risk": 1
      },
      "alcohol": {
        "risk": 0
      },
      "liver_disease": {
        "risk": 0
      },
      "heart_failure": {
        "risk": 2
      },
      "cancer_treatment": {
        "risk": 2
      },
      "kidney_disease": {
        "risk": 0
      }
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
    },
    "risks": {
      "tb": {
        "risk": 2
      },
      "pregnancy": {
        "risk": 1
      },
      "alcohol": {
        "risk": 0
      },
      "liver_disease": {
        "risk": 0
      },
      "heart_failure": {
        "risk": 2
      },
      "cancer_treatment": {
        "risk": 2
      },
      "kidney_disease": {
        "risk": 0
      }
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
    },
    "risks": {
      "tb": {
        "risk": 2
      },
      "pregnancy": {
        "risk": 1
      },
      "alcohol": {
        "risk": 0
      },
      "liver_disease": {
        "risk": 0
      },
      "heart_failure": {
        "risk": 2
      },
      "cancer_treatment": {
        "risk": 2
      },
      "kidney_disease": {
        "risk": 0
      }
    }
  },
  {
    "name": "Rituxan",
    "name_generic": "rituximab",
    "name_common": "Rituxan",
    "name_phonetic": "rye-TUX-an",
    "name_generic_phonetic": "rye-TUX-ih-mab",
    "class": [
      "Anti-CD20",
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
    },
    "risks": {
      "tb": {
        "risk": 2
      },
      "pregnancy": {
        "risk": 1
      },
      "alcohol": {
        "risk": 0
      },
      "liver_disease": {
        "risk": 0
      },
      "heart_failure": {
        "risk": 2
      },
      "cancer_treatment": {
        "risk": 2
      },
      "kidney_disease": {
        "risk": 0
      }
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
    },
    "risks": {
      "tb": {
        "risk": 2
      },
      "pregnancy": {
        "risk": 1
      },
      "alcohol": {
        "risk": 0
      },
      "liver_disease": {
        "risk": 0
      },
      "heart_failure": {
        "risk": 2
      },
      "cancer_treatment": {
        "risk": 2
      },
      "kidney_disease": {
        "risk": 0
      }
    }
  },
  {
    "name": "Orencia",
    "name_generic": "abatacept",
    "name_common": "Orencia",
    "name_phonetic": "or-EN-see-uh",
    "name_generic_phonetic": "a-BAH-tuh-sept",
    "class": [
      "Anti-CTLA4",
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
    },
    "risks": {
      "tb": {
        "risk": 2
      },
      "pregnancy": {
        "risk": 1
      },
      "alcohol": {
        "risk": 0
      },
      "liver_disease": {
        "risk": 0
      },
      "kidney_disease": {
        "risk": 0
      }
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
    },
    "risks": {
      "tb": {
        "risk": 2
      },
      "pregnancy": {
        "risk": 1
      },
      "alcohol": {
        "risk": 0
      },
      "liver_disease": {
        "risk": 0
      },
      "kidney_disease": {
        "risk": 0
      }
    }
  }
  // ,{
  //   "name": "Kineret",
  //   "name_generic": "anakinra",
  //   "name_common": "Kineret",
  //   "name_phonetic": "kin-ur-EHT",
  //   "name_generic_phonetic": "ana-KIN-rah",
  //   "class": [
  //     "Biologic",
  //     "IL1 inhibitor"
  //   ],
  //   "generic_available": false,
  //   "names_brand": [
  //     "Actemra"
  //   ],
  //   "forms": [
  //     {
  //       "name": "infusion (by vein at clinic)"
  //     }
  //   ],
  //   "ptda": {
  //     "cost": {
  //       "min": 1115,
  //       "max": 2230
  //     },
  //     "onset": {
  //       "unit": "week",
  //       "min": 2,
  //       "max": 4
  //     },
  //     "frequency": {
  //       "unit": "month",
  //       "dose": 1,
  //       "multiple": 1
  //     },
  //     "side_effects": {
  //       "common": [
  //         "reaction to infusion",
  //         "upset stomach",
  //         "headache",
  //         "dizziness",
  //         "high blood pressure"
  //       ],
  //       "rare": [
  //         "reactivation of tuberculosis",
  //         "serious infection that needs antibiotic by vein in hospital",
  //         "cancer (most often skin or blood, like lymphoma",
  //         "severe infusion reaction"
  //       ]
  //     },
  //     "risks": [
  //       {
  //         "name": "tb",
  //         "risk": 2
  //       },
  //       {
  //         "name": "pregnancy",
  //         "risk": 1
  //       },
  //       {
  //         "name": "alcohol",
  //         "risk": 0
  //       },
  //       {
  //         "name": "liver_disease",
  //         "risk": 0
  //       }
  //     ]
  //   },
  //   "risks": {
  //     "tb": {
  //       "risk": 2
  //     },
  //     "pregnancy": {
  //       "risk": 1
  //     },
  //     "alcohol": {
  //       "risk": 0
  //     },
  //     "liver_disease": {
  //       "risk": 0
  //     }
  //   }
  // }
];

module.exports = drugs;
},{}],32:[function(require,module,exports){
var mockData = {
  grades: {"1":{"grade":"1","description":"We are very uncertain about the estimate.","description_friendly":"Doctors and researchers don't have confidence in the results. They think the studies done so far have flaws that make the results unreliable, and that more research is needed on this topic.","name_friendly":"Very low quality","notes":"Very low quality","source":"http://www.cochranelibrary.com/about/explanations-for-cochrane-summary-of-findings-sof-tables.html"},"2":{"grade":"2","description":"Further research is very likely to have an important impact on our confidence in the estimate of effect and is likely to change the estimate.","description_friendly":"Doctors and researchers aren't confident in the results. They think that more research would likely change their minds, and probably produce different results. The change could be positive, or negative. They think that the studies done so far weren't well-done enough to make them confident in the results.","name_friendly":"Low quality","notes":"Low quality","source":"http://www.cochranelibrary.com/about/explanations-for-cochrane-summary-of-findings-sof-tables.html"},"3":{"grade":"3","description":"Further research is likely to have an important impact on our confidence in the estimate of effect and may change the estimate.","description_friendly":"Doctors and researchers aren't completely confident in the results. They think that more research might change their minds, and might even produce different results. They think that the studies done so far have been OK, but that there isn't enough data to make them completely confident.","name_friendly":"Moderate quality","notes":"Moderate quality","source":"http://www.cochranelibrary.com/about/explanations-for-cochrane-summary-of-findings-sof-tables.html"},"4":{"grade":"4","description":"Further research is very unlikely to change our confidence in the estimate of effect.","description_friendly":"Doctors and researchers are confident in the results. They don't think that more research would change the results, and think that the studies done so far have been reliable and well-done.","name_friendly":"High quality","notes":"High quality","source":"http://www.cochranelibrary.com/about/explanations-for-cochrane-summary-of-findings-sof-tables.html"},"X":{"grade":"X","description":"The evidence has not been quality-rated.","description_friendly":"Doctors and researchers haven't quality-rated this information according to the GRADE guidelines.","name_friendly":"Unknown quality","notes":"Unknown quality","source":""}}
  ,measures: {"tjc":{"name":"tjc","name_short":"TJC","name_long":"ACR tender joint count","name_friendly":"tender joint count","description":"\"An assessment of 28 or more joints. The joint count should be done by scoring several different aspects of tenderness, as assessed by pressure and joint manipulation on physical examination. The information on various types of tenderness should then be collapsed into a single tender-versus-nontender dichotomy.\"","tags":["pain","function"],"kind":"examination","variable":"interval","assessor":"clinician","related_measures":"","included_measures":"","source":"http://www.ncbi.nlm.nih.gov/pubmed/7779114","notes":""},"sjc":{"name":"sjc","name_short":"SJC","name_long":"ACR swollen joint count","name_friendly":"swollen joint count","description":"\"An assessment of 28 or more joints. Joints are classified as swollen or not swollen.\"","tags":["swelling","function"],"kind":"examination","variable":"interval","assessor":"clinician","related_measures":"","included_measures":"","source":"http://www.ncbi.nlm.nih.gov/pubmed/7779114","notes":""},"acr_tjc":{"name":"acr_tjc","name_short":"TJC","name_long":"ACR tender joint count","name_friendly":"tender joint count","description":"\"An assessment of 28 or more joints. The joint count should be done by scoring several different aspects of tenderness, as assessed by pressure and joint manipulation on physical examination. The information on various types of tenderness should then be collapsed into a single tender-versus-nontender dichotomy.\"","tags":["pain","function"],"kind":"examination","variable":"interval","assessor":"clinician","related_measures":"","included_measures":"","source":"http://www.ncbi.nlm.nih.gov/pubmed/7779114","notes":""},"acr_sjc":{"name":"acr_sjc","name_short":"SJC","name_long":"ACR swollen joint count","name_friendly":"swollen joint count","description":"\"An assessment of 28 or more joints. Joints are classified as swollen or not swollen.\"","tags":["swelling","function"],"kind":"examination","variable":"interval","assessor":"clinician","related_measures":"","included_measures":"","source":"http://www.ncbi.nlm.nih.gov/pubmed/7779114","notes":""},"patient_pain":{"name":"patient_pain","name_short":"pain","name_long":"Patient's assessment of pain","name_friendly":"patient's assessment of pain","description":"\"A horizontal visual analog scale (usually 10 cm) or Likert scale assessment of the patient's current level of pain.\"","tags":["pain"],"kind":"scale","variable":"continuous","assessor":"patient","related_measures":"","included_measures":"","source":"http://www.ncbi.nlm.nih.gov/pubmed/7779114","notes":""},"patient_global_das":{"name":"patient_global_das","name_short":"patient global assessment","name_long":"Patient's global assessment of disease activity","name_friendly":"patient's global assessment of disease activity","description":"\"The patient's overall assessment of how the arthritis is doing. One acceptable method for determining this is the question from the AIMS instrument: \"Considering all the ways your arthritis affects you, mark 'X' on the scale for how well you are doing.\" An anchored, horizontal, visual analog scale (usually 10 cm) should be provided. A Likert scale response is also acceptable.\"","tags":["well being"],"kind":"scale","variable":"continuous","assessor":"patient","related_measures":"","included_measures":"","source":"http://www.ncbi.nlm.nih.gov/pubmed/7779114","notes":""},"physician_global_das":{"name":"physician_global_das","name_short":"physician global assessment","name_long":"Physician's global assessent of disease activity","name_friendly":"physician's global assessent of disease activity","description":"\"A horizontal visual analog scale (usually 10 cm) or Likert scale measure of the physician's assessment of the patient's current disease activity.\"","tags":["well being"],"kind":"scale","variable":"continuous","assessor":"clinician","related_measures":"","included_measures":"","source":"http://www.ncbi.nlm.nih.gov/pubmed/7779114","notes":""},"patient_physical_function":{"name":"patient_physical_function","name_short":"physical function","name_long":"Patient's assessment of physical function","name_friendly":"patient's assessment of physical function","description":"\"Any patient self-assessment instrument which has been validated, has reliability, has been proven in RA trials to be sensitive to change, and which measures physical function in RA patients is acceptable. Instruments which have been demonstrated to be sensitive in RA trials include the AIMS, the HAQ, the Quality (or Index) of Well Being, the MHIQ, and the MACTAR.","tags":["function"],"kind":"composite","variable":"","assessor":"patient","related_measures":"","included_measures":["aims","haq","qwb","iwb","mhiq","mactar"],"source":"http://www.ncbi.nlm.nih.gov/pubmed/7779114","notes":""},"apr":{"name":"apr","name_short":"acute-phase reactant","name_long":"Laboratory test, an acute-phase reactant value","name_friendly":"acute-phase reactant value","description":"\"A Westergren erythrocyte sedimentation rate or a C-reactive protein level.\"","tags":["biomarker"],"kind":"assay","variable":"","assessor":"laboratory","related_measures":"","included_measures":["esr","crp"],"source":"","notes":""},"esr":{"name":"esr","name_short":"sed rate","name_long":"Laboratory test, erythrocyte sedimentation rate","name_friendly":"erythrocyte sedimentation rate","description":"A general laboratory test for inflammation, from any cause—including rheumatoid arthritis, infection, and even cancer","tags":["biomarker"],"kind":"assay","variable":"","assessor":"laboratory","related_measures":"","included_measures":"","source":"","notes":""},"sub_acr_20":{"name":"sub_acr_20","name_short":"less than ACR 20","name_long":"less than 20% improvement in RA symptoms","name_friendly":"less than 20% improvement","description":"less than 20% improvement in tender and swollen joint counts, and in at least three of five measures of disease activity or pain.","tags":["improvement"],"kind":"","variable":"","assessor":"","related_measures":"","included_measures":"","source":"","notes":""},"acr_20":{"name":"acr_20","name_short":"ACR 20","name_long":"20% improvement in RA symptoms","name_friendly":"20% improvement","description":"At least a 20% improvement in tender and swollen joint counts, and in at least three of five measures of disease activity or pain.","tags":["improvement"],"kind":"composite","variable":"dichotomous","assessor":"","related_measures":"","included_measures":["acr_tjc","acr_sjc","patient_pain","patient_global_das","physician_global_das","patient_physical_function","apr"],"source":"http://www.ncbi.nlm.nih.gov/pubmed/16273794","notes":""},"acr_50":{"name":"acr_50","name_short":"ACR 50","name_long":"50% improvement in RA symptoms","name_friendly":"50% improvement","description":"At least a 50% improvement in tender and swollen joint counts, and in at least three of five measures of disease activity or pain.","tags":["improvement"],"kind":"composite","variable":"dichotomous","assessor":"","related_measures":"","included_measures":["acr_tjc","acr_sjc","patient_pain","patient_global_das","physician_global_das","patient_physical_function","apr"],"source":"http://www.ncbi.nlm.nih.gov/pubmed/16273794","notes":""},"acr_70":{"name":"acr_70","name_short":"ACR 70","name_long":"70% improvement in RA symptoms","name_friendly":"70% improvement","description":"At least a 70% improvement in tender and swollen joint counts, and in at least three of five measures of disease activity or pain.","tags":["improvement"],"kind":"composite","variable":"dichotomous","assessor":"","related_measures":"","included_measures":["acr_tjc","acr_sjc","patient_pain","patient_global_das","physician_global_das","patient_physical_function","apr"],"source":"http://www.ncbi.nlm.nih.gov/pubmed/16273794","notes":""},"discontinued_ae":{"name":"discontinued_ae","name_short":"withdrawal","name_long":"withdrawal from a trial due to an adverse event or side effect","name_friendly":"discontinued due to an adverse event","description":"A participant left a study because of a side effect or \"adverse\" event","tags":["adverse event","well being"],"kind":"event","variable":"dichotomous","assessor":"clinician","related_measures":"","included_measures":"","source":"","notes":""},"discontinued_efficacy":{"name":"discontinued_efficacy","name_short":"withdrawal","name_long":"withdrawal from a trial due to lack of treatment efficacy","name_friendly":"discontinued due to lack of efficacy","description":"A participant left a study because they felt the medication wasn't working well","tags":["satisfaction"],"kind":"event","variable":"dichotomous","assessor":"clinician","related_measures":"","included_measures":"","source":"","notes":""},"serious_ae":{"name":"serious_ae","name_short":"serious adverse event","name_long":"","name_friendly":"serious adverse event","description":"","tags":["adverse event"],"kind":"event","variable":"dichotomous","assessor":"clinician","related_measures":"","included_measures":"","source":"","notes":""},"haq":{"name":"haq","name_short":"HAQ","name_long":"score on the Health Assessment Questionnaire","name_friendly":"Health Assessment Questionnaire","description":"","tags":["well being"],"kind":"questionnaire","variable":"","assessor":"patient","related_measures":"","included_measures":"","source":"","notes":""},"sf36_physical_20":{"name":"sf36_physical_20","name_short":"SF-36 Physical","name_long":"20% improvement on the SF-36 health questionnaire physical component","name_friendly":"SF-36 physical 20% improvement","description":"","tags":["function","improvement"],"kind":"questionnaire","variable":"dichotomous","assessor":"patient","related_measures":"","included_measures":"","source":"","notes":""},"sf36_mental_20":{"name":"sf36_mental_20","name_short":"SF-36 Mental","name_long":"20% improvement on the SF-36 health questionnaire mental component","name_friendly":"SF-36 mental 20% improvement","description":"","tags":["well being","improvement"],"kind":"questionnaire","variable":"dichotomous","assessor":"patient","related_measures":"","included_measures":"","source":"","notes":""},"remission":{"name":"remission","name_short":"remission","name_long":"disease remission","name_friendly":"remission","description":"","tags":["remission","improvement"],"kind":"event","variable":"dichotomous","assessor":"","related_measures":"","included_measures":"","source":"","notes":""},"permanent_work_disability":{"name":"permanent_work_disability","name_short":"permanent work disability","name_long":"RA-related permanent work disability","name_friendly":"permanent work disability","description":"","tags":["work","function"],"kind":"event","variable":"dichotomous","assessor":"","related_measures":"","included_measures":"","source":"","notes":""},"median_work_disability_days":{"name":"median_work_disability_days","name_short":"days off work","name_long":"days off work due to RA (median)","name_friendly":"days off work due to RA","description":"","tags":["work","function"],"kind":"count","variable":"interval","assessor":"","related_measures":"","included_measures":"","source":"","notes":""},"ae":{"name":"ae","name_short":"adverse event","name_long":"side effect","name_friendly":"side effect","description":"side effect","tags":["adverse event"],"kind":"","variable":"interval","assessor":"","related_measures":"","included_measures":"","source":"","notes":""}}
  ,metrics: {"ar_100":{"name":"ar_100","name_short":"absolute risk","name_friendly":"absolute risk (out of 100)","description":"","presentation":"frequency","kind":"absolute","source":"","notes":""},"ar_1000":{"name":"ar_1000","name_short":"absolute risk","name_friendly":"absolute risk (out of 1000)","description":"","presentation":"frequency","kind":"absolute","source":"","notes":""},"rr":{"name":"rr","name_short":"relative risk","name_friendly":"","description":"","presentation":"value","kind":"relative","source":"","notes":""},"or":{"name":"or","name_short":"odds ratio","name_friendly":"","description":"","presentation":"value","kind":"relative","source":"","notes":""},"abs_difference":{"name":"abs_difference","name_short":"absolute difference","name_friendly":"absolute treatment benefit","description":"","presentation":"percentage","kind":"relative","source":"","notes":""},"rel_difference":{"name":"rel_difference","name_short":"relative difference","name_friendly":"relative percent change","description":"","presentation":"percentage","kind":"absolute","source":"","notes":""},"mean_score":{"name":"mean_score","name_short":"mean score","name_friendly":"","description":"","presentation":"value","kind":"absolute","source":"","notes":""},"mean_score_difference":{"name":"mean_score_difference","name_short":"mean difference in score","name_friendly":"","description":"\"The mean difference is the average difference between the intervention group and the control group across studies.\"","presentation":"difference","kind":"relative","source":"http://www.cochranelibrary.com/about/explanations-for-cochrane-summary-of-findings-sof-tables.html","notes":""},"percentage":{"name":"percentage","name_short":"percentage","name_friendly":"percentage of people","description":"","presentation":"percentage","kind":"absolute","source":"","notes":""},"mean_score_10":{"name":"mean_score_10","name_short":"mean score (out of 10)","name_friendly":"","description":"","presentation":"value","kind":"absolute","source":"","notes":""},"mean_score_100":{"name":"mean_score_100","name_short":"mean score (out of 100)","name_friendly":"","description":"","presentation":"value","kind":"absolute","source":"","notes":""},"count":{"name":"count","name_short":"count","name_friendly":"","description":"","presentation":"value","kind":"absolute","source":"","notes":""}}
  ,tags: {"pain":{"tjc":true,"acr_tjc":true,"patient_pain":true},"function":{"tjc":true,"sjc":true,"acr_tjc":true,"acr_sjc":true,"patient_physical_function":true,"sf36_physical_20":true,"permanent_work_disability":true,"median_work_disability_days":true},"swelling":{"sjc":true,"acr_sjc":true},"well being":{"patient_global_das":true,"physician_global_das":true,"discontinued_ae":true,"haq":true,"sf36_mental_20":true},"biomarker":{"apr":true,"esr":true},"improvement":{"sub_acr_20":true,"acr_20":true,"acr_50":true,"acr_70":true,"sf36_physical_20":true,"sf36_mental_20":true,"remission":true},"adverse event":{"discontinued_ae":true,"serious_ae":true,"ae":true},"satisfaction":{"discontinued_efficacy":true},"remission":{"remission":true},"work":{"permanent_work_disability":true,"median_work_disability_days":true}}
  ,tagDescriptions: {"pain":{"name":"pain","description":"Pain, including tenderness in joints and self-reported pain.","name_friendly":"Pain","name_short":"Pain"},"function":{"name":"function","description":"Ability to do daily activities, a combination of how you feel and how well your joints are working.","name_friendly":"Physical function","name_short":"Physical function"},"improvement":{"name":"improvement","description":"Overall improvement, usually measured by looking at a combination of swelling, pain, RA disease activity, and how you're feeling.","name_friendly":"Overall improvement","name_short":"Overall improvement"},"satisfaction":{"name":"satisfaction","description":"Satisfaction with how well a treatment is working.","name_friendly":"Satisfaction","name_short":"Satisfaction"},"swelling":{"name":"swelling","description":"","name_friendly":"Swollen joints","name_short":"Swelling"},"biomarker":{"name":"biomarker","description":"","name_friendly":"Lab results","name_short":"Lab results"},"adverse event":{"name":"adverse event","description":"Side effects, adverse events (undesirable outcomes), etc.","name_friendly":"Side effects","name_short":"Side effects"},"well being":{"name":"well being","description":"?","name_friendly":"Well being","name_short":"Well being"},"remission":{"name":"remission","description":"When arthritis activity has gone away, and people experience little pain and swelling.","name_friendly":"Remission","name_short":"Remission"},"work":{"name":"work","description":"Ability to work.","name_friendly":"Work","name_short":"Work"}}
  ,data: {"etanercept":[{"which":"comparison","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"acr_50","metric":"ar_1000","grade":"3","value":{"value":405,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"acr_50","metric":"ar_1000","grade":"3","value":{"value":793,"value_ci_low":538,"value_ci_high":1000},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"acr_50","metric":"rr","grade":"3","value":{"value":1.96,"value_ci_low":1.33,"value_ci_high":2.89},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"acr_50","metric":"abs_difference","grade":"3","value":{"value":0.38,"value_ci_low":0.13,"value_ci_high":0.59},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"acr_50","metric":"rel_difference","grade":"3","value":{"value":0.96,"value_ci_low":0.33,"value_ci_high":1.89},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"comparison","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"remission","metric":"ar_1000","grade":"4","value":{"value":236,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"52","high":"156","interval":"week"},"dosage":{"dosage":"","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"remission","metric":"ar_1000","grade":"4","value":{"value":454,"value_ci_low":378,"value_ci_high":546},"duration":{"low":"52","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"remission","metric":"rr","grade":"4","value":{"value":1.92,"value_ci_low":1.6,"value_ci_high":2.31},"duration":{"low":"52","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"remission","metric":"abs_difference","grade":"4","value":{"value":0.22,"value_ci_low":0.17,"value_ci_high":0.27},"duration":{"low":"52","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"remission","metric":"rel_difference","grade":"4","value":{"value":1.22,"value_ci_low":0.5,"value_ci_high":2.29},"duration":{"low":"52","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"comparison","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"haq","metric":"mean_score_difference","grade":"4","value":{"value":null,"value_ci_low":-0.72,"value_ci_high":-0.15},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"haq","metric":"mean_score_difference","grade":"4","value":{"value":-0.36,"value_ci_low":-0.43,"value_ci_high":-0.28},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"haq","metric":"abs_difference","grade":"4","value":{"value":-0.12,"value_ci_low":-0.16,"value_ci_high":-0.02},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"haq","metric":"rel_difference","grade":"4","value":{"value":0.57,"value_ci_low":0.05,"value_ci_high":0.76},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"comparison","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"discontinued_ae","metric":"ar_1000","grade":"3","value":{"value":158,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"discontinued_ae","metric":"ar_1000","grade":"3","value":{"value":118,"value_ci_low":90,"value_ci_high":158},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"discontinued_ae","metric":"rr","grade":"3","value":{"value":0.75,"value_ci_low":0.57,"value_ci_high":1},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"discontinued_ae","metric":"abs_difference","grade":"3","value":{"value":-0.04,"value_ci_low":-0.08,"value_ci_high":0},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"discontinued_ae","metric":"rel_difference","grade":"3","value":{"value":-0.25,"value_ci_low":-0.43,"value_ci_high":0},"duration":{"low":"52","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"comparison","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"serious_ae","metric":"ar_1000","grade":"3","value":{"value":141,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"serious_ae","metric":"ar_1000","grade":"3","value":{"value":176,"value_ci_low":104,"value_ci_high":297},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"serious_ae","metric":"rr","grade":"3","value":{"value":1.25,"value_ci_low":0.74,"value_ci_high":2.11},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"serious_ae","metric":"abs_difference","grade":"3","value":{"value":0.05,"value_ci_low":-0.04,"value_ci_high":0.13},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"serious_ae","metric":"rel_difference","grade":"3","value":{"value":0.25,"value_ci_low":-0.26,"value_ci_high":1.11},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"comparison","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"serious_infection","metric":"ar_1000","grade":"4","value":{"value":49,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"52","high":"156","interval":"week"},"dosage":{"dosage":"","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"serious_infection","metric":"ar_1000","grade":"4","value":{"value":45,"value_ci_low":27,"value_ci_high":77},"duration":{"low":"52","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"serious_infection","metric":"rr","grade":"4","value":{"value":0.91,"value_ci_low":0.54,"value_ci_high":1.55},"duration":{"low":"52","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"serious_infection","metric":"abs_difference","grade":"4","value":{"value":-0.05,"value_ci_low":-0.03,"value_ci_high":0.02},"duration":{"low":"52","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"serious_infection","metric":"rel_difference","grade":"4","value":{"value":-0.09,"value_ci_low":-0.46,"value_ci_high":0.55},"duration":{"low":"52","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"infection of any kind","measure":"ae","metric":"ar_100","grade":"","value":{"value":39,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"infection of any kind","measure":"ae","metric":"ar_100","grade":"","value":{"value":50,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"upper respiratory infection","measure":"ae","metric":"ar_100","grade":"","value":{"value":30,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"upper respiratory infection","measure":"ae","metric":"ar_100","grade":"","value":{"value":38,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"non-upper respiratory infection","measure":"ae","metric":"ar_100","grade":"","value":{"value":15,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"non-upper respiratory infection","measure":"ae","metric":"ar_100","grade":"","value":{"value":21,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"injection site reaction","measure":"ae","metric":"ar_100","grade":"","value":{"value":11,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"injection site reaction","measure":"ae","metric":"ar_100","grade":"","value":{"value":37,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"diarrhea","measure":"ae","metric":"ar_100","grade":"","value":{"value":9,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"diarrhea","measure":"ae","metric":"ar_100","grade":"","value":{"value":8,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"rash","measure":"ae","metric":"ar_100","grade":"","value":{"value":2,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"rash","measure":"ae","metric":"ar_100","grade":"","value":{"value":3,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"itching","measure":"ae","metric":"ar_100","grade":"","value":{"value":1,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"itching","measure":"ae","metric":"ar_100","grade":"","value":{"value":2,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"fever","measure":"ae","metric":"ar_100","grade":"","value":{"value":0,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"fever","measure":"ae","metric":"ar_100","grade":"","value":{"value":3,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"hives","measure":"ae","metric":"ar_100","grade":"","value":{"value":1,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["placebo"],"measure_detail":"hives","measure":"ae","metric":"ar_100","grade":"","value":{"value":0,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"infection of any kind","measure":"ae","metric":"ar_100","grade":"","value":{"value":86,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"infection of any kind","measure":"ae","metric":"ar_100","grade":"","value":{"value":81,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"upper respiratory infection","measure":"ae","metric":"ar_100","grade":"","value":{"value":70,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"upper respiratory infection","measure":"ae","metric":"ar_100","grade":"","value":{"value":65,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"non-upper respiratory infection","measure":"ae","metric":"ar_100","grade":"","value":{"value":59,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"non-upper respiratory infection","measure":"ae","metric":"ar_100","grade":"","value":{"value":54,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"injection site reaction","measure":"ae","metric":"ar_100","grade":"","value":{"value":18,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"injection site reaction","measure":"ae","metric":"ar_100","grade":"","value":{"value":43,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"diarrhea","measure":"ae","metric":"ar_100","grade":"","value":{"value":16,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"diarrhea","measure":"ae","metric":"ar_100","grade":"","value":{"value":16,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"rash","measure":"ae","metric":"ar_100","grade":"","value":{"value":19,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"rash","measure":"ae","metric":"ar_100","grade":"","value":{"value":13,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"itching","measure":"ae","metric":"ar_100","grade":"","value":{"value":5,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"itching","measure":"ae","metric":"ar_100","grade":"","value":{"value":5,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"fever","measure":"ae","metric":"ar_100","grade":"","value":{"value":4,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"fever","measure":"ae","metric":"ar_100","grade":"","value":{"value":2,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"hives","measure":"ae","metric":"ar_100","grade":"","value":{"value":4,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"hives","measure":"ae","metric":"ar_100","grade":"","value":{"value":2,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"comparison","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"hypersensitivity","measure":"ae","metric":"ar_100","grade":"","value":{"value":1,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"},{"which":"intervention","population":null,"intervention":["etanercept"],"comparison":["methotrexate"],"measure_detail":"hypersensitivity","measure":"ae","metric":"ar_100","grade":"","value":{"value":1,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"2","high":"2","interval":"year"},"dosage":{"dosage":"","dosage_form":["subcutaneous"],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a002b40c-097d-47a5-957f-7a7b1807af7f","notes":"","kind":"drug company data"}],"methotrexate":[{"which":"comparison","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"acr_50","metric":"ar_100","grade":"3","value":{"value":8,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"52","high":"52","interval":"week"},"dosage":{"dosage":"","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"acr_50","metric":"ar_100","grade":"3","value":{"value":23,"value_ci_low":12,"value_ci_high":46},"duration":{"low":"52","high":"52","interval":"week"},"dosage":{"dosage":"5 mg-25 mg","dosage_form":["oral","parenteral"],"dosage_frequency":"1","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"acr_50","metric":"rr","grade":"3","value":{"value":3,"value_ci_low":1.5,"value_ci_high":6},"duration":{"low":"52","high":"52","interval":"week"},"dosage":{"dosage":"5 mg-25 mg","dosage_form":["oral","parenteral"],"dosage_frequency":"1","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"acr_50","metric":"abs_difference","grade":"3","value":{"value":0.15,"value_ci_low":0.08,"value_ci_high":0.23},"duration":{"low":"52","high":"52","interval":"week"},"dosage":{"dosage":"5 mg-25 mg","dosage_form":["oral","parenteral"],"dosage_frequency":"1","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"acr_50","metric":"rel_difference","grade":"3","value":{"value":2.03,"value_ci_low":0.53,"value_ci_high":4.98},"duration":{"low":"52","high":"52","interval":"week"},"dosage":{"dosage":"5 mg-25 mg","dosage_form":["oral","parenteral"],"dosage_frequency":"1","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"},{"which":"comparison","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"remssion","metric":"ar_100","grade":"2","value":{"value":0,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"18","high":"18","interval":"week"},"dosage":{"dosage":"","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"remssion","metric":"ar_100","grade":"2","value":{"value":0,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"18","high":"18","interval":"week"},"dosage":{"dosage":"5 mg-25 mg","dosage_form":["oral","parenteral"],"dosage_frequency":"1","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"},{"which":"comparison","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"haq","metric":"mean_score","grade":"3","value":{"value":1,"value_ci_low":0.53,"value_ci_high":1.34},"duration":{"low":"12","high":"52","interval":"week"},"dosage":{"dosage":"","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"haq","metric":"mean_score","grade":"3","value":{"value":1.3,"value_ci_low":0.92,"value_ci_high":1.5},"duration":{"low":"12","high":"52","interval":"week"},"dosage":{"dosage":"5 mg-25 mg","dosage_form":["oral","parenteral"],"dosage_frequency":"1","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"haq","metric":"mean_score_difference","grade":"3","value":{"value":-0.27,"value_ci_low":-0.39,"value_ci_high":-0.16},"duration":{"low":"12","high":"52","interval":"week"},"dosage":{"dosage":"5 mg-25 mg","dosage_form":["oral","parenteral"],"dosage_frequency":"1","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"haq","metric":"abs_difference","grade":"3","value":{"value":-0.09,"value_ci_low":-0.13,"value_ci_high":-0.05},"duration":{"low":"12","high":"52","interval":"week"},"dosage":{"dosage":"5 mg-25 mg","dosage_form":["oral","parenteral"],"dosage_frequency":"1","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"haq","metric":"rel_difference","grade":"3","value":{"value":0.2,"value_ci_low":0.29,"value_ci_high":0.12},"duration":{"low":"12","high":"52","interval":"week"},"dosage":{"dosage":"5 mg-25 mg","dosage_form":["oral","parenteral"],"dosage_frequency":"1","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"},{"which":"comparison","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"sf36_physical_20","metric":"ar_100","grade":"3","value":{"value":27,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"52","high":"52","interval":"week"},"dosage":{"dosage":"","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"sf36_physical_20","metric":"ar_100","grade":"3","value":{"value":39,"value_ci_low":27,"value_ci_high":57},"duration":{"low":"52","high":"52","interval":"week"},"dosage":{"dosage":"5 mg-25 mg","dosage_form":["oral","parenteral"],"dosage_frequency":"1","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"sf36_physical_20","metric":"rr","grade":"3","value":{"value":1.5,"value_ci_low":1,"value_ci_high":2.1},"duration":{"low":"52","high":"52","interval":"week"},"dosage":{"dosage":"5 mg-25 mg","dosage_form":["oral","parenteral"],"dosage_frequency":"1","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"sf36_physical_20","metric":"abs_difference","grade":"3","value":{"value":0.12,"value_ci_low":0.01,"value_ci_high":0.24},"duration":{"low":"52","high":"52","interval":"week"},"dosage":{"dosage":"5 mg-25 mg","dosage_form":["oral","parenteral"],"dosage_frequency":"1","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"sf36_physical_20","metric":"rel_difference","grade":"3","value":{"value":0.5,"value_ci_low":0,"value_ci_high":1.12},"duration":{"low":"52","high":"52","interval":"week"},"dosage":{"dosage":"5 mg-25 mg","dosage_form":["oral","parenteral"],"dosage_frequency":"1","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"},{"which":"comparison","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"sf36_mental_20","metric":"ar_100","grade":"3","value":{"value":21,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"52","high":"52","interval":"week"},"dosage":{"dosage":"","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"sf36_mental_20","metric":"ar_100","grade":"3","value":{"value":26,"value_ci_low":16,"value_ci_high":41},"duration":{"low":"52","high":"52","interval":"week"},"dosage":{"dosage":"5 mg-25 mg","dosage_form":["oral","parenteral"],"dosage_frequency":"1","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"sf36_mental_20","metric":"rr","grade":"3","value":{"value":1.3,"value_ci_low":0.79,"value_ci_high":2},"duration":{"low":"52","high":"52","interval":"week"},"dosage":{"dosage":"5 mg-25 mg","dosage_form":["oral","parenteral"],"dosage_frequency":"1","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"sf36_mental_20","metric":"abs_difference","grade":"3","value":{"value":0.05,"value_ci_low":-0.05,"value_ci_high":0.16},"duration":{"low":"52","high":"52","interval":"week"},"dosage":{"dosage":"5 mg-25 mg","dosage_form":["oral","parenteral"],"dosage_frequency":"1","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"sf36_mental_20","metric":"rel_difference","grade":"3","value":{"value":0.25,"value_ci_low":-0.21,"value_ci_high":0.98},"duration":{"low":"52","high":"52","interval":"week"},"dosage":{"dosage":"5 mg-25 mg","dosage_form":["oral","parenteral"],"dosage_frequency":"1","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"},{"which":"comparison","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"discontinued_ae","metric":"ar_100","grade":"4","value":{"value":8,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"12","high":"52","interval":"week"},"dosage":{"dosage":"","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"discontinued_ae","metric":"ar_100","grade":"4","value":{"value":16,"value_ci_low":10,"value_ci_high":25},"duration":{"low":"12","high":"52","interval":"week"},"dosage":{"dosage":"5 mg-25 mg","dosage_form":["oral","parenteral"],"dosage_frequency":"1","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"discontinued_ae","metric":"rr","grade":"4","value":{"value":2.1,"value_ci_low":1.3,"value_ci_high":3.3},"duration":{"low":"12","high":"52","interval":"week"},"dosage":{"dosage":"5 mg-25 mg","dosage_form":["oral","parenteral"],"dosage_frequency":"1","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"discontinued_ae","metric":"abs_difference","grade":"4","value":{"value":0.09,"value_ci_low":0.03,"value_ci_high":0.14},"duration":{"low":"12","high":"52","interval":"week"},"dosage":{"dosage":"5 mg-25 mg","dosage_form":["oral","parenteral"],"dosage_frequency":"1","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"discontinued_ae","metric":"rel_difference","grade":"4","value":{"value":1.06,"value_ci_low":0.3,"value_ci_high":2.25},"duration":{"low":"12","high":"52","interval":"week"},"dosage":{"dosage":"5 mg-25 mg","dosage_form":["oral","parenteral"],"dosage_frequency":"1","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"},{"which":"comparison","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"serious_ae","metric":"ar_100","grade":"3","value":{"value":2,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"52","high":"52","interval":"week"},"dosage":{"dosage":"","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"serious_ae","metric":"ar_100","grade":"3","value":{"value":3,"value_ci_low":1,"value_ci_high":14},"duration":{"low":"52","high":"52","interval":"week"},"dosage":{"dosage":"5 mg-25 mg","dosage_form":["oral","parenteral"],"dosage_frequency":"1","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"serious_ae","metric":"rr","grade":"3","value":{"value":1.4,"value_ci_low":0.36,"value_ci_high":5.7},"duration":{"low":"52","high":"52","interval":"week"},"dosage":{"dosage":"5 mg-25 mg","dosage_form":["oral","parenteral"],"dosage_frequency":"1","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"serious_ae","metric":"abs_difference","grade":"3","value":{"value":0.01,"value_ci_low":-0.03,"value_ci_high":0.04},"duration":{"low":"52","high":"52","interval":"week"},"dosage":{"dosage":"5 mg-25 mg","dosage_form":["oral","parenteral"],"dosage_frequency":"1","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["methotrexate"],"comparison":["placebo"],"measure_detail":null,"measure":"serious_ae","metric":"rel_difference","grade":"3","value":{"value":0.44,"value_ci_low":-0.64,"value_ci_high":4.74},"duration":{"low":"52","high":"52","interval":"week"},"dosage":{"dosage":"5 mg-25 mg","dosage_form":["oral","parenteral"],"dosage_frequency":"1","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/24916606","notes":"\"People with a diagnosis of RA that was severe and of long duration, who had a high prevalence of positive rheumatoid factor (RF), and had previously failed other second line disease-modifying antirheumatic drug (DMARD) therapy.\"","kind":"systematic review"}],"finraco":[{"which":"intervention","population":["Remission after 6 months of treatment"],"intervention":["methotrexate","sulfasalazine","hydroxychloroquine","prednisolone"],"comparison":[""],"measure_detail":null,"measure":"remission","metric":"ar_100","grade":"","value":{"value":26,"value_ci_low":null,"value_ci_high":null,"value_sd":null,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"intervention","population":["Remission after 6 months of treatment"],"intervention":["sulfasalazine","prednisolone (optional)","switch to methotrexate if inadequate response on sulfasalazine"],"comparison":[""],"measure_detail":null,"measure":"remission","metric":"ar_100","grade":"","value":{"value":11,"value_ci_low":null,"value_ci_high":null,"value_sd":null,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"intervention","population":["ACR 50 after 6 months of treatment"],"intervention":["methotrexate","sulfasalazine","hydroxychloroquine","prednisolone"],"comparison":[""],"measure_detail":null,"measure":"acr_50","metric":"ar_100","grade":"","value":{"value":42,"value_ci_low":null,"value_ci_high":null,"value_sd":null,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"intervention","population":["ACR 50 after 6 months of treatment"],"intervention":["sulfasalazine","prednisolone (optional)","switch to methotrexate if inadequate response on sulfasalazine"],"comparison":[""],"measure_detail":null,"measure":"acr_50","metric":"ar_100","grade":"","value":{"value":41,"value_ci_low":null,"value_ci_high":null,"value_sd":null,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"intervention","population":["ACR 20 after 6 months of treatment"],"intervention":["methotrexate","sulfasalazine","hydroxychloroquine","prednisolone"],"comparison":[""],"measure_detail":null,"measure":"acr_20","metric":"ar_100","grade":"","value":{"value":12,"value_ci_low":null,"value_ci_high":null,"value_sd":null,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"intervention","population":["ACR 20 after 6 months of treatment"],"intervention":["sulfasalazine","prednisolone (optional)","switch to methotrexate if inadequate response on sulfasalazine"],"comparison":[""],"measure_detail":null,"measure":"acr_20","metric":"ar_100","grade":"","value":{"value":25,"value_ci_low":null,"value_ci_high":null,"value_sd":null,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"intervention","population":["Less than ACR 20 after 6 months of treatment"],"intervention":["methotrexate","sulfasalazine","hydroxychloroquine","prednisolone"],"comparison":[""],"measure_detail":null,"measure":"sub_acr_20","metric":"ar_100","grade":"","value":{"value":21,"value_ci_low":null,"value_ci_high":null,"value_sd":null,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"intervention","population":["Less than ACR 20 after 6 months of treatment"],"intervention":["sulfasalazine","prednisolone (optional)","switch to methotrexate if inadequate response on sulfasalazine"],"comparison":[""],"measure_detail":null,"measure":"sub_acr_20","metric":"ar_100","grade":"","value":{"value":23,"value_ci_low":null,"value_ci_high":null,"value_sd":null,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["Remission after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"patient_global_das","metric":"mean_score_100","grade":"","value":{"value":4,"value_ci_low":null,"value_ci_high":null,"value_sd":5,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["ACR 50 after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"patient_global_das","metric":"mean_score_100","grade":"","value":{"value":16,"value_ci_low":null,"value_ci_high":null,"value_sd":14,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["ACR 20 after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"patient_global_das","metric":"mean_score_100","grade":"","value":{"value":31,"value_ci_low":null,"value_ci_high":null,"value_sd":19,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["Less than ACR 20 after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"patient_global_das","metric":"mean_score_100","grade":"","value":{"value":47,"value_ci_low":null,"value_ci_high":null,"value_sd":43,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["Remission after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"physician_global_das","metric":"mean_score_100","grade":"","value":{"value":1,"value_ci_low":null,"value_ci_high":null,"value_sd":4,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["ACR 50 after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"physician_global_das","metric":"mean_score_100","grade":"","value":{"value":11,"value_ci_low":null,"value_ci_high":null,"value_sd":8,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["ACR 20 after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"physician_global_das","metric":"mean_score_100","grade":"","value":{"value":28,"value_ci_low":null,"value_ci_high":null,"value_sd":14,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["Less than ACR 20 after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"physician_global_das","metric":"mean_score_100","grade":"","value":{"value":38,"value_ci_low":null,"value_ci_high":null,"value_sd":19,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["Remission after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"pain","metric":"mean_score_100","grade":"","value":{"value":3,"value_ci_low":null,"value_ci_high":null,"value_sd":5,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["ACR 50 after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"pain","metric":"mean_score_100","grade":"","value":{"value":15,"value_ci_low":null,"value_ci_high":null,"value_sd":15,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["ACR 20 after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"pain","metric":"mean_score_100","grade":"","value":{"value":27,"value_ci_low":null,"value_ci_high":null,"value_sd":17,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["Less than ACR 20 after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"pain","metric":"mean_score_100","grade":"","value":{"value":40,"value_ci_low":null,"value_ci_high":null,"value_sd":23,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["Remission after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"haq","metric":"mean_score","grade":"","value":{"value":0,"value_ci_low":null,"value_ci_high":null,"value_sd":0.2,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["ACR 50 after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"haq","metric":"mean_score","grade":"","value":{"value":0.2,"value_ci_low":null,"value_ci_high":null,"value_sd":0.3,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["ACR 20 after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"haq","metric":"mean_score","grade":"","value":{"value":0.4,"value_ci_low":null,"value_ci_high":null,"value_sd":0.4,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["Less than ACR 20 after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"haq","metric":"mean_score","grade":"","value":{"value":0.6,"value_ci_low":null,"value_ci_high":null,"value_sd":0.5,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["Remission after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"tjc","metric":"mean_score","grade":"","value":{"value":0,"value_ci_low":null,"value_ci_high":null,"value_sd":null,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["ACR 50 after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"tjc","metric":"mean_score","grade":"","value":{"value":4,"value_ci_low":null,"value_ci_high":null,"value_sd":2,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["ACR 20 after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"tjc","metric":"mean_score","grade":"","value":{"value":10,"value_ci_low":null,"value_ci_high":null,"value_sd":5,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["Less than ACR 20 after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"tjc","metric":"mean_score","grade":"","value":{"value":15,"value_ci_low":null,"value_ci_high":null,"value_sd":7,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["Remission after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"sjc","metric":"mean_score","grade":"","value":{"value":0,"value_ci_low":null,"value_ci_high":null,"value_sd":null,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["ACR 50 after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"sjc","metric":"mean_score","grade":"","value":{"value":2,"value_ci_low":null,"value_ci_high":null,"value_sd":2,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["ACR 20 after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"sjc","metric":"mean_score","grade":"","value":{"value":5,"value_ci_low":null,"value_ci_high":null,"value_sd":5,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["Less than ACR 20 after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"sjc","metric":"mean_score","grade":"","value":{"value":8,"value_ci_low":null,"value_ci_high":null,"value_sd":7,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"6","high":"","interval":"month"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["Remission after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"permanent_work_disability","metric":"ar_100","grade":"","value":{"value":0,"value_ci_low":null,"value_ci_high":null,"value_sd":null,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"5","high":"","interval":"year"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["ACR 50 after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"permanent_work_disability","metric":"ar_100","grade":"","value":{"value":23,"value_ci_low":null,"value_ci_high":null,"value_sd":null,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"5","high":"","interval":"year"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["ACR 20 after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"permanent_work_disability","metric":"ar_100","grade":"","value":{"value":21,"value_ci_low":null,"value_ci_high":null,"value_sd":null,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"5","high":"","interval":"year"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["Less than ACR 20 after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"permanent_work_disability","metric":"ar_100","grade":"","value":{"value":54,"value_ci_low":null,"value_ci_high":null,"value_sd":null,"value_iqr_low":null,"value_iqr_high":null},"duration":{"low":"5","high":"","interval":"year"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["Remission after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"median_work_disability_days","metric":"count","grade":"","value":{"value":0,"value_ci_low":null,"value_ci_high":null,"value_sd":null,"value_iqr_low":0,"value_iqr_high":3},"duration":{"low":"5","high":"","interval":"year"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["ACR 50 after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"median_work_disability_days","metric":"count","grade":"","value":{"value":4,"value_ci_low":null,"value_ci_high":null,"value_sd":null,"value_iqr_low":0,"value_iqr_high":131},"duration":{"low":"5","high":"","interval":"year"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["ACR 20 after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"median_work_disability_days","metric":"count","grade":"","value":{"value":15,"value_ci_low":null,"value_ci_high":null,"value_sd":null,"value_iqr_low":0,"value_iqr_high":170},"duration":{"low":"5","high":"","interval":"year"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"},{"which":"population","population":["Less than ACR 20 after 6 months of treatment"],"intervention":[""],"comparison":[""],"measure_detail":null,"measure":"median_work_disability_days","metric":"count","grade":"","value":{"value":337,"value_ci_low":null,"value_ci_high":null,"value_sd":null,"value_iqr_low":27,"value_iqr_high":365},"duration":{"low":"5","high":"","interval":"year"},"dosage":{"dosage":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/15641055","notes":"","kind":"randomized trial"}],"etanercept":[{"which":"comparison","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"acr_50","metric":"ar_1000","grade":"3","value":{"value":405,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"acr_50","metric":"ar_1000","grade":"3","value":{"value":793,"value_ci_low":538,"value_ci_high":1000},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"acr_50","metric":"rr","grade":"3","value":{"value":1.96,"value_ci_low":1.33,"value_ci_high":2.89},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"acr_50","metric":"abs_difference","grade":"3","value":{"value":0.38,"value_ci_low":0.13,"value_ci_high":0.59},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"acr_50","metric":"rel_difference","grade":"3","value":{"value":0.96,"value_ci_low":0.33,"value_ci_high":1.89},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"comparison","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"remission","metric":"ar_1000","grade":"4","value":{"value":236,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"52","high":"156","interval":"week"},"dosage":{"dosage":"","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"remission","metric":"ar_1000","grade":"4","value":{"value":454,"value_ci_low":378,"value_ci_high":546},"duration":{"low":"52","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"remission","metric":"rr","grade":"4","value":{"value":1.92,"value_ci_low":1.6,"value_ci_high":2.31},"duration":{"low":"52","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"remission","metric":"abs_difference","grade":"4","value":{"value":0.22,"value_ci_low":0.17,"value_ci_high":0.27},"duration":{"low":"52","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"remission","metric":"rel_difference","grade":"4","value":{"value":1.22,"value_ci_low":0.5,"value_ci_high":2.29},"duration":{"low":"52","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"comparison","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"haq","metric":"mean_score_difference","grade":"4","value":{"value":null,"value_ci_low":-0.72,"value_ci_high":-0.15},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"haq","metric":"mean_score_difference","grade":"4","value":{"value":-0.36,"value_ci_low":-0.43,"value_ci_high":-0.28},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"haq","metric":"abs_difference","grade":"4","value":{"value":-0.12,"value_ci_low":-0.16,"value_ci_high":-0.02},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"haq","metric":"rel_difference","grade":"4","value":{"value":0.57,"value_ci_low":0.05,"value_ci_high":0.76},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"comparison","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"discontinued_ae","metric":"ar_1000","grade":"3","value":{"value":158,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"discontinued_ae","metric":"ar_1000","grade":"3","value":{"value":118,"value_ci_low":90,"value_ci_high":158},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"discontinued_ae","metric":"rr","grade":"3","value":{"value":0.75,"value_ci_low":0.57,"value_ci_high":1},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"discontinued_ae","metric":"abs_difference","grade":"3","value":{"value":-0.04,"value_ci_low":-0.08,"value_ci_high":0},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"discontinued_ae","metric":"rel_difference","grade":"3","value":{"value":-0.25,"value_ci_low":-0.43,"value_ci_high":0},"duration":{"low":"52","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"comparison","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"serious_ae","metric":"ar_1000","grade":"3","value":{"value":141,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"","high":"","interval":""},"dosage":{"dosage":"","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"serious_ae","metric":"ar_1000","grade":"3","value":{"value":176,"value_ci_low":104,"value_ci_high":297},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"serious_ae","metric":"rr","grade":"3","value":{"value":1.25,"value_ci_low":0.74,"value_ci_high":2.11},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"serious_ae","metric":"abs_difference","grade":"3","value":{"value":0.05,"value_ci_low":-0.04,"value_ci_high":0.13},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"serious_ae","metric":"rel_difference","grade":"3","value":{"value":0.25,"value_ci_low":-0.26,"value_ci_high":1.11},"duration":{"low":"24","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"comparison","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"serious_infection","metric":"ar_1000","grade":"4","value":{"value":49,"value_ci_low":null,"value_ci_high":null},"duration":{"low":"52","high":"156","interval":"week"},"dosage":{"dosage":"","dosage_form":[""],"dosage_frequency":"","dosage_multiple":"","dosage_interval":""},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"serious_infection","metric":"ar_1000","grade":"4","value":{"value":45,"value_ci_low":27,"value_ci_high":77},"duration":{"low":"52","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"serious_infection","metric":"rr","grade":"4","value":{"value":0.91,"value_ci_low":0.54,"value_ci_high":1.55},"duration":{"low":"52","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"serious_infection","metric":"abs_difference","grade":"4","value":{"value":-0.05,"value_ci_low":-0.03,"value_ci_high":0.02},"duration":{"low":"52","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"},{"which":"intervention","population":null,"intervention":["etanercept","dmard"],"comparison":["dmard only"],"measure_detail":"","measure":"serious_infection","metric":"rel_difference","grade":"4","value":{"value":-0.09,"value_ci_low":-0.46,"value_ci_high":0.55},"duration":{"low":"52","high":"156","interval":"week"},"dosage":{"dosage":"25 mg","dosage_form":["subcutaneous"],"dosage_frequency":"2","dosage_multiple":"","dosage_interval":"week"},"source":"http://www.ncbi.nlm.nih.gov/pubmed/23728649","notes":"","kind":"systematic review"}]}
}

module.exports = mockData;
},{}],33:[function(require,module,exports){
var _ = require('lodash');

var preferences = {
  'alcohol': {
    'key': 'risks.alcohol',
    'name': 'Alcohol-friendly',
    'type': 'boolean',
    'description': 'If you drink alcohol',
    isMatch: function(object) {
      if (object) {
        if (object.risk == 2) {
          return 'unsafe';
        }
        if (object.risk == 1) {
          return 'possibly unsafe';
        }
        if (object.risk == 0) {
          return 'safe';
        }
      }
      return 'unknown';
    }
  },
  'cancer_treatment': {
    'key': 'risks.cancer_treatment',
    'name': 'Safer while in cancer treatment',
    'type': 'boolean',
    'description': 'If you’re undergoing cancer treatment with surgery, chemotherapy, or radiation therapy',
    isMatch: function(object) {
      if (object) {
        if (object.risk == 2) {
          return 'unsafe';
        }
        if (object.risk == 1) {
          return 'possibly unsafe';
        }
        if (object.risk == 0) {
          return 'safe';
        }
      }
      return 'unknown';
    }
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
    'description': 'preferred way of taking your medicine',
    isMatch: function(drugForms, selectedForms) {
      // console.log('DRUG FORMS FORMS', drugForms);
      // console.log('SELECTED FORMS', selectedForms);

      if (drugForms) {
        _.each(drugForms, function(form) {
          if (selectedForms[form.name] == true) {
            return false;
          }
        })
      }
      return true;
    },
  },
  'generic_available': {
    'key': 'generic_available',
    'name': 'Generic available (less expensive)',
    'type': 'boolean',
    'description': 'A cheaper, generic version is available',
    isMatch: function(genericAvailable) {
      if (genericAvailable === true) {
        return true;
      }
      if (genericAvailable === false) {
        return false;
      }
    }
  },
  'heart_failure': {
    'key': 'risks.heart_failure',
    'name': 'Safer for people with heart failure',
    'type': 'boolean',
    'description': 'if you have level III or IV heart failure',
    isMatch: function(object) {
      if (object) {
        if (object.risk == 2) {
          return 'unsafe';
        }
        if (object.risk == 1) {
          return 'possibly unsafe';
        }
        if (object.risk == 0) {
          return 'safe';
        }
      }
      return 'unknown';
    }
  },
  'kidney_disease': {
    'key': 'risks.kidney_disease',
    'name': 'Safer for kidney disease',
    'type': 'boolean',
    'description': 'if you have kidney disease',
    isMatch: function(object) {
      if (object) {
        if (object.risk == 2) {
          return 'unsafe';
        }
        if (object.risk == 1) {
          return 'possibly unsafe';
        }
        if (object.risk == 0) {
          return 'safe';
        }
      }
      return 'unknown';
    }
  },
  'liver_disease': {
    'key': 'risks.liver_disease',
    'name': 'Safer for liver disease',
    'type': 'boolean',
    'description': 'if you have liver disease',
    isMatch: function(object) {
      if (object) {
        if (object.risk == 2) {
          return 'unsafe';
        }
        if (object.risk == 1) {
          return 'possibly unsafe';
        }
        if (object.risk == 0) {
          return 'safe';
        }
      }
      return 'unknown';
    }
  },
  'pregnancy': {
    'key': 'risks.pregnancy',
    'name': 'Safer for pregnancy',
    'type': 'boolean',
    'description': 'if you’re pregnant or considering it',
    isMatch: function(object) {
      if (object) {
        if (object.risk == 2) {
          return 'unsafe';
        }
        if (object.risk == 1) {
          return 'possibly unsafe';
        }
        if (object.risk == 0) {
          return 'safe';
        }
      }
      return 'unknown';
    }
  },
  'tb': {
    'key': 'risks.tb',
    'name': 'Safer for tuberculosis',
    'type': 'boolean',
    'description': 'if you have or might be exposed to tuberculosis',
    isMatch: function(object) {
      if (object) {
        if (object.risk == 2) {
          return 'unsafe';
        }
        if (object.risk == 1) {
          return 'possibly unsafe';
        }
        if (object.risk == 0) {
          return 'safe';
        }
      }
      return 'unknown';
    }
  }
};

module.exports = preferences;
},{"lodash":"lodash"}],34:[function(require,module,exports){
// client.js

var React = require('react/addons');
var Router = require('react-router');
var routes = require('../routes.jsx');

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(React.createElement(Handler, null), document.getElementById('app'));
});
},{"../routes.jsx":35,"react-router":"react-router","react/addons":"react/addons"}],35:[function(require,module,exports){
// routes.jsx

var React = require('react/addons');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var AdverseEvents = require('./components/adverse/AdverseEvents.jsx');
var App = require('./components/App.jsx');
var Experiment = require('./components/Experiment.jsx');
var Navigator = require('./components/Navigator.jsx');
var OutcomeTimeline = require('./components/OutcomeTimeline.jsx');
var Processing = require('./components/Processing.jsx');
var Ptda = require('./components/ptda/Ptda.jsx');
var VisualizationSketches = require('./components/visualizations/VisualizationSketches.jsx');
var VisualizationTests = require('./components/visualizations/VisualizationTests.jsx');

var routes = (
  React.createElement(Route, {name: "home", path: "/", handler: App}, 
    React.createElement(DefaultRoute, {name: "experiment", handler: Experiment}), 
    React.createElement(Route, {name: "adverse", path: "/adverse", handler: AdverseEvents}), 
    React.createElement(Route, {name: "navigator", path: "/navigator", handler: Navigator}), 
    React.createElement(Route, {name: "outcometimeline", path: "/outcometimeline", handler: OutcomeTimeline}), 
    React.createElement(Route, {name: "processing", path: "/processing", handler: Processing}), 
    React.createElement(Route, {name: "ptda", path: "/ptda", handler: Ptda}), 
    React.createElement(Route, {name: "visualization-sketches", path: "/visualization-sketches", handler: VisualizationSketches}), 
    React.createElement(Route, {name: "visualization-tests", path: "/visualization-tests", handler: VisualizationTests})
  )
);

module.exports = routes;
},{"./components/App.jsx":1,"./components/Experiment.jsx":2,"./components/Navigator.jsx":3,"./components/OutcomeTimeline.jsx":7,"./components/Processing.jsx":8,"./components/adverse/AdverseEvents.jsx":9,"./components/ptda/Ptda.jsx":10,"./components/visualizations/VisualizationSketches.jsx":28,"./components/visualizations/VisualizationTests.jsx":29,"react-router":"react-router","react/addons":"react/addons"}],36:[function(require,module,exports){
/**
 * isMobile.js v0.3.5
 *
 * A simple library to detect Apple phones and tablets,
 * Android phones and tablets, other mobile devices (like blackberry, mini-opera and windows phone),
 * and any kind of seven inch device, via user agent sniffing.
 *
 * @author: Kai Mallea (kmallea@gmail.com)
 *
 * @license: http://creativecommons.org/publicdomain/zero/1.0/
 */
(function (global) {

    var apple_phone         = /iPhone/i,
        apple_ipod          = /iPod/i,
        apple_tablet        = /iPad/i,
        android_phone       = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, // Match 'Android' AND 'Mobile'
        android_tablet      = /Android/i,
        windows_phone       = /IEMobile/i,
        windows_tablet      = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, // Match 'Windows' AND 'ARM'
        other_blackberry    = /BlackBerry/i,
        other_blackberry_10 = /BB10/i,
        other_opera         = /Opera Mini/i,
        other_firefox       = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, // Match 'Firefox' AND 'Mobile'
        seven_inch = new RegExp(
            '(?:' +         // Non-capturing group

            'Nexus 7' +     // Nexus 7

            '|' +           // OR

            'BNTV250' +     // B&N Nook Tablet 7 inch

            '|' +           // OR

            'Kindle Fire' + // Kindle Fire

            '|' +           // OR

            'Silk' +        // Kindle Fire, Silk Accelerated

            '|' +           // OR

            'GT-P1000' +    // Galaxy Tab 7 inch

            ')',            // End non-capturing group

            'i');           // Case-insensitive matching

    var match = function(regex, userAgent) {
        return regex.test(userAgent);
    };

    var IsMobileClass = function(userAgent) {
        var ua = userAgent || navigator.userAgent;

        this.apple = {
            phone:  match(apple_phone, ua),
            ipod:   match(apple_ipod, ua),
            tablet: match(apple_tablet, ua),
            device: match(apple_phone, ua) || match(apple_ipod, ua) || match(apple_tablet, ua)
        };
        this.android = {
            phone:  match(android_phone, ua),
            tablet: !match(android_phone, ua) && match(android_tablet, ua),
            device: match(android_phone, ua) || match(android_tablet, ua)
        };
        this.windows = {
            phone:  match(windows_phone, ua),
            tablet: match(windows_tablet, ua),
            device: match(windows_phone, ua) || match(windows_tablet, ua)
        };
        this.other = {
            blackberry:   match(other_blackberry, ua),
            blackberry10: match(other_blackberry_10, ua),
            opera:        match(other_opera, ua),
            firefox:      match(other_firefox, ua),
            device:       match(other_blackberry, ua) || match(other_blackberry_10, ua) || match(other_opera, ua) || match(other_firefox, ua)
        };
        this.seven_inch = match(seven_inch, ua);
        this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch;
        // excludes 'other' devices and ipods, targeting touchscreen phones
        this.phone = this.apple.phone || this.android.phone || this.windows.phone;
        // excludes 7 inch devices, classifying as phone or tablet is left to the user
        this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet;

        if (typeof window === 'undefined') {
            return this;
        }
    };

    var instantiate = function() {
        var IM = new IsMobileClass();
        IM.Class = IsMobileClass;
        return IM;
    };

    if (typeof module != 'undefined' && module.exports && typeof window === 'undefined') {
        //node
        module.exports = IsMobileClass;
    } else if (typeof module != 'undefined' && module.exports && typeof window !== 'undefined') {
        //browserify
        module.exports = instantiate();
    } else if (typeof define === 'function' && define.amd) {
        //AMD
        define(global.isMobile = instantiate());
    } else {
        global.isMobile = instantiate();
    }

})(this);

},{}]},{},[34]);
