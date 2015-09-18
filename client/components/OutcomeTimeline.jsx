/** @jsx React.DOM */

var React = require('react/addons');
var _ = require('underscore');

// Data
var get = require('../data/get.js');
var medications = require('../data/medications.js');
var mockData = require('../data/mock.js');

var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;

var Sticky = require('react-sticky');

var AbsoluteFrequency = require('./visualizations/AbsoluteFrequency.jsx');
var Difference = require('./visualizations/Difference.jsx');
var GradeQuality = require('./visualizations/GradeQuality.jsx');
var Intervention = require('./visualizations/Intervention.jsx');
var Population = require('./visualizations/Population.jsx');
var RelativeRiskComparison = require('./visualizations/RelativeRiskComparison.jsx');
var RiskRelativeToBaseline = require('./visualizations/RiskRelativeToBaseline.jsx');
var Source = require('./visualizations/Source.jsx');

// Outcome timeline test

String.prototype.capitalizeFirstletter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

var OutcomeTimeline = React.createClass({
	propTypes: {
		disabledMedications: React.PropTypes.object
	},

  getDefaultProps: function () {
    return {
      medications: medications
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
      selectedMeasure: null
    }
  },

  componentWillUnmount: function() {
    if (!iod.userAgent.isMobile()) {
      $(window).unbind('scroll', this.handleScrollEvent);
      $(window).unbind('resize', this.handleResizeEvent);
    }
  },

  handleScrollEvent: function() {
    $('.sticky-element').each(function() {
      var el            = $(this),
          offset        = el.offset(),
          scrollTop     = $(window).scrollTop(), // .iodine-bar['height']
          floated 			= $('.sticky-eleent-float', this);

      if ((scrollTop > offset.top) && (scrollTop < offset.top + el.height())) {
        floated.css({
          'visibility': 'visible',
          'top': 0
        });
      }
      else {
        floated.css({
          'visibility': 'hidden'
        });
      }
    });
  },

  handleResizeEvent: function() {
    this.setupStickyHeader();
    this.handleScrollEvent();
  },

  setupStickyHeader: function() {
    var clonedElement;
    var originalElement;
    $('.sticky-element').each(function() {
      clonedElement = $('.sticky-element.sticky-element-float.cloned-element', this);
      originalElement = $('.sticky-element.sticky-element-fixed', this);
      clonedElement
        .css('width', originalElement.width());
      originalElement.children().css('width', function(i, val) {
        return $(clonedElement).children().eq(i).css('width', val);
      });
      originalElement.children().css('width', function(i, val) {
        return $(clonedElement).children().eq(i).css('max-width', val);
      });
    });
  },

  setupStickyHeaderEventListeners: function() {
    $(window)
      .scroll(this.handleScrollEvent)
      .trigger('scroll');

    $(window)
      .resize(this.handleResizeEvent)
      .trigger('resize');
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
    // results = the data/finding, passed as part of an entry as population / intervention / comparison
    // metric (optional) = the preferred metric to render. often helpful if a specific metric is required. otherwise there's logic to render all of them.
    // comparisonResults = a pair dataset used for relative comparisons, i.e. the "comparison" to an intervention
    // preferredKind = what kind of value to show — a difference/comparison…

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
    var metrics = this.state.metrics;
    var data = results[metric];

    return (
      <div>
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
        <strong>{data.value && (metric == 'ar_1000' ? Math.floor(data.value * 0.1) : data.value)}</strong> <span className='light'>of 100 people</span>
        <AbsoluteFrequency frequency={data.value} metric={metric} denominator={100} breakpoint={10} baseline={baseline} />
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

  filterEntriesByMedication: function(entries) {
  	// disabledMedications is an object with key value pairs like so:
  	//
  	// {
  	// 	"Methotrexate": true,
  	// 	"Simponi": false
  	// }
  	//
  	// This function gets a simple list of medications that are not disabled,
  	// i.e. whose value is false.

  	var enabledMedicationNames = [];
  	var disabledMedications = this.props.disabledMedications;

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
  		if (entry.intervention) {
  			var intersection = _.intersection(entry.intervention.parts, enabledMedicationNames);
  			return intersection.length > 0;
  		}
  	});

  	return filteredEntries;
  },

  renderTimelineByMeasure: function(measures) {
    var measureMap = this.state.measures;
    var grades = this.state.grades;
    var getDurationAsWeeks = this.getDurationAsWeeks;
    var filterEntriesByMedication = this.filterEntriesByMedication;
    var getEntriesForMeasure = this.getEntriesForMeasure;
    var groupEntriesByDuration = this.groupEntriesByDuration;
    var renderEntry = this.renderEntry;
    var renderValue = this.renderValue;

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

    var measure = this.state.selectedMeasure ? this.state.selectedMeasure : Object.keys(measures)[0];
    var measureData = measures[measure].data;

    if (measureData) {
      var durations = groupEntriesByDuration(filterEntriesByMedication(getEntriesForMeasure(measureData)));
      // var entries = getEntriesForMeasure(measureData);

      return (
      	<div>
      		{this.renderMeasureBar(measures)}
	        <div key={measure}>
	        	<section className='outcome-timeline'>
			      	<section>
			      		<div className='moment'>
			      			<section>
			        			<div className='title'>Start</div>
			        			<div className='line'>
			        				<div className='bar'></div>
			        			</div>
			        			<div className='description'>Comparison.</div>
			        		</section>
			      		</div>
			      		<div className='moment-data'>
			      			<section>
				      			{Object.keys(durations).map(function (numberOfWeeks) {
					        		var entries = durations[numberOfWeeks];

						        	return entries.map(function (entry, i) {
						      			if (entry.intervention) {
						      				{/*TODO: Find out why some entries are being reprojected without the comparison parts. */}
						      				return (
								         		<div key={i}>
                              <Intervention intervention={entry.intervention.parts.join(' + ')} dosage={entry.intervention.dosage} />
                              {entry.comparison &&
                              	<div className='light'>
                              		vs.<br />
                              		{entry.comparison.parts.join(' + ')}
                              	</div>
                              }
                            </div>
								         	);
								        }
							       	});
										})}
									</section>
				      	</div>
				      </section>

              {Object.keys(durations).map(function (timepoint) {
				      	return (
				      		<section key={measure + timepoint}>
					      		<div className='moment'>
					      			<section>
					        			<div className='title'><strong>{timepoint} weeks</strong></div>
					        			<div className='line'>
					        				<div className='ball'></div>
					        			</div>
					        			<div className='description'>
					        				<strong>{measureMap[measure].name_short}</strong> {measureMap[measure].name_friendly}
						              {measureMap[measure].description && <p>{measureMap[measure].description}</p>}
					        			</div>
					        		</section>
					      		</div>
					      		<div className='moment-data'>
								      <section>
						      			{Object.keys(durations).map(function (numberOfWeeks) {
							        		var entries = durations[numberOfWeeks];

							        		return entries.map(function (entry, i) {
								        		if (entry.intervention && (getDurationAsWeeks(entry.duration) == timepoint)) {
									      			return (
										         		<div key={i}>
										         			{/* entry.intervention.ar_1000 ? renderValue(entry.intervention, 'ar_1000') : renderValue(entry.intervention, 'ar_100') */}
                                  {renderValue(entry.intervention)}
										         			<Source source={entry.source} kind={entry.kind} />
                                  <GradeQuality grade={entry.quality} gradeMap={grades} />
										         		</div>
										         	);
										        }
										        else if (entry.intervention) {
										        	return (<div key={i}></div>);
										        }
										      });
												})}
											</section>
								    </div>
					      	</section>
					      );
							})}
						</section>
		      </div>
		    </div>
		  );
	  }
	  return (
    	<div>
    		{this.renderMeasureBar(measures)}
    	</div>
    );
  },

  renderDataByTag: function(data, tags, tag) {
    var dataByTag = this.getDataByTag(tags, data);
    var tagDescriptions = this.state.tagDescriptions;

    return (
      <section key={tag} className='data'>
        <h2 className='tag'>
          <strong>{tagDescriptions[tag] ? tagDescriptions[tag].name_friendly : tag}</strong>
          {tagDescriptions[tag] && <p>{tagDescriptions[tag].description}</p>}
        </h2>
        <div>
    			<strong>{tagDescriptions[tag].name_friendly}</strong> research is done using lots of different measures. Click each one to see examples of findings.
    		</div>
        <div>
          {this.renderTimelineByMeasure(dataByTag[tag])}
        </div>
      </section>
    );
  },

  handleMedicationSelect: function(key) {
    this.setState({
      selectedMedication: key
    });
  },

  renderMedicationBar: function(medications) {
  	var selectedMedication = this.state.selectedMedication;

    if (medications) {
      return (
        <Nav className='tag-navigation' bsStyle="pills" activeKey={selectedMedication && selectedMedication} onSelect={this.handleMedicationSelect}>
          {Object.keys(medications).map(function (medication, i) {
          	var medication = medications[medication];
            return (<NavItem key={i} eventKey={medication.name}>{medication.name_common}</NavItem>);
          })}
        </Nav>
      );
    }
  },

  handleTagSelect: function(key) {
    this.setState({
      selectedTag: key,
      selectedMeasure: null
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

  handleMeasureSelect: function(key) {
    this.setState({
      selectedMeasure: key
    });
  },

  renderMeasureBar: function(measures) {
    var selectedMeasure = this.state.selectedMeasure;
    var measureDescriptions = this.state.measures;

    return (
      <Nav className='tag-navigation' bsStyle="pills" activeKey={selectedMeasure && selectedMeasure} onSelect={this.handleMeasureSelect}>
        {Object.keys(measures).map(function (measure, i) {
          return (<NavItem key={i} eventKey={measure}>{measureDescriptions[measure] ? measureDescriptions[measure].name_short : measure}</NavItem>);
        })}
      </Nav>
    );
  },

  renderTimelineByTag: function(data, tags, tag) {
    var dataByTag = this.getDataByTag(tags, data);
    var tagDescriptions = this.state.tagDescriptions;

    return (
			<div>
				<h2 className='tag'>
          <strong>{tagDescriptions[tag] ? tagDescriptions[tag].name_friendly : tag}</strong>
          {tagDescriptions[tag] && <p>{tagDescriptions[tag].description}</p>}
        </h2>
        <div>
    			<strong>{tagDescriptions[tag].name_friendly}</strong> research is done using lots of different measures. Click each one to see examples of findings.
    		</div>
				{this.renderTimelineByMeasure(dataByTag[tag])}
	    </div>
		);
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
    var disabledMedications = this.props.disabledMedications;
    var selectedMedication = this.state.selectedMedication;
    var medicationMap = this.state.medicationMap;

    var classes = cx({
      'processing': true
    });

    if (grades && measures && tags && data != {}) {
      return (
        <div className={classes}>
          <section>
          	{this.renderTagBar(tags)}
          </section>

          {selectedTag && this.renderTimelineByTag(data, tags, selectedTag)}

          <section>
            Source data in <a href='https://docs.google.com/spreadsheets/d/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/' target='_top'>this Google Spreadsheet</a>
          </section>
        </div>
      );
    }
    return (<div><h1>Loading</h1></div>);
  }
});

module.exports = OutcomeTimeline;