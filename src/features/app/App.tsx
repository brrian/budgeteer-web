import ApolloClient from 'apollo-boost';
import { ErrorResponse } from 'apollo-link-error';
import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { RouteComponentProps, Switch } from 'react-router';
import { AuthRoute, UnauthRoute } from 'react-router-auth';
import ReactTooltip from 'react-tooltip';
import BasePage from '../../pages/base/BasePage';
import LoginPage from '../../pages/login/LoginPage';

interface AppState {
  isAuthenticated: boolean;
}

class App extends Component<{}, AppState> {
  client: ApolloClient<{}>;

  state: AppState = {
    isAuthenticated: localStorage.getItem('token') !== null,
  };

  constructor(props: {}) {
    super(props);

    this.client = new ApolloClient({
      uri: process.env.REACT_APP_GRAPHQL_URL,
      onError: this.handleApolloError,
      request: async operation => {
        const token = localStorage.getItem('token');

        if (token) {
          operation.setContext({
            headers: { Authorization: `Bearer ${token}` },
          });
        }
      },
    });
  }

  handleApolloError = ({ graphQLErrors }: ErrorResponse) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message }) => {
        if (message.indexOf('Context creation failed') !== -1) {
          localStorage.removeItem('token');

          this.handleAuthStatusChanged(false);
        }
      });
    }
  };

  handleAuthStatusChanged = (status: boolean) => {
    this.setState({ isAuthenticated: status });
  };

  render() {
    const { isAuthenticated } = this.state;

    return (
      <ApolloProvider client={this.client}>
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
            path="/:month?/:year?"
            redirectTo="/login"
          />
        </Switch>
        <ReactTooltip />
      </ApolloProvider>
    );
  }
}

export default App;
