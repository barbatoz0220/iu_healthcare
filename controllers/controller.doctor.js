const Doctor = require("../models/Doctor");
const Request = require("../models/Request");
const Patient = require("../models/Patient");
const Visit = require("../models/Visit");

module.exports = {
  async index(req, res) {
    const doctor = await Doctor.getDoctorByID(req.session.userid);
    const patient = await Patient.getPatientsByDoctor(req.session.userid);

    res.render("pages/doctor/home", {
      name: req.session.username,
      doctors: doctor,
      patients: patient,
    });
  },

  async getPatients(req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 5;
    const patients = await Patient.getPatientsByDoctor(req.session.userid);
    res.render("components/doctorPatientsInfor.pug", {
      page: Math.round(patients.length / 5),
      patients: patients.slice((page - 1) * perPage, page * perPage),
    });
  },

  async handleRequest(req, res) {
    await Request.addDoctorRequest(req.session.userid, req.body.content);
    res.status(200).json();
  },

  async getPatientVisit(req, res) {
    const visits = await Visit.getVisitsByPatient(req.params.id);
    res.render("components/doctorPatientsVisitInfo", {
      visits: visits,
    });
  },

  async getPatientVisitDetail(req, res) {
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
