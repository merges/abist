/** @jsx React.DOM */

var React = require('react/addons');

var Menu = React.createClass({

  getDefaultProps: function() {
    return {
      items: ['one', 'two', 'three']
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
          <option selected='selected' value={item} key={item}>
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
      items: ['apple', 'orange', 'banana'],
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

    // $.getJSON('/itemsData', function(itemsDataJson) {
    //   processData(itemsDataJson);
    // });
  },

  render: function() {
    var items = this.state.items;
    var itemSelected = this.state.itemSelected;

    return (
      <div>
        <div className='container'>
          <h1>Adam Baker Independent Studies Thesis</h1>
          <a href='https://abist.tumblr.com/'>Log of progress</a>
          <h2><a href='/ptda'>Ptda prototype</a></h2>
          {/*<Menu items={items} itemSelected={itemSelected} />*/}
        </div>
      </div>
    );
  },

  processData: function(dataJson) {
    this.setState({
      items: dataJson.items
    });
  }

});

module.exports = Experiment;