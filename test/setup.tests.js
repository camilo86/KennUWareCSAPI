const dotenv = require('dotenv').config();
const should = require('should');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, db } = require('./../app');

process.env.NODE_ENV = 'testing';
db.connection.on('open', () => {
  db.connection.db.dropDatabase();
});

chai.use(chaiHttp);

require('./entities/product')({ chai, app });
require('./entities/client')({ chai, app });
require('./entities/agent')({ chai, app });
require('./entities/tickets')({ chai, app });
