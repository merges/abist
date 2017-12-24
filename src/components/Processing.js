

var React = require('react');

// Data
var get = require('../data/get');
var medications = require('../data/medications');
var mockData = require('../data/mock');

var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;

var AbsoluteFrequency = require('./visualizations/AbsoluteFrequency');
var Difference = require('./visualizations/Difference');
var GradeQuality = require('./visualizations/GradeQuality');
var Intervention = require('./visualizations/Intervention');
var Population = require('./visualizations/Population');
var RelativeRiskComparison = require('./visualizations/RelativeRiskComparison');
var RiskRelativeToBaseline = require('./visualizations/RiskRelativeToBaseline');
var Source = require('./visualizations/Source');

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

var Processing = React.createClass({

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
        <section className='data'>
          <h2>{source} data</h2>
          <ul>
            {data[source].map(function (entry, i) {
              return (
                <li key={i}>
                  <h3>{i}</h3>
                  <p>{entry.which}</p>
                  <div>
                    <ul>
                      {Object.keys(entry).map(function (key, i) {
                        return (
                          <li key={i}>
                            <small>{key}</small>
                            {entry[key]}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
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
  		<div>
  			<strong>{durationString} {intervalString}</strong><br />
				<span className='light'>Researchers looked at {measure ? measure : 'this'} {durationString} {intervalString} after people started treatment.</span>
			</div>
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
			<div>
	    	{results.parts && <span>{results.parts.join(' + ')}<br /></span>}
	    	<small>{metrics[metric].name_short}</small><br />
	      <strong>{data.value.value}</strong> {metric == 'ar_100' && <span className='light'>of 100 people<br /></span>} {metric == 'ar_1000' && <span className='light'>of 1000 people<br /></span>}
	      {data.value.value_ci_low && data.value.value_ci_high &&
	      	<span>({data.value.value_ci_low} to {data.value.value_ci_high})</span>
	      }
	    </div>
		);
  },

  renderPercentage: function(results, metric, measure) {
  	var metrics = this.state.metrics;
  	var data = results[metric];

  	return (
  		<div>
	    	{results.parts && <span>{results.parts.join(' + ')}<br /></span>}
	      <small>{metrics[metric].name_short}</small><br />
	      <strong>{Math.round(data.value.value * 100) + '%'}</strong><br />
	      {data.value.value_ci_low && data.value.value_ci_high &&
	      	<span>({Math.round(data.value.value_ci_low * 100) + '%'} to {Math.round(data.value.value_ci_high * 100) + '%'})</span>
	      }
	    </div>
  	);
  },

  renderAbsoluteRisk: function(results, metric, measure, comparisonResults) {
  	var measures = this.state.measures;

  	var measure = results[metric].measure;
  	var data = results[metric].value;

  	var baseline = comparisonResults ? comparisonResults[metric].value.value : null;

		return (
  		<div>
        {results.parts && <span>{results.parts.join(' + ')}<br /></span>}
        <span className='light'>Outcome: {measures[measure].name_short}</span><br />
        <strong>{data.value && data.value}</strong> {metric == 'ar_100' && <span className='light'>of 100 people</span>} {metric == 'ar_1000' && <span className='light'>of 1000 people</span>}
        <AbsoluteFrequency frequency={data.value} metric={metric} denominator={100} breakpoint={20} baseline={baseline} />
        {data.value_ci_low && data.value_ci_high &&
	      	<span>({data.value_ci_low} to {data.value_ci_high})</span>
	      }
      </div>
  	);
  },

  renderDifference: function(results, metric, measure) {
  	var measures = this.state.measures;
  	var metrics = this.state.metrics;

  	var measure = results[metric].measure;
  	var data = results[metric].value;

    return (
    	<div>
        {results.parts && <span>{results.parts.join(' + ')}<br /></span>}
        <span className='light'>Outcome: {measures[measure].name_friendly}</span><br />
        <small>{metrics[metric].name_short}</small><br />
        {data.value && <Difference value={data.value} metric={metric} />}
        {data.value_ci_low && data.value_ci_high &&
          <span>({data.value_ci_low} to {data.value_ci_high})</span>
        }
      </div>
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

		var cx = require('classnames');
    var entryClasses = cx({
      'entry': true,
      'population': entry.which == 'population'
    });

    if (entry.which == 'comparison') {
    	return (
    		<li key={uniqueKey} className={entryClasses}>
	        <h4>
	        	<Intervention intervention={entry.intervention.parts.join(' + ')} dosage={entry.intervention.dosage} />
	        	<Source source={entry.source} kind={entry.kind} />
	        </h4>
	        <h4>
	        	<Intervention intervention={entry.comparison.parts.join(' + ')} dosage={entry.comparison.dosage} />
	        </h4>
	        <h4>{this.renderFollowUpTime(entry.duration, measures[entry.measure].name_short)}</h4>
	        <h4>
	        	{this.renderValue(entry.comparison)}
	        </h4>
	        <h4>
	        	{this.renderValue(entry.intervention, 'ar_100', entry.comparison)}
	        	{this.renderValue(entry.intervention, 'ar_1000', entry.comparison)}
	        	{this.renderValue(entry.intervention, 'mean_score', entry.comparison)}
	        	{this.renderValue(entry.intervention, 'mean_score_difference', entry.comparison)}
	        </h4>
	        <h4>
	        	{this.renderValue(entry.intervention, 'rr')}
	        	{this.renderValue(entry.intervention, 'or')}
	        </h4>
	        <h4>{this.renderValue(entry.intervention, 'abs_difference')}</h4>
	        <h4>{this.renderValue(entry.intervention, 'rel_difference')}</h4>
	        <h4><GradeQuality grade={entry.quality} gradeMap={grades} /></h4>
	      </li>
    	);
    }
    if (entry.which == 'population') {
    	return (
	      <li key={uniqueKey} className={entryClasses}>
	        <h4>
	        	<Population population={entry.population.parts.join(' + ')} dosage={entry.dosage} />
	          <Source source={entry.source} kind={entry.kind} />
	        </h4>
	        <h4></h4>
	        <h4>{this.renderFollowUpTime(entry.duration, measures[entry.measure].name_short)}</h4>
	        <h4></h4>
	        <h4>
	        	{this.renderValue(entry.population)}
	        </h4>
	        <h4>
	        	{this.renderValue(entry.population, 'rr')}
	        	{this.renderValue(entry.population, 'or')}
	        </h4>
	        <h4>{this.renderValue(entry.population, 'abs_difference')}</h4>
	        <h4>{this.renderValue(entry.population, 'rel_difference')}</h4>
	        <h4><GradeQuality grade={entry.quality} gradeMap={grades} /></h4>
	      </li>
	    );
    }
    return (
      <li key={uniqueKey} className={entryClasses}>
        <h4>
        	<Intervention intervention={entry.intervention.parts.join(' + ')} dosage={entry.intervention.dosage} />
          <Source source={entry.source} kind={entry.kind} />
        </h4>
        <h4></h4>
        <h4>{this.renderFollowUpTime(entry.duration, measures[entry.measure].name_short)}</h4>
        <h4></h4>
        <h4>
        	{this.renderValue(entry.intervention)}
        </h4>
        <h4>
        	{this.renderValue(entry.intervention, 'rr')}
        	{this.renderValue(entry.intervention, 'or')}
        </h4>
        <h4>{this.renderValue(entry.intervention, 'abs_difference')}</h4>
        <h4>{this.renderValue(entry.intervention, 'rel_difference')}</h4>
        <h4><GradeQuality grade={entry.quality} gradeMap={grades} /></h4>
      </li>
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
	    			<ul className='visualization-rr'>
	    				<li>
	    					<h3><strong>relative risk</strong> › {measureMap[measure].name_friendly}</h3>
	    				</li>
	    				<li>
			    			<RelativeRiskComparison
			    				baseline={sources[comparison].baseline}
			    				items={sources[comparison].items}
			    				measure={measure} />
			    		</li>
			    	</ul>
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
	    			<ul className='visualization-rr'>
	    				<li>
	    					<h3><strong>relative risk</strong> › {measureMap[measure].name_friendly}</h3>
	    				</li>
	    				<li>
			    			<RiskRelativeToBaseline
			    				comparison={sources[comparison].comparison}
			    				items={sources[comparison].items}
			    				measure={measure}
			    				measures={measureMap} />
			    		</li>
			    	</ul>
	    		);
	    	}
	    })
		};

  	return Object.keys(measures).map(function (measure) {
  		var measureData = measures[measure].data;

  		if (measureData) {
  			var entries = getEntriesForMeasure(measureData);

  			return (
	  			<div key={measure}>
		    		<h3>
		          <strong>{measureMap[measure].name_short}</strong> {measureMap[measure].name_friendly && <span>| {measureMap[measure].name_friendly}</span>}
		          {measureMap[measure].description && <p>{measureMap[measure].description}</p>}
		        </h3>

		     		{(measure == 'acr_20' || measure == 'acr_50' || measure == 'discontinued_ae') && renderRiskRelativeToBaselineComparison(entries, measure)}

		        <ul>
		          <li>
		            <h3 className='text'>Intervention / Population</h3>
		            <h3 className='text'>Comparison</h3>
		            <h3 className='text'>Follow-up</h3>
		            <h3>
		              Assumed risk<br />
		              <small>The expected number. (Usually for people in the control, placebo (sugar pill), or comparison group.)</small>
		            </h3>
		            <h3>
		              Corresponding risk<br />
		              (95% CI)<br />
		              <small>The number found by researchers when looking at the <em>intervention</em>. (Usually shows how effective the intervention was.)</small>
		            </h3>
		            <h3 className='text'>Relative effect (95% CI)</h3>
		            <h3 className='text'>Absolute treatment benefit (95% CI)</h3>
		            <h3 className='text'>Relative percent change (95% CI)</h3>
		            <h3>Quality of the evidence (GRADE)</h3>
		          </li>

		          {Object.keys(entries).map(function (entry, i) {
		          	return renderEntry(entries[entry], entry + i);
		          })}
		        </ul>
		    	</div>
	  		);
			}
		});
  },

  renderDataByTag: function(data, tags, tag) {
		var dataByTag = this.getDataByTag(tags, data);
		var tagDescriptions = this.state.tagDescriptions;

		return (
      <section key={tag} className='data'>
        <h2>
        	<strong>{tagDescriptions[tag] ? tagDescriptions[tag].name_friendly : tag}</strong>
        	{tagDescriptions[tag] && <p>{tagDescriptions[tag].description}</p>}
        </h2>
        <div>
        	{this.renderDataByMeasure(dataByTag[tag])}
        </div>
      </section>
    );
  },

  renderGrades: function(grades) {
  	return (
  		<section className='grades'>
        <h2>GRADE working group levels of evidence</h2>
        <ul>
          {Object.keys(grades).map(function (key, i) {
            var item = grades[key];
            return (
              <li key={i}>
                <h3>{item.grade} <strong>{item.name_friendly}</strong></h3>
                <div>
                  <p>{item.description} {item.source && <a href={item.source}>Source</a>}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
  	);
  },

  renderMeasures: function(measures) {
  	return (
  		<section className='measures'>
        <h2>Measures</h2>
        <ul>
          {Object.keys(measures).map(function (key, i) {
            var item = measures[key];
            return (
              <li key={i}>
                <h3>
                  <strong>{item.name_short}</strong><br />
                  {item.name_long}
                </h3>
                <p>
                  {item.description && item.description}
                  {item.source && <span> - <a href={item.source}>Source</a></span>}
                </p>
                <div>
                  <ul>
                    {item.tags &&
                      <li>
                        <small>tags</small>
                        {item.tags.join(',')}
                      </li>
                    }
                    {item.notes &&
                      <li>
                        <small>notes</small>
                        {item.notes}
                      </li>
                    }
                    {item.kind &&
                      <li>
                        <small>kind</small>
                        {item.kind}
                      </li>
                    }
                    {item.assessor &&
                      <li>
                        <small>assessor</small>
                        {item.assessor}
                      </li>
                    }
                    {item.variable &&
                      <li>
                        <small>variable</small>
                        {item.variable}
                      </li>
                    }
                    {item.included_measures &&
                      <li>
                        <small>included_measures</small>
                        {item.included_measures.join(', ')}
                      </li>
                    }
                    {item.related_measures &&
                      <li>
                        <small>related_measures</small>
                        {item.related_measures.join(', ')}
                      </li>
                    }
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
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
		  	<Nav className='tag-navigation' bsStyle="pills" activeKey={selectedTag && selectedTag} onSelect={this.handleTagSelect}>
		  		{Object.keys(tags).map(function (tag, i) {
		  			return (<NavItem key={i} eventKey={tag}>{tagDescriptions[tag] ? tagDescriptions[tag].name_short : tag}</NavItem>);
		  		})}
		    </Nav>
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

    var cx = require('classnames');
    var preferenceControlClasses = cx({
      'preference-controls': true,
      'open': this.state.menuOpen == true,
      'closed': this.state.menuOpen == false
    });

    return (
      <div className={preferenceControlClasses}>
        <h2 onClick={togglePreferenceControls}>
          Filter your options
          <strong>{this.state.menuOpen? '‹' : '›'}</strong>
        </h2>

        {Object.keys(preferences).map(function(key) {
          var preference = preferences[key];

          // Boolean preferences become a push button
          if (preference.type == 'boolean') {
            var preferenceClasses = cx({
              'preference': true,
              'active': preferencesSelected[key]
            });
            return (
              <section className={preferenceClasses} key={key} onClick={filterPreference.bind(null, key, false)}>
                {preference.name}
                <span className='description'>{preference.description}</span>
              </section>
            );
          }
          // List preferences become a list
          else if (preference.type == 'list') {
            // Get the possible options for this preference from this.state.preferencesSelected.
            // There is a function in getInitialState() that iterates through the provided medications,
            // collecting the "options" they provide for vis à vis this preference.
            var options = Object.keys(preferencesSelected[key]);

            return (
              <section key={key}>
                {preference.name}
                <span className='description'>{preference.description}</span>

                {options.map(function(option, i) {
                  var optionClasses = cx({
                    'option': true,
                    'active': !preferencesSelected[key][option]
                  });
                  return (
                    <div
                      className={optionClasses}
                      key={option}
                      onClick={filterPreference.bind(null, key, option)}>
                        <strong>› </strong>{option}
                    </div>
                  );
                })}
              </section>
            );
          }
          else {
            return (
              <section>
                {preference.name}
                <span className='description'>{preference.description}</span>
              </section>
            );
          }
        })}
      </div>
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
  	var cx = require('classnames');

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
        <div className={classes}>
          <div className='header'>
            <h1>Spreadsheets as backend demo</h1>
            {/*<a className="mobile-toggle" onClick={this.togglePreferenceControls}>
              {!this.state.menuOpen ? 'Filter your options' : 'Close filter'}
            </a>*/}
          </div>

          {/*this.renderPreferenceControls(preferences)*/}

          <section>
            <h2>Live connection to <a href='https://docs.google.com/spreadsheets/d/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/' target='_top'>data in a Google Spreadsheet</a></h2>
            <p>My prototype will demonstrate use of a shareable, editable, and open (transparently accessible) spreadsheet as the ‘home’ of its data, instead of a closed, difficult to access and update database. That includes evidence extracted from the literature, descriptions of measures and metrics, harmonization tables, and so forth.</p>
            <p>The summaries below are connected to <a href='https://docs.google.com/spreadsheets/d/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/' target='_top'>data in a Google Spreadsheet</a> where I am encoding findings (data) from various sources. Updates to the spreadsheet are instantly visible here.</p>
          </section>



          {this.renderTagBar(tags)}
          {selectedTag && this.renderDataByTag(data, tags, selectedTag)}

          {/*this.renderGrades(grades)*/}
          {/*this.renderMeasures(measures)*/}

          {/*
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
	         */}
        </div>
      );
    }
    return (<noscript />);
  }
});

module.exports = Processing;