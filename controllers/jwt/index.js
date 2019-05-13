const secret = process.env.SECRET || 'qwertyuiopasdfghjklzxcvbnm123456';
const jwt = require('jwt-simple');
const jwtRegexp = /^[A-Za-z0-9-_=]{36}\.[A-Za-z0-9-_=]{303}\.?[A-Za-z0-9-_.+/=]*$/;

const JwtController = {
    decode: (token) => {
        if(! jwtRegexp.test(token)) return null;
        
        return jwt.decode(token, secret);
    }
}

module.exports = JwtController;