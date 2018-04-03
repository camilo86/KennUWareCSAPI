const clientSeed = require('./../../seeds/client');

module.exports = ({ chai, app }) => {
  before(async () => {
    await clientSeed();
  });

  describe('Clients', () => {
    const client = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      password: 'somepasswordhere'
    };

    const clientUpdated = {
      firstName: 'Camilo',
      lastName: 'Gonzalez',
      email: 'cgs.camilogonzalez@gmail.com',
    };

    it('Should create a client', async () => {
      const response = await chai.request(app).post('/api/clients').send(client);

      response.status.should.equal(201);
      response.body.should.have.property('id');
      response.body.firstName.should.equal(client.firstName);
      response.body.lastName.should.equal(client.lastName);
      response.body.email.should.equal(client.email);
      client.id = response.body.id;
    });

    it('Should get all clients', async () => {
      const response = await chai.request(app).get('/api/clients');

      response.status.should.equal(200);
      response.body.should.have.lengthOf(4);
    });

    it('Should get a client by id', async () => {
      const response = await chai.request(app).get(`/api/clients/${client.id}`);

      response.status.should.equal(200);
      response.body.id.should.equal(client.id);
      response.body.firstName.should.equal(client.firstName);
      response.body.lastName.should.equal(client.lastName);
      response.body.email.should.equal(client.email);
    });

    it('Should update a client', async () => {
      const response = await chai.request(app).put(`/api/clients/${client.id}`).send(clientUpdated);

      response.status.should.equal(204);
    });

    it('Should delete a client', async () => {
      const response = await chai.request(app).del(`/api/clients/${client.id}`);

      response.status.should.equal(204);
    });
  });
};
