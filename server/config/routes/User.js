import express from 'express';
import User from '../../app/controllers/Users';
import Auth from '../../app/middlewares/auth';

const userRouter = express.Router();

// landing page
userRouter.route('/')
  .get((req, res) => {
    res.status(200).send({
      message: 'Welcome to Document Management System API'
    });
  });

// creates a new user
userRouter.route('/users')
  .get(Auth.verifyToken, Auth.validateSearch,
       User.getAll)
  .post(Auth.validateUserInput, User.create);

// logs in a user
userRouter.route('/users/login')
  .post(Auth.validateLoginInput, User.login);

// logs out a user
userRouter.route('/users/logout')
  .post(Auth.verifyToken, User.logout);

// Find user, update user attributes and delete user.
userRouter.route('/users/:id')
  .get(Auth.verifyToken, Auth.getSingleUser, User.getUser)
  .put(Auth.verifyToken, Auth.validateUserUpdate, User.update)
  .delete(Auth.verifyToken,
    Auth.hasAdminPermission,
    Auth.validateDeleteUser,
    User.delete);


userRouter.route('/users/findUser/:identifier')
    .get(User.fetchExistingUser);

// Find all documents belonging to the user.
userRouter.route('/users/:id/documents')
  .get(Auth.verifyToken, Auth.validateSearch, User.findUserDocuments);

// Search for a user
userRouter.route('/search/users')
  .get(Auth.verifyToken, Auth.getUserName, User.getUserName);

export default userRouter;
