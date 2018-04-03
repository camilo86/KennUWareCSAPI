const router = require('express').Router();
const ticketController = require('./../controllers/ticket');
const ticketMiddleware = require('./../middlewares/ticket');
const authMiddleware = require('./../middlewares/auth');

router.post('/',
  [authMiddleware.clientOrAgentAuthRequired],
  ticketController.post);

router.get('/',
  [ticketMiddleware.getAllTickets],
  ticketController.getAll);

router.get('/:ticketId',
  [ticketMiddleware.getByIdFromParams],
  ticketController.get);

module.exports = router;
