import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReduxSweetAlert, { swal, close } from 'react-redux-sweetalert';
import { connect } from 'react-redux';
import { addFlashMessage } from '../../actions/flashMessages';
import { deleteDocument } from '../../actions/documentActions';

/**
 *
 * @class DocumentList
 * @extends {Component}
 */
class DocumentList extends Component {

  /**
   * Creates an instance of DocumentList.
   *
   * @memberOf DocumentList
   */
  constructor() {
    super();
    this.state = {
      doc: {}
    };
    this.renderAlert = this.renderAlert.bind(this);
  }

  /**
   *
   * @memberOf DocumentList
   */
  componentDidMount() {
    $('.tooltipped').tooltip({ delay: 50 });
  }

  /**
   *
   * @param {number} id
   *
   * @memberOf DocumentList
   */
  renderAlert(id) {
    this.props.swal({
      title: 'Warning!',
      text: 'Are you sure you want to delete document?',
      type: 'info',
      showCancelButton: true,
      onConfirm: () => this.props.deleteDocument(id, this.props.user.userId),
      onCancel: this.props.close,
    });
  }

  /**
   *
   * @returns
   *
   * @memberOf DocumentList
   */
  render() {
    const { docs } = this.props;
    return (
      <div className="doc-collection">
        <ul className="collection">
          {docs
            .map(doc =>
              <li key={doc.id} className="collection-item">
                <div className="row doc-collection-item">
                  <div className="col s4 offset s2 title"><a onClick={() => this.props.showDocument(doc)}>
                    {doc.title}</a></div>
                  <div className="user-buttons row col s3 editButton" id="editButton">
                    {this.props.user.userId === doc.OwnerId && <div>
                    <a
                      className="waves-effect waves-light btn blue-grey"
                      id="editButton"
                      onClick={() => this.props.showModal(doc)}>
                      <i className="tiny material-icons left">edit</i>edit</a>
                    <a
                      className="waves-effect waves-light btn blue-grey"
                      onClick={() => this.renderAlert(doc.id)}>
                      <i className="tiny material-icons left">delete</i>delete</a></div>}
                  </div>
                </div>
              </li>
            )}
            <ReduxSweetAlert />
        </ul>
        <div className="fixed-action-btn horizontal">
          <a className="btn-floating btn-large tooltipped blue-grey"
            data-position="top" data-delay="50"
            data-tooltip="create new document"
            onClick={() => this.props.showModal()}
          >
            <i className="material-icons">note_add</i>
          </a>
        </div>
      </div>
    );
  }
}

DocumentList.propTypes = {
  deleteDocument: PropTypes.func,
  docs: PropTypes.array,
  swal: PropTypes.func,
  close: PropTypes.func,
  showModal: PropTypes.func,
  showDocument: PropTypes.func,
  addFlashMessage: PropTypes.func,
  user: PropTypes.object,
};

/**
 * @param {any} state
 * @returns {any}
 */
function mapStateToProps({
  authentication: { user }
}) {
  return {
    user
  };
}

export default connect(mapStateToProps, { swal,
  close,
  deleteDocument,
  addFlashMessage })(DocumentList);
