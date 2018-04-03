const errors = require('http-errors');
const Client = require('./../models/client');

exports.getAllClients = async (req, res, next) => {
  try {
    req.clients = await Client.find(req.query);
    next();
  } catch (e) {
    return next(new errors.BadRequest('Could not get clients'));
  }
};

exports.getByIdFromParams = async (req, res, next) => {
  try {
    req.client = await Client.findById(req.params.clientId);
    next();
  } catch (e) {
    return next(new errors.NotFound('Could not find client'));
  }
};
