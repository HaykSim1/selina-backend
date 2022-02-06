const express = require('express');

const authorize = require('../middlewares/authorize');

const controller = require('../controllers/locations');

const router = express.Router();

router.get('/:filter(sort)?', authorize, controller.get);
router.post('/', authorize, controller.create);

module.exports = router;