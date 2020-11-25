// import node package
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

var path = require('path');

// import middleware
const authMiddleware = require('./middlewares/auth.middleware');

// import router
const loginRouter = require('./routes/route.login');
const patientRouter = require('./routes/route.patient');
const doctorRouter = require('./routes/route.doctor');
const adminRouter = require('./routes/route.admin');

// set up app and port
const app = new express();
const port = 3000;

// set up view engine
app.set('views', './views');
app.set('view engine', 'pug');

// set up session used for login
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
	cookie: {
		secure: false
	}
}));

// set up middleware
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());								// fetch data from view
app.use(express.static('public'));

app.use('/', loginRouter);
app.use('/patient', authMiddleware.checkPatientLoggedin, patientRouter);
app.use('/doctor', authMiddleware.checkDoctorLoggedin, doctorRouter);
app.use('/admin', adminRouter);

app.use('/public', express.static(path.join(__dirname, 'public')));
app.listen(port, () => {
    console.log('App listenning on port ' + port.toString())
});
