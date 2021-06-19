var connection = require("../database/connection");

class Visit {
  static getDisease = id => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT D.NAME FROM VISIT V, DISEASE D, VISIT_DISEASE O WHERE V.ID = ${id} AND O.VISIT_ID = V.ID AND O.DISEASE_ID = D.ID`,
        (error, result) => {
          return error ? reject(error) : resolve(result.rows);
        }
      );
    });
  };

  static getByPatient = id => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT V.ID, TO_CHAR(V.CHECKIN,'dd-mm-YYYY') as CHECKIN, TO_CHAR(V.CHECKOUT,'dd-mm-YYYY') as CHECKOUT FROM PATIENT P, VISIT V WHERE P.ID = ${id} AND V.PATIENT_ID = P.ID ORDER BY V.ID`,
        (err, result) => {
          return err ? reject(err) : resolve(result.rows);
        }
      );
    });
  };

  static getTreatment = id => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT T.NAME FROM VISIT V, TREATMENT T, VISIT_TREATMENT O WHERE V.ID = ${id} AND O.VISIT_ID = V.ID AND O.TREATMENT_ID = T.ID`,
        (error, result) => {
          return error ? reject(error) : resolve(result.rows);
        }
      );
    });
  };

  static getRoom = id => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT R.NUMBER FROM VISIT V, ROOM R, VISIT_ROOM O WHERE V.ID = ${id} AND O.VISIT_ID = V.ID AND O.ROOM_ID = R.ID`,
        (error, result) => {
          return error ? reject(error) : resolve(result.rows);
        }
      );
    });
  };
}

module.exports = Visit;
