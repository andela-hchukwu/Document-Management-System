import React from 'react';
import PropTypes from 'prop-types';
import { addDisabledClass } from './DisabledItems';


const RoleList = ({ roles, editRole, deleteRole }) =>
  (
    <div className="role-collection">
      <ul className="collection">
        {roles
          .map(role =>
            <li key={role.title} className="collection-item">
              <div className="row user-collection-item">
                <div className="col s4 offset s2 email">{role.title}</div>
                <div className="col s2 name">{role.id}</div>
                <div className="user-buttons row col s3">
                  <a className={`waves-effect waves-light btn blue-grey ${addDisabledClass(role.title)}`}
                    onClick={() => editRole(role)}>
                    <i className="tiny material-icons left">edit</i>edit</a>
                  <a className={`waves-effect waves-light btn blue-grey ${addDisabledClass(role.title)}`}
                    onClick={() => deleteRole(role.id)}>
                    <i className="tiny material-icons left">delete</i>delete</a>
                </div>
              </div>
            </li>
          )}
      </ul>
    </div>
  );

RoleList.propTypes = {
  editRole: PropTypes.func,
  deleteRole: PropTypes.func,
  roles: PropTypes.array
};


export default RoleList;
