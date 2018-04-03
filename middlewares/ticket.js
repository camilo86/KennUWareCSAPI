const errors = require('http-errors');
const Ticket = require('./../models/ticket');

exports.getAllTickets = async (req, res, next) => {
  try {
    req.tickets = await Ticket.find(req.query).populate('product').populate('agent').populate('client');
    next();
  } catch (e) {
    return next(new errors.BadRequest('could not get tickets'));
  }
};

exports.getByIdFromParams = async (req, res, next) => {
  try {
    req.ticket = await Ticket.findById(req.params.ticketId).populate('product').populate('agent').populate('client');
    next();
  } catch (e) {
    return next(new errors.NotFound('could not find ticket'));
  }
};
