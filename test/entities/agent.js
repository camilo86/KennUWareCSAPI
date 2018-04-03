const agentSeed = require('./../../seeds/agent');

module.exports = ({ chai, app }) => {
  before(async () => {
    await agentSeed();
  });

  describe('Agents', () => {
    const agent = {
      firstName: 'Joseph',
      lastName: 'L',
      email: 'jl@gmail.com',
      password: 'examplepassword'
    };

    const agentUpdated = {
      firstName: 'Camilo',
      lastName: 'G',
      email: 'camilog@gmail.com'
    };

    it('Should create an agent', async () => {
      const response = await chai.request(app).post('/api/agents').send(agent);

      response.status.should.equal(201);
      response.body.should.have.property('id');
      response.body.firstName.should.equal(agent.firstName);
      response.body.lastName.should.equal(agent.lastName);
      response.body.email.should.equal(agent.email);
      agent.id = response.body.id;
    });

    it('Should get all agents', async () => {
      const response = await chai.request(app).get('/api/agents');

      response.status.should.equal(200);
      response.body.should.have.lengthOf(4);
    });

    it('Should get an agent by id', async () => {
      const response = await chai.request(app).get(`/api/agents/${agent.id}`);

      response.body.id.should.equal(agent.id);
      response.body.firstName.should.equal(agent.firstName);
      response.body.lastName.should.equal(agent.lastName);
      response.body.email.should.equal(agent.email);
    });

    it('Should update agent', async () => {
      const response = await chai.request(app).put(`/api/agents/${agent.id}`).send(agentUpdated);

      response.status.should.equal(204);
    });

    it('Should delete an agent', async () => {
      const response = await chai.request(app).del(`/api/agents/${agent.id}`);

      response.status.should.equal(204);
    });
  });
};
