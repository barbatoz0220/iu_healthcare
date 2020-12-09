var patientModel = require('../models/Patient');
var request = require('../models/Request');

module.exports.index = async (req, res) => {
    const patient = await patientModel.getPatientByID(req.session.userid);
    const doctor = await patientModel.getDoctorByPatient(req.session.userid);
    const visit = await patientModel.getVisitsByPatient(req.session.userid);
    res.render('pages/patient/home', {
        name: req.session.username,
        patients: patient,
        doctors: doctor,
        visits: visit
    });
};

module.exports.getDoctor = async (req, res) => {
    const doctors = await patientModel.getDoctorByPatient(req.session.userid);
    res.render('components/patientDoctorInfor', {
        doctors: doctors
    });
}

module.exports.getVisit = async (req, res) => {
    var page = parseInt(req.query.page) || 1;
    var perPage = 5;
    const visits = await patientModel.getVisitsByPatient(req.session.userid);
    res.render('components/patientVisitsInfor', {
        page: Math.round(visits.length / 5),
        visits: visits.slice((page - 1) * perPage, page * perPage)
    });
}

module.exports.handleRequest = async (req, res) => {
    await request.addPatientRequest(req.session.userid, req.body.content);
    res.status(200).json();
}