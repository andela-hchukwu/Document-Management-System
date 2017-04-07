import express from 'express';
import Documents from '../../app/controllers/Documents';
import Auth from '../../app/middlewares/auth';

const documentRouter = express.Router();

documentRouter.route('/documents')
  .get(Auth.verifyToken,
    Auth.validateSearch,
    Documents.getAll)
  .post(Auth.verifyToken,
    Auth.validateSearch,
    Documents.create);

documentRouter.route('/documents/:id')
  .get(Auth.verifyToken,
    Auth.getSingleDocument,
    Documents.getDocument)
  .put(Auth.verifyToken,
    Auth.hasDocumentPermission,
    Documents.update)
  .delete(Auth.verifyToken,
    Auth.hasDocumentPermission,
    Documents.delete);

documentRouter.route('/search/documents')
  .get(Auth.verifyToken,
    Auth.getDocumentByTitle,
    Documents.getDocumentByTitle);

export default documentRouter;
