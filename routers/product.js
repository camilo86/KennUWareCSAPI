const router = require('express').Router();
const productController = require('./../controllers/product');

router.post('/', productController.post);

module.exports = router;
