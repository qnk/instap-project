const JwtController = require('../../controllers/jwt');
const { getTokenFromHeader } = require('../../_helpers');

function returnUnauthorized() {
  res.status(401).send();
  return; 
}

const authentication = (req, res, next) => {
  if(req.headers == null) returnUnauthorized();

  token = getTokenFromHeader(req.headers);

  if(token == null) returnUnauthorized();

  const decoded = JwtController.decode(token);

  if(decoded == null || decoded.id == null) returnUnauthorized();

  /* TODO */
  // Check if token is out of date and renew it if so.

  req.jwt = decoded;

  next();
}

module.exports = authentication;