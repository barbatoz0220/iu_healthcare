// import node package
const mysql = require('mysql');
const express = require('express');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tf110500',
    database: 'hms'
})

connection.connect(function(error) {
    if(error) throw error;
});

module.exports = connection;