const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12380579',
    password: 'B9kPyq2UFy',
    database: 'sql12380579'
})

connection.connect((error) => {
    if (error) throw error;
});

module.exports = connection;