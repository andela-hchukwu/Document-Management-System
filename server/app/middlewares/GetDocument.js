import Helper from '../Helper/Helper';
import db from '../models/index';


const GetDocument = {
   /**
   * Get a single user's document
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   */
  getSingleDocument(req, res, next) {
    db.Document
      .findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404)
            .send({
              message: 'This document cannot be found'
            });
        }
        if (!Helper.isPublic(document) && !Helper.isOwnerDoc(document, req)
           && !Helper.isAdmin(req.tokenDecode.roleId)
           && !Helper.hasRoleAccess(document, req)) {
          return res.status(401)
            .send({
              message: 'You are not permitted to view this document'
            });
        }
        req.singleDocument = document;
        next();
      })
      .catch(error => res.status(500).send(error.errors));
  },

    /**
   *
   * @param {object} req req object
   * @param {object} res res object
   * @param {action} next move to next controller handler
   * @returns {void|Object} response object or void
   */
  getDocumentByTitle(req, res, next) {
    db.Document
      .findAll({
        where: { title: req.query.q },
      })
      .then((document) => {
        if (!document) {
          return res.status(404)
            .send({
              message: 'This document cannot be found'
            });
        }
        if (!Helper.isPublic(document) && !Helper.isOwnerDoc(document, req)
           && !Helper.isAdmin(req.tokenDecode.roleId)
           && !Helper.hasRoleAccess(document, req)) {
          return res.status(401)
            .send({
              message: 'You are not permitted to view this document'
            });
        }
        req.singleDocument = document;
        next();
      })
      .catch(error => res.status(500).send(error.errors));
  },
};

export default GetDocument;
