module.exports = ({ chai, app }) => {
  describe('Tickets', () => {
    const ticket = {
      title: 'My device wont turn on',
      description: 'What can I do man, my device wont turn on',
      serialNumber: 'asdf50l'
    };

    const client = {
      firstName: 'David',
      lastName: 'DD',
      email: 'David@gmail.com',
      password: 'davidfavpasswword'
    };

    before(async () => {
      const response = await chai.request(app).post('/api/clients/login').send(client);
      client.token = response.body.token;
    });

    it('Should create a ticket', async () => {
      const response = await chai.request(app).post('/api/tickets').send(ticket).set('x-access-token', client.token);

      response.status.should.equal(201);
      response.body.should.have.property('id');
      response.body.title.should.equal(ticket.title);
      response.body.description.should.equal(ticket.description);
      response.body.serialNumber.should.equal(ticket.serialNumber);
    });

    it('Should get all tickets', async () => {
      const response = await chai.request(app).get('/api/tickets');

      response.status.should.equal(200);
      response.body.should.have.lengthOf(1);
    });
  });
};
