// import node package
const express = require('express');

// import controller
const controller = require('../controllers/controller.login');
const logoutController = require('../controllers/logout');

// set up router
const router = express.Router();

// GET
router.get('/', controller.index);

router.get('/emergency', controller.emergency);

router.get('/about', controller.about);

router.get('/contacts', controller.contacts);

router.get('/logo', controller.logo);

router.get('/emergency', controller.emergency);

router.get('/logout', logoutController);
// POST
router.post('/auth', controller.login);

module.exports = router;