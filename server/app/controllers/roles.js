const model = require('../models');


/**
 * @class RolesController
 */
const Roles = {

  /**
   *
   * Method getRoles
   * to obtain all roles container
   * @param {Object} req
   * @param {Object} res
   * @return {Object} roles Object
   *
   * @memberOf RolesController
   */
  getRoles(req, res) {
    model.Role.findAll()
      .then(roles => res.status(200)
        .send(roles));
  },


  /**
   * Method createRole
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Object} roles object
   *
   * @memberOf RolesController
   */
  createRole(req, res) {
    model.Role.create(req.body)
      .then(newRole => res.status(201)
        .send(newRole))
      .catch(error => res.status(400)
        .send(error.errors));
  },

  /**
   * Method to get specific role
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} response message
   *
   * @memberOf RolesController
   */
  getRole(req, res) {
    model.Role.findById(req.params.id)
      .then((role) => {
        if (!role) return res.status(404)
          .send({ message: `No role with id ${req.params.role}` });

        return res.status(200)
          .send(role);
      });
  },

  /**
   *
   * Method updateRole
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} return - response message
   *
   * @memberOf RolesController
   */
  updateRole(req, res) {
    model.Role.findById(req.params.id)
      .then((role) => {
        if (!role) return res.status(404)
          .send({ message: `No role with id ${req.params.role}` });

        role.update(req.body)
          .then(updatedRole => res.status(202)
            .send(updatedRole));
      });
  },

  /**
   * Method deleteRole
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} return - response message
   *
   * @memberOf RolesController
   */
  deleteRole(req, res) {
    model.Role.findById(req.params.id)
      .then((role) => {
        if (!role) return res.status(404)
          .send({ message: `No role with id ${req.params.role}` });

        role.destroy()
          .then(() => res.status(202)
            .send({ message: 'Role successfully deleted' }));
      });
  }
};

module.exports = Roles;
