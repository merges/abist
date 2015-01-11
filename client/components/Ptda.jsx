/** @jsx React.DOM */

var DocumentTitle = require('react-document-title');
var React = require('react/addons');

var PageTitle = "PtDA";

var Ptda = React.createClass({

  render: function() {
    return (
      <DocumentTitle title={PageTitle}>
        <div className="container">
          <h1>PtDA</h1>
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

module.exports = Ptda;