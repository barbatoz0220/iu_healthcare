var connection = require('../models/dbconnection');

module.exports.index = function(req, res) {
    connection.query("SELECT * FROM PATIENT WHERE ID = ?", [req.session.userid], function(error, patients, field) {
        connection.query("SELECT D.NAME, D.GENDER, D.DOB, D.PHONE FROM PATIENT P, DOCTOR D WHERE P.ID = ? AND P.DOCTOR_ID = D.ID", [req.session.userid], function(error, doctors, field) {
            connection.query("SELECT V.ID FROM PATIENT P, VISIT V WHERE P.ID = ? AND V.PATIENT_ID = P.ID", [req.session.userid], function(error, visits, field) {
                res.render('patients/patientHome', {
                    name: req.session.username,
                    patients: patients,
                    doctors: doctors,
                    visits: visits
                });
            })
        })
    });
};
