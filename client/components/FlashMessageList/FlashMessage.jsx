/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 *
 * @class FlashMessage
 * @extends {React.Component}
 */
class FlashMessage extends React.Component {

  /**
   * Creates an instance of FlashMessage.
   * @param {object} props
   *
   * @memberOf FlashMessage
   */
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  /**
   *
   *
   * @memberOf FlashMessage
   */
  onClick() {
    this.props.deleteFlashMessage(this.props.message.id);
  }

  /**
   *
   * @returns {text}
   *
   * @memberOf FlashMessage
   */
  render() {
    const { type, text } = this.props.message;
    return (
      <div className="row">
        <div className="col s12 l12">
          <div id="card-alert" className={classnames('card', {
            green: type === 'success',
            red: type === 'error'
          })}>
            <div className="card-content white-text">
              <button type="button" id="dismissSignup"
                onClick={this.onClick} className="close right">
                <span>&times;</span>
              </button>
              <p>{text}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FlashMessage.propTypes = {
  message: PropTypes.object.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
};

export default FlashMessage;
