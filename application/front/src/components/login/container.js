import { pipe, tap } from 'ramda'
import { connect } from 'react-redux'
import * as LogIn from '../../redux/state/login.state'
import Login from './login'

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  error: state.LogIn.error,
  username: state.LogIn.username,
  password: state.LogIn.password,
  isLoading: state.LogIn.submitting,
})

// mapDispatchToProps :: (Action * -> State) -> Props
const mapDispatchToProps = dispatch => ({
  submitLogin: pipe(
    tap(e => e.preventDefault()),
    e => [
      e.target
        .querySelector('[data-component=login] form#login input#identifier')
        .value.trim(),
      e.target.querySelector(
        '[data-component=login] form#login input[type=password]',
      ).value,
    ],
    ([username, password]) => dispatch(LogIn.logIn(username, password)),
  ),
})

// container :: ReactComponent -> ReactComponent
const container = connect(mapStateToProps, mapDispatchToProps)

// Login :: ReactComponent
export default container(Login)
