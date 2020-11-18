// import node package
const mysql = require('mysql');
const express = require('express');

var connection = mysql.createConnection({
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12375258',
    password: 'Iaz9n5yEhr',
    database: 'sql12375258'
})

connection.connect(function(error) {
    if(error) throw error;
});

module.exports = connection;