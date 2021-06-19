var connection = require("../database/connection");

class Doctor {
  static getDoctorByID = userid => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT ID, NAME, GENDER, PHONE, TO_CHAR(DOB,'dd-mm-YYYY') as DOB FROM DOCTOR WHERE ID = ${userid}`,
        (error, result) => {
          return error ? reject(error) : resolve(result.rows);
        }
      );
    });
  };

  static getDoctorByPatient = userid => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT D.NAME, D.GENDER, TO_CHAR(D.DOB,'dd-mm-YYYY') as DOB, D.PHONE FROM PATIENT P, DOCTOR D WHERE P.ID = ${userid} AND P.DOCTOR_ID = D.ID`,
        (err, result) => {
          return err ? reject(err) : resolve(result.rows);
        }
      );
    });
  };

  static getAllDoctor = (limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT ID, NAME, GENDER, PHONE, TO_CHAR(DOB,'dd-mm-YYYY') as DOB FROM DOCTOR",
        (err, result) => {
          return err ? reject(err) : resolve(result.rows);
        }
      );
    });
  };

  static deleteDoctorByID = userid => {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM DOCTOR WHERE ID = ${userid}`,
        (err, result) => {
          return err ? reject(err) : resolve(result.rows);
        }
      );
    });
  };

  static insertDoctor = (name, gender, dob, phone) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `INSERT INTO DOCTOR(NAME, GENDER, DOB, PHONE) VALUES ('${name}', '${gender}', '${dob}', '${phone}')`,
        (err, result) => {
          return err ? reject(err) : resolve(result.rows);
        }
      );
    });
  };

  static searchDoctor = (name, gender, dob, phone) => {
    var validName = "%" + name + "%";
    var validGender = gender != "none" ? gender : "%%";
    var validDob = dob != "" ? dob : "%%";
    var validPhone = phone != "" ? phone : "%%";
    var queryString = `SELECT ID, NAME, GENDER, PHONE, TO_CHAR(DOB,'dd-mm-YYYY') as DOB FROM DOCTOR WHERE NAME like '${validName}' AND GENDER = '${validGender}' AND DOB::text like '${validDob}' AND PHONE like '${validPhone}'`;
    console.log(queryString);
    return new Promise((resolve, reject) => {
      connection.query(queryString, (err, result) => {
        return err ? reject(err) : resolve(result.rows);
      });
    });
  };

  static updateDoctorByID = async (id, name, gender, dob, phone) => {
    var doctor = {};
    connection.query(
      `SELECT ID, NAME, GENDER, PHONE, TO_CHAR(DOB,'dd-mm-YYYY') as DOB FROM DOCTOR WHERE ID = ${id}`,
      function (error, results, fields) {
        (doctor.name = results.rows[0].name),
          (doctor.gender = results.rows[0].gender),
          (doctor.dob = results.rows[0].dob),
          (doctor.phone = results.rows[0].phone);
        var validName = name != "" ? name : doctor.name;
        var validGender = gender != "" ? gender : doctor.gender;
        var validDob = dob != "" ? dob : doctor.dob;
        var validPhone = phone != "" ? phone : doctor.phone;
        connection.query(
          `UPDATE DOCTOR SET NAME='${validName}', GENDER='${validGender}', DOB='${validDob}', PHONE='${validPhone}' WHERE ID=${id}`
        );
      }
    );
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT ID, NAME, GENDER, PHONE, TO_CHAR(DOB,'dd-mm-YYYY') as DOB FROM DOCTOR",
        (err, result) => {
          return err ? reject(err) : resolve(result.rows);
        }
      );
    });
  };
}

module.exports = Doctor;
