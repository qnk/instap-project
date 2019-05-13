const customers = require('../../data/customers');

const CustomersController = {
    find: (clientId) => { return customers.find(customer => customer.id === clientId) }
}

module.exports = CustomersController;