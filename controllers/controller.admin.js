const patientModel = require('../models/Patient');
const doctorModel = require('../models/Doctor');


module.exports.index = (req, res) => res.render("admins/adminHome");

// admin's patient page
module.exports.patientList = async (req, res) => {
    var patientList = await patientModel.getAllPatient();
    res.render("admins/patientList", {
        patients: patientList
    });
};

module.exports.deletePatient = async (req, res) => {
    await patientModel.deletePatientByID(req.params.id);
    var patientList = await patientModel.getAllPatient();
    res.render("components/patientList", {
        patients: patientList
    });
};

module.exports.insertPatient = async (req, res) => {
    await patientModel.insertPatient(req.body.name, req.body.gender, req.body.dob, req.body.phone);
    var patientList = await patientModel.getAllPatient();
    res.render("admins/patientList", {
        patients: patientList
    });
};

module.exports.updatePatient = async (req, res) => {
    await patientModel.updatePatientByID(req.params.id, req.body.name, req.body.gender, req.body.dob, req.body.phone);
    var patientList = await patientModel.getAllPatient();
    res.render("admins/patientList", {
        patients: patientList
    });
};

// admin's doctor page
module.exports.doctorList = async (req, res) => {
    var doctorList = await doctorModel.getAllDoctor();
    res.render("admins/doctorList", {
        doctors: doctorList
    });
};

module.exports.deleteDoctor = async (req, res) => {
    await doctorModel.deleteDoctorByID(req.params.id);
    var doctorList = await doctorModel.getAllDoctor();
    res.render("components/doctorList", {
        doctors: doctorList
    });
};

module.exports.insertDoctor = async (req, res) => {
    await doctorModel.insertDoctor(req.body.name, req.body.gender, req.body.dob, req.body.phone);
    var doctorList = await doctorModel.getAllDoctor();
    res.render("admins/doctorList", {
        doctors: doctorList
    });
};

module.exports.updateDoctor = async (req, res) => {
    await doctorModel.updateDoctorByID(req.params.id, req.body.name, req.body.gender, req.body.dob, req.body.phone);
    var doctorList = await doctorModel.getAllDoctor();
    res.render("admins/doctorList", {
        doctors: doctorList
    });
};