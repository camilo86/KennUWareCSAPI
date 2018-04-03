const errors = require('http-errors');
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
