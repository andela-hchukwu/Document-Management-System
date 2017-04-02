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
    const token = req.body.token || req.query.token || req
        .headers['x-acess-token'];
    if (token) {
        // verifies secret
      jwt.verify(token, 'macklemoore', (err, decoded) => {
        if (err) {
          res.send({ success: false });
        } else {
                // if everything is good, save to request for use in other routes
          req.tokenDecode = decoded;
          next();
        }
      });
    } else {
      // if there is no token
      res.status(403).send({ success: 'verification failed' });
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
