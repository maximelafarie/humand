import { of } from 'rxjs'
import { catchError, merge } from 'rxjs/operators'
import { pipe, tap, always } from 'ramda'

// catchObservableError :: () -> Observable -> Observable
export const catchObservableError = () =>
  catchError((err, source) =>
    pipe(
      tap(_ => process.env.REACT_APP_DEBUG && console.error(_)),
      always(source),
    )(err),
  )

// catchObservableErrorAndTriggerAction :: -> Observable Action -> Observable Action
export const catchObservableErrorAndTriggerAction = action =>
  catchError((err, source) =>
    pipe(
      tap(_ => process.env.REACT_APP_DEBUG && console.error(_)),
      () => of(action(err)).pipe(merge(source)),
    )(err),
  )
