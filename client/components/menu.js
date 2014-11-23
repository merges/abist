/** @jsx React.DOM */

goog.provide("app.Menu");

app.Menu = React.createClass({
  
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
