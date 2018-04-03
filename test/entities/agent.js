module.exports = ({ chai, app }) => {
  describe('Agents', () => {
    const agent = {
      firstName: 'Joseph',
      lastName: 'L',
      email: 'jl@gmail.com',
      password: 'examplepassword'
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
      response.body.should.have.lengthOf(1);
    });
  });
};
