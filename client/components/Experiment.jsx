/** @jsx React.DOM */

var DocumentTitle = require('react-document-title');
var React = require('react/addons');

// var Router = require('react-router');
// var RouteHandler = Router.RouteHandler;
// var Link = Router.Link;

var PageTitle = "Experiment";

var Menu = React.createClass({
  
  getDefaultProps: function() {
    return {
      items: ["one", "two", "three"]
    }
  },

  getInitialState: function() {
    return {
      itemSelected: null
    }
  },

  render: function() {
    var items = this.props.items;
    var itemSelected = this.state.itemSelected;
    
    return(
      <select onChange={this.handleSelectChange}>
        {this.renderOptions(items, itemSelected)}
      </select>
    );
  },

  renderOptions: function(list, itemSelected) {
    var options = [];
    var itemSelected = this.state.itemSelected;

    list.map(function(item) {
      if (itemSelected && goog.string.caseInsensitiveEquals(item, itemSelected)) {
        options.push(
          <option selected="selected" value={item} key={item}>
            {item}
          </option>
        );
      }
      else {
        options.push(
          <option value={item} key={item}>
            {item}
          </option>
        );
      }
    });

    return options;
  },

  handleSelectChange: function(event) {
    console.log(event.target.value);
  }

});

var Experiment = React.createClass({

  getDefaultProps: function() {
    return {
      items: ["apple", "orange", "banana"],
      itemSelected: null
    }
  },

  getInitialState: function() {
    return {
      items: this.props.items,
      itemSelected: null
    }
  },

  componentWillMount: function() {
    var processData = this.processData;

    // $.getJSON("/itemsData", function(itemsDataJson) {
    //   processData(itemsDataJson);
    // });
  },

  render: function() {
    var items = this.state.items;
    var itemSelected = this.state.itemSelected;

    return (
      <DocumentTitle title={PageTitle}>
        <div className="container">
          <h1>abist</h1>
          <h2>humble beginnings</h2>
          <Menu items={items} itemSelected={itemSelected} />
        </div>
      </DocumentTitle>
    );
  },

  processData: function(dataJson) {
    this.setState({
      items: dataJson.items
    });
  }

});

module.exports = Experiment;