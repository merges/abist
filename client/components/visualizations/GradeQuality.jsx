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
      console.log(gradeNumber);
      if (gradeNumber > 0) {
        for (var i = 1; i <= 4; i++) {
          var iconClasses = cx({
            'ss-icon ss-stop': true,
            'highlight': i <= gradeNumber
          });
          icons.push(<i key={i} className={iconClasses}></i>);
        }
      }
      else {
        icons.push(<i className='ss-icon ss-help highlight'></i>);
      }
      return icons;
    };

    var getTooltipContent = function(grade) {
      // var tooltipContent;
      // if (grade == 'X' || !grade) {
      //   var tooltipContent = (
      //     <span>
      //       <strong>Not sure.</strong> This information hasn’t been quality rated according to GRADE.
      //     </span>
      //   );
      // }
      // else {
      //   var tooltipContent = (
      //     <span>
      //       <strong>{grade} {grades[grade].name_friendly}.</strong> {grades[grade].description}
      //     </span>
      //   );
      // }
      // return tooltipContent;
      return 'foo';
    };

    var tooltip = (
      <Tooltip>
        {getTooltipContent(grade)}
      </Tooltip>
    );

    if (!grade) {
      return (
        <div>Unknown</div>
      );
    }
    return (
      <div className={visualizationClasses}>
        <OverlayTrigger delayHide={150} placement='left' overlay={tooltip}>
          {getIcons(grade)}
        </OverlayTrigger>
      </div>
    );
  }
});

module.exports = GradeQuality;