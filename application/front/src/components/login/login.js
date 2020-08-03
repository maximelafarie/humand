import React from 'react'
import './login.scss'

const LoginForm = ({ submitLogin, isLoading, error }) => (
  <div className="box columns is-centered">
    <div className="column is-12 has-text-centered">
    <div className="main-title">
        <div className="logo" />
      </div>
      <form id="login" onSubmit={submitLogin}>
        <div className="field">
          <div className="control">
            <input
              id="identifier"
              className={`input is-large ${error && 'is-danger'}`}
              type="text"
              placeholder="Identifiant"
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <input
              className={`input is-large ${error && 'is-danger'}`}
              id="password"
              type="password"
              placeholder="Mot de passe"
            />
          </div>

          {error && (
            <p className="form-error help is-danger">
              Mauvais mot de passe / identifiant
            </p>
          )}
        </div>

        <div className="columns is-multiline">
          <div className="field column is-12 has-text-centered">
            <button
              type="submit"
              className={`button is-large is-rounded is-blue  ${
                isLoading ? 'is-loading' : ''
              }`}
            >
              Se connecter
            </button>
          </div>
          <div className="column has-text-centered is-12">
            <a className="back-to-gw" href="https://www.google.fr">
              Retour au portail
            </a>
          </div>
        </div>
      </form>
    </div>
  </div>
)

// Layout :: Props -> React.Component
// eslint-disable-next-line react/prop-types
const Login = ({ isLoading, error, submitLogin }) => (
  <section data-component="login" className="section" id="login-component">
    <div className="login-container container">
      <div className="columns is-variable is-centered is-5 is-vcentered">
        <LoginForm
          isLoading={isLoading}
          error={error}
          submitLogin={submitLogin}
        />
      </div>
    </div>
  </section>
)

export default Login
