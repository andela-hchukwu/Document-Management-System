import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import
{ loadUserDocuments, loadAllDocuments } from '../../actions/documentActions';
import DocumentList from '../Documents/DocumentList';
import CommonModal from '../Common/CommonModal';


/**
 * Dashboard to render documents
 * @class DashboardPage
 * @extends {React.Component}
 */
class DashboardPage extends React.Component {

  /**
   * Creates an instance of DashboardPage.
   * @param {Objct} props
   *
   * @memberOf DashboardPage
   */
  constructor(props) {
    super(props);
    this.state = {
      doc: {}
    };

    this.renderModal = this.renderModal.bind(this);
    this.viewDocument = this.viewDocument.bind(this);
  }

  /**
   * Render all documents
   * @memberOf DashboardPage
   */
  componentWillMount() {
    this.props.loadAllDocuments();
  }

  /**
   * Selects tabs
   * @memberOf DashboardPage
   */
  componentDidMount() {
    $('.modal').modal();
    $('select').material_select();
    $('.tooltipped').tooltip({ delay: 50 });
    $('.dropdown-button').dropdown();
    $('ul.tabs').tabs();
    $('ul.tabs').tabs('select_tab', 'public');
  }

  /**
   * @param {Object} [doc={}]
   *
   * @memberOf DashboardPage
   */
  renderModal(doc = {}) {
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
   * @returns {ReactElement} returns component
   *
   * @memberOf DashboardPage
   */
  render() {
    const { publicDocuments, roleDocuments, privateDocuments } = this.props;
    return (
      <div className="dashboard row">
        <div className="col s12">
          <div className="col s12 z-depth-5 card-panel">
            <h5 className="center">DASHBOARD</h5>
            <div>
              <div className="row">
                <div className="col s12">
                  <ul
                    className="tabs tab-demo-active z-depth-1 blue-grey">
                    <li className="tab col s4">
                      <a className="white-text waves-effect waves-light active"
                        href="#public">Public</a>
                    </li>
                    <li className="tab col s4">
                      <a className="white-text waves-effect waves-light"
                        href="#role">Role</a>
                    </li>
                    <li className="tab col s4">
                      <a className="white-text waves-effect waves-light"
                        href="#private">Private</a>
                    </li>
                  </ul>
                </div>
                <div className="col s12">
                  <CommonModal doc={this.state.doc}/>
                  <div id="private" className="col s12 tab-style">
                    <h6 className="center">All Private Documents</h6>
                    <DocumentList showModal={this.renderModal} showDocument={this.viewDocument} docs={privateDocuments} />
                  </div>
                  <div id="public" className="col s12 tab-style">
                    <h6 className="center">All Public Documents</h6>
                    <DocumentList showModal={this.renderModal} showDocument={this.viewDocument} docs={publicDocuments} />
                  </div>
                  <div id="role" className="col s12 tab-style">
                    <h6 className="center">All Accessible Role Documents</h6>
                    <DocumentList showModal={this.renderModal} showDocument={this.viewDocument} docs={roleDocuments} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  authentication: PropTypes.object,
  privateDocuments: PropTypes.array,
  roleDocuments: PropTypes.array,
  publicDocuments: PropTypes.array,
  loadUserDocuments: PropTypes.func,
  loadAllDocuments: PropTypes.func,
};

const filterDocument = (role, rows) =>
    rows.filter(doc => doc.access === role);


/**
 * Helper function to get only required properties from state
 * @param {any} state
 * @returns {any}
 */
function mapStateToProps(state) {
  const { allDocuments: { documents: { rows } } } = state.documents;
  const publicDocuments = filterDocument('public', rows);
  const roleDocuments = filterDocument('role', rows);
  const privateDocuments = filterDocument('private', rows);

  return {
    authentication: state.authentication,
    publicDocuments,
    roleDocuments,
    privateDocuments
  };
}


export default connect(mapStateToProps,
  { loadUserDocuments, loadAllDocuments })(DashboardPage);
