import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import LogIn from './Login/Container'

const App = ({ store }) => (
  <ReduxProvider store={store}>
    <LogIn />
  </ReduxProvider>
)

export default App
