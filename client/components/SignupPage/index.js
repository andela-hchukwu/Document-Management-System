import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SignupForm from './SignupForm';
import { userSignupRequest, isUserExists } from '../../actions/signupAction';
// import { addFlashMessage } from '../../actions/flashMessages';

class SignupPage extends React.Component {
  render() {
    const { userSignupRequest, isUserExists } = this.props;
    return (
      <div className="card" id="signupcard">
        <div>
          <SignupForm
            isUserExists={isUserExists}
            userSignupRequest={userSignupRequest} />
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired
};

export default connect(null, { userSignupRequest, isUserExists })(SignupPage);
