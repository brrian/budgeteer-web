import React, { Component } from 'react';
import './loginPage.scss';

class LoginPage extends Component {
  render() {
    return (
      <div className="login-page section">
        <div className="columns is-centered">
          <div className="column is-3-desktop is-5-tablet">
            <form>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input className="input is-danger" type="email" />
                </div>
                <p className="help is-danger">Error</p>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input className="input" type="password" />
                </div>
              </div>
              <div className="control">
                <button className="button is-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
