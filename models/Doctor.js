var connection = require('./dbconnection');

module.exports.getDoctorByID = (userid) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT ID, NAME, GENDER, PHONE, DATE_FORMAT(DOB,'%d-%m-%Y') as DOB FROM DOCTOR WHERE ID = ?", [userid], (error, result) => {
                return error ? reject(error) : resolve(result);
            }
        );
    });
};

module.exports.getPatientsByDoctor = (userid) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT P.ID, P.NAME, P.GENDER, DATE_FORMAT(P.DOB,'%d-%m-%Y') as DOB, P.PHONE FROM PATIENT P, DOCTOR D WHERE D.ID = ? AND P.DOCTOR_ID = D.ID", [userid], (error, result) => {
                return error ? reject(error) : resolve(result);
            }
        );
    });
};

module.exports.getAllDoctor = (limit, offset) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT ID, NAME, GENDER, PHONE, DATE_FORMAT(DOB,'%d-%m-%Y') as DOB FROM DOCTOR", (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
};

module.exports.deleteDoctorByID = (userid) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "DELETE FROM DOCTOR WHERE ID = ?", [userid], (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
};

module.exports.insertDoctor = (name, gender, dob, phone) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "INSERT INTO DOCTOR(NAME, GENDER, DOB, PHONE) VALUES (?, ?, ?, ?)", [name, gender, dob, phone], (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
};

module.exports.searchDoctor = (name, gender, dob, phone) => {
    var validName = name != '' ? name : "%%";
    var validGender = gender != 'none' ? gender : "%%";
    var validDob = dob != '' ? dob : "%%";
    var validPhone = phone != '' ? phone : "%%";
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT ID, NAME, GENDER, PHONE, DATE_FORMAT(DOB,'%d-%m-%Y') as DOB FROM DOCTOR WHERE NAME like ? AND GENDER like ? AND DOB like ? AND PHONE like ?", [validName, validGender, validDob, validPhone], (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
}

module.exports.updateDoctorByID = async (id, name, gender, dob, phone) => {
    var doctor = {};
    connection.query("SELECT ID, NAME, GENDER, PHONE, DATE_FORMAT(DOB,'%Y-%m-%d') as DOB FROM DOCTOR WHERE ID = ?", [id], function (error, results, fields) {
        doctor.name = results[0].NAME,
        doctor.gender = results[0].GENDER,
        doctor.dob = results[0].DOB,
        doctor.phone = results[0].PHONE
        var validName = name != '' ? name : doctor.name;
        var validGender = gender != '' ? gender : doctor.gender;
        var validDob = dob != '' ? dob : doctor.dob;
        var validPhone = phone != '' ? phone : doctor.phone;
        connection.query("UPDATE DOCTOR SET NAME=?, GENDER=?, DOB=?, PHONE=? WHERE ID=?", [validName, validGender, validDob, validPhone, id]);
    });
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT ID, NAME, GENDER, PHONE, DATE_FORMAT(DOB,'%d-%m-%Y') as DOB FROM DOCTOR", (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
};
