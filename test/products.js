const should = require('should');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./../app');

chai.use(chaiHttp);

describe('products', () => {
  const product = {
    name: 'Model x watch',
    serial: 'dmfeEMzU'
  };

  it('should create a product', async () => {
    const response = await chai.request(app).post('/api/products').send(product);

    response.should.have.status(201);
    response.body.should.have.property('id');
    response.body.name.should.equal(product.name);
    response.body.serial.should.equal(product.serial);
    product.id = response.body.id;
  })
});
