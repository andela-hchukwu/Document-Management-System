import db from '../models/index';
import Helper from '../Helper/Helper';

const Document = {

  /**
  *
  * @param {Object} req - request object
  * @param {Object} res - response object
  * @return {Object} return object
  */
  create(req, res) {
    db.Document
      .create(req.body)
        .then((document) => {
          document = Helper.getDocument(document);
          res.status(201)
            .send({
              message: 'New document has been successfully created',
              document
            });
        })
        .catch(error => res.status(500).send(error.errors));
  },

  /**
   *
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Object|void} response object or void
   */
  getAll(req, res) {
    req.dmsFilter.attributes = Helper.getDocAttribute();
    db.Document
      .findAndCountAll(req.dmsFilter)
      .then((documents) => {
        const condition = {
          count: documents.count,
          limit: req.dmsFilter.limit,
          offset: req.dmsFilter.offset
        };
        delete documents.count;
        const pagination = Helper.pagination(condition);
        res.status(200)
          .send({
            message: 'You have successfully retrieved all documents',
            documents,
            pagination
          });
      });
  },

/**
 * Get Document
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns {void|Object} - response object or void
 */
  getDocument(req, res) {
    const document = Helper.getDocument(req.singleDocument);
    return res.status(200)
      .send({
        message: 'You have successfully retrived this document',
        document
      });
  },

  /**
   * Update document bi id
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {void} no returns
   */
  update(req, res) {
    req.docInstance.update(req.body)
      .then(updatedDocument => res.status(200)
        .send({
          message: 'This document has been updated successfully',
          updatedDocument
        }))
      .catch(error => res.status(500).send(error.errors));
  },

  /**
  * Delete document by id
  * Route: DELETE: /documents/:id
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {void} no returns
  */
  delete(req, res) {
    req.docInstance.destroy()
      .then(() => res.status(200)
         .send({
           message: 'This document has been deleted successfully'
         })
      );
  },

  /**
    * Get document by title
    * Route: GET: /search/documents/?q=
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void|Response} response object or void
    */
  getDocumentByTitle(req, res) {
    const documents = Helper.getDocument(req.singleDocument);
    return res.status(200)
      .send({
        message: 'You have successfully retrived this document',
        documents
      });
  }
};


export default Document;
