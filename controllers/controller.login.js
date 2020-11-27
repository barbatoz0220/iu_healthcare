const md5 = require('md5');
const { getPatientAccount } = require('../models/Patient');
const { getDoctorAccount } = require('../models/Doctor');

var fs = require('fs');
var data = JSON.parse(fs.readFileSync('./models/admin.json', 'utf8'));


module.exports.index = function (req, res) {
	res.render('index.pug');
};

module.exports.login = async (req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	if (username && password) {

		var adminLogin = data.admins.filter(admin => admin.username == username && admin.password == password);
		if (adminLogin.length != 0) {
			res.redirect("/admin");;
		}

		const patientAccount = await getPatientAccount(username);
		if (patientAccount.length > 0) {
			if (patientAccount[0].PASSWORD == md5(password)) {
				req.session.patientLoggedin = true;
				req.session.username = patientAccount[0].NAME;
				req.session.userid = patientAccount[0].ID;
				res.redirect("/patient");
				res.end();
			}
		}

		const doctorAccount = await getDoctorAccount(username)
		if (doctorAccount.length > 0) {
			if (doctorAccount[0].PASSWORD == md5(password)) {
				req.session.patientLoggedin = true;
				req.session.username = doctorAccount[0].NAME;
				req.session.userid = doctorAccount[0].ID;
				res.redirect("/doctỏ");
				res.end();
			}
		}
	}
}

module.exports.logo = function (req, res) {
	res.render('index.pug');
}

module.exports.home = function (req, res) {
	if (req.session.patientLoggedin == true) {
		res.redirect('/patient');
	} else if (req.session.doctorLoggedin == true) {
		res.redirect('/doctor');
	}
}

module.exports.about = function (req, res) {
	res.render('about.pug');
}

module.exports.contacts = function (req, res) {
	res.render('contacts.pug');
}

module.exports.emergency = function (req, res) {
	res.render('emergency.pug');
}