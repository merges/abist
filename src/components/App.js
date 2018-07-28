import React from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'

// import AdverseEvents from './adverse/AdverseEvents'
import Experiment from './Experiment'
import Navigator from './Navigator'
// import OutcomeTimeline from './OutcomeTimeline'
// import Processing from './Processing'
// import Ptda from './ptda/Ptda'
import VisualizationSketches from './visualizations/VisualizationSketches'
import VisualizationTests from './visualizations/VisualizationTests'

// This is a "pure" or stateless React component. In the browser,
// it is wrapped in a React Router "BrowserRouter" component and
// injected into the DOM. On the server, it is wrapped in a StaticRouter
// component and React's renderToString method writes it to the document
// as text.

import styles from '../styles/styles.scss'

const App = () => {
  return <div className="app">
    <main>
      <Switch>
      	<Route exact path='/' component={Experiment} />
		    {/* <Route name='adverse' path='/adverse' component={AdverseEvents} /> */}
		    <Route name='navigator' path='/navigator' component={Navigator} />
		    {/* <Route name='outcometimeline' path='/outcometimeline' component={OutcomeTimeline} /> */}
		    {/* <Route name='processing' path='/processing' component={Processing} /> */}
		    {/* <Route name='ptda' path='/ptda' component={Ptda} /> */}
		    <Route name='visualization-sketches' path='/visualization-sketches' component={VisualizationSketches} />
		    <Route name='visualization-tests' path='/visualization-tests' component={VisualizationTests} />
        {/* <Route component={Experiment} /> {/* Not found */}
      </Switch>
    </main>
  </div>
}

export default App
