const path = require('path');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require("body-parser");

const nunjucks = require('nunjucks');
const { sequelize } = require('./models');

const passport = require('passport');
const passportConfig = require('./util/passport');

const authRouter = require('./routes/login-router');
const loginRouter = require('./routes/login-router');
const usersRouter = require('./routes/user-router');


dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);

app.set('view engine', 'html');
nunjucks.configure(path.join(__dirname, 'views'), {
    express: app,
    watch: true,
});

sequelize.sync({ force: false })
    .then(() => console.log('데이터베이스 연결 성공'))
    .catch(err => console.error(err));

app.use(bodyParser.json())
app.use(
    morgan('dev'),
    express.static(path.join(__dirname, 'view')),
    express.static(path.join(__dirname, 'view/users')),
    express.static(path.join(__dirname, 'view/login')),
    express.json(),
    express.urlencoded({extended: false}),
    cookieParser(process.env.SECRET),
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SECRET,
        cookie: {
            httpOnly: true,
            secure: false
        },
        name: 'session-cookie'
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);

app.get('/favicon.ico', (req, res) => res.status(204));

app.use((req, res, next) => {
    next('Not found error!');
});

app.use((err, req, res, next) => {
    res.status(500).send(err);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
