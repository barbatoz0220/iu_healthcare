var mysql = require('mysql');
var express = require('express');
var connection = require('../models/dbconnection');

module.exports.index = function(req, res) {
    res.render('patients/patientHome', {
        id: req.session.userid,
        name: req.session.username
    });
};

<<<<<<< HEAD
=======
module.exports.menu = function(req, res) {
    res.render("patients/menu", {
        id: req.session.userid
    });
}
>>>>>>> NamAnh

module.exports.get = function(req, res) {
    connection.query('select * from patient where id = ?', [req.session.userid], function(err, result) {
        res.render('patients/get', {
            name: result[0].NAME,
            id: result[0].ID
        })
    })
}
