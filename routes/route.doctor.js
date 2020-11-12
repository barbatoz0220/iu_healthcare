// import node package
const express = require('express');

// import controller
const controller = require('../controllers/controller.doctor');

// set up router
const router = express.Router();

// GET
router.get('/', controller.index);  

module.exports = router;