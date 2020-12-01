var doctorModel = require('../models/Doctor');

module.exports.index = async (req, res) => {
    const doctor = await doctorModel.getDoctorByID(req.session.userid);
    const patient = await doctorModel.getPatientsByDoctor(req.session.userid);

    res.render('doctors/doctorHome', {
        name: req.session.username,
        doctors: doctor,
        patients: patient
    });
};
