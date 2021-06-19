const connection = require("../database/connection");

class Patient {
  static getPatientByID = userid => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT ID, NAME, GENDER, PHONE, TO_CHAR(DOB,'dd-mm-YYYY') as DOB FROM PATIENT WHERE ID = ${userid}`,
        (err, result) => {
          return err ? reject(err) : resolve(result.rows);
        }
      );
    });
  };

  static getPatientsByDoctor = userid => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT P.ID, P.NAME, P.GENDER, TO_CHAR(P.DOB,'dd-mm-YYYY') as DOB, P.PHONE FROM PATIENT P, DOCTOR D WHERE D.ID = ${userid} AND P.DOCTOR_ID = D.ID`,
        (error, result) => {
          return error ? reject(error) : resolve(result.rows);
        }
      );
    });
  };

  static getAllPatient = () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT ID, NAME, GENDER, PHONE, TO_CHAR(DOB, 'dd-mm-YYYY') as DOB FROM PATIENT",
        (err, result) => {
          return err ? reject(err) : resolve(result.rows);
        }
      );
    });
  };

  static deletePatientByID = userid => {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM PATIENT WHERE ID = ${userid}`,
        (err, result) => {
          return err ? reject(err) : resolve(result.rows);
        }
      );
    });
  };

  static insertPatient = (name, gender, dob, phone) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `INSERT INTO PATIENT(NAME, GENDER, DOB, PHONE) VALUES ('${name}', '${gender}', '${dob}', ${phone})`,
        (err, result) => {
          return err ? reject(err) : resolve(result.rows);
        }
      );
    });
  };

  static searchPatient = (name, gender, dob, phone) => {
    var validName = "%" + name + "%";
    var validGender = gender != "none" ? gender : "%%";
    console.log(validGender);
    console.log(validName);
    var validDob = dob != "" ? dob : "%%";
    var validPhone = phone != "" ? phone : "%%";
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT ID, NAME, GENDER, PHONE, TO_CHAR(DOB,'dd-mm-YYYY') as DOB FROM PATIENT WHERE NAME like '${validName}' AND GENDER = '${validGender}' AND DOB::text like '${validDob}' AND PHONE like '${validPhone}'`,
        (err, result) => {
          return err ? reject(err) : resolve(result.rows);
        }
      );
    });
  };

  static updatePatientByID = (id, name, gender, dob, phone) => {
    var patient = {};
    connection.query(
      `SELECT ID, NAME, GENDER, PHONE, TO_CHAR(DOB,'dd-mm-YYYY') as DOB FROM PATIENT WHERE ID = ${id}`,
      function (error, results, fields) {
        (patient.name = results.rows[0].name),
          (patient.gender = results.rows[0].gender),
          (patient.dob = results.rows[0].dob),
          (patient.phone = results.rows[0].phone);
        var validName = name != "" ? name : patient.name;
        var validGender = gender != "" ? gender : patient.gender;
        var validDob = dob != "" ? dob : patient.dob;
        var validPhone = phone != "" ? phone : patient.phone;
        connection.query(
          `UPDATE PATIENT SET NAME='${validName}', GENDER='${validGender}', DOB='${validDob}', PHONE='${validPhone}' WHERE ID=${id}`
        );
      }
    );
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT ID, NAME, GENDER, PHONE, TO_CHAR(DOB,'dd-mm-YYYY') as DOB FROM PATIENT",
        (err, result) => {
          return err ? reject(err) : resolve(result.rows);
        }
      );
    });
  };
}

module.exports = Patient;
