const getNumber = (value: any) => {
  if (!isNaN(parseFloat(value))) {
    return parseFloat(value)
  }
  return null
}

// The prototype evidenceData object for offline use / etc.

const evidenceData = {
  measures: {},
  metrics: {},
  grades: {},
  tagDescriptions: {},
  data: {}
}

// // The Google spreadsheet/worksheets where data are stored

// var sheets = {
//   measures: 'o5079mk',
//   metrics: 'ojmf289',
//   grades: 'oo3g5h2',
//   data: {
//     biologics: 'oij9tdp',
//     hydroxycholoroquine: 'oozzuoc',
//     etanercept: 'oogh8lu',
//     methotrexate: 'oa4uchu',
//     finraco: 'oclozwl'
//   },
//   side_effects: {
//     celecoxib: 'od6'
//   },
//   tagDescriptions: 'o2pd8py'
// }

// // Visit this with a browser to get the worksheet unique IDs
// var xmlListing = 'https://spreadsheets.google.com/feeds/worksheets/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/private/full'

// var key  = '1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0'
// var base = 'https://spreadsheets.google.com/feeds/list/'
//          + key
//          + '/'
// var end  = '/public/values?alt=json'

// var processTagDescriptions = function(data) {
//   var tagDescriptions = {}

//   $.each(data.feed.entry, function (index, value) {
//     if (index == 0) {
//       return
//     }
//     var key = value.gsx$name.$t
//     var entry = {}
//         entry['name'] = key
//         entry['description'] = value.gsx$description.$t
//         entry['name_friendly'] = value.gsx$namefriendly.$t
//         entry['name_short'] = value.gsx$nameshort.$t
//     tagDescriptions[key] = entry
//   })

//   evidenceData.tagDescriptions = tagDescriptions
// }

// var processData = function(data) {
//   var processedData = []

//   $.each(data.feed.entry, function (index, value) {
//     if (index == 0) {
//       return
//     }
//     var entry = {}
//         // Key
//         entry['which']                          = value.gsx$which ? value.gsx$which.$t : null
        
//         // Population / intervention / comparison
//         entry['population']                     = value.gsx$population ? value.gsx$population.$t.split(',') : null
//         entry['intervention']                   = value.gsx$intervention ? value.gsx$intervention.$t.split(',') : null
//         entry['comparison']                     = value.gsx$comparison ? value.gsx$comparison.$t.split(',') : null
//         entry['n']                              = value.gsx$ntotal && getNumber(value.gsx$ntotal.$t)
//         entry['n_type']                         = value.gsx$type && value.gsx$ntype.$t

//         // Outcome
//         entry['measure']                        = value.gsx$measure ? value.gsx$measure.$t : null
//         entry['measure_detail']                 = value.gsx$measuredetail ? value.gsx$measuredetail.$t : null
//         entry['metric']                         = value.gsx$metric ? value.gsx$metric.$t : null
//         entry['grade']                          = value.gsx$grade ? value.gsx$grade.$t : null     
        
//         // Value
//         entry['value']                          = {}
//         entry['value']['value']                   = value.gsx$value && getNumber(value.gsx$value.$t)
//         entry['value']['value_ci_low']            = value.gsx$valuecilow && getNumber(value.gsx$valuecilow.$t)
//         entry['value']['value_ci_high']           = value.gsx$valuecihigh && getNumber(value.gsx$valuecihigh.$t)
//         entry['value']['value_sd']                = value.gsx$valuesd && getNumber(value.gsx$valuesd.$t)
//         entry['value']['value_iqr_low']           = value.gsx$valueiqrlow && getNumber(value.gsx$valueiqrlow.$t)
//         entry['value']['value_iqr_high']          = value.gsx$valueiqrhigh && getNumber(value.gsx$valueiqrhigh.$t)
        
//         // Duration
//         entry['duration']                       = {}
//         entry['duration']['low']                  = value.gsx$durationlow ? value.gsx$durationlow.$t : null
//         entry['duration']['high']                 = value.gsx$durationhigh ? value.gsx$durationhigh.$t : null
//         entry['duration']['interval']             = value.gsx$durationinterval ? value.gsx$durationinterval.$t : null      
        
//         // Dosage
//         entry['dosage']                         = {}
//         entry['dosage']['dosage']                 = value.gsx$dosage ? value.gsx$dosage.$t : null
//         entry['dosage']['dosage_form']            = value.gsx$dosageform ? value.gsx$dosageform.$t.split(',') : null
//         entry['dosage']['dosage_frequency']       = value.gsx$dosagefrequency ? value.gsx$dosagefrequency.$t : null
//         entry['dosage']['dosage_multiple']        = value.gsx$dosagemultiple ? value.gsx$dosagemultiple.$t : null
//         entry['dosage']['dosage_interval']        = value.gsx$dosageinterval ? value.gsx$dosageinterval.$t : null
        
//         // Evidence source and notes
//         entry['source']                         = value.gsx$source ? value.gsx$source.$t : null
//         entry['notes']                          = value.gsx$notes ? value.gsx$notes.$t : null
//         entry['kind']                           = value.gsx$kind ? value.gsx$kind.$t : null
//     processedData.push(entry)
//   })

//   // Get the sheet title, which will be used as its unique key
//   // e.g. 'CSR biologics'
//   var title = data.feed.title.$t
//   var newData = evidenceData.data
//       newData[title] = processedData

//   // this.setState({
//   //   data: newData
//   // })

//   evidenceData.data = newData
// }

// var processGrades = function(data) {
//   var grades = {}

//   $.each(data.feed.entry, function (index, value) {
//     if (index == 0) {
//       return
//     }
//     var key = value.gsx$grade.$t
//     var entry = {}
//         entry['grade'] = key
//         entry['description'] = value.gsx$description.$t
//         entry['description_friendly'] = value.gsx$descriptionfriendly.$t
//         entry['name_friendly'] = value.gsx$namefriendly.$t
//         entry['notes'] = value.gsx$namefriendly.$t
//         entry['source'] = value.gsx$source.$t
//     grades[key] = entry
//   })

//   evidenceData.grades = grades
// }

// var processMeasures = function(data) {
//   var measures = {}
//   var tagMap = {}

//   $.each(data.feed.entry, function (index, value) {
//     if (index == 0) {
//       return
//     }
//     var key = value.gsx$name.$t
//     var entry = {}
//         entry['name']                 = key
//         entry['name_short']           = value.gsx$nameshort.$t
//         entry['name_long']            = value.gsx$namelong.$t
//         entry['name_friendly']        = value.gsx$namefriendly.$t
//         entry['description']          = value.gsx$description.$t
//         entry['tags']                 = value.gsx$tags.$t && value.gsx$tags.$t.split(',')
//         entry['kind']                 = value.gsx$kind.$t
//         entry['variable']             = value.gsx$variable.$t
//         entry['assessor']             = value.gsx$assessor.$t
//         entry['related_measures']     = value.gsx$relatedmeasures.$t && value.gsx$relatedmeasures.$t.split(',')
//         entry['included_measures']    = value.gsx$includedmeasures.$t && value.gsx$includedmeasures.$t.split(',')
//         entry['source']               = value.gsx$source.$t
//         entry['notes']                = value.gsx$notes.$t
//     measures[key] = entry

//     // Populate tags object based on any applied to this measure
//     if (measures[key]['tags'].length > 0) {
//       measures[key]['tags'].forEach(function (tag) {
//         // If there's no entry for this particular tag, create an object to house
//         // corresponding measures and data that match that tag.
//         if (!tagMap[tag]) {
//           tagMap[tag] = {}
//           // tagMap[tag]['data'] = []
//         }
//         tagMap[tag][key] = true
//       })
//     }
//   })

//   evidenceData.measures = measures
//   evidenceData.tags = tagMap
// }

// var processMetrics = function(data) {
//   var metrics = {}

//   $.each(data.feed.entry, function (index, value) {
//     if (index == 0) {
//       return
//     }
//     var key = value.gsx$name.$t
//     var entry = {}
//         entry['name']                 = key
//         entry['name_short']           = value.gsx$nameshort.$t
//         entry['name_friendly']        = value.gsx$namefriendly.$t
//         entry['description']          = value.gsx$description.$t
//         entry['presentation']         = value.gsx$presentation.$t
//         entry['source']               = value.gsx$source.$t
//         entry['notes']                = value.gsx$notes.$t
//     metrics[key] = entry
//   })

//   evidenceData.metrics = metrics
// }

// DataObject.prototype.getAndProcessData = function() {
//   // Get measures
//   var urlMeasures = base + sheets.measures + end
//   $.getJSON(urlMeasures, processMeasures)

//   // Get metrics
//   var urlMetrics = base + sheets.metrics + end
//   $.getJSON(urlMetrics, processMetrics)

//   // Get GRADE levels
//   var urlGrades = base + sheets.grades + end
//   $.getJSON(urlGrades, processGrades)

//   // Get tag descriptions
//   var urlTagDescriptions = base + sheets.tagDescriptions + end
//   $.getJSON(urlTagDescriptions, processTagDescriptions)

//   // Get data
//   // Loop through the data source spreadsheets, projecting each one into a more useful format.
//   Object.keys(sheets.data).forEach(function (source) {
//     var urlData = base + sheets.data[source] + end
//     $.getJSON(urlData, processData)
//   })
// }

export default evidenceData