const router = require('express').Router();
const clientController = require('./../controllers/client');
const clientMiddleware = require('./../middlewares/client');
const authMiddleware = require('./../middlewares/auth');

router.post('/', clientController.post);

router.get('/',
  [clientMiddleware.getAllClients],
  clientController.getAll);

router.get('/me',
  [authMiddleware.clientAuthRequired],
  clientController.getMe);

router.get('/:clientId',
  [clientMiddleware.getByIdFromParams],
  clientController.get);

router.put('/:clientId',
  [clientMiddleware.getByIdFromParams],
  clientController.put);

router.delete('/:clientId',
  [clientMiddleware.getByIdFromParams],
  clientController.delete);

router.post('/login', clientController.login);

module.exports = router;
