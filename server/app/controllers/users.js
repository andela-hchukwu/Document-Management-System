const model = require('../models');

/**
 * @class UsersController
 */
class UsersController {

  /**
   * Method getUsers
   * @param {object} req - request oject
   * @param {object} res -response object
   * @return {object} return - response object
   *
   * @memberOf usersController
   */
  static getUsers(req, res) {
    model.User.findAll({
      attributes: [
        'id',
        'userName',
        'firstName',
        'lastName',
        'email',
        'roleId',
        'createdAt',
        'updatedAt',
      ]
    }).then(users => res.status(200)
        .send(users));
  }
}

module.exports = UsersController;
