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
