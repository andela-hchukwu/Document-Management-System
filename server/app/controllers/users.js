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

  /**
   *
   * createUsers method
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} response message
   * @memberOf UsersController
   */
  static createUsers(req, res) {
    model.User
      .create(req.userInput)
      .then((user) => {
        const token = Auth.getToken(user);
        user = Helper.userProfile(user);
        return res.status(201)
          .send({
            message: 'Your account has been created successfully',
            token,
            user
          });
      })
      .catch(error =>
        res.status(400)
          .send({
            errorArray: Helper.errorArray(error)
          }));
  }
}

module.exports = UsersController;
