import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions/authenticationAction';
import { searchDocuments } from '../../actions/documentActions';


/**
 * Header componenet
 * @export
 * @class Header
 * @extends {React.Component}
 */
export class Header extends React.Component {

  /**
   * Creates an instance of Header.
   * @param {Object} props
   *
   * @memberOf Header
   */
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  /**
   * logout
   * @param {Object} event
   * @memberOf Header
   */
  logout(event) {
    event.preventDefault();
    this.props.logout();
  }

  /**
   * handleSearch
   * @param {Object} event
   * @memberOf Header
   */
  handleSearch(event) {
    const path = this.props.location.pathname.slice(1);
    if (['dashboard', 'allDocuments'].includes(path)) {
      this.props.searchDocuments(event.target.value);
    }
  }

  /**
   *
   * @param {Object} { isAuthenticated, user, isAdmin }
   * @returns header state
   *
   * @memberOf Header
   */
  getLinks({ isAuthenticated, user, isAdmin }) {
    const path = this.props.location.pathname.slice(1);
    const enabled = ['dashboard', 'allDocuments'].includes(path);
    if (isAuthenticated) {
      return (
        <ul>
          <li>
            <form className="leftsearchbox">
              <div className="input-field">
                <input disabled={!enabled} id="search" type="search" onChange={this.handleSearch} />
                <label htmlFor="search"><i className="mdi mdi-magnify"></i></label>
              </div>
            </form>
          </li>
          <li><Link to="/dashboard" activeClassName="active">Dashboard</Link></li>
          <li activeClassName="active">
            <a href="#">Welcome, {user.userName}!</a>
          </li>
          <li activeClassName="active">
            <Link to="/profilepages">Profile</Link>
          </li>
          <li activeClassName="active" id="personalDocs">
            <Link to="/thedocuments">Saved Documents</Link>
          </li>
          {isAdmin && <li className="admin" id="adminTab">
            <Link to="/admin/handleusers">Manage Users</Link>
          </li>}
          <li>
            <a href="#" activeClassName="active" onClick={this.logout}>Logout</a>
          </li>
        </ul>
      );
    }
    return (
      <ul>
        <li><Link to="/signup" activeClassName="active" id="signup">Signup</Link></li>
        <li><Link to="/login" activeClassName="active" id="login">Login</Link></li>
      </ul>
    );
  }

  /**
   *
   * @returns header home
   * @memberOf Header
   */
  render() {
    const navLinks = this.getLinks(this.props);
    return (
      <nav className="blue-grey">
        <div className="nav-wrapper">
          <IndexLink to="/" activeClassName="active">
            <i className="material-icons left">home</i>idocman</IndexLink>
          <ul id="nav-mobile" className="right">
            <li>
              {navLinks}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  searchDocuments: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired
};

/**
 * @param {object}
 * @returns {object} data
 */
export const mapStateToProps = (state) => {
  const { authentication: { isAuthenticated, user } } = state;
  const isAdmin = isAuthenticated && user.userRoleId === 1;
  return {
    isAuthenticated,
    user,
    isAdmin
  };
};

export default connect(mapStateToProps, { logout, searchDocuments })(Header);
