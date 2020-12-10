const patientModel = require('../models/Patient');
const doctorModel = require('../models/Doctor');
const requestModel = require('../models/Request');

module.exports = {

    async index(req, res) { 
        var requestList = await requestModel.getUnfinishdeRequest();
        res.render("pages/admin/home", {
            reqNos: requestList
        })
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
        res.render("components/adminDoctorList", {
            page: Math.round(doctorList.length / 10),
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
        res.render("components/adminPatientList", {
            patients: patientList.slice((page - 1) * perPage, page * perPage)
        });
    },

    async searchDoctor(req, res) {
        var page = parseInt(req.query.page) || 1;
        var perPage = 10;
        var doctorList = await doctorModel.searchDoctor(req.body.name, req.body.gender, req.body.dob, req.body.phone);
        res.render("components/adminDoctorList", {
            page: Math.round(doctorList.length / 10),
            doctors: doctorList.slice((page - 1) * perPage, page * perPage)
        });
    },

    async searchPatient(req, res) {
        var page = parseInt(req.query.page) || 1;
        var perPage = 10;
        var patientList = await patientModel.searchPatient(req.body.name, req.body.gender, req.body.dob, req.body.phone);
        res.render("components/adminPatientList", {
            page: Math.round(patientList.length / 10),
            patients: patientList.slice((page - 1) * perPage, page * perPage)
        });
    }
};


module.exports.deletePatient = async (req, res) => {
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;
    await patientModel.deletePatientByID(req.params.id);
    var patientList = await patientModel.getAllPatient();
    res.render("components/adminPatientList", {
        page: Math.round(patientList.length / 10),
        patients: patientList.slice((page - 1) * perPage, page * perPage)
    });
};

module.exports.insertPatient = async (req, res) => {
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;
    await patientModel.insertPatient(req.body.name, req.body.gender, req.body.dob, req.body.phone);
    var patientList = await patientModel.getAllPatient();
    res.render("components/adminPatientList", {
        page: Math.round(patientList.length / 10),
        patients: patientList.slice((page - 1) * perPage, page * perPage)
    });
};

module.exports.updatePatient = async (req, res) => {
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;
    await patientModel.updatePatientByID(req.params.id, req.body.name, req.body.gender, req.body.dob, req.body.phone);
    var patientList = await patientModel.getAllPatient();
    res.render("components/adminPatientList", {
        page: Math.round(patientList.length / 10),
        patients: patientList.slice((page - 1) * perPage, page * perPage)
    });
};
module.exports.updateDoctor = async (req, res) => {
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;
    await doctorModel.updateDoctorByID(req.params.id, req.body.name, req.body.gender, req.body.dob, req.body.phone);
    var doctorList = await doctorModel.getAllDoctor();
    res.render("components/adminDoctorList", {
        page: Math.round(doctorList.length / 10),
        doctors: doctorList.slice((page - 1) * perPage, page * perPage)
    });
};
// admin's doctor page

module.exports.deleteDoctor = async (req, res) => {
    var page = parseInt(req.query.page) || 1;
        var perPage = 10;
    await doctorModel.deleteDoctorByID(req.params.id);
    var doctorList = await doctorModel.getAllDoctor();
    res.render("components/adminDoctorList", {
        page: Math.round(doctorList.length / 10),
        doctors: doctorList.slice((page - 1) * perPage, page * perPage)
    });
};

module.exports.insertDoctor = async (req, res) => {
    var page = parseInt(req.query.page) || 1;
        var perPage = 10;
    await doctorModel.insertDoctor(req.body.name, req.body.gender, req.body.dob, req.body.phone);
    var doctorList = await doctorModel.getAllDoctor();
    res.render("components/adminDoctorList", {
        page: Math.round(doctorList.length / 10),
        doctors: doctorList.slice((page - 1) * perPage, page * perPage)
    });
};



module.exports.getRequest = async (req, res) => {
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;
    var requestList = await requestModel.getAllRequest();
    res.render("pages/admin/requests", {
        page: Math.round(requestList.length / 10),
        requests: requestList.slice((page - 1) * perPage, page * perPage)
    });
};

module.exports.requestPagination = async (req, res) => {
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;
    var requestList = await requestModel.getAllRequest();
    res.render("components/adminRequestList", {
        requests: requestList.slice((page - 1) * perPage, page * perPage)
    });
}

module.exports.doneRequest = async (req, res) => {
    await requestModel.updateRequest(req.params.id);
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;
    var requestList = await requestModel.getAllRequest();
    res.render("components/adminRequestList", {
        requests: requestList.slice((page - 1) * perPage, page * perPage)
    });
}