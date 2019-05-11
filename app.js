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
req.jwtMiddleware = true;
    next();
});

app.use((req, res, next) => {
    if(req.jwtMiddleware === true) {
        // if(req.jwt == null) {
        //     res.status(401);
        //     res.json({status:401}); 
        //     return;            
        // }
        
        // var payload = { foo: 'bar' };
        // var secret = 'xxx';
    
        // HS256 secrets are typically 128-bit random strings, for example hex-encoded:
        // var secret = Buffer.from('fe1a1915a379f3be5394b64d14794932', 'hex')
        
        // encode
        // var token = jwt.encode(payload, secret);
    
        // decode
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NTc1Njg5MjcsImV4cCI6MTU4OTEwNDkyNywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.nIwmdlyhh21hcZiDBejXFzM0CNO7bsg4u-Uu3HWQS3s';
        const secret = 'qwertyuiopasdfghjklzxcvbnm123456';
        const decoded = jwt.decode(token, secret);
        // console.log(decoded); //=> { foo: 'bar' }

        req.tokenDecoded = decoded;

        /* TODO */
        // Check if token is out of date and renew it if so.
    }

    next();
});

app.use('/api/v1/', (req, res, next) => {
    const tokenFromBody = req.header('authorization');

    const token = tokenFromBody || req.tokenDecoded;

    if(token == null) {
        res.status(401);
        res.json({status:401}); 
        return;            
    }        
    console.log(token);

    res.status(200).send();

    return;
});

// app.use((req, res, next) => {
//     res.status(401);
//     res.json({"status":401}); 
//     return;
//   });


module.exports = app;
