var connection = require('./dbconnection');

module.exports.getUnfinishdeRequest = () => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT COUNT(*) as NUMBER FROM REQUEST WHERE STATUS = 0", (error, result) => {
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

module.exports.addDoctorRequest = (doctorid, content) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "INSERT INTO REQUEST(PATIENT_ID, DOCTOR_ID, CONTENT, STATUS) VALUES(NULL, ?, ?, 0)", [doctorid, content], (error, result) => {
                return error ? reject(error) : resolve(result);
            }
        );
    });
}

module.exports.getAllRequest = () => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM REQUEST ORDER BY STATUS, ID DESC", (error, result) => {
                return error ? reject(error) : resolve(result);
            }
        );
    });
};


module.exports.updateRequest = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "UPDATE REQUEST SET STATUS = 1 WHERE ID = ?", [id], (error, result) => {
                return error ? reject(error) : resolve(result);
            }
        );
    });
};