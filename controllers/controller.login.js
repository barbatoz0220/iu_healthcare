const md5 = require('md5');
const account = require('../models/Account');

module.exports = {
	async index(req, res) {
		if (req.session.patientLoggedin == true)
			res.redirect('/patient');
		else if (req.session.doctorLoggedin == true)
			res.redirect('/doctor');
		else if (req.session.adminLoggedin == true)
			res.redirect('/admin');
		else
			res.render('pages/common/index.pug');
	},
};

module.exports.login = async (req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	if (username && password) {
		const userAccount = await account.getUser(username);
		if (userAccount.length > 0) {
			if (userAccount[0].PASSWORD == md5(password)) {
				switch (userAccount[0].ROLE) {
					case 'patient':
						req.session.patientLoggedin = true;
						req.session.userid = userAccount[0].PATIENT_ID;
						res.redirect("/patient");
						break;
					case 'doctor':
						req.session.doctorLoggedin = true;
						req.session.userid = userAccount[0].DOCTOR_ID;
						res.redirect("/doctor");
						break;
					case 'admin':
						req.session.adminLoggedin = true;
						res.redirect("/admin");
						break;
				}
			}
		} else {
			/* Error */
			// var error = "Wrong username or password";
			// if (error) {
			// 	res.render('index', {
			// 		error: error
			// 	});
			// 	return;
			// };
		}
	} 
}

module.exports.logo = (req, res) => res.render('index.pug');

module.exports.about = (req, res) => res.render('about.pug');

module.exports.contacts = (req, res) => res.render('contacts.pug');

module.exports.emergency = (req, res) => res.render('emergency.pug');

module.exports.request = (req, res) => {

}