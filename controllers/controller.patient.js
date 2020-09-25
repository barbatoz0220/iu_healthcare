var mysql = require('mysql');
var express = require('express');

module.exports.index = function(req, res) {
    res.render('patient');
};

module.exports.menu = function(req, res) {
    res.send('Done');
}