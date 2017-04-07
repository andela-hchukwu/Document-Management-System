import express from 'express';
import Roles from '../../app/controllers/Roles';
import Auth from '../../app/middlewares/auth';

const rolesRouter = express.Router();

rolesRouter.route('/roles')
  .get(Auth.verifyToken,
    Auth.hasAdminPermission,
    Roles.getAll)
  .post(Auth.verifyToken,
    Auth.hasAdminPermission,
    Roles.create);


rolesRouter.route('/roles/:id')
  .get(Auth.verifyToken,
    Auth.hasAdminPermission,
    Roles.getRole)
  .put(Auth.verifyToken,
    Auth.hasAdminPermission,
    Auth.checkTitle,
    Auth.modifyRolePermission,
    Roles.update)
  .delete(Auth.verifyToken,
    Auth.hasAdminPermission,
    Auth.modifyRolePermission,
    Roles.delete);

export default rolesRouter;
