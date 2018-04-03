const router = require('express').Router();
const ticketController = require('./../controllers/ticket');
const authMiddleware = require('./../middlewares/auth');

router.post('/',
  [authMiddleware.clientOrAgentAuthRequired],
  ticketController.post);

module.exports = router;
