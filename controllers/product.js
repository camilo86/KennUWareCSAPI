const Product = require('./../models/product');

exports.post = async (req, res, next) => {
  try {
    const { name, description, serialNumber } = req.body;
    const product = await Product.create({ name, description, serialNumber });

    return res.status(201).json(product);
  } catch(e) {
    console.log(e);
    return res.status(400).json({ message: 'Could not create product' });
  }
};
