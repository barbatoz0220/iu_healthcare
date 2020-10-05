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
const cookieParser = require('cookie-parser');

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
	saveUninitialized: true
}));

// set up middleware
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());								// fetch data from view
app.use(cookieParser());								// read request's cookie
app.use(express.static('public'));

app.use('/', loginRouter);
app.use('/patient', authMiddleware.requireAuth, patientRouter);
app.use('/doctor', authMiddleware.requireAuth, doctorRouter);

app.use( '/public', express.static(path.join(__dirname, 'public')));
app.listen(port, () => {
    console.log('App listenning on port ' + port.toString())
});
