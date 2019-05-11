const authController = require('../../controllers/jwt');
const secret = 'qwertyuiopasdfghjklzxcvbnm123456';

const auth = (req, res, next) => {
  let auth = false;

  try {
    auth = authController.jwt().then((token) => {
      if(! token) {
        next(new Error('Auth error'));
        return;
      }

      const decoded = jwt.decode(token, secret);

      /* TODO */
      // Check if token is out of date and renew it if so.

    });
  }
  catch(e) {
    return res.status(500).send();
  }

  next();
  
};

module.exports = auth;