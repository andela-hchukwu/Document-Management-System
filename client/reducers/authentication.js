import isEmpty from 'lodash/isEmpty';
import { SET_CURRENT_USER } from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    case 'LOGIN_ERROR': {
      return {
        loginError: action.payload
      };
    }
    default: return state;
  }
};
