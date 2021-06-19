const connection = require("../database/connection");

class Disease {
  static getByDisease(disease) {
    return new Promise((resolve, reject) => {
      connection.query(
        `
        SELECT P.NAME
        FROM PRECAUTION p
        INNER JOIN DISEASE_PRECAUTION DP
        ON P.ID = DP.ID
        INNER JOIN DISEASE D
        ON D.ID = DP.ID
        WHERE D.NAME LIKE '${disease.diseaseName}';`,
        (error, precautionResults) => {
          if (error) reject(error);
          else resolve(precautionResults);
        }
      );
    });
  }
}

module.exports = Disease;
