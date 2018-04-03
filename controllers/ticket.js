const errors = require('http-errors');
const Ticket = require('./../models/ticket');
const Client = require('./../models/client');

exports.post = async (req, res, next) => {
  try {
    const inputs = { title, description, serialNumber, clientEmail } = req.body;

    if(req.account.role === 'agent') {
      const client = await Client.findOne({ email: clientEmail });
      if (!client) return next(new errors.NotFound('Client not found'));

      inputs.agent = req.account.id;
      inputs.client = client.id;
    } else {
      inputs.client = req.account.id;
    }

    const ticket = await Ticket.create(inputs);
    const ticketResult = await Ticket.findById(ticket.id).populate('agent').populate('client');
    return res.status(201).json(ticketResult);
  } catch (e) {
    return next(new errors.BadRequest('Could not create ticket'));
  }
}

exports.getAll = (req, res) => {
  return res.json(req.tickets);
};

exports.get = (req, res) => {
  return res.json(req.ticket);
};
