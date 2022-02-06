const express = require('express');

const authorize = require('../middlewares/authorize');

const controller = require('../controllers/booking');

const router = express.Router();

router.post('/:locationId', authorize, controller.get);
router.post('/', authorize, controller.create);

module.exports = router;