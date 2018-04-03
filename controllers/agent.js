const errors = require('http-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Agent = require('./../models/agent');

exports.post = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const agent = await Agent.create({ firstName, lastName, email, password });

    return res.status(201).json(agent);

  } catch (e) {
    return next(new errors.BadRequest('Could not create agent'));
  }
};

exports.getAll = (req, res) => {
  return res.json(req.agents);
};

exports.get = (req, res) => {
  return res.json(req.agent);
};

exports.put = async (req, res, next) => {
  try {
    const { firstName, lastName, email } = req.body;

    req.agent.firstName = firstName || req.agent.firstName;
    req.agent.lastName = lastName || req.agent.lastName;
    req.agent.email = email || req.agent.email;

    await req.agent.save();
    return res.sendStatus(204);
  } catch (e) {
    return next(new errors.BadRequest('Could not update agent'));
  }
};

exports.delete = async (req, res, next) => {
  try {
    await req.agent.remove();
    return res.sendStatus(204);
  } catch (e) {
    return next(new errors.BadRequest('Could not delete agent'));
  }
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if(!email || !password) return next(new errors.BadRequest('email and/or password missing'));


  Agent.findOne({ email }, function(error, agent) {
    if(error || !agent) return next(new errors.NotFound('agent not found'));
    if(!bcrypt.compareSync(password, agent.password)) return next(new errors.Forbidden('invalid email/password'));

    jwt.sign({
      id: agent.id,
      role: 'agent'
    }, process.env.SECRET, (error, token) => {
      if(error) return next(new errors.BadRequest('failed to generate token'));

      return res.json(token);
    })
  });
};
