const errors = require('http-errors');
const Product = require('./../models/product');

exports.post = async (req, res, next) => {
  try {
    const { name, description, serialNumber } = req.body;
    const product = await Product.create({ name, description, serialNumber });

    return res.status(201).json(product);
  } catch(e) {
    return next(new errors.BadRequest('Could not create product'));
  }
};

exports.getAll = (req, res) => {
  return res.json(req.products);
};
