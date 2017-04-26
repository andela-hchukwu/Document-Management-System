
import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * [roleReducer description]
 * @param  {object} [state=initialState.roles] initial state
 * @param  {object} action
 * @return {object}
 */
export default function roleReducer(state = initialState.roles, action) {
  switch (action.type) {
    case types.LOAD_ROLE_SUCCESS:
      return Object.assign({}, ...state, { roles: action.allRoles });

    default:
      return state;
  }
}
