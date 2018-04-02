const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: mongoose.Schema.Types.String, required: true },
  serial: { type: mongoose.Schema.Types.String, required: true }
});

module.exports = mongoose.Model('Product', productSchema);
