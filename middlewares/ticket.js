const errors = require('http-errors');
const Ticket = require('./../models/ticket');

exports.getAllTickets = async (req, res, next) => {
  try {
    req.tickets = await Ticket.find({});
    next();
  } catch (e) {
    return next(new errors.BadRequest('could not get tickets'));
  }
};
