const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const morgan = require('morgan');
const path = require('path');
const PORT = process.env.PORT || 9000;

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session( {secret: 'someworkvalueformytestingauth', resave: true, saveUninitialized: true} ));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'statics')));

require('./server/routes/user-signup.js')(app, passport);
require('./server/routes/user-profile.js')(app, passport);
require('./server/config/passport')(passport);

app.listen(PORT, () => console.log(`Running on ${PORT}`));
