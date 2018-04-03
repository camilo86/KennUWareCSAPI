const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const agentSchema = new mongoose.Schema({
  firstName: { type: mongoose.Schema.Types.String, required: true },
  lastName: { type: mongoose.Schema.Types.String, required: true },
  email: { type: mongoose.Schema.Types.String, required: true },
  password: { type: mongoose.Schema.Types.String, required: true },
});

agentSchema.pre('save', function(next) {
  if(!this.isModified('password')) next();

  const self = this;
  bcrypt.hash(self.password, 10, function(error, hash) {
    if (error) return next(new Error('Could not safetly store agent'));

    self.password = hash;
    next();
  });
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
