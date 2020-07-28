import { combineEpics } from 'redux-observable'
import LogIn from './Login'

// Epic :: (Observable Action, Observable State) -> Observable Action
export default combineEpics(LogIn)
