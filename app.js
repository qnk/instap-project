const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const authenticate = require('./middlewares/authentication');
const clientAuthorization = require('./middlewares/authorization');
const login = require('./middlewares/login');

const measuresSchema = require('./schemas/graphql');
const { historyFromCustomer, measureForADay } = require('./services/measures');

const apiUri = `/api/${process.env.API_VERSION || 'v1'}`;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post(`${apiUri}/login`, login);

app.use(authenticate);

/* TODO */
// Move buisiness login to their own components.
app.post(
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(err.status || 404).send();
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 401).send();
});

module.exports = app;
