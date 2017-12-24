import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { render } from 'react-dom'

import App from './components/App'

const Index = (Component) => {
  return (
    <BrowserRouter>
      <Component />
    </BrowserRouter>
  )
}

render(Index(App), document.getElementById('root'))

// Hot-reload modules as they’re changed
if (module.hot) {
  module.hot.accept('./components/App.js', () => {
    const NextApp = require('./components/App').default
    render(Index(NextApp), document.getElementById('root'))
  })
}