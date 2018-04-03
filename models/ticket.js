const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: { type: mongoose.Schema.Types.String, required: true },
  description: { type: mongoose.Schema.Types.String, required: false },
  serialNumber: { type: mongoose.Schema.Types.String, required: true },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  status: { type: mongoose.Schema.Types.String, default: 'opened' },
  priority: { type: mongoose.Schema.Types.String, default: 'mild' },
  opened: { type: mongoose.Schema.Types.Date, required: true },
  closed: { type: mongoose.Schema.Types.Date, required: false },
});


ticketSchema.methods.toJSON = function() {
  return {
    id: this._id,
    title: this.title,
    description: this.description,
    serialNumber: this.serialNumber,
    agent: this.agent,
    client: this.client,
    status: this.status,
    priority: this.priority,
    opened: this.opened,
    closed: this.closed
  };
};

module.exports = mongoose.model('Ticket', ticketSchema);
