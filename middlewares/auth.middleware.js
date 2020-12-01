const connection = require('../models/dbconnection');

module.exports.checkPatientLoggedin = (req, res, next) => {
    if (!req.session.patientLoggedin) {
        res.redirect('/');
        return;
    }
    next();
}

module.exports.checkDoctorLoggedin = (req, res, next) => {
    if (!req.session.doctorLoggedin) {
        res.redirect('/');
        return;
    }
    next();
}