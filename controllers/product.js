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

exports.get = (req, res) => {
  return res.json(req.product);
}

exports.put = async (req, res, next) => {
  try {
    const { name, description, serialNumber } = req.body;

    req.product.name = name || req.product.name;
    req.product.description = description || req.product.description;
    req.product.serialNumber = serialNumber || req.product.serialNumber;

    await req.product.save();
    return res.sendStatus(204);

  } catch (e) {
    return next(new errors.BadRequest('Could not update product'));
  }
}

exports.delete = async (req, res, next) => {
  try {
    await req.product.remove();
    return res.sendStatus(204);

  } catch (e) {
    return next(new errors.BadRequest('Could not delete product'));
  }
};
