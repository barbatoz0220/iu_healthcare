const connection = require('../models/dbconnection');
const bcrypt = require('bcrypt');

var admins = [
	{
		name: "tri",
		username: "tdtri",
		password: "tdtri"
	},
	{
		name: "anh",
		username: "phnanh",
		password: "phnanh"
	},
	{
		name: "huy",
		username: "dnmhuy",
		password: "dnmhuy"
	}
]

module.exports.index = function(req, res){
	res.render('index.pug');
};

module.exports.login = function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	if (username && password) {

		var adminLogin = admins.filter(admin => admin.username == username && admin.password == password);
		if(adminLogin.length != 0) {
			res.cookie('fakeCookie', 2, {
				path: '/admin'
			});
			res.redirect("/admin");;
		}

		connection.query('SELECT * FROM ACCOUNT A, PATIENT P WHERE A.ID = P.ACCOUNT_ID and USERNAME = ? and PASSWORD = ?', [username, password], function(error, results, fields) {
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
		});

		connection.query('SELECT * FROM ACCOUNT A, DOCTOR D WHERE A.ID = D.ACCOUNT_ID and USERNAME = ? and PASSWORD = ?', [username, password], function(error, results, fields) {
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
		});
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