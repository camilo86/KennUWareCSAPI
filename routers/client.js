const router = require('express').Router();
const clientController = require('./../controllers/client');
const clientMiddleware = require('./../middlewares/client');

router.post('/', clientController.post);

router.get('/',
  [clientMiddleware.getAllClients],
  clientController.getAll);

module.exports = router;
