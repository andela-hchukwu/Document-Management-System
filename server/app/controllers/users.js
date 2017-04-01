import db from '../models';
import Auth from '../middlewares/auth';
import Helper from '../Helper/Helper';

/**
 * @class UsersController
 */
const Users = {
  /**
   *
   * createUsers method
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} response message
   * @memberOf UsersController
   */
  createUsers(req, res) {
    db.User
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
};

module.exports = Users;
