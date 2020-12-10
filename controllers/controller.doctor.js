var doctorModel = require('../models/Doctor');
var request = require('../models/Request');

module.exports.index = async (req, res) => {
    const doctor = await doctorModel.getDoctorByID(req.session.userid);
    const patient = await doctorModel.getPatientsByDoctor(req.session.userid);

    res.render('pages/doctor/home', {
        name: req.session.username,
        doctors: doctor,
        patients: patient
    });
};

module.exports.getPatients = async (req, res) => {
    var page = parseInt(req.query.page) || 1;
    var perPage = 2;
    const patients = await doctorModel.getPatientsByDoctor(req.session.userid);
    res.render('components/doctorPatientsInfor.pug', {
        page: Math.round(patients.length / 2),
        patients: patients.slice((page - 1) * perPage, page * perPage)
    })
}

module.exports.handleRequest = async (req, res) => {
    await request.addDoctorRequest(req.session.userid, req.body.content);
    res.status(200).json();
}