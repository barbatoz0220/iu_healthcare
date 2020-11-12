// import node package
const mysql = require('mysql');
const express = require('express');

var connection = mysql.createConnection({
<<<<<<< HEAD
    host: 'localhost',
    user: 'root',
    password: 'tf110500',
    database: 'hms'
=======
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12375258',
    password: 'Iaz9n5yEhr',
    database: 'sql12375258'
>>>>>>> NamAnh
})

connection.connect(function(error) {
    if(error) throw error;
});

module.exports = connection;