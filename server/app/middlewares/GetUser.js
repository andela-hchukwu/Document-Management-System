import db from '../models/index';

const GetUser = {

   /**
   * Get a single user's profile
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   */
  getUserName(req, res, next) {
    db.User
      .findOne({
        where: { userName: req.query.q },
      })
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({
              message: 'This user does not exist'
            });
        }
        req.getUser = user;
        next();
      })
      .catch(err => res.status(500).send(err.errors));
  },

   /**
   * Get a single user's profile
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   */
  getSingleUser(req, res, next) {
    db.User
      .findOne({
        where: { id: req.params.id },
      })
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({
              message: 'This user does not exist'
            });
        }
        req.getUser = user;
        next();
      })
      .catch(err => res.status(500).send(err.errors));
  },
};

export default GetUser;
