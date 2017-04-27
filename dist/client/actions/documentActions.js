'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadDocumentSuccess = loadDocumentSuccess;
exports.updateDocumentSuccess = updateDocumentSuccess;
exports.chooseAsCurrentDocument = chooseAsCurrentDocument;
exports.deleteCurrentDocument = deleteCurrentDocument;
exports.loadUserDocuments = loadUserDocuments;
exports.loadAllDocuments = loadAllDocuments;
exports.saveDocument = saveDocument;
exports.updateDocument = updateDocument;
exports.deleteDocument = deleteDocument;
exports.searchDocuments = searchDocuments;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _actionTypes = require('./actionTypes');

var types = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Load document success action creator
 * @export
 * @param {any} document
 * @returns {object} action
 */
function loadDocumentSuccess(document) {
  return {
    type: types.LOAD_DOCUMENT_SUCCESS,
    document: document
  };
}

/**
 * Update document success action creator
 * @export
 * @param {any} document
 * @returns {object} action
 */
function updateDocumentSuccess(document) {
  return {
    type: types.UPDATE_DOCUMENT_SUCCESS,
    document: document
  };
}

/**
 * Choose a document as the current document action creator
 * @export
 * @param {number} id
 * @returns {object} action
 */
function chooseAsCurrentDocument(id) {
  return {
    type: types.CHOOSE_AS_CURRENT_DOCUMENT,
    id: id
  };
}

/**
 * Delete the current document action creator
 * @return {object} actiontype
 */
function deleteCurrentDocument() {
  return {
    type: types.DELETE_CURRENT_DOCUMENT
  };
}

/**
 * action creator to get user documents
 * @param {number} user
 * @returns {function} documents
 */
function loadUserDocuments(id) {
  return function (dispatch) {
    return _axios2.default.get('/users/' + id + '/documents').then(function (response) {
      dispatch(loadDocumentSuccess(response.data));
    }).catch(function (error) {
      throw error;
    });
  };
}

/**
 * Action creator to get all documents accessible to current user
 * @returns {object} documents
 */
function loadAllDocuments() {
  return function (dispatch) {
    return _axios2.default.get('/documents').then(function (response) {
      dispatch(loadDocumentSuccess(response.data));
    }).catch(function (error) {
      throw error;
    });
  };
}

/**
 * Action creator to save a document after adding content and title
 * @param {any} document
 * @param {any} userId
 * @returns {function}
 */
function saveDocument(document, id) {
  return function (dispatch) {
    return _axios2.default.post('/documents', document).then(function () {
      dispatch(loadUserDocuments(id));
    }).catch(function (error) {
      throw error;
    });
  };
}

/**
 * Action creator to update details of a document
 * @param {object} document
 * @returns {function}
 */
function updateDocument(document, userId) {
  return function (dispatch) {
    return _axios2.default.put('/documents/' + document.id, document).then(function () {
      dispatch(loadUserDocuments(userId));
    }).catch(function (error) {
      throw error;
    });
  };
}

/**
 * @export
 * @param {any} id
 * @param {any} userId
 * @returns {object} documents
 */
function deleteDocument(id, userId) {
  return function (dispatch) {
    return _axios2.default.delete('/documents/' + id).then(function () {
      dispatch(loadUserDocuments(userId));
    }).catch(function (error) {
      throw error;
    });
  };
}

function searchDocuments(query) {
  return function (dispatch) {
    return _axios2.default.get('/search/documents/?q=' + query).then(function (response) {
      dispatch(loadDocumentSuccess(response.data));
    }).catch(function (error) {
      throw error;
    });
  };
}