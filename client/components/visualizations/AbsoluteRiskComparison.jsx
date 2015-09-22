/** @jsx React.DOM */

var React = require('react/addons');

var AbsoluteFrequency = require('./AbsoluteFrequency.jsx');

var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Popover = require('react-bootstrap').Popover;
var Tooltip = require('react-bootstrap').Tooltip;

// Absolute risk comparison

var AbsoluteRiskComparison = React.createClass({

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
      <Popover title={name}>
        {name} <span className='ss-icon ss-user'></span> <strong>{item.value.value}</strong> of 100
      </Popover>
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
      <OverlayTrigger
        delayHide={300}
        placement='right'
        overlay={this.getPopover(item)}
        key={name}>
          <div
            className={classes}
            onMouseEnter={handlePillHover.bind(null, riskFrequency)}
            onMouseLeave={handlePillHoverLeave}>
              {name}
          </div>
      </OverlayTrigger>
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
        <span
          key={i}
          className={classes}
          onMouseEnter={handleIconArrayHover.bind(null, i)}
          onMouseLeave={handleIconArrayHoverLeave}>
            <span className='number'>{i}</span>
        </span>
      );
    }

    return (
      <div className='icon-array'>
        {iconArray}
      </div>
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
        <li className='item' style={style} key={i}>
          {groups[pos]}
          <div className='line'></div>
          {showValues && <div className='legend'>{pos}</div>}
        </li>
      );
    });

    return (
      <div>
        <div className='visualization absolute-risk-comparison'>
          <div className='chart-holder'>
            <ul>
              {pillGroups}
            </ul>
            <div className='axis-labels'>
              {this.renderIconArray()}
              <div className='axis-label left'>
                <strong>0 of 100</strong>
                <p>
                  At this end, no one is expected to experience
                </p>
              </div>
              <div className='axis-label right'>
                <strong>100 of 100</strong>
                <p>
                  At this end, almost everyone is expected to experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = AbsoluteRiskComparison;