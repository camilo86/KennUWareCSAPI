const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  firstName: { type: mongoose.Schema.Types.String, required: true },
  lastName: { type: mongoose.Schema.Types.String, required: true },
  email: { type: mongoose.Schema.Types.String, required: true },
  password: { type: mongoose.Schema.Types.String, required: true },
});

agentSchema.methods.toJSON = function() {
  return {
    id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    password: this.password
  };
};

module.exports = mongoose.model('Agent', agentSchema);
