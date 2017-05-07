import Helper from '../Helper/Helper';
import db from '../models/index';

const ValidateInput = {

    /**
   * Validate user's input
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   * */
  validateUserInput(req, res, next) {
    if (req.body.roleId && req.body.roleId === 1) {
      return res.status(403)
        .send({
          message: 'Permission denied, You cannot sign up as an admin user'
        });
    }
    let userName = /\w+/g.test(req.body.userName);
    let firstName = /\w+/g.test(req.body.firstName);
    let lastName = /\w+/g.test(req.body.lastName);
    let email = /\S+@\S+\.\S+/.test(req.body.email);
    let password = /\w+/g.test(req.body.password);

    if (!userName) {
      return res.status(400)
        .send({
          message: 'Enter a valid userName'
        });
    }
    if (!firstName) {
      return res.status(400)
        .send({
          message: 'Enter a valid firstName'
        });
    }
    if (!lastName) {
      return res.status(400)
        .send({
          message: 'Enter a valid lastName'
        });
    }
    if (!email) {
      return res.status(400)
        .send({
          message: 'Enter a valid email'
        });
    }
    if (!password) {
      return res.status(400)
        .send({
          message: 'Enter a valid password'
        });
    }
    if (req.body.password && req.body.password.length < 8) {
      return res.status(400)
        .send({
          message: 'Minimum of 8 characters is allowed for password'
        });
    }

    db.User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (user) {
          return res.status(409)
            .send({
              message: 'email already exists'
            });
        }
        db.User.findOne({ where: { userName: req.body.userName } })
          .then((newUser) => {
            if (newUser) {
              return res.status(409)
                .send({
                  message: 'userName already exists'
                });
            }
            userName = req.body.userName;
            firstName = req.body.firstName;
            lastName = req.body.lastName;
            email = req.body.email;
            password = req.body.password;
            const roleId = req.body.roleId || 2;
            req.userInput =
            { userName, firstName, lastName, roleId, email, password };
            next();
          });
      });
  },

   /**
   * Validate user's input
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   * */
  validateUserUpdate(req, res, next) {
    if (req.params.id === '1') {
      return res.status(403)
        .send({
          message: 'You are not permitted to modify the default admin user'
        });
    }
    if (!(Helper.isAdmin(req.tokenDecode.roleId) || Helper.isOwner(req))) {
      return res.status(401)
        .send({
          message: 'You are not permitted to update this profile'
        });
    }
    if (!!req.body.roleId && req.body.roleId === '1') {
      if (!Helper.isAdmin(req.tokenDecode.roleId)) {
        return res.status(403)
          .send({
            message: 'You are not permitted to update role to admin'
          });
      }
    }
    if (req.body.id) {
      return res.status(403)
        .send({
          message: 'You are not permitted to update your id'
        });
    }
    db.User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({
              message: 'This user does not exist'
            });
        }
        req.userInstance = user;
        next();
      });
  },

  /**
   * Validate user's login datas
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   */
  validateLoginInput(req, res, next) {
    if (!req.body.password || !req.body.email) {
      return res.status(400)
        .send({
          message: 'Please provide your email and password to login'
        });
    }

    const email = /\S+@\S+\.\S+/.test(req.body.email);
    const password = /\w+/g.test(req.body.password);

    if (!email || !password) {
      return res.status(400)
        .send({
          message: 'Please enter a valid email and password'
        });
    }
    next();
  },

  /**
   * Validate user to delete, make sure it not admin user
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   *
   */
  validateDeleteUser(req, res, next) {
    db.User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({
              message: 'This user does not exist'
            });
        }
        if (Helper.isAdmin(user.roleId) && user.id === 1) {
          return res.status(403)
            .send({
              message: 'You can not delete the default admin user'
            });
        }
        if (Helper.isRegular(user.roleId) && user.id === 2) {
          return res.status(403)
            .send({ message: 'You can not delete the default regular user' });
        }
        req.userInstance = user;
        next();
      });
  },

  /**
   * Validate search
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   *
   */
  validateSearch(req, res, next) {
    const query = {};
    const terms = [];
    const userQuery = req.query.query;
    const searchArray =
      userQuery ? userQuery.toLowerCase().match(/\w+/g) : null;
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    const publishedDate = req.query.publishedDate;
    const order =
      publishedDate && publishedDate === 'ASC' ? publishedDate : 'DESC';

    if (limit < 0 || !/^([1-9]\d*|0)$/.test(limit)) {
      return res.status(400)
        .send({
          message: 'Only positive number is allowed for limit value'
        });
    }
    if (offset < 0 || !/^([1-9]\d*|0)$/.test(offset)) {
      return res.status(400)
        .send({
          message: 'Only positive number is allowed for offset value'
        });
    }

    if (searchArray) {
      searchArray.forEach((word) => {
        terms.push(`%${word}%`);
      });
    }
    query.limit = limit;
    query.offset = offset;
    query.order = [['createdAt', order]];

    if (`${req.baseUrl}${req.route.path}` === '/search/users') {
      if (!req.query.query) {
        return res.status(400)
          .send({
            message: 'Please enter a search query'
          });
      }
      query.where = {
        $or: [
          { userName: { $iLike: { $any: terms } } },
          { firstName: { $iLike: { $any: terms } } },
          { lastName: { $iLike: { $any: terms } } },
          { email: { $iLike: { $any: terms } } }
        ]
      };
    }
    if (`${req.baseUrl}${req.route.path}` === '/users') {
      query.include = [db.Role];
      query.where = Helper.isAdmin(req.tokenDecode.roleId)
        ? {}
        : { id: req.tokenDecode.userId };
    }
    if (`${req.baseUrl}${req.route.path}` === '/search/documents') {
      if (!req.query.query) {
        return res.status(400)
          .send({
            message: 'Please enter a search query'
          });
      }
      if (Helper.isAdmin(req.tokenDecode.roleId)) {
        query.where = Helper.likeSearch(terms);
      } else {
        query.where = {
          $and: [Helper.documentAccess(req), Helper.likeSearch(terms)]
        };
      }
    }
    if (`${req.baseUrl}${req.route.path}` === '/documents') {
      if (Helper.isAdmin(req.tokenDecode.roleId)) {
        query.where = {};
      } else {
        query.where = Helper.documentAccess(req);
      }
    }
    if (`${req.baseUrl}${req.route.path}` === '/users/:id/documents') {
      const adminSearch = req.query.query ? Helper.likeSearch(terms) : { };
      const userSearch = req.query.query
        ? [Helper.documentAccess(req), Helper.likeSearch(terms)]
        : Helper.documentAccess(req);
      if (Helper.isAdmin(req.tokenDecode.roleId)) {
        query.where = adminSearch;
      } else {
        query.where = userSearch;
      }
    }
    req.dmsFilter = query;
    next();
  },

  /**
   * Validate documents input
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   */
  validateDocumentsInput(req, res, next) {
    const title = /\w+/g.test(req.body.title);
    const content = /\w+/g.test(req.body.content);
    if (!req.body.title) {
      return res.status(400)
        .send({
          message: 'Title field is required'
        });
    }
    if (!req.body.content) {
      return res.status(400)
        .send({
          message: 'Content field is required'
        });
    }
    if (!title) {
      return res.status(400)
        .send({
          message: 'Please enter a valid title'
        });
    }
    if (!content) {
      return res.status(400)
        .send({
          message: 'Please enter a valid content'
        });
    }
    if (req.body.access
      && !['public', 'private', 'role'].includes(req.body.access)) {
      return res.status(400)
        .send({
          message: 'Access type can only be public, private or role'
        });
    }
    req.docInput = {
      title: req.body.title,
      content: req.body.content,
      OwnerId: req.tokenDecode.userId,
      access: req.body.access,
      OwnerRoleId: req.tokenDecode.roleId
    };
    next();
  },
};

export default ValidateInput;
