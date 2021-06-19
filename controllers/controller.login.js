const md5 = require("md5");
const nodemailer = require("nodemailer");

const Account = require("../models/Account");

module.exports = {
  async index(req, res) {
    if (req.session.patientLoggedin == true) res.redirect("/patient");
    else if (req.session.doctorLoggedin == true) res.redirect("/doctor");
    else if (req.session.adminLoggedin == true) {
      req.session.count = 2;
      res.redirect("/admin");
    } else res.render("pages/common/index.pug");
  },

  async login(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    if (username && password) {
      const userAccount = await Account.get(username);
      if (userAccount.length > 0) {
        if (userAccount[0].password == md5(password)) {
          switch (userAccount[0].role) {
            case "patient":
              req.session.patientLoggedin = true;
              req.session.userid = userAccount[0].patient_id;
              res.redirect("/patient");
              break;
            case "doctor":
              req.session.doctorLoggedin = true;
              req.session.userid = userAccount[0].doctor_id;
              res.redirect("/doctor");
              break;
            case "admin":
              req.session.count = 1;
              req.session.adminLoggedin = true;
              res.redirect("/admin");
              break;
          }
        } else {
          var error = "Wrong username or password";
          if (error) {
            res.render("pages/common/index", {
              error: error,
            });
            return;
          }
        }
      } else {
        var error = "Wrong username or password";
        if (error) {
          res.render("pages/common/index", {
            error: error,
          });
          return;
        }
      }
    }
  },

  async logo(req, res) {
    res.render("pages/common/index.pug");
  },

  async about(req, res) {
    res.render("pages/common/about.pug");
  },

  async contacts(req, res) {
    res.render("pages/common/contacts.pug", {
      context: req.session.context,
    });
  },

  async emergency(req, res) {
    res.render("pages/common/emergency.pug");
  },

  async suggest(req, res) {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hmstopic25se@gmail.com",
        pass: "Hat_topic25",
      },
    });
    var mainOptions = {
      from: "HMS guest",
      to: "hmstopic25se@gmail.com",
      subject: "Test Nodemailer",
      text:
        "You recieved message from: " +
        req.body.name +
        "\nEmail: " +
        req.body.email +
        "\nContent: " +
        req.body.message,
    };
    transporter.sendMail(mainOptions, function (err, info) {
      if (err) {
        console.log(err);
        res.redirect("/");
      } else {
        console.log("Message sent: " + info.response);
        req.session.context = "sent";
        res.redirect("/contacts");
      }
    });
  },
};
