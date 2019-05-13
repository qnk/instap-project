const customers = require('../../data/customers');

const historyFromCustomer = (clientId) => {
    const customer = customers.find(customer => customer.id === clientId);

    if(customer == null || customer.measures == null) return []; 

    return customer.measures;
};