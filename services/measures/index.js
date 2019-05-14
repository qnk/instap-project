const path = require('path');

const measureForADay = require(
    path.normalize(__dirname + '/measureForADay.js')
);

const historyFromCustomer = require(
    path.normalize(__dirname + '/historyFromCustomer.js')
);

module.exports = { measureForADay, historyFromCustomer };
