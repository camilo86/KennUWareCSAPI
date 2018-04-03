const router = require('express').Router();
const productController = require('./../controllers/product');
const productMiddleware = require('./../middlewares/product');

router.post('/', productController.post);

router.get('/',
  [productMiddleware.getAllProducts],
  productController.getAll);

router.get('/:productId',
  [productMiddleware.getByIdFromParams],
  productController.get);

module.exports = router;
