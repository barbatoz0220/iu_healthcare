const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.patient');

router.get('/', controller.index);
router.get('/:id', controller.menu);

module.exports = router;