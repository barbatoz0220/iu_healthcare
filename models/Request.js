var connection = require('./dbconnection');

module.exports.getUnfinishdeRequest = () => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT COUNT(*) FROM REQUEST WHERE STATUS = 0", (error, result) => {
                return error ? reject(error) : resolve(result);
            }
        );
    });
};

module.exports.addPatientRequest = (patientid, content) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "INSERT INTO REQUEST(PATIENT_ID, DOCTOR_ID, CONTENT, STATUS) VALUES(?, NULL, ?, 0)", [patientid, content], (error, result) => {
                return error ? reject(error) : resolve(result);
            }
        );
    });
}