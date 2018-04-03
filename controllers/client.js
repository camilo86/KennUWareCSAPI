const errors = require('http-errors');
const Client = require('./../models/client');

exports.post = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const client = await Client.create({ firstName, lastName, email, password });

    return res.status(201).json(client);
  } catch (e) {
    return next(new errors.BadRequest('Could not create client'));
  }
};

exports.getAll = (req, res) => {
  return res.json(req.clients);
};

exports.get = (req, res) => {
  return res.json(req.client);
};

exports.put = async (req, res, next) => {
  try {
    const { firstName, lastName, email } = req.body;

    req.client.firstName = firstName || req.client.firstName;
    req.client.lastName = lastName || req.client.lastName;
    req.client.email = email || req.client.email;

    await req.client.save();
    return res.sendStatus(204);
  } catch (e) {
    return next(new errors.BadRequest('Could not update client'));
  }
};

exports.delete = async (req, res, next) => {
  try {
    await req.client.remove();
    return res.sendStatus(204);
  } catch (e) {
    return next(new errors.BadRequest('Could not delete client'));
  }
};
