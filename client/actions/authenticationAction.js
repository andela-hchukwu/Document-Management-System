import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthorizationToken from '../util/util';
import { SET_CURRENT_USER } from './actionTypes';


/**
 * set current user action creator
 * @export
 * @param {object} user
 * @returns {object} payload containing type and user object
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}


/**
 * logout action creator
 * @export
 * @returns {function}
 */
export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}


/**
 * login action creator
 * @export
 * @param {object} data
 * @returns {function}
 */
export function login(data) {
  return dispatch => axios.post('/users/login', data)
    .then((response) => {
      const token = response.data.token;
      const user = response.data.user;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
    });
}
