/* eslint class-methods-use-this: "off"*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocumentList from './DocumentList';
import * as documentActions from '../../actions/documentActions';
import CommonModal from '../Common/CommonModal';

/**
 *
 * @class DocumentPage
 * @extends {React.Component}
 */
class DocumentPage extends React.Component {

  /**
   * Creates an instance of DocumentPage.
   * @param {any} props
   *
   * @memberOf DocumentPage
   */
  constructor(props) {
    super(props);
    this.state = {
      doc: {}
    };

    this.addNewDocument = this.addNewDocument.bind(this);
    this.viewDocument = this.viewDocument.bind(this);
  }

  /**
   *
   *
   * @memberOf DocumentPage
   */
  componentWillMount() {
    const { userId } = this.props.user;
    this.props.actions.loadUserDocuments(userId);
  }

  /**
   *
   * @memberOf DocumentPage
   */
  componentDidMount() {
    $('.modal').modal();
    $('select').material_select();
    $('.tooltipped').tooltip({ delay: 50 });
  }

  /**
   *
   * @param {object} [doc={}]
   *
   * @memberOf DocumentPage
   */
  addNewDocument(doc = {}) {
    this.setState({ doc }, () => {
      $('#docDisplayModal').modal('open');
    });
  }

  viewDocument(doc = {}) {
    this.setState({ doc }, () => {
      $('#docDisplay').modal('open');
    });
  }


  /**
   *
   * @returns
   *
   * @memberOf DocumentPage
   */
  render() {
    const { personalDocuments } = this.props;
    const count = personalDocuments.length;
    console.log('view doc', this.viewDocument);
    return (
      <div className="document-page row">
        <div className="col s12 z-depth-5 card-panel">
          <div className="row">
            <div className="col s12">
              <div className="row">
                <div className="col s5">
                  <div id="card-alert" className="card grey-blue lighten-5">
                    <div className="card-content black-text" id="documentCount">
                      <p>{`You have ${count} saved Document${count === 1 ? '' : 's'}`}</p>
                    </div>
                  </div>
                </div>
                <div className="col s12">
                  <DocumentList showModal={this.addNewDocument} showDocument={this.viewDocument} docs={personalDocuments} />
                </div>
              </div>
            </div>
          </div>
          <CommonModal doc={this.state.doc}/>
        </div>
      </div>
    );
  }
}

DocumentPage.propTypes = {
  personalDocuments: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

/**
 * @param {any} state
 * @returns {any}
 */
function mapStateToProps({
  documents: { allDocuments, chosenDocument },
  authentication: { user, isAuthenticated }
}) {
  let personalDocuments = [];
  if (isAuthenticated) {
    personalDocuments = allDocuments.documents.rows.filter(
      doc => doc.OwnerId === user.userId);
  }

  const publicDocuments = allDocuments.documents.rows.filter(
    doc => doc.access === 'public');


  return {
    personalDocuments,
    publicDocuments,
    currentDocument: chosenDocument,
    user
  };
}

/**
 * @param {object} dispatch
 * @returns {object}
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentPage);
