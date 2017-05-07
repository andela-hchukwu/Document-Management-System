import jwt from 'jsonwebtoken';
import db from '../models/index';

const secretKey = process.env.SECRET || 'secret';

const Authentication = {

  /**
   * verify web token
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Object} next - move to next controller handler
   * @returns {void} no returns
   */
  verifyToken(req, res, next) {
    const token = req.headers.authorization || req.headers['x-access-token'];
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
  * Get token
  * @param {Object} user user's object
  * @returns {Boolean} true or false
  */
  getToken(user) {
    const userToken = jwt.sign({
      userId: user.id,
      userName: user.userName,
      userRoleId: user.roleId
    },
      secretKey, { expiresIn: '7d' }
    );
    return userToken;
  },
};

export default Authentication;
