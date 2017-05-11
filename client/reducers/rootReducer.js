import { combineReducers } from 'redux';
import { reducer } from 'react-redux-sweetalert';
import flashMessages from './flashMessagesReducer';
import users from './userReducer';
import documents from './documentReducer';
import roles from './roleReducer';
import authentication from './authentication';
import paginate from './paginate';

export const rootReducer = combineReducers({
  authentication,
  flashMessages,
  paginate,
  users,
  documents,
  roles,
  sweetalert: reducer
});

export default rootReducer;
