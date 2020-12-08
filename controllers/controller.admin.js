const patientModel = require('../models/Patient');
const doctorModel = require('../models/Doctor');

module.exports = {

    index(req, res) { 
        res.render("pages/admin/home")
    },

    async doctorList(req, res) {
        var page = parseInt(req.query.page) || 1;
        var perPage = 10;
        var doctorList = await doctorModel.getAllDoctor();
        res.render("pages/admin/doctors", {
            page: Math.round(doctorList.length / 10),
            doctors: doctorList.slice((page - 1) * perPage, page * perPage)
        });
    },

    async doctorPagination(req, res) {
        var page = parseInt(req.query.page) || 1;
        var perPage = 10;
        var doctorList = await doctorModel.getAllDoctor();
        res.render("components/doctorList", {
            doctors: doctorList.slice((page - 1) * perPage, page * perPage)
        });
    },

    async patientList(req, res) {
        var page = parseInt(req.query.page) || 1;
        var perPage = 10;
        var patientList = await patientModel.getAllPatient();
        res.render("pages/admin/patients", {
            page: Math.round(patientList.length / 10),
            patients: patientList.slice((page - 1) * perPage, page * perPage)
        });
    },

    async patientPagination(req, res) {
        var page = parseInt(req.query.page) || 1;
        var perPage = 10;
        var patientList = await patientModel.getAllPatient();
        res.render("components/patientList", {
            patients: patientList.slice((page - 1) * perPage, page * perPage)
        });
    },
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
    res.render("components/patientList", {
        patients: patientList
    });
};

module.exports.updatePatient = async (req, res) => {
    await patientModel.updatePatientByID(req.params.id, req.body.name, req.body.gender, req.body.dob, req.body.phone);
    var patientList = await patientModel.getAllPatient();
    res.render("components/patientList", {
        patients: patientList
    });
};

// admin's doctor page

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
    res.render("components/doctorList", {
        doctors: doctorList
    });
};

module.exports.updateDoctor = async (req, res) => {
    await doctorModel.updateDoctorByID(req.params.id, req.body.name, req.body.gender, req.body.dob, req.body.phone);
    var doctorList = await doctorModel.getAllDoctor();
    res.render("components/doctorList", {
        doctors: doctorList
    });
};