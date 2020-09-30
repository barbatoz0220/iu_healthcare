var mysql = require('mysql');
var express = require('express');

module.exports.index = function(req, res) {
    res.render('patients/index', {
        id: req.session.userid,
        name: req.session.username
    });
};

module.exports.menu = function(req, res) {
    res.render("patients/menu.pug", {
        id: req.session.userid
    });
}

module.exports.information = function(req, res) {
    res.send(req.session.username + req.session.userid);
}