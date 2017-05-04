import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * [documentReducer description]
 * @param  {[type]} [state=initialState.documents]
 * @param  {object} action
 * @return {[type]}
 */
export default function
documentReducer(state = initialState.documents, action) {
  console.log(action);
  switch (action.type) {
    case types.LOAD_DOCUMENT_SUCCESS:
      return Object.assign({}, ...state, { allDocuments: action.document });

    case types.CHOOSE_AS_CURRENT_DOCUMENT: {
      const chosenDocumentList = state.allDocuments
        .filter(document => document.id === action.id);
      const chosenDocument = chosenDocumentList[0] || {};
      return Object.assign({}, state, { chosenDocument });
    }

    case types.UPDATE_DOCUMENT_SUCCESS:
      return [...state.filter(document => document.id !== action.document.id),
        Object.assign({}, { allDocuments: action.document })
      ];

    default:
      return state;
  }
}

