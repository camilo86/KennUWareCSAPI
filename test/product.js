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

  const updatedProduct = {
    name: 'Model y watch',
    description: 'great product',
    serialNumber: 'df569k3'
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

  it('should get all products', async () => {
    const response = await chai.request(app).get('/api/products');

    response.status.should.equal(200);
    response.body.should.have.lengthOf(1);
  });

  it('should get a product by id', async () => {
    const response = await chai.request(app).get(`/api/products/${product.id}`);

    response.status.should.equal(200);
    response.body.id.should.equal(product.id);
    response.body.name.should.equal(product.name);
    response.body.description.should.equal(product.description);
    response.body.serialNumber.should.equal(product.serialNumber);
  });

  it('should update product', async () => {
    const response = await chai.request(app).put(`/api/products/${product.id}`).send(updatedProduct);

    response.status.should.equal(204);
  });

  it('should delete a product', async () => {
    const response = await chai.request(app).del(`/api/products/${product.id}`);

    response.status.should.equal(204);
  });
});
