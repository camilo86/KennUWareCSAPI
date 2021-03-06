module.exports = ({ chai, app }) => {
  describe('Tickets', () => {
    const ticket = {
      title: 'My device wont turn on',
      description: 'What can I do man, my device wont turn on',
      serialNumber: 'bj5al30'
    };

    const ticketUpdated = {
      title: 'My device burned up',
      description: 'Do I gotta buy a new one?',
      agentEmail: 'dann@man.com',
      clientEmail: 'milo@man.com',
      status: 'closed',
      priority: 'spicy',
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
      response.body.should.have.property('opened');
      response.body.title.should.equal(ticket.title);
      response.body.priority.should.equal('mild');
      response.body.description.should.equal(ticket.description);
      response.body.product.serialNumber.should.equal(ticket.serialNumber);
      ticket.id = response.body.id;
    });

    it('Should get all tickets', async () => {
      const response = await chai.request(app).get('/api/tickets');

      response.status.should.equal(200);
      response.body.should.have.lengthOf(1);
    });

    it('Should get a ticket', async () => {
      const response = await chai.request(app).get(`/api/tickets/${ticket.id}`);

      response.status.should.equal(200);
      response.body.should.have.property('id');
      response.body.title.should.equal(ticket.title);
      response.body.description.should.equal(ticket.description);
      response.body.product.serialNumber.should.equal(ticket.serialNumber);
      response.body.client.firstName.should.equal(client.firstName);
    });

    it('Should update a ticket', async () => {
      const response = await chai.request(app).put(`/api/tickets/${ticket.id}`).send(ticketUpdated);

      response.status.should.equal(204);
    });

    it('Should delete ticket', async () => {
      const response = await chai.request(app).del(`/api/tickets/${ticket.id}`);

      response.status.should.equal(204);
    });
  });
};
