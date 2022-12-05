const path = require('path');

const dotenv = require('dotenv');

const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const nunjucks = require('nunjucks');
const {sequelize} = require('./models');

const passport = require('passport');
const passportConfig = require('./passport');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const commentRouter = require('./routes/comment');
const indexRouter = require('./routes');

dotenv.config();
passportConfig();

const app = express();
app.set('port', process.env.PORT || 3000);

app.set('view engine', 'html');
nunjucks.configure(path.join(__dirname, 'views'), {
    express: app,
    watch: true,
});

sequelize.sync({force: false})
    .then(() => console.log('데이터베이스 연결 성공'))
    .catch(err => console.error(err));

app.use(
    morgan('dev'),
    express.static(path.join(__dirname, 'public')),
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
app.use('/user', userRouter);
app.use('/comment', commentRouter);
app.use('/', indexRouter);
app.get('/favicon.ico', (req, res) => res.status(204));

app.use((req, res) =>
    res.render('index', {
        title: require('./package.json').name,
        port: app.get('port'),
        user: req.user
    }));

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
