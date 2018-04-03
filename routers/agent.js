const router = require('express').Router();
const agentController = require('./../controllers/agent');

router.post('/', agentController.post);

module.exports = router;
