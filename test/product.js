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

describe('products', () => {
  const product = {
    name: 'Model x watch',
    description: 'Very nice product',
    serialNumber: 'dmfeEMzU'
  };

  it('should create a product', async () => {
    const response = await chai.request(app).post('/api/products').send(product);

    response.status.should.equal(201);
    response.body.should.have.property('id');
    response.body.name.should.equal(product.name);
    response.body.description.should.equal(product.description);
    response.body.serialNumber.should.equal(product.serialNumber);
    product.id = response.body.id;
  });
});
