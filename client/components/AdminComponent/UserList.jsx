import React from 'react';
import PropTypes from 'prop-types';
import { addDisabledClass, disabledUsers } from './DisabledItems';

const UserList = ({ rows, editUser, deleteUser }) =>
  (
    <div className="user-collection">
      <ul className="collection">
        {rows
          .map(user =>
            <li key={user.email} className="collection-item">
              <div className="row user-collection-item">
                <div className="col s4 offset s2 email">{user.email}</div>
                <div className="col s2 name">{user.userName}</div>
                <div className="col s1 role">{user.Role.title}</div>
                <div className="user-buttons row col s3">
                  <a className={`waves-effect waves-light btn blue-grey ${addDisabledClass(user.Role.title, disabledUsers)}`}
                    onClick={() => editUser(user)}>
                    <i className="tiny material-icons left">edit</i>edit</a>
                  <a className={`waves-effect waves-light btn blue-grey ${addDisabledClass(user.Role.title, disabledUsers)}`}
                    onClick={() => deleteUser(user.id)}>
                    <i className="tiny material-icons left">delete</i>delete</a>
                </div>
              </div>
            </li>
          )}
      </ul>
    </div>
  );

UserList.propTypes = {
  editUser: PropTypes.func,
  deleteUser: PropTypes.func,
  rows: PropTypes.array
};

export default UserList;
