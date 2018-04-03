const router = require('express').Router();
const agentController = require('./../controllers/agent');
const agentMiddleware = require('./../middlewares/agent');

router.post('/', agentController.post);

router.get('/',
  [agentMiddleware.getAllAgents],
  agentController.getAll);

router.get('/:agentId',
  [agentMiddleware.getByIdFromParams],
  agentController.get);

router.put('/:agentId',
  [agentMiddleware.getByIdFromParams],
  agentController.put);

module.exports = router;
