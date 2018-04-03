const errors = require('http-errors');
const Product = require('./../models/product');

exports.getAllProducts = async (req, res, next) => {
  try {
    req.products = await Product.find({});
    next();
  } catch (e) {
    return next(new errors.BadRequest('Could not get products'));
  }
};
