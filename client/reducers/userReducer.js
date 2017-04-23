import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.users, action = {}) {
  switch (action.type) {
    case types.RETRIEVE_USERS_SUCCESS:
      return Object.assign({}, ...state, { allUsers: action.allUsers });
    case types.UPDATE_USER_SUCCESS:
      return Object.assign({}, ...state, { allUsers: action.user });
    case types.GET_USER_INFO_SUCCESS:
      return Object.assign({}, ...state, { user: action.user });
    default:
      return state;
  }
}
