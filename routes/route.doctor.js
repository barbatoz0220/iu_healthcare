// import node package
const express = require('express');

// import controller
const controller = require('../controllers/controller.doctor');

// set up router
const router = express.Router();

// GET
router.get('/', controller.index);
router.get('/patients', controller.getPatients);
router.get('/patients/:id', controller.getPatientVisit);
router.post('/handle-request', controller.handleRequest);
router.get('/patients/visit-detail/:id', controller.getPatientVisitDetail);

module.exports = router;