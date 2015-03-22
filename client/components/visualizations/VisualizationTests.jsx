/** @jsx React.DOM */

var React = require('react/addons');

var AbsoluteFrequency = require('./AbsoluteFrequency.jsx');

// Visualization tests

var VisualizationTests = React.createClass({

  render: function() {
    var medications = this.props.medications;

    var cx = React.addons.classSet;
    var classes = cx({
      'processing': true
    });

    return (
      <div className={classes}>
        <div className='header'>
          <h1>Visualization tests</h1>
        </div>

        <section>
          <h2>Absolute risk frequency, out of 1000</h2>
          <h3>242/1000</h3>
          <AbsoluteFrequency frequency={242} metric={'ar_1000'} classNames='better' />
          <h3>777/1000</h3>
          <AbsoluteFrequency frequency={777} metric={'ar_1000'} classNames='worse' />
          <h3>-1/1000</h3>
          <AbsoluteFrequency frequency={-1} metric={'ar_1000'} />
          <h3>0/1000</h3>
          <AbsoluteFrequency frequency={0} metric={'ar_1000'} />
          <h3>1001/1000</h3>
          <AbsoluteFrequency frequency={0} metric={'ar_1000'} />
        </section>

        <section>
          <h2>Absolute risk frequency, out of 100</h2>
          <h3>24/100</h3>
          <AbsoluteFrequency frequency={24} metric={'ar_100'} classNames='better' />
          <h3>77/100</h3>
          <AbsoluteFrequency frequency={77} metric={'ar_100'} classNames='worse' />
          <h3>-1/100</h3>
          <AbsoluteFrequency frequency={-1} metric={'ar_100'} />
          <h3>0/100</h3>
          <AbsoluteFrequency frequency={0} metric={'ar_100'} />
          <h3>101/100</h3>
          <AbsoluteFrequency frequency={0} metric={'ar_100'} />
        </section>

        <section>
          <h2>Absolute risk frequency, no denominator supplied</h2>
          <h3>0.16</h3>
          <AbsoluteFrequency frequency={0.16} />
          <h3>0.16787</h3>
          <AbsoluteFrequency frequency={0.16787} />
          <h3>141</h3>
          <AbsoluteFrequency frequency={141} />
          <h3>1238</h3>
          <AbsoluteFrequency frequency={1238} />
          <h3>0</h3>
          <AbsoluteFrequency frequency={0} />
        </section>

        <section>
          <h2>Absolute risk frequency, various denominators</h2>
          <h3>5/20</h3>
          <AbsoluteFrequency frequency={5} denominator={20} />
          <h3>0.16787/10</h3>
          <AbsoluteFrequency frequency={0.16787} denominators={10} />
          <h3>17/75</h3>
          <AbsoluteFrequency frequency={17} denominator={75} />
        </section>

      </div>
    );
  }
});

module.exports = VisualizationTests;