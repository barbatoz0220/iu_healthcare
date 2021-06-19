const connection = require("../database/connection");

class Disease {
  static getBySymptoms(symptoms, symptomCount) {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT DISTINCT D.ID, D.NAME, D.DESCR
            FROM DISEASE D
            INNER JOIN SYMPTOM_DISEASE SD
            ON D.ID = SD.ID
            INNER JOIN SYMPTOM s
            ON SD.ID = S.ID
            WHERE S.NAME IN ${symptoms}
            GROUP BY D.ID
            HAVING COUNT(DISTINCT S.NAME) >= ${symptomCount};`,
        (error, result) => {
          return error ? reject(error) : resolve(result.rows);
        }
      );
    });
  }
}

module.exports = Disease;
