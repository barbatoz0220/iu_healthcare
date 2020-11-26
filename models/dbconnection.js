const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12375258',
    password: 'Iaz9n5yEhr',
    database: 'sql12375258'
})

connection.connect(error => {
    if(error) throw error;
});

module.exports = connection;