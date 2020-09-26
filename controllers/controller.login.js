var mysql = require('mysql');
var express = require('express');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'hms'
})
connection.connect();
module.exports.index = function(req, res){
	res.render('index');
	res.end();
};

module.exports.login = function(req, res){
    var username = req.body.username;
	var password = req.body.password;

	if (username && password) {
		connection.query('SELECT * FROM accounts a, Patient p WHERE a.pid = p.id and username = ? AND password = ?', [username, password], function(error, results, fields) {
			console.log(results);
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.username = results[0].NAME;
				req.session.userid = results[0].ID;
				//res.redirect('/patient/' + req.session.userid);
				res.send("Hello" + req.session.username);
			} else {
				res.send('Incorrect Username and/or Password!');
			}		
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
};
