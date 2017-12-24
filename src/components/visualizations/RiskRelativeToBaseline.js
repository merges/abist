

var React = require('react')
var _ = require('lodash')

var AbsoluteFrequency = require('./AbsoluteFrequency')

var OverlayTrigger = require('react-bootstrap').OverlayTrigger
var Popover = require('react-bootstrap').Popover
var Tooltip = require('react-bootstrap').Tooltip

// Intervention display with tooltip

var RiskRelativeToBaseline = React.createClass({

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
    }
  },

  getInitialState: function() {
    return {
      iconArrayHoverRiskValue: null,
      pillHoverRiskValue: null
    }
  },

  getTooltip: function(value) {
    return (
      <Tooltip>
        <strong>{value}</strong>
      </Tooltip>
    )
  },

  getPopover: function(item, baselineFrequency) {
    var riskFrequency = this.getRiskFrequencyFromBaseline(item, baselineFrequency)

    return (
      <Popover title={item.parts}>
        Estimated risk <span className='ss-icon ss-user'></span> <strong>{riskFrequency}</strong> of 100
        <AbsoluteFrequency frequency={riskFrequency} metric={'ar_100'} denominator={100} breakpoint={20} baseline={baselineFrequency} />
      </Popover>
    )
  },

  makePill: function(item, baselineFrequency) {
    var cx = require('classnames')

    var handlePillHover = this.handlePillHover
    var handlePillHoverLeave = this.handlePillHoverLeave

    var riskFrequency = this.getRiskFrequencyFromBaseline(item, baselineFrequency)

    var classes = cx({
      'pill': true,
      'active': riskFrequency <= this.state.iconArrayHoverRiskValue
    })

    return (
      <OverlayTrigger
        delayHide={700}
        placement='right'
        overlay={this.getPopover(item, baselineFrequency)}
        key={item.parts}>
          <div
            className={classes}
            onMouseEnter={handlePillHover.bind(null, riskFrequency)}
            onMouseLeave={handlePillHoverLeave.bind(null)}>
              {item.parts}
          </div>
      </OverlayTrigger>
    )
  },

  getRiskFrequencyAsFrequencyPer100: function(item) {
    var riskFrequency
    if (item.ar_1000) {
      riskFrequency = Math.round(item.ar_1000.value.value / 10)
    }
    else if (item.ar_100) {
      riskFrequency = item.ar_100.value.value
    }
    return riskFrequency
  },

  getRiskFrequencyFromBaseline: function(item, baselineFrequency) {
    var relativeRisk
    if (item.rr) {
      relativeRisk = item.rr.value.value
    }
    else if (item.or) {
      relativeRisk = item.or.value.value
    }
    else if (!item.or || !item.rr) {
      return baselineFrequency
    }
    return Math.round(relativeRisk * baselineFrequency)
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
    })
  },

  handlePillHoverLeave: function(value) {
    this.setState({
      pillHoverRiskValue: null
    })
  },

  handleIconArrayHover: function(value) {
    this.setState({
      iconArrayHoverRiskValue: value
    })
  },

  handleIconArrayHoverLeave: function(value) {
    this.setState({
      iconArrayHoverRiskValue: null
    })
  },

  renderIconArray: function() {
    var cx = require('classnames')
    var handleIconArrayHover = this.handleIconArrayHover
    var handleIconArrayHoverLeave = this.handleIconArrayHoverLeave

    var iconArray = []
    for (var i = 1; i <= 100; i++) {
      var classes = cx({
        'ss-icon ss-user': true,
        'tenth': i % 10 == 0,
        'active': i <= this.state.iconArrayHoverRiskValue || i <= this.state.pillHoverRiskValue
      })
      iconArray.push(
        <span
          key={i}
          className={classes}
          onMouseEnter={handleIconArrayHover.bind(null, i)}
          onMouseLeave={handleIconArrayHoverLeave.bind(null)}>
            <span className='number'>{i}</span>
        </span>
      )
    }

    return (
      <div className='icon-array'>
        {iconArray}
      </div>
    )
  },

  render: function() {

    var cx = require('classnames')
    var visualizationClasses = cx({
      'visualization risk-relative-to-baseline': true
    })

    var comparison = this.props.comparison
    var items = this.props.items
    var measure = this.props.measure
    var measures = this.props.measures
    var baselineFrequency = this.getRiskFrequencyAsFrequencyPer100(comparison)

    var showValues = this.props.showValues

    // Get values from the supplied 'interventions'
    // and calculate the range.
    var values = []
    items.forEach(function(item) {
      values.push(item.rr.value.value)
    })
    // var range = 1

    var getPosition = function(value) {
      return Math.round(value * baselineFrequency)
    }

    // Sort entries
    var sortedItems = items.sort(function(a, b) {
      return a.rr.value.value - b.rr.value.value
    })

    var makePill = this.makePill
    var pill
    var groups = {}
    var previousPosition
    var position
    var threshold = 5

    // Put comparison / placebo into the first group
    previousPosition = getPosition(1)
    groups[previousPosition] = [makePill(comparison, baselineFrequency)]

    // Make the rest of the pills
    items.forEach(function(item) {
      var value = item.rr.value.value
      position = getPosition(value)

      // No previous position
      if (!previousPosition) {
        // console.log('first')
        groups[position] = []
        pill = makePill(item, baselineFrequency)
        groups[position].push(pill)
        previousPosition = position
      }
      // Very close (within threshold range) to previous position
      else if (previousPosition && ((position - previousPosition) <= threshold)) {
        // console.log('value below threshold', position, previousPosition)
        pill = makePill(item, baselineFrequency)
        groups[previousPosition].push(pill)
      }
      // Significantly different
      else {
        // console.log('significantly different', position)
        groups[position] = []
        pill = makePill(item, baselineFrequency)
        groups[position].push(pill)
        previousPosition = position
      }
    })

    var pillGroups = []
    var pillGroupCounts = []
    Object.keys(groups).forEach(function(group, i) {
      var style = {
        // Subtract one to get more accurat position in markup
        left: (group - 1) + '%'
      }

      var legend
      if (i == 0) {
        legend = group + ' (baseline)'
      }
      else {
        legend = group
      }

      pillGroups.push(
        <li className='item' style={style} key={i}>
          {groups[group]}
          <div className='line'></div>
          {showValues && <div className='legend'>{legend}</div>}
        </li>
      )
      pillGroupCounts.push(groups[group].length)
    })

    // Visualization needs heigh based on number of pills in highest pillgroup
    var maxPills = _.max(pillGroupCounts)
    var height = {
      minHeight: maxPills * 5 + 'em'
    }

    return (
      <div>
        {this.props.showTitle &&
          <div className='title'>
            <h3>
              Chance of <strong>{measures[measure].name_friendly}</strong>
            </h3>
            <p className='font-size-1'>Meaning {measures[measure].description.toLowerCase()}. <span className='light'>Calculated as the relative risk of intervention * baseline of comparison</span></p>
          </div>
        }
        <div style={height} className={visualizationClasses}>
          <div className='chart-holder'>
            <ul>
              {pillGroups}
            </ul>
            <div className='axis-labels'>
              {this.renderIconArray()}
              <div className='axis-label left'>
                <strong>0 of 100</strong>
                <p>
                  No one would be expected to: <strong>{measures[measure].name_short}</strong>
                </p>
              </div>
              <div className='axis-label right'>
                <strong>100 of 100</strong>
                <p>
                  Everyone would be expected to: <strong>{measures[measure].name_short}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = RiskRelativeToBaseline