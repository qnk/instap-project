const { find } = require('../../controllers/customers');

const clientAuthorization = (req, res, next) => {
  jwt = req.jwt || next(new Error('System error'));

  if(jwt == null || jwt.Role == null ) next(new Error('System error'));

  const roles = jwt.Role;
  
  if(! roles.includes("Customer")) {
    res.status(401).send();
    return;
  }

  // For async calls (i. e. for db calls),
  // could be used await and getCustomer() must be a promise or must use async;
  req.customerId = find(jwt.id);

  next();
}

module.exports = clientAuthorization;