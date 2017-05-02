import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions/authenticationAction';
import { searchDocuments } from '../../actions/documentActions';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  handleSearch(e) {
    const path = this.props.location.pathname.slice(1);
    if (['dashboard', 'allDocuments'].includes(path)) {
      this.props.searchDocuments(e.target.value);
    }
  }

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
          <li><Link to="/dashboard" activeClassName="active">
            <i className="material-icons left" id="dashboard">dashboard</i>Dashboard</Link></li>
          <li activeClassName="active">
            <a href="#">Welcome, {user.userName}!</a>
          </li>
          <li activeClassName="active">
            <Link to="/profilepages">Profile</Link>
          </li>
          <li activeClassName="active" id="personalDocs">
            <Link to="/thedocuments">Saved Documents</Link>
          </li>
          {isAdmin &&
            <li className="admin">
              <Link to="/admin/manageroles">Manage Roles</Link>
            </li>
          }
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

  render() {
    const navLinks = this.getLinks(this.props);
    return (
      <nav className="blue-grey">
        <div className="nav-wrapper">
          <IndexLink to="/" activeClassName="active">
            <i className="material-icons left">home</i>Home</IndexLink>
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
  const { auth: { isAuthenticated, user } } = state;
  const isAdmin = isAuthenticated && user.userRoleId === 1;
  return {
    isAuthenticated,
    user,
    isAdmin
  };
};

export default connect(mapStateToProps, { logout, searchDocuments })(Header);
