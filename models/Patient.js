const connection = require('./dbconnection');

module.exports.getPatientByID = (userid) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM PATIENT WHERE ID = ?", [userid], (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
}

module.exports.getDoctorByPatient = (userid) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT D.NAME, D.GENDER, D.DOB, D.PHONE FROM PATIENT P, DOCTOR D WHERE P.ID = ? AND P.DOCTOR_ID = D.ID", [userid], (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
}

module.exports.getVisitsByPatient = (userid) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT V.ID FROM PATIENT P, VISIT V WHERE P.ID = ? AND V.PATIENT_ID = P.ID", [userid], (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
}

module.exports.getPatientAccount = (username) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM ACCOUNT A, PATIENT P WHERE A.ID = P.ACCOUNT_ID and USERNAME = ?", [username], (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
}

module.exports.getAllPatient = () => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM PATIENT", (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
}