/* eslint class-methods-use-this: "off"*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import DocumentForm from '../Documents/DocumentForm';

/**
 *
 * @class CommonModal
 * @extends {React.Component}
 */
class CommonModal extends React.Component {

  /**
   *
   * @memberOf CommonModal
   */
  componentDidMount() {
    $('.modal').modal();
    $('select').material_select();
    $('#title').parent().find('label').addClass('active');
  }

  /**
   * @returns
   *
   * @memberOf CommonModal
   */
  render() {
    const { authentication, doc = {} } = this.props;
    return (
      <div>
        <div id="docDisplayModal" className="modal">
          <div>
            <a href="#"
              className="btn-floating btn-flat blue-grey closeModal modal-close">
              <i className="material-icons">close</i>
            </a>
          </div>
          <div className="modal-content">
            <h4>Document</h4>
            <DocumentForm authentication={authentication} doc={doc} />
          </div>
        </div>
      </div>
    );
  }
}

CommonModal.propTypes = {
  authentication: PropTypes.object.isRequired,
  doc: PropTypes.object
};

/**
 * @param  {object} state
 * @return {object}
 */
function mapStateToProps(state) {
  return {
    authentication: state.authentication,
  };
}

export default connect(mapStateToProps)(CommonModal);
