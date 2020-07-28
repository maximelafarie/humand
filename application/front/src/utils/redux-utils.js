import { identity, prop, propOr } from 'ramda'

// createReducer :: (State, Object) -> (State, Action) -> State
export const createReducer = (initialState, handlers) => (
  state = initialState,
  action = {},
) => propOr(identity, prop('type', action), handlers)(state, action)

// debugReducer :: Function -> Object -> Object -> Object
export const debugReducer = reducer => (state, action) => {
  console.groupCollapsed(action.type || '')
  console.log('ACTION :: ', action)
  console.log('CURRENT STATE :: ', state)

  const newState = reducer(state, action)

  console.log('NEW STATE :: ', newState)
  console.groupEnd()

  return newState
}
