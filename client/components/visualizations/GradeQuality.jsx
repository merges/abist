/** @jsx React.DOM */

var React = require('react/addons');

var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Tooltip = require('react-bootstrap').Tooltip;

// GRADE level of evidence visualization

var GradeQuality = React.createClass({

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
            'ss-icon ss-star': true,
            'highlight': i <= gradeNumber
          });
          icons.push(<i key={i} className={iconClasses}></i>);
        }
      }
      else {
        icons.push(<i key={i} className='ss-icon ss-help highlight'></i>);
      }
      return icons;
    };

    var getTooltip = function(grade) {
      var tooltip;
      if (grade == 'X' || !grade) {
        tooltip = (
          <Tooltip>
            <strong>Not rated.</strong> This information hasn’t been quality rated according to GRADE.
          </Tooltip>
        );
      }
      else {
        tooltip = (
          <Tooltip>
            <strong>{grades[grade].name_friendly}.</strong><br />
            {grades[grade].description_friendly}
          </Tooltip>
        );
      }
      return tooltip;
    };

    return (
      <div className={visualizationClasses}>
        <OverlayTrigger delayHide={150} placement='left' overlay={getTooltip(grade)}>
          <span>{getIcons(grade)}</span>
        </OverlayTrigger>
      </div>
    );
  }
});

module.exports = GradeQuality;