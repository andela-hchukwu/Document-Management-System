import db from '../models/index';
import Auth from '../middlewares/auth';
import Helper from '../Helper/Helper';

const User = {
  /**
    * Create a new user
    * Route: POST: /users
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void|Response} response object or void
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
    * user login
    * Route: POST: /users/login
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void|Response} response object or void
    */
  login(req, res) {
    db.User
      .findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (user && user.passwordMatch(req.body.password)) {
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
      }).catch(err => (res.status(400)
        .send(err)));
  },

  /**
    * logout
    * Route: POST: /users/logout
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} no returns
    */
  logout(req, res) {
    db.User.findById(req.tokenDecode.userId);
    res.status(200)
        .send({
          message: 'You have successfully logged out'
        });
  },

  /**
    * Get all users
    * Route: GET: /users
    * @param {Object} req request object
    * @param {Object} res response object
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
              message: 'You have successfully retrived all users',
              users,
              pagination
            });
        }
      });
  },

  /**
    * Get user by id
    * Route: get: /users/:id
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void|Response} response object or void
    */
  getUser(req, res) {
    return res.status(200)
      .send({
        message: 'You have successfully retrived this user',
        user: Helper.getUserProfile(req.getUser)
      });
  },

    /**
    * Get user by username
    * Route: GET: /search/users/?query=
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void|Response} response object or void
    */
  getUserName(req, res) {
    return res.status(200)
      .send({
        message: 'You have successfully retrived this user',
        user: Helper.getUserProfile(req.getUser)
      });
  },

  /**
    * Update user attribute
    * Route: PUT: /users/:id
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void|Response} response object or void
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
    * Delete a user by id
    * Route: DELETE: /users/:id
    * @param {Object} req request object
    * @param {Object} res response object
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
    * Get all document by a user
    * Route: GET: /users/:id/documents
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} no returns
    */
  findUserDocuments(req, res) {
    let documents = {};
    db.User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({
              message: 'This user does not exist'
            });
        }
        documents.user = Helper.getUserProfile(user);
        req.dmsFilter.where.OwnerId = req.params.id;
        req.dmsFilter.attributes = Helper.getDocumentAttribute();
        db.Document.findAndCountAll(req.dmsFilter)
          .then((docs) => {
            const condition = {
              count: docs.count,
              limit: req.dmsFilter.limit,
              offset: req.dmsFilter.offset
            };
            delete docs.count;
            const pagination = Helper.pagination(condition);
            documents = docs;
            return res.status(200)
              .send({
                message: 'This user\'s documents was successfully retrieved',
                documents,
                pagination
              });
          });
      });
  },
  /**
    * Search users
    * Route: GET: /users/searchs?query=
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void|Response} response object or void
    */
  search(req, res) {
    const request = req.dmsFilter;
    let condition = {};
    let pagination;
    request.attributes = Helper.getUserAttribute();
    db.User.findAndCountAll(request)
      .then((users) => {
        condition = {
          count: users.count,
          limit: request.limit,
          offset: request.offset
        };
        delete users.count;
        pagination = Helper.pagination(condition);
        res.status(200)
          .send({
            message: 'Your search was successful',
            users,
            pagination
          });
      });
  },

  fetchExistingUser(req, res) {
    db.User
      .find({
        where: {
          $or: [
            { email: req.body.identifier },
            { userName: req.body.identifier }
          ]
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(200).json({ message: 'User can be created' });
        }
        return res.status(400).json({ error: 'User already exists' });
      })
      .catch(error => res.status(501).json({
        error, err: 'An error occurred while retrieving the user'
      }));
  }
};

export default User;
