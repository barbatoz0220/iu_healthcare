var connection = require('./dbconnection');

module.exports = {
    getUser(username) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM ACCOUNT A WHERE USERNAME = ?', [username], (error, result) => {
                return error ? reject(err) : resolve(result);
            });
        });
    }
}