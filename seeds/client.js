const Client = require('./../models/client');

const clients = [
  {
      "firstName": 'David',
      "lastName": 'DD',
      "email": 'David@gmail.com',
      "password": 'davidfavpasswword'
  },
  {
    "firstName": 'Milo',
    "lastName": 'Man',
    "email": 'milo@man.com',
    "password": 'milopassword'
  },
  {
    "firstName": 'Doctor',
    "lastName": 'Who',
    "email": 'who@doctor.com',
    "password": 'passherehaha'
  }
];


module.exports = async () => {
  try {
    for(var i = 0; i < clients.length; i++) {
      await Client.create(clients[i]);
    }
  } catch (e) {
    console.error('Could not seed clients table');
    process.exit(1);
  }
}
