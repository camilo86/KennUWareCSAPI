module.exports = ({ chai, app }) => {
  describe('Clients', () => {
    const client = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      password: 'somepasswordhere'
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
      response.body.should.have.lengthOf(1);
    });
  });
};
