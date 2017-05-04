import Helper from '../Helper/Helper';
import db from '../models/index';

const HasPermission = {

  /**
   * Check for admin permission
   * @param {Object} req - request object
   * @param {any} res - response object
   * @param {any} next - move to next controller handler
   * @returns {void} no returns
   */
  hasAdminPermission(req, res, next) {
    db.User
      .findById(req.tokenDecode.userId)
      .then((user) => {
        if (user.roleId === 1) {
          next();
        } else {
          return res.status(403)
            .send({
              message: 'You are not permitted to perform this action'
            });
        }
      });
  },

   /**
   * Check for document edit and delete permission
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   */
  hasDocumentPermission(req, res, next) {
    db.Document.findById(req.params.id)
      .then((doc) => {
        if (!doc) {
          return res.status(404)
            .send({
              message: 'This document does not exist'
            });
        }
        if (!Helper.isOwnerDoc(doc, req)
          && !Helper.isAdmin(req.tokenDecode.roleId)) {
          return res.status(401)
            .send({
              message: 'You are not permitted to modify this document'
            });
        }
        req.docInstance = doc;
        next();
      });
  },

    /**
   * Check for role edit and delete permission
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   */
  modifyRolePermission(req, res, next) {
    db.Role.findById(req.params.id)
      .then((roles) => {
        if (!roles) {
          return res.status(404)
            .send({
              message: 'This role does not exist'
            });
        }
        if (Helper.isAdmin(roles.id) || Helper.isRegular(roles.id)) {
          return res.status(403)
            .send({
              message: 'You are not permitted to modify this role'
            });
        }
        req.roleInstance = roles;
        next();
      });
  },
};

export default HasPermission;
