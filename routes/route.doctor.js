// import node package
const express = require('express');

// import controller
const controller = require('../controllers/controller.doctor');

// set up router
const router = express.Router();

// GET
router.get('/', controller.index);
router.get('/patients', controller.getPatients);
router.post('/handle-request', controller.handleRequest);

module.exports = router;