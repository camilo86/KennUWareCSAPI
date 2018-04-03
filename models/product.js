const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: mongoose.Schema.Types.String, required: true },
  description: { type: mongoose.Schema.Types.String, required: false },
  serialNumber: { type: mongoose.Schema.Types.String, required: true }
});

productSchema.methods.toJSON = function() {
  return {
    id: this._id,
    name: this.name,
    description: this.description,
    serialNumber: this.serialNumber,
  }
}

module.exports =  mongoose.model('Product', productSchema);
