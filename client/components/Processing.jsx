/** @jsx React.DOM */

var React = require('react/addons');

var medications = require('./Data.jsx');

var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;

var AbsoluteFrequency = require('./visualizations/AbsoluteFrequency.jsx');
var Difference = require('./visualizations/Difference.jsx');
var GradeQuality = require('./visualizations/GradeQuality.jsx');
var Intervention = require('./visualizations/Intervention.jsx');
var Population = require('./visualizations/Population.jsx');
var Source = require('./visualizations/Source.jsx');

// Processing / data processing tests

String.prototype.capitalizeFirstletter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

var Processing = React.createClass({

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
    var processData = this.processData;

    var sheets = {
      measures: 'o5079mk',
      metrics: 'ojmf289',
      grades: 'oo3g5h2',
      data: {
        biologics: 'oij9tdp',
        hydroxycholoroquine: 'oozzuoc',
        etanercept: 'oogh8lu',
        methotrexate: 'oa4uchu',
        finraco: 'oclozwl'
      },
      side_effects: {
        celecoxib: 'od6'
      },
      tagDescriptions: 'o2pd8py'
    };

    // Visit this with a browser to get the worksheet unique IDs
    var xmlListing = 'https://spreadsheets.google.com/feeds/worksheets/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/private/full';

    var key  = '1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0';
    var base = 'https://spreadsheets.google.com/feeds/list/'
             + key
             + '/';
    var end  = '/public/values?alt=json';

    // Get measures
    var processMeasures = this.processMeasures;
    var urlMeasures = base + sheets.measures + end;
    $.getJSON(urlMeasures, processMeasures);

    // Get metrics
    // var processMetrics = this.processMetrics;
    // var urlMetrics = base + sheets.metrics + end;
    // $.getJSON(urlMetrics, processData);

    // Get GRADE levels
    var processGrades = this.processGrades;
    var urlGrades = base + sheets.grades + end;
    $.getJSON(urlGrades, processGrades);

    // Get tag descriptions
    var processTagDescriptions = this.processTagDescriptions;
    var urlTagDescriptions = base + sheets.tagDescriptions + end;
    $.getJSON(urlTagDescriptions, processTagDescriptions);

    // Get data
    // Loop through the data source spreadsheets, projecting each one into a more useful format.
    var processData = this.processData;
    Object.keys(sheets.data).forEach(function (source) {
      var urlData = base + sheets.data[source] + end;
      $.getJSON(urlData, processData);
    });
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

    this.setState({
      tagDescriptions: tagDescriptions
    });
  },

  processData: function(data) {
    var processedData = [];

    $.each(data.feed.entry, function (index, value) {
      if (index == 0) {
        return;
      }
      var entry = {};
          entry['which']                = value.gsx$which ? value.gsx$which.$t : null;
          entry['measure']              = value.gsx$measure ? value.gsx$measure.$t : null;
          entry['metric']               = value.gsx$metric ? value.gsx$metric.$t : null;
          entry['value']                = value.gsx$value ? !isNaN(parseFloat(value.gsx$value.$t)) && parseFloat(value.gsx$value.$t) : null;
          entry['value_ci_low']         = value.gsx$valuecilow ? !isNaN(parseFloat(value.gsx$valuecilow.$t)) && parseFloat(value.gsx$valuecilow.$t) : null;
          entry['value_ci_high']        = value.gsx$valuecihigh ? !isNaN(parseFloat(value.gsx$valuecihigh.$t)) && parseFloat(value.gsx$valuecihigh.$t) : null;
          entry['grade']                = value.gsx$grade ? value.gsx$grade.$t : null;
          entry['n_total']              = value.gsx$ntotal ? !isNaN(parseFloat(value.gsx$ntotal.$t)) && parseFloat(value.gsx$ntotal.$t) : null;
          entry['duration_low']         = value.gsx$durationlow ? value.gsx$durationlow.$t : null;
          entry['duration_high']        = value.gsx$durationhigh ? value.gsx$durationhigh.$t : null;
          entry['duration_interval']    = value.gsx$durationinterval ? value.gsx$durationinterval.$t : null;
          
          entry['population']           = value.gsx$population ? value.gsx$population.$t : null;
          entry['intervention']         = value.gsx$intervention ? value.gsx$intervention.$t.split(',') : null;
          entry['comparison']           = value.gsx$comparison ? value.gsx$comparison.$t.split(',') : null;
          
          entry['dosage']													=	{};
          entry['dosage']['dosage']  							= value.gsx$dosage ? value.gsx$dosage.$t : null;
          entry['dosage']['dosage_form']          = value.gsx$dosageform ? value.gsx$dosageform.$t.split(',') : null;
          entry['dosage']['dosage_frequency']     = value.gsx$dosagefrequency ? value.gsx$dosagefrequency.$t : null;
          entry['dosage']['dosage_multiple']     	= value.gsx$dosagemultiple ? value.gsx$dosagemultiple.$t : null;
          entry['dosage']['dosage_interval']      = value.gsx$dosageinterval ? value.gsx$dosageinterval.$t : null;
          
          entry['source']               = value.gsx$source ? value.gsx$source.$t : null;
          entry['notes']                = value.gsx$notes ? value.gsx$notes.$t : null;
          entry['kind']                 = value.gsx$kind ? value.gsx$kind.$t : null;
      processedData.push(entry);
    });

    // Get the sheet title, which will be used as its unique key
    // e.g. 'CSR biologics'
    var title = data.feed.title.$t;
    var newData = this.state.data;
        newData[title] = processedData;

    this.setState({
      data: newData
    });
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

    this.setState({
      grades: grades
    });
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

    this.setState({
      measures: measures,
      tags: tagMap
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

  renderFollowUpTime: function(low, high, interval, measure) {
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

  getDataByTag: function(tags, data) {
  	var dataByTag = JSON.parse(JSON.stringify(tags));

    // Loop
    // Each tag (pain, function, etc.)
    Object.keys(tags).map(function (tag) {
      // Each source
      Object.keys(data).map(function (source) {
        // Each entry in the source data
        data[source].map(function (entry) {
          // Entry has a measure that is associated with one of the tags?
          // e.g. tags['pain']['patient_pain']
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

  renderDataByTag: function(data, tags, grades, measures, selectedTag) {
		var dataByTag = this.getDataByTag(tags, data);
		var tagDescriptions = this.state.tagDescriptions;

		var renderFollowUpTime = this.renderFollowUpTime;

    /*
        Comparison == key.
        <li> is match on measure, intervention, comparison

        TODO: reproject data into comparison-intervention groups
    */

    var renderData = function(tag) {
    	return (
        <section key={tag} className='data'>
          <h2>
          	<strong>{tagDescriptions[tag] ? tagDescriptions[tag].name_friendly : tag}</strong>
          	{tagDescriptions[tag] && <p>{tagDescriptions[tag].description}</p>}
          </h2>
          <div>
            {Object.keys(dataByTag[tag]).map(function (measure, i) {
              var entries = dataByTag[tag][measure].data;
              if (entries) {
                var keyIntervention;
                var keyComparison;
                var reprojected = {};

                entries.forEach(function (entry, i) {
                  // Comparison row is key, sets up rest…
                  var key;

                  //
                  // Generalize this godforsaken code
                  //
                  if (entry.which == 'comparison') {
                    key = entry.measure + entry.comparison + entry.intervention + entry.population;
                    reprojected[key] = {};
                    reprojected[key]['which']               = entry.which;
                    reprojected[key]['intervention']        = entry.intervention.join(' + ');
                    reprojected[key]['comparison']          = entry.comparison.join(' + ');

                    reprojected[key]['follow_up']           = renderFollowUpTime(entry.duration_low, entry.duration_high, entry.duration_interval);

                    // TODO metric display calculator functions / components
                    reprojected[key]['assumed_risk_metric'] = entry.metric;
                    reprojected[key]['assumed_risk']				= entry.value;
                    
                    (entry.metric == 'ar_100' || entry.metric == 'ar_1000') && (reprojected[key]['assumed_risk_markup'] = (
                      <span>
                        {entry.comparison.join(' + ')}<br />
                        <span className='light'>Outcome: {measures[measure].name_friendly}</span><br />
                        <strong>{entry.value && entry.value}</strong> {entry.metric == 'ar_100' && <span classNam='light'>of 100 people</span>} {entry.metric == 'ar_1000' && <span className='light'>of 1000 people</span>}
                        <AbsoluteFrequency frequency={entry.value} metric={entry.metric} denominator={100} breakpoint={20} />
                      </span>
                    ));

                    // Comparison mean score
                    (entry.metric == 'mean_score') && (reprojected[key]['assumed_risk_markup'] = (
                      <span>
                      	{entry.intervention.join(' + ')}<br />
                        <span className='light'>Outcome: {measures[measure].name_friendly}</span><br />
                        <strong>{entry.value && entry.value}</strong><br />
                        {entry.value_ci_low && entry.value_ci_high &&
                        	<span>({entry.value_ci_low} to {entry.value_ci_high})</span>
                        }
                      </span>
                    ));

                    // Comparison mean difference
                    (entry.metric == 'mean_score_difference') && (reprojected[key]['assumed_risk_markup'] = (
                      <span>
                        {entry.intervention.join(' + ')}<br />
                        <span className='light'>Outcome: {measures[measure].name_friendly}</span><br />
                        {entry.value && <Difference value={entry.value} metric={entry.metric} />}
                        <strong>{entry.value && entry.value}</strong><br />
                        {entry.value_ci_low && entry.value_ci_high &&
                          <span>({entry.value_ci_low} to {entry.value_ci_high})</span>
                        }
                      </span>
                    ));

                    reprojected[key]['n']                   = entry.n_total;
                    reprojected[key]['quality']             = entry.grade;
                  	reprojected[key]['dosage']							= entry.dosage;
                  	reprojected[key]['source']							= entry.source;
                    reprojected[key]['kind']                = entry.kind;
                  }

                  // TODO generalize!
                  // seriously, generalize — yuck
                  //
                  else if (entry.which == 'intervention' || entry.which == 'population') {
                    key = entry.measure + entry.comparison + entry.intervention + entry.population;

                    // Already set up an object with comparison
                    if (reprojected[key]) {

                      // Non-comparison rows fill out remaining detail
                      (entry.metric == 'ar_100' || entry.metric == 'ar_1000') && (reprojected[key]['corresponding_risk']  = (
                        <span>
                        	{entry.intervention.join(' + ')}<br />
                          <span className='light'>Outcome: {measures[measure].name_friendly}</span><br />
                          <strong>{entry.value && entry.value}</strong> {entry.metric == 'ar_100' && <span classNam='light'>of 100 people</span>} {entry.metric == 'ar_1000' && <span className='light'>of 1000 people</span>}
                          <AbsoluteFrequency frequency={entry.value} baseline={reprojected[key].assumed_risk} metric={entry.metric} denominator={100} breakpoint={20} />
	                        {entry.value_ci_low && entry.value_ci_high &&
	                        	<span>({entry.value_ci_low} to {entry.value_ci_high})</span>
	                        }
                        </span>
                      ));

                      // Mean score
                      (entry.metric == 'mean_score' || entry.metric == 'count') && (reprojected[key]['corresponding_risk']  = (
                        <span>
                          {entry.intervention.join(' + ')}<br />
                          <span className='light'>Outcome: {measures[measure].name_friendly}</span><br />
                          <strong>{entry.value && entry.value}</strong><br />
	                        {entry.value_ci_low && entry.value_ci_high &&
	                        	<span>({entry.value_ci_low} to {entry.value_ci_high})</span>
	                        }
                        </span>
                      ));

                      // Mean score difference
                      (entry.metric == 'mean_score_difference') && (reprojected[key]['corresponding_risk']  = (
                        <span>
                          {entry.intervention.join(' + ')}<br />
                          <span className='light'>Outcome: {measures[measure].name_friendly}</span><br />
                          {entry.value && <Difference value={entry.value} metric={entry.metric} />}
                          {entry.value_ci_low && entry.value_ci_high &&
                            <span>({entry.value_ci_low} to {entry.value_ci_high})</span>
                          }
                        </span>
                      ));

                      // RR relative risk
                      (entry.metric == 'rr' || entry.metric == 'or') && (reprojected[key]['relative_effect'] = (
                        <span>
                        	{entry.intervention.join(' + ')}<br />
                          <strong>{entry.value && entry.value}</strong><br />
                        	{entry.value_ci_low && entry.value_ci_high &&
                        		<span>({entry.value_ci_low} to {entry.value_ci_high})</span>
                        	}
                        </span>
                      ));

                      // AR absolute risk difference / absolute difference / precent change
                      (entry.metric == 'abs_difference') && (reprojected[key]['absolute_benefit'] = (
                        <span>
                        	{entry.intervention.join(' + ')}<br />
                          <strong>{Math.round(entry.value * 100) + '%'}</strong><br />
                          {entry.value_ci_low && entry.value_ci_high &&
                          	<span>({Math.round(entry.value_ci_low * 100) + '%'} to {Math.round(entry.value_ci_high * 100) + '%'})</span>
                          }
                        </span>
                      ));

                      // Relative change / relative difference
                      (entry.metric == 'rel_difference') && (reprojected[key]['relative_change'] = (
                        <span>
                        	{entry.intervention.join(' + ')}<br />
                          <strong>{Math.round(entry.value * 100) + '%'}</strong><br />
                          {entry.value_ci_low && entry.value_ci_high &&
                          	<span>({Math.round(entry.value_ci_low * 100) + '%'} to {Math.round(entry.value_ci_high * 100) + '%'})</span>
                          }
                        </span>
                      ));
                      reprojected[key]['which']               = entry.which;
                      reprojected[key]['dosage']							= entry.dosage;
                      reprojected[key]['source']							= entry.source;
                      reprojected[key]['kind']                = entry.kind;
                    }

                    // This is an entry with no corresponding 'comparison'
                    else {
                      reprojected[key] = {};
                      reprojected[key]['which']               = entry.which;
                      reprojected[key]['population']          = entry.population;
                      reprojected[key]['intervention']        = entry.intervention.join(' + ');
                      reprojected[key]['comparison']          = entry.comparison.join(' + ');
                      reprojected[key]['follow_up']           = renderFollowUpTime(entry.duration_low, entry.duration_high, entry.duration_interval);

                      // NO ASSUMED RISK BECAUSE NO COMPARISON

                      reprojected[key]['n']                   = entry.n_total;
                      // TODO quality calculator function / component
                      reprojected[key]['quality']             = entry.grade;
                      // Non-comparison rows fill out remaining detail
                      
                      // Absolute risk
                      (entry.metric == 'ar_100' || entry.metric == 'ar_1000') && (reprojected[key]['corresponding_risk']  = (
                        <span>
                        	{entry.intervention.join(' + ')}<br />
                          <span className='light'>Outcome: {measures[measure].name_friendly}</span><br />
                          <strong>{entry.value && entry.value}</strong> {entry.metric == 'ar_100' && <span classNam='light'>of 100 people</span>} {entry.metric == 'ar_1000' && <span className='light'>of 1000 people</span>}
	                        <AbsoluteFrequency frequency={entry.value} baseline={reprojected[key].assumed_risk} metric={entry.metric} denominator={100} breakpoint={20} />
	                        {entry.value_ci_low && entry.value_ci_high &&
	                        	<span>({entry.value_ci_low} to {entry.value_ci_high})</span>
	                        }
                        </span>
                      ));

                      // Percentage
                      (entry.metric == 'percentage') && (reprojected[key]['corresponding_risk']  = (
                        <span>
                          <span className='light'>Outcome: {measures[measure].name_friendly}</span><br />
                          <strong>{entry.value && entry.value * 100}</strong> <span classNam='light'>of 100 people</span>}
                          <AbsoluteFrequency frequency={entry.value} denominator={100} breakpoint={20} />
                          {entry.value_ci_low && entry.value_ci_high &&
                            <span>({entry.value_ci_low} to {entry.value_ci_high})</span>
                          }
                        </span>
                      ));

                      // Mean score or count
                      (entry.metric == 'mean_score' || entry.metric == 'count') && (reprojected[key]['corresponding_risk']  = (
                        <span>
                        	{entry.intervention.join(' + ')}<br />
                          <span className='light'>Outcome: {measures[measure].name_friendly}</span><br />
                          <strong>{entry.value && entry.value}</strong><br />
	                        {entry.value_ci_low && entry.value_ci_high &&
	                        	<span>({entry.value_ci_low} to {entry.value_ci_high})</span>
	                        }
                        </span>
                      ));

                      // Mean score difference
                      (entry.metric == 'mean_score_difference') && (reprojected[key]['corresponding_risk']  = (
                        <span>
                          {entry.intervention.join(' + ')}<br />
                          <span className='light'>Outcome: {measures[measure].name_friendly}</span><br />
                          {entry.value && <Difference value={entry.value} metric={entry.metric} />}
                          {entry.value_ci_low && entry.value_ci_high &&
                            <span>({entry.value_ci_low} to {entry.value_ci_high})</span>
                          }
                        </span>
                      ));

                      // Relative risk
                      (entry.metric == 'rr' || entry.metric == 'or') && (reprojected[key]['relative_effect'] = (
                        <span>
                          <strong>{entry.value && entry.value}</strong><br />
                          {entry.value_ci_low && entry.value_ci_high &&
                          	<span>({entry.value_ci_low} to {entry.value_ci_high})</span>
                          }
                        </span>
                      ));

                      // Absolute difference
                      (entry.metric == 'abs_difference') && (reprojected[key]['absolute_benefit'] = (
                        <span>
                        	{entry.intervention.join(' + ')}<br />
                          <strong>{Math.round(entry.value * 100) + '%'}</strong><br />
                          {entry.value_ci_low && entry.value_ci_high &&
                          	<span>({Math.round(entry.value_ci_low * 100) + '%'} to {Math.round(entry.value_ci_high * 100) + '%'})</span>
                          }
                        </span>
                      ));

                      // Relative difference
                      (entry.metric == 'rel_difference') && (reprojected[key]['relative_change'] = (
                        <span>
                        	{entry.intervention.join(' + ')}<br />
                          <strong>{Math.round(entry.value * 100) + '%'}</strong><br />
                          {entry.value_ci_low && entry.value_ci_high &&
                          	<span>({Math.round(entry.value_ci_low * 100) + '%'} to {Math.round(entry.value_ci_high * 100) + '%'})</span>
                          }
                        </span>
                      ));
                      reprojected[key]['dosage']						  = entry.dosage;
                      reprojected[key]['source']							= entry.source;
                      reprojected[key]['kind']                = entry.kind;
                    }
                  }
                });

                return (
                	<div>
                		<h3>
                      <strong>{measures[measure].name_short}</strong> {measures[measure].name_friendly && <span>| {measures[measure].name_friendly}</span>}
                      {measures[measure].description && <p>{measures[measure].description}</p>}
                    </h3>
	                  <ul key={measure}>
	                    
	                    <li>
	                      <h3 className='text'>Intervention</h3>
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
	                    
                      {Object.keys(reprojected).map(function (data, i) {
                        var entry = reprojected[data];
                    
                        var cx = React.addons.classSet;
                        var entryClasses = cx({
                          'entry': true,
                          'population': entry.which == 'population'
                        });
	                      
                        return (
	                        <li key={i} className={entryClasses}>
	                          <h4>
	                          	{entry.which == 'population' ?
                                <Population population={entry.population} dosage={entry.dosage} /> :
                                <Intervention intervention={entry.intervention} dosage={entry.dosage} />
                              }
	                          	<Source source={entry.source} kind={entry.kind} />
	                          </h4>
	                          <h4>{entry.comparison}</h4>
	                          <h4>{entry.follow_up}</h4>
	                          <h4>{entry.assumed_risk_markup}</h4>
	                          <h4>{entry.corresponding_risk}</h4>
	                          <h4>{entry.relative_effect}</h4>
	                          <h4>{entry.absolute_benefit}</h4>
	                          <h4>{entry.relative_change}</h4>
	                          <h4><GradeQuality grade={entry.quality} gradeMap={grades} /></h4>
	                        </li>
	                      );
	                    })}
	                  </ul>
                	</div>
                );
              }
            })}
          </div>
        </section>
      );
		};

    // Render a single tag's data
    if (selectedTag) {
    	return renderData(selectedTag);
    }

    // Render all data
    // else {
    // 	return Object.keys(dataByTag).map(function (tag) {
    //  		renderData(tag);
    // 	});
    // }
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

    var cx = React.addons.classSet;
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
    var cx = React.addons.classSet;

    // Data-related
    var grades = this.state.grades;
    var measures = this.state.measures;
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
          {this.renderDataByTag(data, tags, grades, measures, selectedTag)}

          {/*this.renderGrades(grades)*/}
          {/*this.renderMeasures(measures)*/}
        </div>
      );
    }
    return (<noscript />);
  }
});

module.exports = Processing;