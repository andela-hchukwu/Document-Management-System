import express from 'express';
import User from '../../app/controllers/Users';
import Auth from '../../app/middlewares/auth';

const userRouter = express.Router();

userRouter.route('/')
  .get(Auth.verifyToken,
       User.getAll)
  .post(User.create);

userRouter.route('/login')
  .post(User.login);

// userRouter.route('/:id')
//   .get(Auth.verifyToken, User.getUser)
//   .put(Auth.verifyToken, User.updateUser)
//   .delete(Auth.verifyToken, User.deleteUser);


export default userRouter;

