const router = require('express').Router();
const agentController = require('./../controllers/agent');
const agentMiddleware = require('./../middlewares/agent');
const authMiddleware = require('./../middlewares/auth');

router.post('/', agentController.post);

router.get('/',
  [agentMiddleware.getAllAgents],
  agentController.getAll);

router.get('/me',
  [authMiddleware.agentAuthRequired],
  agentController.getMe);

router.get('/:agentId',
  [agentMiddleware.getByIdFromParams],
  agentController.get);

router.put('/:agentId',
  [agentMiddleware.getByIdFromParams],
  agentController.put);

router.delete('/:agentId',
  [agentMiddleware.getByIdFromParams],
  agentController.delete);

router.post('/login', agentController.login);

module.exports = router;
