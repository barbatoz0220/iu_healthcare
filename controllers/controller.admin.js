const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Request = require("../models/Request");

module.exports = {
  async index(req, res) {
    var requestList = await Request.getUnfinishdeRequest();
    if (req.session.count == 1) {
      res.render("pages/admin/home", {
        reqNos: requestList,
      });
    } else {
      res.render("pages/admin/home");
    }
  },

  async patientList(req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;
    var patientList = await Patient.getAllPatient();
    res.render("pages/admin/patients", {
      at: page,
      page: Math.round(patientList.length / 10),
      patients: patientList.slice((page - 1) * perPage, page * perPage),
    });
  },

  async patientPagination(req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;
    var patientList = await Patient.getAllPatient();
    res.render("components/adminPatientList", {
      at: page,
      page: Math.round(patientList.length / 10),
      patients: patientList.slice((page - 1) * perPage, page * perPage),
    });
  },

  async searchPatient(req, res) {
    var patientList = await Patient.searchPatient(
      req.body.name,
      req.body.gender,
      req.body.dob,
      req.body.phone
    );
    res.render("components/adminPatientList", {
      result: "" + patientList.length + "",
      back: "1",
      patients: patientList,
    });
  },

  async deletePatient(req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;
    await Patient.deletePatientByID(req.params.id);
    var patientList = await Patient.getAllPatient();
    res.render("components/adminPatientList", {
      at: page,
      page: Math.round(patientList.length / 10),
      patients: patientList.slice((page - 1) * perPage, page * perPage),
    });
  },

  async insertPatient(req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;
    await Patient.insertPatient(
      req.body.name,
      req.body.gender,
      req.body.dob,
      req.body.phone
    );
    var patientList = await Patient.getAllPatient();
    res.render("components/adminPatientList", {
      at: page,
      page: Math.round(patientList.length / 10),
      patients: patientList.slice((page - 1) * perPage, page * perPage),
    });
  },

  async updatePatient(req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;
    await Patient.updatePatientByID(
      req.params.id,
      req.body.name,
      req.body.gender,
      req.body.dob,
      req.body.phone
    );
    var patientList = await Patient.getAllPatient();
    res.render("components/adminPatientList", {
      at: page,
      page: Math.round(patientList.length / 10),
      patients: patientList.slice((page - 1) * perPage, page * perPage),
    });
  },

  async searchDoctor(req, res) {
    var doctorList = await Doctor.searchDoctor(
      req.body.name,
      req.body.gender,
      req.body.dob,
      req.body.phone
    );
    res.render("components/adminDoctorList", {
      result: "" + doctorList.length + "",
      back: "1",
      doctors: doctorList,
    });
  },

  async updateDoctor(req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;
    await Doctor.updateDoctorByID(
      req.params.id,
      req.body.name,
      req.body.gender,
      req.body.dob,
      req.body.phone
    );
    var doctorList = await Doctor.getAllDoctor();
    res.render("components/adminDoctorList", {
      at: page,
      page: Math.round(doctorList.length / 10),
      doctors: doctorList.slice((page - 1) * perPage, page * perPage),
    });
  },

  async deleteDoctor(req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;
    await Doctor.deleteDoctorByID(req.params.id);
    var doctorList = await Doctor.getAllDoctor();
    res.render("components/adminDoctorList", {
      at: page,
      page: Math.round(doctorList.length / 10),
      doctors: doctorList.slice((page - 1) * perPage, page * perPage),
    });
  },

  async insertDoctor(req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;
    await Doctor.insertDoctor(
      req.body.name,
      req.body.gender,
      req.body.dob,
      req.body.phone
    );
    var doctorList = await Doctor.getAllDoctor();
    res.render("components/adminDoctorList", {
      at: page,
      page: Math.round(doctorList.length / 10),
      doctors: doctorList.slice((page - 1) * perPage, page * perPage),
    });
  },

  async doctorList(req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;
    var doctorList = await Doctor.getAllDoctor();
    res.render("pages/admin/doctors", {
      at: page,
      page: Math.round(doctorList.length / 10),
      doctors: doctorList.slice((page - 1) * perPage, page * perPage),
    });
  },

  async doctorPagination(req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;
    var doctorList = await Doctor.getAllDoctor();
    res.render("components/adminDoctorList", {
      at: page,
      page: Math.round(doctorList.length / 10),
      doctors: doctorList.slice((page - 1) * perPage, page * perPage),
    });
  },

  async getRequest(req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;
    var requestList = await Request.getAllRequest();
    res.render("pages/admin/requests", {
      page: Math.round(requestList.length / 10),
      requests: requestList.slice((page - 1) * perPage, page * perPage),
    });
  },

  async requestPagination(req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;
    var requestList = await Request.getAllRequest();
    res.render("components/adminRequestList", {
      page: Math.round(requestList.length / 10),
      requests: requestList.slice((page - 1) * perPage, page * perPage),
    });
  },

  async doneRequest(req, res) {
    await Request.updateRequest(req.params.id);
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;
    var requestList = await Request.getAllRequest();
    res.render("components/adminRequestList", {
      page: Math.round(requestList.length / 10),
      requests: requestList.slice((page - 1) * perPage, page * perPage),
    });
  },
};
