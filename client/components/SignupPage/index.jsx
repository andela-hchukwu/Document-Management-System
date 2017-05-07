import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SignupForm from './SignupForm';
import { userSignupRequest, isUserExists } from '../../actions/signupAction';
import { addFlashMessage } from '../../actions/flashMessages';

/**
 *
 * @class SignupPage
 * @extends {React.Component}
 */
class SignupPage extends React.Component {

  /**
   *
   * @returns
   *
   * @memberOf SignupPage
   */
  render() {
    const { userSignupRequest, addFlashMessage, isUserExists } = this.props;
    return (
      <div className="card" id="signupcard">
        <div>
          <SignupForm
            isUserExists={isUserExists}
            userSignupRequest={userSignupRequest}
            addFlashMessage={addFlashMessage} />
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired
};

export default connect(null, { userSignupRequest, addFlashMessage, isUserExists })(SignupPage);
