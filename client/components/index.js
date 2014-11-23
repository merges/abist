/** @jsx React.DOM */

goog.require("app.Menu");

goog.provide("app.Index");

var Menu = app.Menu;

var Index = React.createClass({
  
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

    $.getJSON("/itemsData", function(itemsDataJson) {
      processData(itemsDataJson);
    });
  },

  render: function() {
    var items = this.state.items;
    var itemSelected = this.state.itemSelected;

    return (
      <div className="container">
        <h1>abist</h1>
        <h2>humble beginnings</h2>
        <Menu items={items} itemSelected={itemSelected} />
      </div>
    );
  },

  processData: function(dataJson) {
    this.setState({
      items: dataJson.items
    });
  },

  componentDidMount: function() {
    //
  },

  componentDidUpdate: function() {
    //
  }

});
