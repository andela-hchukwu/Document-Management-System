import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlashMessage from './FlashMessage';
import { deleteFlashMessage } from '../../actions/flashMessages';

/**
 *
 * @class FlashMessagesList
 * @extends {React.Component}
 */
class FlashMessagesList extends React.Component {

  /**
   *
   * @returns
   *
   * @memberOf FlashMessagesList
   */
  render() {
    const messages = this.props.messages.map(message =>
      <FlashMessage
        key={message.id}
        message={message}
        deleteFlashMessage={this.props.deleteFlashMessage} />
    );
    return (
      <div>{messages}</div>
    );
  }
}

FlashMessagesList.propTypes = {
  messages: PropTypes.array.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
};

/**
 *
 * @param {object} state
 * @returns
 */
function mapStateToProps(state) {
  return {
    messages: state.flashMessages
  };
}

export default connect(mapStateToProps,
  { deleteFlashMessage })(FlashMessagesList);
