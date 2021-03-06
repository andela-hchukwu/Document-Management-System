import axios from 'axios';
import * as types from './actionTypes';

/**
 * Load document success action creator
 * @export
 * @param {object} document
 * @returns {object} action
 */
export function loadDocumentSuccess(document) {
  return {
    type: types.LOAD_DOCUMENT_SUCCESS,
    document
  };
}

/**
 * Update document success action creator
 * @export
 * @param {object} document
 * @returns {object} action
 */
export function updateDocumentSuccess(document) {
  return {
    type: types.UPDATE_DOCUMENT_SUCCESS,
    document
  };
}

/**
 * Choose a document as the current document action creator
 * @export
 * @param {number} id
 * @returns {object} action
 */
export function chooseAsCurrentDocument(id) {
  return {
    type: types.CHOOSE_AS_CURRENT_DOCUMENT,
    id
  };
}

/**
 * Delete the current document action creator
 * @return {object} actiontype
 */
export function deleteCurrentDocument() {
  return {
    type: types.DELETE_CURRENT_DOCUMENT,
  };
}


/**
 * action creator to get user documents
 * @param {number} user
 * @returns {function} documents
 */
export function loadUserDocuments(id) {
  return dispatch => axios.get(`/users/${id}/documents`)
    .then((response) => {
      dispatch(loadDocumentSuccess(response.data));
    }).catch((error) => {
      throw (error);
    });
}

/**
 * Action creator to get all documents accessible to current user
 * @returns {object} documents
 */
export function loadAllDocuments(offset) {
  const pageOffset = offset || 0;
  const limit = 7;
  return dispatch => axios.get(`/documents?limit=${limit}&offset=${pageOffset}`)
    .then((response) => {
      dispatch(loadDocumentSuccess(response.data));
      dispatch({
        type: types.SET_PAGINATION,
        pagination: response.data.pagination
      });
    }).catch((error) => {
      throw (error);
    });
}

/**
 * Action creator to save a document after adding content and title
 * @param {object} document
 * @param {number} userId
 * @returns {function}
 */
export function saveDocument(document) {
  return dispatch => axios.post('/documents', document)
    .then(() => {
      dispatch(loadAllDocuments());
    }).catch((error) => {
      throw (error);
    });
}

/**
 * Action creator to update details of a document
 * @param {object} document
 * @returns {function}
 */
export function updateDocument(document) {
  return dispatch => axios.put(`/documents/${document.id}`, document)
      .then(() => {
        dispatch(loadAllDocuments());
      }).catch((error) => {
        throw (error);
      });
}

/**
 * @export
 * @param {number} id
 * @param {number} userId
 * @returns {function}
 */
export function deleteDocument(id) {
  return dispatch => axios.delete(`/documents/${id}`)
    .then(() => {
      dispatch(loadAllDocuments());
    }).catch((error) => {
      throw (error);
    });
}

/**
 * @export
 * @param {string/number} query
 * @returns {function}
 */
export function searchDocuments(query) {
  return dispatch => axios.get(`/search/documents/?query=${query}`)
    .then((response) => {
      dispatch(loadDocumentSuccess(response.data));
    }).catch((error) => {
      throw (error);
    });
}
