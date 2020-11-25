var connection = require('../models/dbconnection');

module.exports.index = function(req, res) {
    res.render('patients/patientHome', {
        name: req.session.username
    });
};

module.exports.information = function(req, res) {
    connection.query("SELECT * FROM PATIENT WHERE ID = ?", [req.session.userid], function(error, results, fields) {
        res.render("patients/information", {
            patients: results
        });
    })
}

module.exports.doctor = function(req, res) {
    connection.query("SELECT D.NAME, D.GENDER, D.DOB, D.PHONE FROM PATIENT P, DOCTOR D WHERE P.ID = ? AND P.DOCTOR_ID = D.ID", [req.session.userid], function(error, results, fields) {
        res.render("patients/doctor", {
            doctors: results
        });
    })
}

module.exports.visit = function(req, res) {
    connection.query("SELECT V.ID FROM PATIENT P, VISIT V WHERE P.ID = ? AND V.PATIENT_ID = P.ID", [req.session.userid], function(error, results, fields) {
        res.render("patients/visit", {
            visits: results
        });
    })
}
