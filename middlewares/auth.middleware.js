module.exports = {
  checkPatientLoggedin(req, res, next) {
    if (!req.session.patientLoggedin) {
      res.redirect("/");
      return;
    }
    next();
  },

  checkDoctorLoggedin(req, res, next) {
    if (!req.session.doctorLoggedin) {
      res.redirect("/");
      return;
    }
    next();
  },

  checkAdminLoggedin(req, res, next) {
    if (!req.session.adminLoggedin) {
      res.redirect("/");
      return;
    }
    next();
  },
};
