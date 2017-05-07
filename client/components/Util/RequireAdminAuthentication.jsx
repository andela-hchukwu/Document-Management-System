import React from 'react';
import { connect } from 'react-redux';
import { addFlashMessage } from '../../actions/flashMessages';

/**
 *
 * @export
 * @param {object} ComposedComponent
 * @returns
 */
export default function (ComposedComponent) {

  /**
   *
   * @class Authenticate
   * @extends {React.Component}
   */
  class Authenticate extends React.Component {

    /**
     *
     *
     * @memberOf Authenticate
     */
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.addFlashMessage({
          type: 'error',
          text: 'You need to login to access this page'
        });
        this.context.router.push('/login');
      }
      if (this.props.isAuthenticated && this.props.isAdmin !== 1) {
        this.props.addFlashMessage({
          type: 'error',
          text: 'Only Admin has rights to access this page'
        });
        this.context.router.push('/login');
      }
    }

    /**
     *
     * @param {object} nextProps
     *
     * @memberOf Authenticate
     */
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.push('/login');
      }
    }

    /**
     *
     * @returns
     *
     * @memberOf Authenticate
     */
    render() {
      return (<ComposedComponent {...this.props} />
      );
    }
  }


  Authenticate.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    isAdmin: React.PropTypes.number.isRequired
  };

  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  /**
   *
   * @param {object} state
   * @returns
   */
  function mapStateToProps(state) {
    let admin;
    if (state.authentication.isAuthenticated) {
      admin = state.authentication.user.userRoleId;
    }
    return {
      isAuthenticated: state.authentication.isAuthenticated,
      isAdmin: admin
    };
  }

  return connect(mapStateToProps, { addFlashMessage })(Authenticate);
}
