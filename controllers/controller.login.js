const connection = require('../models/dbconnection')

module.exports.index = function(req, res){
	res.render('index.pug');
};

module.exports.login = function(req, res) {
    var username = req.body.username;
	var password = req.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts a, Patient p WHERE a.id = p.accid and username = ? and password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.username = results[0].NAME;
				req.session.userid = results[0].ID;
				
				res.cookie('fakeCookie', 0, {
					path: '/patient'
				});

				res.redirect("/patient");
				res.end();
			}
		})
		connection.query('SELECT * FROM accounts a, Doctor d WHERE a.id = d.accid and username = ? and password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.username = results[0].NAME;
				req.session.userid = results[0].ID;
				
				res.cookie('fakeCookie', 1, {
					path: '/doctor'
				});

				res.redirect("/doctor");
				res.end();
			}	
		})
	}	
}

module.exports.logo = function(req, res) {
	res.render('index.pug');
}

module.exports.home = function(req, res) {
	res.render('index.pug');
}

module.exports.about = function(req, res) {
	res.render('about.pug');
}

module.exports.contacts = function(req, res) {
	res.render('contacts.pug');
}

module.exports.emergency = function(req, res) {
	res.render('emergency.pug');
}