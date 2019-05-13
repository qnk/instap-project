const customers = require('../../data/customers');

const CustomersController = {
    get: (clientId) => { return customers.find(customer => customer.id === clientId) }
}

module.exports = CustomersController;