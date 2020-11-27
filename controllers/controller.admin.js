const patientModel = require('../models/Patient');
const doctorModel = require('../models/Doctor');

module.exports.index = (req, res) => res.render("admins/adminHome");

module.exports.patientList = async (req, res) => {
    var patientList = await patientModel.getAllPatient();
    res.render("admins/patientList", {
        patients: patientList
    })
}


module.exports.doctorList = async (req, res) => {
    var doctorList = await doctorModel.getAllDoctor();
    res.render("admins/doctorList", {
        doctors: doctorList
    });
};


module.exports.delete = function (req, res) {
    connection.query("DELETE FROM PATIENT WHERE ID = ?", [req.params.id], function (error, results, fields) {
        ;
        res.redirect("/admin/patient-list");
    });
}

module.exports.insert = function (req, res) {
    connection.query("INSERT INTO PATIENT(NAME, GENDER, DOB, PHONE) VALUES (?, ?, ?, ?)", [req.body.name, req.body.gender, req.body.dob, req.body.phone], function (error, results, fields) {
        res.redirect("/admin/patient-list");
    });

}

module.exports.update = function (req, res) {
    var patient = {};
    connection.query("SELECT * FROM PATIENT WHERE ID = ?", [req.params.id], function (error, results, fields) {
        patient.name = results[0].NAME,
            patient.gender = results[0].GENDER,
            patient.dob = results[0].DOB,
            patient.phone = results[0].PHONE
    })
    var name = req.body.name != null ? req.body.name : patient.name;
    var gender = req.body.gender != null ? req.body.gender : patient.gender
    var dob = req.body.dob != null ? req.body.dob : patient.dob
    var phone = req.body.phone != null ? req.body.phone : patient.phone
    connection.query("UPDATE PATIENT SET NAME=?, GENDER=?, DOB=?, PHONE=? WHERE ID=?", [name, gender, dob, phone, req.params.id], function (error, results, fields) {
        res.redirect("/admin/patient-list");
    });
}