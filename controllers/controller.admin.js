const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Request = require("../models/Request");

module.exports = {
  async index(req, res) {
    var requestList = await Request.getUnfinishedRequests();
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
    var patientList = await Patient.getAll();
    res.render("pages/admin/patients", {
      at: page,
      page: Math.round(patientList.length / 10),
      patients: patientList.slice((page - 1) * perPage, page * perPage),
    });
  },

  async patientPagination(req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;
    var patientList = await Patient.getAll();
    res.render("components/adminPatientList", {
      at: page,
      page: Math.round(patientList.length / 10),
      patients: patientList.slice((page - 1) * perPage, page * perPage),
    });
  },

  async searchPatient(req, res) {
    var patientList = await Patient.search(
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
    await Patient.delete(req.params.id);
    var patientList = await Patient.getAll();
    res.render("components/adminPatientList", {
      at: page,
      page: Math.round(patientList.length / 10),
      patients: patientList.slice((page - 1) * perPage, page * perPage),
    });
  },

  async insert(req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;
    await Patient.insert(
      req.body.name,
      req.body.gender,
      req.body.dob,
      req.body.phone
    );
    var patientList = await Patient.getAll();
    res.render("components/adminPatientList", {
      at: page,
      page: Math.round(patientList.length / 10),
      patients: patientList.slice((page - 1) * perPage, page * perPage),
    });
  },

  async updatePatient(req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;
    await Patient.update(
      req.params.id,
      req.body.name,
      req.body.gender,
      req.body.dob,
      req.body.phone
    );
    var patientList = await Patient.getAll();
    res.render("components/adminPatientList", {
      at: page,
      page: Math.round(patientList.length / 10),
      patients: patientList.slice((page - 1) * perPage, page * perPage),
    });
  },

  async searchDoctor(req, res) {
    var doctorList = await Doctor.search(
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
    await Doctor.update(
      req.params.id,
      req.body.name,
      req.body.gender,
      req.body.dob,
      req.body.phone
    );
    var doctorList = await Doctor.getAll();
    res.render("components/adminDoctorList", {
      at: page,
      page: Math.round(doctorList.length / 10),
      doctors: doctorList.slice((page - 1) * perPage, page * perPage),
    });
  },

  async deleteDoctor(req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;
    await Doctor.delete(req.params.id);
    var doctorList = await Doctor.getAll();
    res.render("components/adminDoctorList", {
      at: page,
      page: Math.round(doctorList.length / 10),
      doctors: doctorList.slice((page - 1) * perPage, page * perPage),
    });
  },

  async insert(req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;
    await Doctor.insert(
      req.body.name,
      req.body.gender,
      req.body.dob,
      req.body.phone
    );
    var doctorList = await Doctor.getAll();
    res.render("components/adminDoctorList", {
      at: page,
      page: Math.round(doctorList.length / 10),
      doctors: doctorList.slice((page - 1) * perPage, page * perPage),
    });
  },

  async doctorList(req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;
    var doctorList = await Doctor.getAll();
    res.render("pages/admin/doctors", {
      at: page,
      page: Math.round(doctorList.length / 10),
      doctors: doctorList.slice((page - 1) * perPage, page * perPage),
    });
  },

  async doctorPagination(req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;
    var doctorList = await Doctor.getAll();
    res.render("components/adminDoctorList", {
      at: page,
      page: Math.round(doctorList.length / 10),
      doctors: doctorList.slice((page - 1) * perPage, page * perPage),
    });
  },

  async getRequest(req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;
    var requestList = await Request.getAll();
    res.render("pages/admin/requests", {
      at: page,
      page: Math.round(requestList.length / 10),
      requests: requestList.slice((page - 1) * perPage, page * perPage),
    });
  },

  async requestPagination(req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;
    var requestList = await Request.getAll();
    res.render("components/adminRequestList", {
      at: page,
      page: Math.round(requestList.length / 10),
      requests: requestList.slice((page - 1) * perPage, page * perPage),
    });
  },

  async doneRequest(req, res) {
    await Request.update(req.params.id);
    var page = parseInt(req.query.page) || 1;
    var perPage = 10;
    var requestList = await Request.getAll();
    res.render("components/adminRequestList", {
      at: page,
      page: Math.round(requestList.length / 10),
      requests: requestList.slice((page - 1) * perPage, page * perPage),
    });
  },
};
