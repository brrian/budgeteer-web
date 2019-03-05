import React, { Component } from 'react';
import { RouteComponentProps, Switch } from 'react-router';
import { AuthRoute, UnauthRoute } from 'react-router-auth';
import BasePage from './pages/base/BasePage';
import LoginPage from './pages/login/LoginPage';

interface AppState {
  isAuthenticated: boolean;
}

class App extends Component<{}, AppState> {
  state: AppState = {
    isAuthenticated: localStorage.getItem('token') !== null,
  };

  handleAuthStatusChanged = (status: boolean) => {
    this.setState({ isAuthenticated: status });
  };

  render() {
    const { isAuthenticated } = this.state;

    return (
      <Switch>
        <UnauthRoute
          authenticated={isAuthenticated}
          component={(props: RouteComponentProps) => (
            <LoginPage
              {...props}
              updateAuthStatus={this.handleAuthStatusChanged}
            />
          )}
          path="/login"
          redirectTo="/"
        />
        <AuthRoute
          authenticated={isAuthenticated}
          component={BasePage}
          path="/"
          redirectTo="/login"
        />
      </Switch>
    );
  }
}

export default App;
