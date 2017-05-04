import express from 'express';
import User from '../../app/controllers/users';
import Auth from '../../app/middlewares/authentication';
import Validate from '../../app/middlewares/validate';

const userRouter = express.Router();

// creates a new user
/**
 * @swagger
 * definitions:
 *   NewUser:
 *     type: object
 *     required:
 *       - username
 *       - email
 *       - firstName
 *       - lastName
 *       - password
 *     properties:
 *       username:
 *         type: string
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *       email:
 *         type: string
 *         format: email
 *   User:
 *     allOf:
 *       - $ref: '#/definitions/NewUser'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
userRouter.route('/users')

    /**
   * @swagger
   * /users:
   *   get:
   *     description: Returns users
   *     tags:
   *      - Find Users
   *     produces:
   *      - application/json
   *     parameters:
   *      - name: x-access-token
   *        in: header
   *        description: an authorization header
   *        required: true
   *        type: string
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/User'
   */

  /**
   * @swagger
   * /users:
   *   post:
   *     description: Creates new user
   *     tags:
   *      - Create
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: user
   *         description: User object
   *         in:  body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/NewUser'
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *           $ref: '#/definitions/User'
   */
  .get(Auth.verifyToken, Validate.validateSearch,
       User.getAll)
  .post(Validate.validateUserInput, User.create);

// logs in a user
/**
 * @swagger
 * definitions:
 *   NewLogin:
 *     type: object
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *         format: email
 *       password:
 *         type: string
 *         format: password
 *   Login:
 *     allOf:
 *       - $ref: '#/definitions/NewLogin'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
userRouter.route('/users/login')

 /**
   * @swagger
   * /users/logout:
   *   post:
   *     description: Logs out a user
   *     tags:
   *      - Authentication
   *     produces:
   *       - application/json
   *     parameters:
   *        - name: x-access-token
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *           $ref: '#/definitions/Logout'
   */
  .post(Validate.validateLoginInput, User.login);

// logs out a user
/**
 * @swagger
 * definitions:
 *   NewLogout:
 *     type: object
 *   Logout:
 *     allOf:
 *       - $ref: '#/definitions/NewLogout'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
userRouter.route('/users/logout')
  .post(Auth.verifyToken, User.logout);

// Find user, update user attributes and delete user.
/**
 * @swagger
 * definitions:
 *   NewUpdate:
 *     type: object
 *     required:
 *       - username
 *       - email
 *       - firstName
 *       - lastName
 *       - password
 *     properties:
 *       username:
 *         type: string
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *       email:
 *         type: string
 *         format: email
 *   Update:
 *     allOf:
 *       - $ref: '#/definitions/NewUpdate'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
userRouter.route('/users/:id')

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     description: Returns a particular user
   *     tags:
   *      - Find Users
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: id
   *         description: The user's id
   *         in:  path
   *         required: true
   *         type: string
   *       - name: x-access-token
   *         in: header
   *         description: an authorization header
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/Update'
   */

   /**
   * @swagger
   * /users/{id}:
   *   put:
   *     description: Updates the user signed in
   *     tags:
   *      - Update
   *     produces:
   *       - application/json
   *     parameters:
   *        - name: id
   *          description: The user's id
   *          in:  path
   *          required: true
   *          type: string
   *        - name: x-access-token
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *        - name: user
   *          description: User object
   *          in:  body
   *          required: true
   *          type: string
   *          schema:
   *            $ref: '#/definitions/NewUpdate'
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *           $ref: '#/definitions/Update'
   */

   /**
   * @swagger
   * /users/{id}:
   *    delete:
   *      description: Deletes the user with the id supplied as param
   *      tags:
   *        - Delete
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: id
   *          description: The user's id
   *          in:  path
   *          required: true
   *          type: string
   *        - name: x-access-token
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *      responses:
   *        200:
   *          description: users
   *          schema:
   *            type: array
   *            items:
   *              $ref: '#/definitions/Update'
   */
  .get(Auth.verifyToken, Validate.getSingleUser, User.getUser)
  .put(Auth.verifyToken, Validate.validateUserUpdate, User.update)
  .delete(Auth.verifyToken,
    Validate.hasAdminPermission,
    Validate.validateDeleteUser,
    User.delete);


userRouter.route('/users/findUser/:identifier')
    .get(User.fetchExistingUser);

// Find all documents belonging to the user.
/**
 * @swagger
 * definitions:
 *   NewFetchDoc:
 *     type: object
 *   FetchDoc:
 *     allOf:
 *       - $ref: '#/definitions/NewFetchDoc'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
userRouter.route('/users/:id/documents')

    /**
   * @swagger
   * /users/{id}/documents:
   *   get:
   *     description: Returns the documents of a particular user
   *     tags:
   *      - Find Documents
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: id
   *         description: The user's id
   *         in:  path
   *         required: true
   *         type: string
   *       - name: x-access-token
   *         in: header
   *         description: an authorization header
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/FetchDoc'
   */
  .get(Auth.verifyToken, Validate.validateSearch, User.findUserDocuments);

// Search for a user
/**
 * @swagger
 * definitions:
 *   NewSearchUser:
 *     type: object
 *   SearchUser:
 *     allOf:
 *       - $ref: '#/definitions/NewSearchUser'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
userRouter.route('/search/users')

    /**
   * @swagger
   * /search/users/?q={username}:
   *   get:
   *     description: Returns the documents of a particular user
   *     tags:
   *      - Find Users
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: username
   *         description: The user's username
   *         in:  path
   *         required: true
   *         type: string
   *       - name: x-access-token
   *         in: header
   *         description: an authorization header
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/SearchUser'
   */
  .get(Auth.verifyToken, Validate.validateSearch, User.search);

export default userRouter;
