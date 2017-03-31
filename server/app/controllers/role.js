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
                    .send(roles)
            );
  }
}

module.export = RolesController;
