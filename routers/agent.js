const router = require('express').Router();
const agentController = require('./../controllers/agent');
const agentMiddleware = require('./../middlewares/agent');

router.post('/', agentController.post);

router.get('/',
  [agentMiddleware.getAllAgents],
  agentController.getAll);

module.exports = router;
