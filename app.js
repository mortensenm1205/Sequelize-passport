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
const urlEncoded = bodyParser.urlencoded({extended: false});

require('./server/config/passport')(passport)

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'statics')));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(urlEncoded);
app.use(session( {secret: 'someworkvalueformytestingauth', resave: true, saveUninitialized: true} ));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./server/routes/user.js')(app, passport);

app.listen(PORT, () => console.log(`Running on ${PORT}`));
