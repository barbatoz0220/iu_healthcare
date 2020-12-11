const md5 = require('md5');
const account = require('../models/Account');
var nodemailer = require('nodemailer');

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
			var error = "Wrong username or password";
			if (error) {
				res.render('pages/common/index', {
					error: error
				});
				return;
			};
		}
	} 
}

module.exports.logo = (req, res) => res.render('pages/common/index.pug');

module.exports.about = (req, res) => res.render('pages/common/about.pug');

module.exports.contacts = (req, res) => res.render('pages/common/contacts.pug');

module.exports.emergency = (req, res) => res.render('pages/common/emergency.pug');

module.exports.suggest = async (req, res) => {
	var transporter =  nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hmstopic25se@gmail.com',
            pass: 'Hat_topic25'
        }
    });
    var mainOptions = { 
        from: 'HMS guest',
        to: 'hmstopic25se@gmail.com',
        subject: 'Test Nodemailer',
        text: 'You recieved message from: ' + req.body.name + '\nEmail: ' + req.body.email + '\nContent: ' + req.body.message,
    }
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
            res.redirect('/');
        } else {
            console.log('Message sent: ' +  info.response);
            res.redirect('/');
        }
    });
}