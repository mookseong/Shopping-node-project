const path = require('path');

const dotenv = require('dotenv');

const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const {sequelize} = require('./models');

const passport = require('passport');
const passportConfig = require('./passport');

const authRouter = require('./routes/auth-router');
const userRouter = require('./routes/user-router');
const productRouter = require('./routes/product-router');
const cartRouter = require('./routes/cart-router');
const adminRouter = require('./routes/admin-router');
const indexRouter = require('./routes');
const response = require("./data/responseFrom");
const resTEXT = require("./data/responseString");

dotenv.config();
passportConfig();

const app = express();
app.set('port', process.env.PORT || 3000);

sequelize.sync({force: false})
    .then(() => console.log('데이터베이스 연결 성공'))
    .catch(err => console.error(err));

app.use(
    morgan('dev'),
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

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/admin', adminRouter);

app.get('/favicon.ico', (req, res) => res.status(204));

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json(response.responseFromData(resTEXT.RESPONSE_TEXT.FAIL, resTEXT.RESPONSE_TEXT.PERMISSION_DENIED, err));
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
