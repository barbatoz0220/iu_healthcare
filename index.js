const express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
const path = require('path');
const app = new express();
const authMiddleware = require('./middleware/auth.middleware');
const port = 3000;
var loginRouter = require('./routes/route.login');
var patientRouter = require('./routes/route.patient');
var cookieParser = require('cookie-parser');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', loginRouter);
app.use('/patient', authMiddleware.requireAuth, patientRouter);

app.listen(port, () => {
    console.log('App listenning on port ' + port.toString())
});
