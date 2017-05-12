import React from 'react';
import { Pagination, Button } from 'react-materialize';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import
{ loadUserDocuments, loadAllDocuments, searchDocuments } from '../../actions/documentActions';
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
    this.displayDocuments = this.displayDocuments.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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

  displayDocuments(pageNumber) {
    const offset = (pageNumber - 1)
      * this.props.metadata.page_size;
    this.props.loadAllDocuments(offset);
  }

    /**
   * handleSearch
   * @param {Object} event
   * @memberOf Header
   */
  handleSearch(event) {
    event.preventDefault();
    this.props.searchDocuments(event.target.value);
  }

  /**
   *
   * @returns {ReactElement} returns component
   *
   * @memberOf DashboardPage
   */
  render() {
    const { publicDocuments, roleDocuments, privateDocuments } = this.props;
    const { total_count, page_size, page, page_count } = this.props.metadata;
    return (
      <div className="dashboard row">
        <form>
        <div className="input-field col s3 push-s8">
          <input id="search" type="search" onChange={this.handleSearch} />
          <label htmlFor="search"><i className="mdi mdi-magnify"></i>Search</label>
       </div></form>
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
                    <Pagination items={page_count} activePage={page} maxButtons={Math.ceil(total_count / page_size)} onSelect={this.displayDocuments} />
                  </div>
                  <div id="public" className="col s12 tab-style">
                    <h6 className="center">All Public Documents</h6>
                    <DocumentList showModal={this.renderModal} showDocument={this.viewDocument} docs={publicDocuments} />
                    <Pagination items={page_count} activePage={page} maxButtons={Math.ceil(total_count / page_size)} onSelect={this.displayDocuments} />
                  </div>
                  <div id="role" className="col s12 tab-style">
                    <h6 className="center">All Accessible Role Documents</h6>
                    <DocumentList showModal={this.renderModal} showDocument={this.viewDocument} docs={roleDocuments} />
                    <Pagination items={page_count} activePage={page} maxButtons={Math.ceil(total_count / page_size)} onSelect={this.displayDocuments} />
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
  searchDocuments: PropTypes.func,
  metadata: PropTypes.object
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
    privateDocuments,
    metadata: state.paginate
  };
}


export default connect(mapStateToProps,
  { loadUserDocuments, loadAllDocuments, searchDocuments })(DashboardPage);
