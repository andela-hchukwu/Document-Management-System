import jwt from 'jsonwebtoken';
import db from '../models/index';

const secretKey = process.env.SECRET || 'secret';

const Auth = {

  /**
   * verify web token
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Object} next - move to next controller handler
   * @returns {void} no returns
   */
  verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.status(401)
            .send({
              message: 'The token you supplied has expired'
            });
        }
        db.User.findById(decoded.userId)
          .then((user) => {
            if (!user) {
              return res.status(404)
                .send({
                  message: 'Account not found, Sign Up or sign in to get access'
                });
            }
            req.tokenDecode = decoded;
            req.tokenDecode.roleId = user.roleId;
            next();
          });
      });
    } else {
      res.status(400)
        .send({
          message: 'Please sign in or register to get a token'
        });
    }
  },

  /**
   * Check for admin permission
   * @param {Object} req - request object
   * @param {any} res - response object
   * @param {any} next - move to next controller handler
   * @returns {void} no returns
   */
  hasAdminPermission(req, res, next) {
    db.Role
        .findById(req.tokenDecode.roleId)
        .then((role) => {
          if (!role) {
            return res.send({ message: 'error' });
          }
          if (role.title === 'Admin') {
            next();
          } else { return res.send({ Message: 'permission denied' }); }
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
  * Get token
  * @param {Object} user user's object
  * @returns {Boolean} true or false
  */
  getToken(user) {
    const userToken = jwt.sign({
      userId: user.id
    },
      secretKey, { expiresIn: '7d' }
    );
    return userToken;
  },
};

export default Auth;
