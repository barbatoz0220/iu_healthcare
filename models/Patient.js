const connection = require('./dbconnection');

module.exports.getPatientByID = (userid) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT ID, NAME, GENDER, PHONE, TO_CHAR(DOB,'dd-mm-YYYY') as DOB FROM PATIENT WHERE ID = ${userid}`, (err, result) => {
                return err ? reject(err) : resolve(result.rows);
            }
        );
    });
};

module.exports.getDoctorByPatient = (userid) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT D.NAME, D.GENDER, TO_CHAR(D.DOB,'dd-mm-YYYY') as DOB, D.PHONE FROM PATIENT P, DOCTOR D WHERE P.ID = ${userid} AND P.DOCTOR_ID = D.ID`, (err, result) => {
                return err ? reject(err) : resolve(result.rows);
            }
        );
    });
};

module.exports.getVisitsByPatient = (userid) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT V.ID, TO_CHAR(V.CHECKIN,'dd-mm-YYYY') as CHECKIN, TO_CHAR(V.CHECKOUT,'dd-mm-YYYY') as CHECKOUT FROM PATIENT P, VISIT V WHERE P.ID = ${userid} AND V.PATIENT_ID = P.ID`, (err, result) => {
                return err ? reject(err) : resolve(result.rows);
            }
        );
    });
};

module.exports.getAllPatient = () => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT ID, NAME, GENDER, PHONE, TO_CHAR(DOB, 'dd-mm-YYYY') as DOB FROM PATIENT", (err, result) => {
                return err ? reject(err) : resolve(result.rows);
            }
        );
    });
};

module.exports.deletePatientByID = (userid) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `DELETE FROM PATIENT WHERE ID = ${userid}`, (err, result) => {
                return err ? reject(err) : resolve(result.rows);
            }
        );
    });
};

module.exports.insertPatient = (name, gender, dob, phone) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `INSERT INTO PATIENT(NAME, GENDER, DOB, PHONE) VALUES ('${name}', '${gender}', '${dob}', ${phone})`, (err, result) => {
                return err ? reject(err) : resolve(result.rows);
            }
        );
    });
};

module.exports.searchPatient = (name, gender, dob, phone) => {
    var validName = '%'+name+'%';
    var validGender = gender != 'none' ? gender : "%%";
    var validDob = dob != '' ? dob : "%%";
    var validPhone = phone != '' ? phone : "%%";
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT ID, NAME, GENDER, PHONE, TO_CHAR(DOB,'dd-mm-YYYY') as DOB FROM PATIENT WHERE NAME like '${validName}' AND GENDER like '${validGender}' AND DOB::text like '${validDob}' AND PHONE like '${validPhone}'`, (err, result) => {
                return err ? reject(err) : resolve(result.rows);
            }
        );
    });
}


module.exports.updatePatientByID = (id, name, gender, dob, phone) => {
    var patient = {};
    connection.query(`SELECT ID, NAME, GENDER, PHONE, TO_CHAR(DOB,'dd-mm-YYYY') as DOB FROM PATIENT WHERE ID = ${id}`, function (error, results, fields) {
        patient.name = results.rows[0].name,
        patient.gender = results.rows[0].gender,
        patient.dob = results.rows[0].dob,
        patient.phone = results.rows[0].phone
        var validName = name != '' ? name : patient.name;
        var validGender = gender != '' ? gender : patient.gender
        var validDob = dob != '' ? dob : patient.dob
        var validPhone = phone != '' ? phone : patient.phone
        connection.query(`UPDATE PATIENT SET NAME='${validName}', GENDER='${validGender}', DOB='${validDob}', PHONE='${validPhone}' WHERE ID=${id}`);
    });
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT ID, NAME, GENDER, PHONE, TO_CHAR(DOB,'dd-mm-YYYY') as DOB FROM PATIENT", (err, result) => {
                return err ? reject(err) : resolve(result.rows);
            }
        );
    });
};

