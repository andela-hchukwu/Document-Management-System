/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import PropTypes from 'prop-types';
import validateInput from '../../util/signupValidation';
import TextInputTemplate from '../Common/TextInputTemplate';

/**
 *
 * @class SignupForm
 * @extends {React.Component}
 */
class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      roleId: 2,
      errors: {},
      isLoading: false,
      invalid: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
  }

  /**
   *
   * @param {object} event
   *
   * @memberOf SignupForm
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   *
   * @returns
   *
   * @memberOf SignupForm
   */
  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  /**
   *
   * @param {object} event
   *
   * @memberOf SignupForm
   */
  checkUserExists(event) {
    const field = event.target.name;
    const value = event.target.value;
    if (value !== '') {
      this.props.isUserExists(value).then((response) => {
        const errors = this.state.errors;
        let invalid;
        if (response.data.user) {
          errors[field] = `A user already exists with that ${field}`;
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }
        this.setState({ errors, invalid });
      });
    }
  }

  /**
   *
   * @param {object} event
   *
   * @memberOf SignupForm
   */
  onSubmit(event) {
    event.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state).then(
        () => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'Welcome! Signup Succesful.'
          });
          this.context.router.push('/dashboard');
        },
        err => this.setState({ errors: err.response.data, isLoading: false })
      );
    }
  }

  /**
   *
   * @returns
   *
   * @memberOf SignupForm
   */
  render() {
    const { errors } = this.state;
    const form = (
      <form onSubmit={this.onSubmit}>
        <h4 className="center">Register</h4>
        <div className="row margin">
          <TextInputTemplate
            icon="person"
            error={errors.userName}
            label="User Name"
            onChange={this.onChange}
            checkUserExists={this.checkUserExists}
            value={this.state.userName}
            field="userName"
            name="userName"
            type="text"
          />
        </div>

        <div className="row margin">
          <TextInputTemplate
            icon="person"
            error={errors.firstName}
            label="First Name"
            onChange={this.onChange}
            value={this.state.firstName}
            field="firstName"
            name="firstName"
            type="text"
          />
        </div>

        <div className="row margin">
          <TextInputTemplate
            icon="person_outline"
            error={errors.lastName}
            label="Last Name"
            onChange={this.onChange}
            value={this.state.lastName}
            field="lastName"
            name="lastName"
            type="text"
          />
        </div>

        <div className="row margin">
          <TextInputTemplate
            icon="email"
            error={errors.email}
            label="Email"
            onChange={this.onChange}
            checkUserExists={this.checkUserExists}
            value={this.state.email}
            field="email"
            type="email"
          />
        </div>

        <div className="row margin">
          <TextInputTemplate
            icon="lock"
            error={errors.password}
            label="Password"
            onChange={this.onChange}
            value={this.state.password}
            field="password"
            name="password"
            type="password"
          />
        </div>


        <div className="center-align">
          <button disabled={this.state.isLoading || this.state.invalid}
            className="btn blue-grey" type="submit">
            Sign Up<i className="material-icons right">thumb_up</i>
          </button>
        </div>

      </form>
    );
    return (
      <div>
        {form}
      </div>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func,
  addFlashMessage: PropTypes.func,
  isUserExists: PropTypes.func
};

SignupForm.contextTypes = {
  router: PropTypes.object
};

export default SignupForm;
