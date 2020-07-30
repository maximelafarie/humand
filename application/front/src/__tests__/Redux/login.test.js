import * as LogIn from '../../redux/state/login.state'

describe('Redux :: State :: Auth :: LogIn', () => {
  it('reduces to initial state by default', () => {
    const initialState = LogIn.default()

    expect(initialState).toEqual(LogIn.INITIAL_STATE)
  })

  it('reduces SUBMIT action', () => {
    const initialState = LogIn.default()
    const login = LogIn.logIn({ email: 'test@foo.bar', password: 'klhjkghj' })
    const state = LogIn.default(initialState, login)

    expect(state.submitting).toBe(true)
  })

  it('reduces REJECT action', () => {
    const initialState = LogIn.default()
    const reject = LogIn.reject()
    const state = LogIn.default(initialState, reject)

    expect(state.error).toBe(true)
    expect(state.submitting).toBe(false)
  })

  it('reduces GRANT action', () => {
    const initialState = LogIn.default()
    const grant = LogIn.grant()
    const state = LogIn.default(initialState, grant)

    expect(state.submitting).toBe(false)
  })
})
