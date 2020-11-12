// import node package
const express = require('express');

// import controller
const controller = require('../controllers/controller.login');

// set up router
const router = express.Router();

// GET
router.get('/', controller.index);

// POST
router.post('/auth', controller.login);

router.get('/emergency', controller.emergency);


module.exports = router;