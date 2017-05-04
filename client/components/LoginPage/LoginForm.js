import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import TextFieldGroup from '../Common/TextInputTemplate';
import validateInput from '../../util/loginValidation';
import { login } from '../../actions/authenticationAction';
import { addFlashMessage } from '../../actions/flashMessages';

/**
 *
 * @class LoginForm
 * @extends {React.Component}
 */
class LoginForm extends React.Component {

  /**
   * Creates an instance of LoginForm.
   * @param {object} props
   *
   * @memberOf LoginForm
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      isLoading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   *
   * @returns {states}
   *
   * @memberOf LoginForm
   */
  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      return this.setState({ errors });
    }
    return isValid;
  }

  /**
   *
   * @param {object} event
   *
   * @memberOf LoginForm
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state).then(
        () => {
          this.context.router.push('/dashboard');
          toastr.success('Logged in Successfully!');
        },
        err => this.setState({ errors: err.response.data.errors,
          isLoading: false })
      );
    }
  }

  /**
   *
   * @param {object} event
   *
   * @memberOf LoginForm
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   *
   * @returns {html} login form
   *
   * @memberOf LoginForm
   */
  render() {
    const { errors, email, password, isLoading } = this.state;
    return (

        <form className="login-form" onSubmit={this.onSubmit}>

          <div className="row margin">
          <TextFieldGroup
            icon="contact_mail"
            field="email"
            label="Email"
            value={email}
            error={errors.email}
            onChange={this.onChange}
            type="text"
            required
            />
          </div>

          <div className="row margin">
          <TextFieldGroup
            icon="lock"
            field="password"
            label="Password"
            value={password}
            error={errors.password}
            onChange={this.onChange}
            type="password"
            />
          </div>

          <div className="center-align">
          <button disabled={isLoading} className="btn blue-grey" type="submit">
              Login<i className="material-icons right">thumb_up</i>
            </button>
          {errors.form && <div className="card-panel red darken-1">{errors.form}
          </div>}
         </div>

        </form>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { login, addFlashMessage })(LoginForm);
