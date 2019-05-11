const express = require('express');
const router = express.Router();
const app = express();

// const indexRouter = require('./index');
const usersRouter = require('./users');

// app.use('/', indexRouter);
app.get('/', (req, res, next) => {
    console.log("Hello");

    next();
});

module.exports = router;
