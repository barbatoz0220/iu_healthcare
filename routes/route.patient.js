// import node package
const express = require('express');

// import controller
const controller = require('../controllers/controller.patient');

// set up router
const router = express.Router();

// GET
router.get('/', controller.index);
router.get('/doctor', controller.getDoctor);
router.get('/visit', controller.getVisit);
router.post('/handle-request', controller.handleRequest);
router.get('/visit-detail/:id', controller.getVisitDetail);

module.exports = router;