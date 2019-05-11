const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// const apiRoutes = require('./routes/api')

app.use('/api/v1', (req, res, next) => {
    res.status(200);
    res.json({status:200}); 
    return;
});

app.use(function(req, res, next){
    res.status(401);
    res.json({"status":401}); 
    return;

    // console.log('404');


  
    // // respond with json
    // if (req.accepts('json')) {
    //   res.send({ error: 'Not found' });
    //   return;
    // }
  
    // // default to plain-text. send()
    // res.type('txt').send('Not found');
  });

module.exports = app;
