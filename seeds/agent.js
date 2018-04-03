const Agent = require('./../models/agent');

const agents = [
  {
      "firstName": 'Alex',
      "lastName": 'B',
      "email": 'alexb@gmail.com',
      "password": 'somestuffhere'
  },
  {
    "firstName": 'Dan',
    "lastName": 'Danny',
    "email": 'dann@man.com',
    "password": 'passwordhere'
  },
  {
    "firstName": 'Michael',
    "lastName": 'B',
    "email": 'michaelb@yahoo.com',
    "password": 'somestuffman'
  }
];


module.exports = async () => {
  try {
    for(var i = 0; i < agents.length; i++) {
      await Agent.create(agents[i]);
    }
  } catch (e) {
    console.log(e);
    console.error('Could not seed agents table');
    process.exit(1);
  }
}
