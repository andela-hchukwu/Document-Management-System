const model = require('../models');


/**
 * @class RolesController
 */
class RolesController {

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
  static getRoles(req, res) {
    model.Role.findAll()
      .then(roles => res.status(200)
        .send(roles));
  }


  /**
   * Method createRole
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Object} roles object
   *
   * @memberOf RolesController
   */
  static createRole(req, res) {
    model.Role.create(req.body)
      .then(newRole => res.status(201)
        .send(newRole))
      .catch(error => res.status(400)
        .send(error.errors));
  }

  /**
   * Method to get specific role
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} response message
   *
   * @memberOf RolesController
   */
  static getRole(req, res) {
    model.Role.findById(req.params.id)
      .then((role) => {
        if (!role) return res.status(404)
            .send({ message: `No role with id ${req.params.role}` });

        return res.status(200)
          .send(role);
      });
  }
}

module.exports = RolesController;
