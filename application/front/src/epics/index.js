import { combineEpics } from 'redux-observable'
import LogIn from './login.epic'

// Epic :: (Observable Action, Observable State) -> Observable Action
export default combineEpics(LogIn)
