const connection = require('../models/dbconnection');

module.exports.index = function(req, res) {
    res.render("admins/adminHome");
}

module.exports.patientList = function(req, res) {
    connection.query("SELECT * FROM PATIENT", function(error, results, fields) {
        res.render("admins/patientList", {
            patients: results,
        })
    })
}

module.exports.doctorList = function(req, res) {
    connection.query("SELECT * FROM DOCTOR", function(error, results, fields) {
        res.render("admins/doctorList", {
            doctors: results
        })
    })
}

module.exports.delete = function(req, res) {
    connection.query("DELETE FROM PATIENT WHERE ID = ?", [req.params.id]);
    res.redirect("/admin/patient-list");
}

module.exports.insert = function(req, res) {
    connection.query("INSERT INTO PATIENT(NAME, GENDER, DOB, PHONE) VALUES (?, ?, ?, ?)", [req.body.name, req.body.gender, req.body.dob, req.body.phone]);
    res.redirect("/admin/patient-list");
}

module.exports.update = function(req, res) {
    var patient = {};
    connection.query("SELECT * FROM PATIENT WHERE ID = ?", [req.params.id], function(error, results, fields) {
        patient.name = results[0].NAME,
        patient.gender = results[0].GENDER,
        patient.dob = results[0].DOB,
        patient.phone = results[0].PHONE
    })
    var name = req.body.name != null ? req.body.name : patient.name;
    var gender = req.body.gender != null ? req.body.gender : patient.gender
    var dob = req.body.dob != null ? req.body.dob : patient.dob
    var phone = req.body.phone != null ? req.body.phone : patient.phone
    connection.query("UPDATE PATIENT SET NAME=?, GENDER=?, DOB=?, PHONE=? WHERE ID=?", [name, gender, dob, phone, req.params.id]);
    res.redirect("/admin/patient-list");
}