const connection = require("../database/connection");

class Patient {
  static getByID = id => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT ID, NAME, GENDER, PHONE, TO_CHAR(DOB,'dd-mm-YYYY') as DOB FROM PATIENT WHERE ID = ${id}`,
        (err, result) => {
          return err ? reject(err) : resolve(result.rows);
        }
      );
    });
  };

  static getByDoctor = id => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT P.ID, P.NAME, P.GENDER, TO_CHAR(P.DOB,'dd-mm-YYYY') as DOB, P.PHONE FROM PATIENT P, DOCTOR D WHERE D.ID = ${id} AND P.DOCTOR_ID = D.ID`,
        (error, result) => {
          return error ? reject(error) : resolve(result.rows);
        }
      );
    });
  };

  static getAll = () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT ID, NAME, GENDER, PHONE, TO_CHAR(DOB, 'dd-mm-YYYY') as DOB FROM PATIENT ORDER BY ID",
        (err, result) => {
          return err ? reject(err) : resolve(result.rows);
        }
      );
    });
  };

  static delete = id => {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM PATIENT WHERE ID = ${id}`,
        (err, result) => {
          return err ? reject(err) : resolve(result.rows);
        }
      );
    });
  };

  static insert = (name, gender, dob, phone) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `INSERT INTO PATIENT(NAME, GENDER, DOB, PHONE) VALUES ('${name}', '${gender}', '${dob}', ${phone})`,
        (err, result) => {
          return err ? reject(err) : resolve(result.rows);
        }
      );
    });
  };

  static search = (name, gender, dob, phone) => {
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

  static update = async (id, name, gender, dob, phone) => {
    const patient = await this.getByID(id);

    var validName = name != "" ? name : patient[0].name;
    var validGender = gender != "" ? gender : patient[0].gender;
    var validDob = dob != "" ? dob : patient[0].dob;
    var validPhone = phone != "" ? phone : patient[0].phone;

    await connection.query(
      `UPDATE PATIENT SET NAME='${validName}', GENDER='${validGender}', DOB='${validDob}', PHONE='${validPhone}' WHERE ID=${id}`
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
