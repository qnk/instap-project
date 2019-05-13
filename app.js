const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const auth = require('./middlewares/auth');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const graphqlHttp = require('express-graphql');
// const graphqlSchema = require('./graphql/schema');
// const graphqlResolver = require('./graphql/resolvers');
const { buildSchema, graphql, GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');

const measuresSchema = require('./data/schemas');
const customers = require('./data/customers');
const CustomerController = require('./controllers/customers');
const MeasureController = require('./controllers/measures');

app.use(
  '/graphql',
  auth,
  graphqlHttp({
    schema: buildSchema(measuresSchema),
    rootValue: {
      Measures: (clientId) => {
        const customer = customers.find(customer => customer.id === clientId.clientId);

        if(customer == null || customer.measures == null) return []; 

        return customer.measures;
      },
      Measure: (measureQuery) => {
        const { clientId, date } = measureQuery;

        if(clientId == null || date == null) return [];

        const customer = CustomerController.get(clientId);
        const measure =  MeasureController.all(customer.measures, date);
        
        return measure.values;
      }
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
