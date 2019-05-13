const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const authenticate = require('./middlewares/authentication');
const clientAuthorization = require('./middlewares/authorization');
const measuresSchema = require('./data/schemas');
const { historyFromCustomer, measureForADay } = require('./services/measures');

const apiUri = `/api/${process.env.API_VERSION || 'v1'}`;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(authenticate);

app.use(
  `${apiUri}/customers`,
  clientAuthorization,
  graphqlHttp({
    schema: buildSchema(measuresSchema),
    rootValue: {
      Measures: (measureQuery) => { return historyFromCustomer(measureQuery.clientId) },
      Measure: (measureQuery) => { return measureForADay(measureQuery) }
    },
    graphiql: true,
    customFormatErrorFn(err) {
      if(!err.originalError) {
        return err;
      }
      // MORE LOGIC ABOUT ERROR MANAGEMENT
    }
  })
);

// app.post('/api/v1/login', (req, res, next) => {
//     const [userName, password] = [req.body['user-name'], req.body.password];

//     if(userName == null || password == null) {
//         res.status(401);
//         res.json({status:401}); 
//         return;        
//     }

//     // Retrieve JWT for user --> TO BE DONE?
//     // res.status(200);
//     // res.json({status:200}); 
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(err.status || 401).send();
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 401).send();
});

module.exports = app;
