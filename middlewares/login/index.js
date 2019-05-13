// Mocked gerenation of JWT. Could be generated with the same librery for decoding.
// Return token for customer 1 as example for login
// Move this function to JWT service in future
function getJwt(user) {
  return "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NTc3NzIxMTEsImV4cCI6MTU4OTMwODExMSwiYXVkIjoid3d3Lmluc3RhcGx5LmNvbSIsInN1YiI6ImphcW5rMTBAZ21haWwuY29tIiwiR2l2ZW5OYW1lIjoiSm9zw6kgQW50b25pbyIsIlN1cm5hbWUiOiJDdWVuY2EiLCJFbWFpbCI6ImphcW5rMTBAZ21haWwuY29tIiwiUm9sZSI6IkN1c3RvbWVyIiwiaWQiOiIxIn0.ldF4C3ia_SgZvdY9Ku-F-_YoeCBWWiadZqO65MsQNDg";
}

function sendUnauthorized() {
  res.status(401).send();
  return;
}

const login = (req, res, next) => {
  const { user, password } = req.body;

  if(user == null || password == null) sendUnauthorized();

  /* TODO */
  // Encode passowrd and check matches.
  // Send default 401 status if fails
  // if(! matchPassword(password)) sendUnauthorized();

  const token = getJwt(user);

  res.status(200).send({
    message: "Warning! Mocked token for userId 1",
    access_token: token
  });
}

module.exports = login;