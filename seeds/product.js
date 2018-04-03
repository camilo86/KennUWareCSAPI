const Product = require('./../models/product');

const products = [
  {
    "name": "Model t watch",
	  "description": "Wow very nice!",
    "serialNumber": "asdf50l"
  },
  {
    "name": "Model y watch",
	  "description": "Top watch",
    "serialNumber": "bj5al30"
  },
  {
    "name": "Model z watch",
	  "description": "buy it now!",
    "serialNumber": "asj4lca"
  }
];


module.exports = async () => {
  try {
    for(var i = 0; i < products.length; i++) {
      await Product.create(products[i]);
    }
  } catch (e) {
    console.error('Could not seed product table');
    process.exit(1);
  }
}
