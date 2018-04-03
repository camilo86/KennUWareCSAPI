const errors = require('http-errors');
const Agent = require('./../models/agent');

exports.getAllAgents = async (req, res, next) => {
  try {
    req.agents = await Agent.find({});
    next();
  } catch (e) {
    return next(new errors.BadRequest('Could not get agents'));
  }
};

exports.getByIdFromParams = async (req, res, next) => {
  try {
    req.agent = await Agent.findById(req.params.agentId);
    next();
  } catch (e) {
    return next(new errors.NotFound('Could not find agent'));
  }
};
