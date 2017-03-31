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
}

module.export = RolesController;
