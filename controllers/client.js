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

exports.getAll = async (req, res) => {
  return res.json(req.clients);
};
