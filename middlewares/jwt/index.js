const jwt = require('jwt-simple');

const secret = process.env.SECRET = 'qwertyuiopasdfghjklzxcvbnm123456';

const auth = (req, res, next) => {
  let tokenFromBody = null;

  if(req.header == null || req.header('authorization') == null) {
    next(new Error('Error'));
    return; 
  }

  const splitted = req.header('authorization').split(" ");

  if(splitted.length < 2) {
    next(new Error('Error'));    
  }

  token = splitted[1];

  // const token = tokenFromBody || req.tokenFromLogin;

  if(token == null) {
      res.status(401);
      res.json({status:401}); 
      return;            
  }        

  const decoded = jwt.decode(token, secret);

  /* TODO */
  // Check if token is out of date and renew it if so.

  req.jwt = decoded;

  next();
  // return;
}


module.exports = auth;