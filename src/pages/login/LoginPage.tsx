import { ApolloError, gql } from 'apollo-boost';
import classnames from 'classnames';
import React, { FormEvent, SFC, useState } from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import './loginPage.scss';

interface LoginPageProps extends RouteComponentProps {
  updateAuthStatus: (status: boolean) => void;
}

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const LoginPage: SFC<LoginPageProps> = ({ updateAuthStatus }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState(false);

  const handleFormSubmit = async (event: FormEvent, login: MutationFn) => {
    event.preventDefault();

    setFormError(false);

    const response = await login({ variables: { email, password } }).catch(
      handleLoginErrors
    );

    if (response) {
      localStorage.setItem('token', response.data.login);

      updateAuthStatus(true);
    }
  };

  const handleLoginErrors = ({ graphQLErrors }: ApolloError) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message }) => {
        if (message === 'Invalid email or password') {
          setFormError(message);
        }
      });
    }
  };

  return (
    <Mutation mutation={LOGIN}>
      {login => (
        <div className="login-page section">
          <div className="columns is-centered">
            <div className="column is-3-desktop is-5-tablet">
              <form onSubmit={event => handleFormSubmit(event, login)}>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      className={classnames('input', {
                        'is-danger': formError,
                      })}
                      onChange={event => setEmail(event.currentTarget.value)}
                      required={true}
                      type="email"
                      value={email}
                    />
                  </div>
                  {formError && <p className="help is-danger">{formError}</p>}
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      className="input"
                      onChange={event => setPassword(event.currentTarget.value)}
                      required={true}
                      type="password"
                      value={password}
                    />
                  </div>
                </div>
                <div className="control">
                  <button className="button is-primary">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Mutation>
  );
};

export default LoginPage;
