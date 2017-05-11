import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFlashMessage } from '../../actions/flashMessages';

/**
 *
 * @export
 * @param {object} ComposedComponent
 * @returns
 */
export default function (ComposedComponent) {
  class Authenticate extends React.Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.addFlashMessage({
          type: 'error',
          text: 'You need to login to access this page'
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
        this.context.router.push('/');
      }
    }

    /**
     *
     * @returns
     *
     * @memberOf Authenticate
     */
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired
  };

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  };

  /**
   *
   * @param {object} state
   * @returns
   */
  function mapStateToProps(state) {
    return {
      isAuthenticated: state.authentication.isAuthenticated
    };
  }

  return connect(mapStateToProps, { addFlashMessage })(Authenticate);
}
