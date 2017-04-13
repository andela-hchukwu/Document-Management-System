import { combineReducers } from 'redux';
import { reducer } from 'react-redux-sweetalert';
import flashMessages from './flashMessagesReducer';
import users from './userReducer';
import documents from './documentReducer';
import roles from './roleReducer';
import auth from './auth';

export const rootReducer = combineReducers({
  auth,
  flashMessages,
  users,
  documents,
  roles,
  sweetalert: reducer
});

export default rootReducer;
