/* eslint class-methods-use-this: "off"*/
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DocumentForm from '../Documents/DocumentForm';
import DocumentView from '../Documents/DocumentView';

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
          </div>
          <div className="modal-content">
            <h4>Document</h4>
            <DocumentForm authentication={authentication} doc={doc} />
          </div>
        </div>
        <div id="docDisplay" className="modal">
          <div>
          </div>
          <div className="modal-content">
            <DocumentView authentication={authentication} doc={doc} content={doc.content} />
          </div>
        </div>
      </div>
    );
  }
}

CommonModal.propTypes = {
  authentication: PropTypes.object,
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
