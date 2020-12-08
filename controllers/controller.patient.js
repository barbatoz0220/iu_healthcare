var patientModel = require('../models/Patient');

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