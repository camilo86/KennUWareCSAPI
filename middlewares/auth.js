const errors = require('http-errors');
const jwt = require('jsonwebtoken');
const Agent = require('./../models/agent');
const Client = require('./../models/client');

exports.clientAuthRequired = (req, res, next) => {
  const xAccessToken = req.headers['x-access-token'];
  if(!xAccessToken) return next(new errors.BadRequest('invalid token'));

  jwt.verify(xAccessToken, process.env.SECRET, function(error, decoded) {
    if(error) return next(new errors.BadGateway('invalid token'));

    Client.findOne({ _id: decoded.id }, function(error, agent) {
      if(error || !agent) return next(new errors.NotFound('client not found'));

      req.account = {...agent, role: 'client'};
      next();
    });
  });
};

exports.agentAuthRequired = (req, res, next) => {
  const xAccessToken = req.headers['x-access-token'];
  if(!xAccessToken) return next(new errors.BadRequest('invalid token'));

  jwt.verify(xAccessToken, process.env.SECRET, function(error, decoded) {
    if(error) return next(new errors.BadGateway('invalid token'));

    Agent.findOne({ _id: decoded.id }, function(error, agent) {
      if(error || !agent) return next(new errors.NotFound('agent not found'));

      req.account = {...agent, role: 'agent'};
      next();
    });
  });
};
