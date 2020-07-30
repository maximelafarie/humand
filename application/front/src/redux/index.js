import { always } from 'ramda'
import { combineReducers } from 'redux'
import LogIn from './state/login.state'

// INIT :: String
export const INIT = '@fpstarter/App/INIT'

// initServiceWorker :: String -> Action
export const initServiceWorker = always({ type: INIT })

// State :: (State, Action *) -> State
export default combineReducers({
  LogIn,
})
