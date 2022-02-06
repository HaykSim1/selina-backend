const express = require('express');

const authorize = require('../middlewares/authorize');

const controller = require('../controllers/rooms');

const router = express.Router();

router.get('/:locationId', authorize, controller.get);
router.post('/', authorize, controller.create);

module.exports = router;