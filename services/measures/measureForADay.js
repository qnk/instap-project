const CustomerController = require('../../controllers/customers');
const MeasureController = require('../../controllers/measures');

const measureForADay = (measureQuery) => {
    const { clientId, date } = measureQuery;
    // Using graphqlHttp we avoid the need of checking for right values
  
    const customer = CustomerController.get(clientId);
  
    if(customer == null || customer.measures == null) return [];
  
    const measure =  MeasureController.all(customer.measures, date);
    
    if(measure == null || measure.values == null) return [];        
  
    return measure.values;
};

module.exports = measureForADay;
