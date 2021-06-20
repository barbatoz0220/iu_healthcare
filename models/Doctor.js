var connection = require("../database/connection");

class Doctor {
  static getByID = id => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT ID, NAME, GENDER, PHONE, TO_CHAR(DOB,'dd-mm-YYYY') as DOB FROM DOCTOR WHERE ID = ${id}`,
        (error, result) => {
          return error ? reject(error) : resolve(result.rows);
        }
      );
    });
  };

  static getByPatient = id => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT D.NAME, D.GENDER, TO_CHAR(D.DOB,'dd-mm-YYYY') as DOB, D.PHONE FROM PATIENT P, DOCTOR D WHERE P.ID = ${id} AND P.DOCTOR_ID = D.ID`,
        (err, result) => {
          return err ? reject(err) : resolve(result.rows);
        }
      );
    });
  };

  static getAll = () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT ID, NAME, GENDER, PHONE, TO_CHAR(DOB,'dd-mm-YYYY') as DOB FROM DOCTOR ORDER BY ID",
        (err, result) => {
          return err ? reject(err) : resolve(result.rows);
        }
      );
    });
  };

  static delete = id => {
    return new Promise((resolve, reject) => {
      connection.query(`DELETE FROM DOCTOR WHERE ID = ${id}`, (err, result) => {
        return err ? reject(err) : resolve(result.rows);
      });
    });
  };

  static insert = (name, gender, dob, phone) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `INSERT INTO DOCTOR(NAME, GENDER, DOB, PHONE) VALUES ('${name}', '${gender}', '${dob}', '${phone}')`,
        (err, result) => {
          return err ? reject(err) : resolve(result.rows);
        }
      );
    });
  };

  static search = (name, gender, dob, phone) => {
    var validName = "%" + name + "%";
    var validGender = gender != "none" ? gender : "%%";
    var validDob = dob != "" ? dob : "%%";
    var validPhone = phone != "" ? phone : "%%";    
    var queryString = `SELECT ID, NAME, GENDER, PHONE, TO_CHAR(DOB,'dd-mm-YYYY') as DOB FROM DOCTOR WHERE NAME like '${validName}' AND GENDER = '${validGender}' AND DOB::text like '${validDob}' AND PHONE like '${validPhone}'`;
    return new Promise((resolve, reject) => {
      connection.query(queryString, (err, result) => {
        return err ? reject(err) : resolve(result.rows);
      });
    });
  };

  static update = async (id, name, gender, dob, phone) => {
    const doctor = await this.getByID(id);

    var validName = name != "" ? name : doctor[0].name;
    var validGender = gender != "" ? gender : doctor[0].gender;
    var validDob = dob != "" ? dob : doctor[0].dob;
    var validPhone = phone != "" ? phone : doctor[0].phone;
    console.log(validName);
    console.log(validGender);
    console.log(validDob);
    console.log(validPhone);
    console.log(id);
    await connection.query(
      `UPDATE DOCTOR SET NAME='${validName}', GENDER='${validGender}', DOB='${validDob}', PHONE='${validPhone}' WHERE ID=${id}`
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
