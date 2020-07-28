import { uncurryN, pipe } from 'ramda'

import { configureStore } from '@reduxjs/toolkit'

// Store :: State -> (Store -> Store) -> (Action -> State -> State) -> Store
const Store = uncurryN(3, initialState => middleware => reducer =>
  pipe(() =>
    configureStore({
      reducer,
      middleware,
      devTools: process.env.NODE_ENV !== 'production',
      preloadedState: initialState,
    }),
  )(),
)

export default Store
