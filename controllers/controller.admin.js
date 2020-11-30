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

module.exports.delete = async (req, res) => {
    await patientModel.deletePatientByID(req.params.id);
    var patientList = await patientModel.getAllPatient();
    res.render("admins/patientList", {
        patients: patientList
    })
}

module.exports.insert = async (req, res) => {
    await patientModel.insertPatient(req.body.name, req.body.gender, req.body.dob, req.body.phone);
    var patientList = await patientModel.getAllPatient();
    res.render("admins/patientList", {
        patients: patientList
    })
}

module.exports.update = async (req, res) => {
    await patientModel.updatePatientByID(req.params.id, req.body.name, req.body.gender, req.body.dob, req.body.phone);
    var patientList = await patientModel.getAllPatient();
    res.render("admins/patientList", {
        patients: patientList
    })
}