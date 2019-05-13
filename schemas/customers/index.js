const SchemaObject = require('schema-object');
 
// const Measure = new SchemaObject({
//   date: Number,
//   values: [Number]
// });

// Create Customer schema
const CustomerSchema = new SchemaObject({
  id: Number
});

module.exports = CustomerSchema;