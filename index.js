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
const port = process.env.PORT || 3000;

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());								// fetch data from view
app.use(express.static('public'));

// disable cache to handle "Back" button of browser - sending request when back
app.use((req, res, next) => {
	res.set('Cache-Control', 'no-store');
	next();
});

app.use('/', loginRouter);
app.use('/patient', authMiddleware.checkPatientLoggedin, patientRouter);
app.use('/doctor', authMiddleware.checkDoctorLoggedin, doctorRouter);
app.use('/admin', adminRouter);
app.use('*', (req, res) => {
	res.render('pages/common/404page');
});

app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
	console.log('App listenning on port ' + port.toString())
});
