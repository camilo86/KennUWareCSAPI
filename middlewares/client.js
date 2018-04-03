const errors = require('http-errors');
const Client = require('./../models/client');

exports.getAllClients = async (req, res, next) => {
  try {
    req.clients = await Client.find({});
    next();
  } catch (e) {
    return next(new errors.BadRequest('Could not get clients'));
  }
};
