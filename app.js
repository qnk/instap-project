const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const jwt = require('jwt-simple');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// const apiRoutes = require('./routes/api')
app.use((req, res, next) => {
    req.jwtMiddleware = false;

    next();
});

app.post('/api/v1/login', (req, res, next) => {
    const [userName, password] = [req.body['user-name'], req.body.password];

    if(userName == null || password == null) {
        res.status(401);
        res.json({status:401}); 
        return;        
    }

    // Retrieve JWT for user
    // res.status(200);
    // res.json({status:200}); 
req.tokenFromLogin = true;
    next();
});

app.use('/api/v1/', (req, res, next) => {
    const tokenFromBody = req.header('authorization');

    const token = tokenFromBody || req.tokenFromLogin;

    if(token == null) {
        res.status(401);
        res.json({status:401}); 
        return;            
    }        
    console.log(token);

    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NTc1Njg5MjcsImV4cCI6MTU4OTEwNDkyNywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.nIwmdlyhh21hcZiDBejXFzM0CNO7bsg4u-Uu3HWQS3s';
    const secret = 'qwertyuiopasdfghjklzxcvbnm123456';
    const decoded = jwt.decode(token, secret);

    /* TODO */
    // Check if token is out of date and renew it if so.

    res.status(200).send({'jwt': decoded});

    return;
});

// app.use((req, res, next) => {
//     res.status(401);
//     res.json({"status":401}); 
//     return;
//   });


module.exports = app;
