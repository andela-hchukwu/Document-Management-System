
/* eslint class-methods-use-this: "off"*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import ReduxSweetAlert, { swal, close } from 'react-redux-sweetalert';
import UserList from './userList';
import { retrieveUsers, deleteUser } from '../../actions/userActions';
import { addFlashMessage } from '../../actions/flashMessages';
import UserForm from './userForm';

class HandleUsersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayForm: false,
      user: {}
    };
    this.deleteUser = this.deleteUser.bind(this);
    this.renderUserForm = this.renderUserForm.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
    this.cancelUserForm = this.cancelUserForm.bind(this);
  }

  componentWillMount() {
    this.props.retrieveUsers();
  }

  componentDidMount() {
    $('.tooltipped').tooltip({ delay: 50 });
  }

  renderAlert(id) {
    this.props.swal({
      title: 'Warning!',
      text: 'Are you sure you want to delete user?',
      type: 'info',
      showCancelButton: true,
      onConfirm: () => this.deleteUser(id),
      onCancel: this.props.close,
    });
  }

  deleteUser(id) {
    this.props.deleteUser(id)
      .then(() => toastr.success('User Successfully Deleted'))
      .catch(() => {
        this.props.addFlashMessage({
          type: 'error',
          text: 'Unable to delete user'
        });
        toastr.error(
          'Unable to delete user');
      });
  }

  renderUserForm(user = {}) {
    const text = 'Update User Details';
    this.setState({ displayForm: true, text, user });
  }

  cancelUserForm() {
    this.setState({ displayForm: false, user: {} });
  }

  render() {
    const { rows } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col s12">
            <div className="col s12 z-depth-5 card-panel card-body">
              <h4 className="center">Manage User Details and Permissions</h4>
              <div className="row manage-user">
                <div className="col user-list">
                  <UserList editUser={this.renderUserForm} deleteUser={this.renderAlert} rows={rows} />
                </div>
                {this.state.displayForm && <div className="col s5">
                  <div>
                    <h6>{this.state.text}</h6>
                    <UserForm cancel={this.cancelUserForm} user={this.state.user} />
                  </div>
                </div>}
              </div>
            </div>
          </div>
        </div>
        <ReduxSweetAlert />
      </div>
    );
  }
}


HandleUsersPage.propTypes = {
  retrieveUsers: PropTypes.func,
  deleteUser: PropTypes.func,
  swal: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  rows: React.PropTypes.array,
};


/**
 * @param {any} state
 * @returns {any}
 */
function mapStateToProps(state) {
  const { allUsers: { users: { rows } } } = state.users;
  return {
    rows,
  };
}

export default connect(mapStateToProps,
  {
    retrieveUsers,
    deleteUser,
    swal,
    close,
    addFlashMessage
  })(HandleUsersPage);
