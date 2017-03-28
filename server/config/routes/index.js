const router = require('express').Router();

router.route('/')
  .get((req, res) => {
    res.status(200).send({ message: 'Welcome to the document Management API' });
  });

module.exports = router;
