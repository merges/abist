/** @jsx React.DOM */

var React = require('react/addons');

var Experiment = React.createClass({

  getInitialState: function() {
    return {
      showDetail: false
    }
  },

  componentWillMount: function() {
    var processData = this.processData;

    // $.getJSON('/itemsData', function(itemsDataJson) {
    //   processData(itemsDataJson);
    // });
  },

  toggleDetail: function() {
    this.setState({
      showDetail: true
    });
  },

  renderDescription: function() {
    return (
      <section>
        <section className='description'>
          <p className='emphasize'>This is the online home of my thesis project, an evolving prototype application to demonstrate <strong>how data from medical evidence can be extracted, encoded, harmonized and translated, and made “user-friendly” to laypeople through contemporary user interface design.</strong> The prototype will focus on one important <strong>issue</strong> facing people with rheumatoid arthritis (RA), probably either <em>ability to exercise</em> or <em>ability to cook or work with my hands</em>.
          </p>
          {!this.state.showDetail &&
            <p><a onClick={this.toggleDetail}>Read more about my thesis project</a></p>
          }

          {this.state.showDetail &&
            <div>
              <p className='pull-quote'>I have two or three options to treat my rheumatoid arthritis. They vary in cost, dosage form, and probably in other ways I don’t even know yet. But what I really want to know is: Which one will help me the most to continue my job and exercise as much as I do, and work the best for the rest of my life? I love to cook and play tennis.</p>
              <p>My prototype will try to help the person in that scenario explore and understand what the evidence has to say about that issue. If she goes with option A, what will it mean for her? What about option B? And option C? Bringing together that evidence is a tough challenge—and that’s the meat of my thesis project, which will try to answer the following questions:</p>
              <ol>
                <li>How can evidence be <strong>broken down</strong> or its <strong>key discoveries extracted as data</strong>, focusing on patient-important data, and be <strong>easily</strong> encoded for machine-readability?</li>
                <li>Can a patient-important issue-oriented <strong>translation or harmonization layer</strong> (a data thesaurus, if you will) be built to “bring together” these heterogeneous, machine-readable encoded data, for use in a Web-based application?</li>
                <li>How can different kinds of information from these sources (outcome data, adverse event data, treatment regimens, cost data, testimonials, or whatever else may be appropriate) be <strong>designed and presented</strong> in ways that correspond to the mental models and issues facing real people with rheumatoid arthritis?</li>
                <li>What are the best ways to design a user interface to query, explore, tailor to the user, and make sense of the evidence?</li>
              </ol>
              <p>I want to find answers to these questions, and reusable <strong>patterns, methods, designs, and findings</strong> that can be used by other designers, technologists, patient educators, medical practictioners, and so on. While my prototype will be built with real people with RA (patients adn non-experts) as the “north star” to guide <strong>all</strong> the work, my audience is people who want to make tools to help people who want to know what their options are, and what the evidence has to say about what choosing one will mean for them.</p>
              <img src='./images/p_conceptual.png' className='img-responsive' />
            </div>
          }
        </section>
      </section>
    );
  },

  render: function() {
    return (
      <div className='experiment'>
        <section>
          <h1>
            Adam Baker Independent Studies thesis project
            <p className='annotation'>I’m a thesis student in the University of Waterloo’s <a href='//uwaterloo.ca/independent-studies/'>Independent Studies</a> program, head of design at <a href='//iodine.com'>Iodine</a>, and designer on the <a href='//open.fda.gov/'>openFDA</a> team. My thesis project work is independent and self-funded. <a href='mailto:ab+thesis@merges.net'>Contact me by email.</a></p>
          </h1>

        </section>

        {this.renderDescription()}

        <nav>
          <h2><a href='http://abist.tumblr.com/'>Progress reports (blog)</a></h2>
          <h2>
            <a href='/processing'>Data live from a Google Spreadsheet</a>
            <p>This is a demo, in a style similar to the GRADE and Cochrane summary of findings tables, of data from multiple sources being displayed side by side in a UI. The data live in an editable Google spreadsheet. This also demonstrates a very preliminary, and simplistic, harmonization: Instead of organizing data by study, or by drug, or some other typical scheme, they are organized according to high-level concepts like <em>work</em> and <em>improvement</em>. Any appropriate measures are thus grouped and presented under those concepts. The demo also features the first few reusable components I hope to make (such as widgets for displaying absolute risk frequency and for showing intervention details like dosage).</p>
          </h2>
           <h2>
            <a href='/visualization-sketches'>Visualization sketches</a>
            <p>This page has evolving, non-interactive sketches of visualizations and ways of presenting evidence/data.</p>
          </h2>
          <h2>
            <a href='/ptda'>RA treatment decision aid demo</a>
            <p>This is an interactive, tailorable digital derivation of a <a href='//www.ncbi.nlm.nih.gov/pubmed/25649726'>low-literacy decision aid about RA medications</a> designed by one of my supervisors, Dr. Jennifer Barton, and her colleagues at UCSF and elsewhere. I developed it in the first few weeks of my thesis work, as a testbed for technology choices and to explore ideas that will be used in my eventual RA prototype.</p>
          </h2>
          <h2>
            <a href='/adverse'>RA DMARD adverse events prototype</a>
            <p>This is a prototype to explore querying an FDA database for reported adverse events where at least one of 12 commonly used disease-modifying antirheumatic drugs was being used to treat RA.</p>
          </h2>
          <h2>
            <a href='/visualization-tests'>Visualization tests</a>
            <p>A page with test cases for visualization widgets.</p>
          </h2>
        </nav>
      </div>
    );
  }

});

module.exports = Experiment;