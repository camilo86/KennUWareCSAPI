const router = require('express').Router();
const clientController = require('./../controllers/client');
const clientMiddleware = require('./../middlewares/client');

router.post('/', clientController.post);

router.get('/',
  [clientMiddleware.getAllClients],
  clientController.getAll);

router.get('/:clientId',
  [clientMiddleware.getByIdFromParams],
  clientController.get);

module.exports = router;
