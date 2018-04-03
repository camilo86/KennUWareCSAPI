const errors = require('http-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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

exports.getMe = (req, res) => {
  return res.json(req.account);
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

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if(!email || !password) return next(new errors.BadRequest('email and/or password missing'));


  Client.findOne({ email }, function(error, client) {
    if(error || !client) return next(new errors.NotFound('client not found'));
    if(!bcrypt.compareSync(password, client.password)) return next(new errors.Forbidden('invalid email/password'));

    jwt.sign({
      id: client.id,
      role: 'client'
    }, process.env.SECRET, (error, token) => {
      if(error) return next(new errors.BadRequest('failed to generate token'));

      return res.json({ token });
    })
  });
};
