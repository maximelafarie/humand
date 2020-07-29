import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { createEpicMiddleware } from 'redux-observable'
import { of } from 'ramda'
import Store from './Redux/Store'
import mainReducer from './Redux'
import App from './Components/App'
import rootEpic from './Epics'

import * as serviceWorker from './serviceWorker'

const epicMiddleware = createEpicMiddleware({
  dependencies: {
    history: createBrowserHistory(),
    fetchApi: (path, options = {}) =>
      fetch(process.env.REACT_APP_API_URL, path, options),
  },
})

const store = Store(mainReducer(), of(epicMiddleware), mainReducer)

epicMiddleware.run(rootEpic)

ReactDOM.render(
  <App store={store} location={window.location} />,
  document.getElementById('root'),
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
