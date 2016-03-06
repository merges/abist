var _ = require('lodash');

Number.prototype.toFixedNumber = function(x, base){
  var pow = Math.pow(base||10,x);
  return +(Math.round(this*pow) / pow);
}

var get = {

  sheets: {
    measures: 'o5079mk',
    metrics: 'ojmf289',
    grades: 'oo3g5h2',
    data: {
      dmards: 'oij9tdp',
      etanercept: 'oogh8lu',
      tocilizumab: 'ociwrxy',
      leflunomide: 'og4s4wi',
      methotrexate: 'oa4uchu',
      hydroxycholoroquine: 'oozzuoc',
      sulfasalazine: 'ovz798r',
      cyclosporine: 'om399vw',
      finraco: 'oclozwl',
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

          // If there is no value, but there is a ci_low and ci_high, we insert the mean of those two values
          // so that we can later perform calculations with it. This is a hack.
          if (!entry.value.value && entry.value.value_ci_low && entry.value.value_ci_high) {
            var mean = ((entry.value.value_ci_low + entry.value.value_ci_high) / 2).toFixedNumber(2)
            entry.value.value = mean
          }

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
    /*
    disabledMedications is an object with key value pairs like so:
    
    {
     "Methotrexate": true,
     "Simponi": false
    }
    
    This function gets a simple list of medications that are not disabled,
    i.e. whose value is false.
    */
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
  },

  filterEntriesWithNonPlaceboComparisons: function(entries) {
    // Filter out entries where the comparison was not placebo
    var filteredEntries = _.filter(entries, function(entry) {
      // If this comparison was with something other than placebo, discard it
      if (entry.comparison) {
        if (entry.comparison.parts && entry.comparison.parts[0].toLowerCase() != 'placebo') {
          return false
        }
      }
      return entry
    })
    return filteredEntries
  }

};

module.exports = get;