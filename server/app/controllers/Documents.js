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
  }
};

module.exports = Document;
