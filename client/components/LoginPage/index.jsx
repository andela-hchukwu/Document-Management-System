import React from 'react';
import LoginForm from './LoginForm';

/**
 *
 * @class LoginPage
 * @extends {React.Component}
 */
class LoginPage extends React.Component {

  /**
   *
   * @returns {html} login form
   *
   * @memberOf LoginPage
   */
  render() {
    return (
      <div className="card" id="logincard">
        <LoginForm />
      </div>
    );
  }
}

export default LoginPage;
