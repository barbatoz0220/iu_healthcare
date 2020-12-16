const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tf110500',
    database: 'hms'
})

connection.connect((error) => {
    if (error) throw error;
});

module.exports = connection;