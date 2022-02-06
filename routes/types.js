const express = require('express');

const authorize = require('../middlewares/authorize');

const controller = require('../controllers/types');

const router = express.Router();

router.get('/', authorize, controller.get);
router.post('/', authorize, controller.create);

module.exports = router;