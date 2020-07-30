/* eslint-disable no-return-assign */
import { combineEpics, ofType } from 'redux-observable'
import * as rx from 'rxjs/operators'
import { catchObservableError } from '../utils/observable-utils'
import * as LogIn from '../redux/state/login.state'

// login :: Epic -> Observable Action
export const login = action$ =>
  action$.pipe(
    ofType(LogIn.LOG_IN),
    rx.map(() => LogIn.reject('login ou password incorrect')),
    catchObservableError(),
  )

export default combineEpics(login)
