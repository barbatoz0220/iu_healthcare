const connection = require('../models/dbconnection');

module.exports.checkPatientLoggedin = function(req, res, next) {
    if(req.session.patientLoggedin == false) {
        res.redirect('/');
        return;
    }
    next();
}

module.exports.checkDoctorLoggedin = function(req, res, next) {
    if(!req.session.doctorLoggedin) {
        res.redirect('/');
        return;
    }
    next();
}