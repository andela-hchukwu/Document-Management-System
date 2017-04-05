import db from '../models/index';
import Helper from '../Helper/Helper';

const Document = {

  /**
  *
  * @param {Object} req - request object
  * @param {Object} res - response object
  * @return {Object} return object
  */
  create(req, res) {
    db.Document
      .create(req.docInput)
        .then((document) => {
          document = Helper.getDocument(document);
          res.status(201)
            .send({
              message: 'New document has been successfully created',
              document
            });
        })
        .catch(error => res.status(500).send(error.errors));
  },

  /**
   *
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Object|void} response object or void
   */
  getAll(req, res) {
    req.dmsFilter.attributes = Helper.getDocAttribute();
    db.Document
      .findAndCountAll(req.dmsFilter)
      .then((documents) => {
        const condition = {
          count: documents.count,
          limit: req.dmsFilter.limit,
          offset: req.dmsFilter.offset
        };
        delete documents.count;
        const pagination = Helper.pagination(condition);
        res.status(200)
          .send({
            message: 'You have successfully retrieved all documents',
            documents,
            pagination
          });
      });
  },
};

module.exports = Document;
