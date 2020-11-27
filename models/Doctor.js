var connection = require('./dbconnection');

module.exports.getDoctorByID = (userid) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM DOCTOR WHERE ID = ?", [userid], (error, result) => {
                return error ? reject(error) : resolve(result);
            }
        );
    });
}

module.exports.getPatientsByDoctor = (userid) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT P.NAME, P.GENDER, P.DOB, P.PHONE FROM PATIENT P, DOCTOR D WHERE D.ID = ? AND P.DOCTOR_ID = D.ID", [userid], (error, result) => {
                return error ? reject(error) : resolve(result);
            }
        );
    });
}

module.exports.getDoctorAccount = (username) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM ACCOUNT A, DOCTOR D WHERE A.ID = D.ACCOUNT_ID and USERNAME = ?', [username], (error, result) => {
            return error ? reject(err) : resolve(result);
        });
    });
};

module.exports.getAllDoctor = () => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM DOCTOR", (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
}