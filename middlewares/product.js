const errors = require('http-errors');
const Product = require('./../models/product');

exports.getAllProducts = async (req, res, next) => {
  try {
    req.products = await Product.find(req.query);
    next();
  } catch (e) {
    return next(new errors.BadRequest('Could not get products'));
  }
};

exports.getByIdFromParams = async (req, res, next) => {
  try {
    req.product = await Product.findById(req.params.productId);
    next();
  } catch (e) {
    return next(new errors.BadRequest('Could not get product'));
  }
};
