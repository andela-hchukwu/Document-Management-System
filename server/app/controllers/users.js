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
  create(req, res) {
    db.User
      .create(req.body)
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
  },

  /**
   * Method getALL users
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {void} no returns
   */
  getAll(req, res) {
    db.User
      .findAndCountAll(req.dmsFilter)
        .then((users) => {
          if (users) {
            const condition = {
              count: users.count,
              limit: req.dmsFilter.limit,
              offset: req.dmsFilter.offset
            };
            delete users.count;
            const pagination = Helper.pagination(condition);
            res.status(200)
              .send({
                message: 'You have successfully retrieved all users',
                users,
                pagination
              });
          }
        });
  },

  /**
   *
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Object} response message
   */
  update(req, res) {
    const errorArray = [];
    req.userInstance.update(req.body)
      .then(updatedUser =>
        res.status(200)
          .send({
            message: 'Your profile has been updated',
            updatedUser
          }))
          .catch((err) => {
            err.errors.forEach((error) => {
              errorArray.push({ path: error.path, message: error.message });
            });
            return res.status(400)
              .send({
                errorArray
              });
          });
  },

  /**
   * Method delete users
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {void} no returns
   */
  delete(req, res) {
    req.userInstance.destroy()
      .then(() => {
        res.status(200)
          .send({
            message: 'This account has been successfully deleted'
          });
      })
      .catch(err => res.status(500).send(err.errors));
  },

  /**
   *
   * @param {any} req
   * @param {any} res
   */
  login(req, res) {
    db.User
      .findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (user && user.validPassword(req.body.password)) {
          const token = Auth.getToken(user);
          user = Helper.getUserProfile(user);
          return res.status(200)
            .send({
              message: 'You have successfully logged in',
              token,
              user
            });
        }
        res.status(401)
          .send({
            message: 'Please enter a valid email or password to log in'
          });
      });
  },
};

module.exports = Users;
