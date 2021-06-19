const connection = require("../database/connection");

class Account {
  static getUser(username) {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM ACCOUNT WHERE USERNAME = '${username}'`,
        (error, result) => {
          return error ? reject(error) : resolve(result.rows);
        }
      );
    });
  }
}

module.exports = Account;
