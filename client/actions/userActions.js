import axios from 'axios';
import * as types from './actionTypes';

/**
 * action to successfully get a user
 * @export
 * @param {object} users
 * @returns  {object} user
 */
export function retrieveUsersSuccess(allUsers) {
  return {
    type: types.RETRIEVE_USERS_SUCCESS,
    allUsers
  };
}

/**
 * action to successfully update a user
 * @export
 * @param {object} user
 * @returns {object} user
 */
export function updateUserSuccess(user) {
  return {
    type: types.UPDATE_USER_SUCCESS,
    user
  };
}

/**
 * action to successfully users profile
 * @export
 * @param {object} user
 * @returns {object} user
 */
export function getUserInfoSuccess(user) {
  return {
    type: types.GET_USER_INFO_SUCCESS,
    user
  };
}

/**
 * dispatching the action to get users
 * @export
 * @returns {object}
 */
export function retrieveUsers() {
  return dispatch => axios.get('/users')
    .then((response) => {
      dispatch(retrieveUsersSuccess(response.data));
    }).catch((error) => {
      throw (error);
    });
}

/**
 * dispatching the action to get users
 * @param {integer} id
 * @export
 * @returns {object}
 */
export function deleteUser(id) {
  return dispatch => axios.delete(`/users/${id}`)
    .then(() => {
      dispatch(retrieveUsers());
    }).catch((error) => {
      throw (error);
    });
}

/**
 * dispatching the action to update a user details
 * @export
 * @param {object} user
 * @returns {object}
 */
export function updateUserAdmin(user) {
  return dispatch => axios.put(`/users/${user.id}`, user)
      .then(() => {
        dispatch(retrieveUsers());
      }).catch((error) => {
        throw (error);
      });
}

/**
 * dispatching the action to update a regularUser's details
 * @export
 * @param {object} userInfo
 * @returns {object}
 */
export function updateUserInfo(userInfo) {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('userinfo========>', userInfo);
  return dispatch => axios.put(`/users/${user.id}`, userInfo)
    .then((response) => {
      dispatch(updateUserSuccess(userInfo));
    }).catch((error) => {
      throw error;
    });
}

/**
 * dispatching the action to get a user's details
 * @export
 * @param {null}
 * @returns {object}
 */
export function getUserInfo() {
  const user = JSON.parse(localStorage.getItem('user'));
  return dispatch => axios.get(`/users/${user.id}`)
    .then((response) => {
      dispatch(getUserInfoSuccess(response.data));
    }).catch((error) => {
      throw error;
    });
}
