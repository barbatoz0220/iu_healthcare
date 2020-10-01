var mysql = require('mysql');
var express = require('express');

module.exports.index = function(req, res) {
    res.render('doctors/index', {
        id: req.session.userid,
        name: req.session.username
    });
};

module.exports.menu = function(req, res) {
    res.send("Menu");
}