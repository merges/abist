/** @jsx React.DOM */

var React = require('react/addons');

// Source tag

var Source = React.createClass({
  
  propTypes: {
    source: React.PropTypes.string,
    kind: React.PropTypes.string
  },

  render: function() {
    var source = this.props.source;
    var kind = this.props.kind;

    if (source) {
      return (
        <a className='source' href={source} target='_new'>
          {kind ? <span>{kind} »</span> : 'Source »'}
        </a>
      );
    }
    return (<noscript />);
  }
});

module.exports = Source;