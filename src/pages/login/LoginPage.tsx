import React, { Component, FormEvent } from 'react';
import { RouteComponentProps } from 'react-router';
import './loginPage.scss';

interface LoginPageOwnProps extends RouteComponentProps {
  updateAuthStatus: (status: boolean) => void;
}

class LoginPage extends Component<LoginPageOwnProps> {
  handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    localStorage.setItem('token', 'value');

    this.props.updateAuthStatus(true);
  };

  render() {
    return (
      <div className="login-page section">
        <div className="columns is-centered">
          <div className="column is-3-desktop is-5-tablet">
            <form onSubmit={this.handleFormSubmit}>
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
