

var React = require('react');

// Visualization sketches

var VisualizationSketches = React.createClass({

  render: function() {
    var medications = this.props.medications;

    var cx = require('classnames');
    var classes = cx({
      'processing': true
    });

    return (
      <div className={classes}>
        <div className='header'>
          <h1>Visualization sketches</h1>
        </div>

        <section>
          <h2>Warning: These are just sketches!</h2>
          <p>These are drastic oversimplifications of the evidence which sits behind them. Yet, this is how the work must proceed. Explorations must happen, and totally wrong ideas made and thrown out!</p> 
        </section>

        <section>
          <h2>Combination intervention + outcome + population observation over time</h2>
          <p>This visualization shows the key findings from a study by Puolakka et al., <a href='http://onlinelibrary.wiley.com/doi/10.1002/art.20716/abstract' target='_new'>Early suppression of disease activity is essential for maintenance of work capacity in patients with recent-onset rheumatoid arthritis.</a> The article shows that five-year disability outcomes (days off work and permanent disability) are improved for people who have better response to treatment in the first six months on DMARDs. The analysis was part of a trial where triple therapy (hydroxychloroquine + methotrexate + sulfasalazine and prednisolone) was compared against treatment with sulfasalazine only and prednisolone if needed, with a switch to methotrexate after 6 months if response was inadequate with sulfasalazine.</p>
          <p>I want to explore how both the treatment outcomes, and later observation of the treated populations, might be visualized.</p> 
          <img src='./images/visualizations/sketch_outcomeTimelineComparison.png' className='img-responsive' />
        </section>

        <section>
          <h2>Relative risk of ACR 50 for biologics, and MTX, compared to assumed risk for placebo</h2>
          <p>This visualization shows relative risk estimate of effect data from two systematic reviews, on <a href='http://www.ncbi.nlm.nih.gov/pubmed/24916606' target='_new'>methotrexate for RA</a> and <a href='http://www.ncbi.nlm.nih.gov/pubmed/19821440' target='_new'>biologic DMARDs for RA.</a></p>
          <img src='./images/visualizations/sketch_relativeRiskDMARDsACR50.png' className='img-responsive' />
        </section>

        <section>
          <h2>Comparative risk frequency for ACR 50 for biologics, and MTX, and assumed risk for placebo</h2>
          <p>This visualization shows absolute risk (frequency) estimate of effect (treatment benefit) data from two systematic reviews, on <a href='http://www.ncbi.nlm.nih.gov/pubmed/24916606' target='_new'>methotrexate for RA</a> and <a href='http://www.ncbi.nlm.nih.gov/pubmed/19821440' target='_new'>biologic DMARDs for RA.</a></p>
          <img src='./images/visualizations/sketch_comparativeRiskFrequencyDMARDsACR50.png' className='img-responsive' />
        </section>

      </div>
    );
  }
});

module.exports = VisualizationSketches;