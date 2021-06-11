var connection = require('./dbconnection');

module.exports.getDisease = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT D.NAME FROM VISIT V, DISEASE D, VISIT_DISEASE O WHERE V.ID = ${id} AND O.VISIT_ID = V.ID AND O.DISEASE_ID = D.ID`, (error, result) => {
                return error ? reject(error) : resolve(result.rows);
            }
        );
    });
};

module.exports.getTreatment = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT T.NAME FROM VISIT V, TREATMENT T, VISIT_TREATMENT O WHERE V.ID = ${id} AND O.VISIT_ID = V.ID AND O.TREATMENT_ID = T.ID`, (error, result) => {
                return error ? reject(error) : resolve(result.rows);
            }
        );
    });
};

module.exports.getRoom = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT R.NUMBER FROM VISIT V, ROOM R, VISIT_ROOM O WHERE V.ID = ${id} AND O.VISIT_ID = V.ID AND O.ROOM_ID = R.ID`, (error, result) => {
                return error ? reject(error) : resolve(result.rows);
            }
        );
    });
};