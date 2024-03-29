const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Request = require("../models/Request");
const Visit = require("../models/Visit");

module.exports = {
  async index(req, res) {
    const patient = await Patient.getByID(req.session.userid);
    const doctor = await Doctor.getByPatient(req.session.userid);
    const visit = await Visit.getByPatient(req.session.userid);
    res.render("pages/patient/home", {
      name: req.session.username,
      patients: patient,
      doctors: doctor,
      visits: visit,
    });
  },

  async getDoctor(req, res) {
    const doctors = await Doctor.getByPatient(req.session.userid);
    res.render("components/patientDoctorInfor", {
      doctors: doctors,
    });
  },

  async getVisit(req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 5;
    const visits = await Visit.getByPatient(req.session.userid);
    res.render("components/patientVisitsInfor", {
      page: Math.round(visits.length / 5),
      visits: visits.slice((page - 1) * perPage, page * perPage),
    });
  },

  async handleRequest(req, res) {
    await Request.addPatientRequest(req.session.userid, req.body.content);
    res.status(200).json();
  },

  async getVisitDetail(req, res) {
    var diseases = await Visit.getDisease(req.params.id);
    var treatments = await Visit.getTreatment(req.params.id);
    var rooms = await Visit.getRoom(req.params.id);
    res.render("components/visitInformation", {
      diseases: diseases,
      treatments: treatments,
      rooms: rooms,
    });
  },
};
