// import node package
const express = require('express');

// import controller
const controller = require('../controllers/controller.admin');

// set up router
const router = express.Router();

// GET
router.get('/', controller.index);
router.get('/patient-list', controller.patientList);
router.get('/doctor-list', controller.doctorList);

router.get('/doctor-list/pagination', controller.doctorPagination);
router.get('/patient-list/pagination', controller.patientPagination);

router.get('/patient-list/delete/:id', controller.deletePatient);
router.post('/patient-list/insert', controller.insert);
router.post('/patient-list/update/:id', controller.updatePatient);
router.post('/patient-list/search', controller.search);

router.get('/doctor-list/delete/:id', controller.deleteDoctor);
router.post('/doctor-list/insert', controller.insert);
router.post('/doctor-list/update/:id', controller.updateDoctor);
router.post('/doctor-list/search', controller.search);

router.get('/request-list', controller.getRequest);
router.get('/request-list/pagination', controller.requestPagination);
router.get('/request-list/done/:id', controller.doneRequest);

module.exports = router;