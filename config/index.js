const mongoose = require('mongoose');

module.exports = (() => {
  mongoose.connect(process.env.DB);
  mongoose.connection.on('error', (error) => {
    console.error('Could not connect to mongo database');
    process.exit(1);
  });

  return mongoose;
})();
