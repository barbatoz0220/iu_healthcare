const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.login');

router.get('/', controller.index);
router.post('/auth', controller.login);

module.exports = router;