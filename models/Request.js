var connection = require("../database/connection");

class Request {
  static getUnfinishdeRequest = () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) as NUMBER FROM REQUEST WHERE STATUS = 0",
        (error, result) => {
          return error ? reject(error) : resolve(result.rows);
        }
      );
    });
  };

  static addPatientRequest = (patientid, content) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `INSERT INTO REQUEST(PATIENT_ID, DOCTOR_ID, CONTENT, STATUS) VALUES(${patientid}, NULL, '${content}', 0)`,
        (error, result) => {
          return error ? reject(error) : resolve(result.rows);
        }
      );
    });
  };

  static addDoctorRequest = (doctorid, content) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `INSERT INTO REQUEST(PATIENT_ID, DOCTOR_ID, CONTENT, STATUS) VALUES(NULL, ${doctorid}, '${content}', 0)`,
        (error, result) => {
          return error ? reject(error) : resolve(result.rows);
        }
      );
    });
  };

  static getAllRequest = () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM REQUEST ORDER BY STATUS, ID DESC",
        (error, result) => {
          return error ? reject(error) : resolve(result.rows);
        }
      );
    });
  };

  static updateRequest = id => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE REQUEST SET STATUS = 1 WHERE ID = ${id}`,
        (error, result) => {
          return error ? reject(error) : resolve(result.rows);
        }
      );
    });
  };
}
module.exports = Request;
