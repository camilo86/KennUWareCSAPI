const errors = require('http-errors');
const Product = require('./../models/product');
const Client = require('./../models/client');
const Agent = require('./../models/agent');
const Ticket = require('./../models/ticket');

exports.post = async (req, res, next) => {
  try {
    const inputs = { title, description, serialNumber, clientEmail, priority } = req.body;
    const product = await Product.findOne({ serialNumber });

    if(req.account.role === 'agent') {
      const client = await Client.findOne({ email: clientEmail });
      if (!client) return next(new errors.NotFound('Client not found'));

      inputs.agent = req.account.id;
      inputs.client = client.id;
    } else {
      inputs.client = req.account.id;
    }

    const ticket = await Ticket.create({...inputs, product: product.id, opened: new Date()});
    const ticketResult = await Ticket.findById(ticket.id).populate('product').populate('agent').populate('client');
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

exports.put = async (req, res, next) => {
  try {
    const inputs = { title, description, clientEmail, agentEmail, status, priority } = req.body;

    if(clientEmail) {
      const client = await Client.findOne({ email: clientEmail });
      inputs.client = client.id;
    }

    if(agentEmail) {
      const agent = await Agent.findOne({ email: agentEmail });
      inputs.agent = agent.id;
    }

    if(inputs.status === 'closed') {
      req.ticket.closed = new Date();
    }

    req.ticket.priority = inputs.priority || req.ticket.priority;
    req.ticket.status = inputs.status || req.ticket.status;
    req.ticket.title = inputs.title || req.ticket.title;
    req.ticket.description = inputs.description || req.ticket.description;
    req.ticket.client = inputs.client || req.ticket.client;
    req.ticket.agent = inputs.agent || req.ticket.agent;

    await req.ticket.save();
    return res.sendStatus(204);

  } catch (e) {
    return next(new errors.BadRequest('could not update ticket'));
  }
};

exports.delete = async (req, res, next) => {
  try {
    await req.ticket.remove();
    return res.sendStatus(204);
  } catch (e) {
    return next(new errors.BadRequest('could not delete ticket'));
  }
};
