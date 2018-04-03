const router = require('express').Router();
const clientController = require('./../controllers/client');

router.post('/', clientController.post);

module.exports = router;
