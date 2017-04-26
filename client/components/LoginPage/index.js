import React from 'react';
import LoginForm from './LoginForm';

class LoginPage extends React.Component {
  render() {
    return (
      <div className="card" id="logincard">
        <LoginForm />
      </div>
    );
  }
}

export default LoginPage;
