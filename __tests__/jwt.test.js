// INFORMATION ABOUT USERS AND TOKENS FOR TEST CASES
// Id 1 --> Customer (José Antonio Cuenca)
// Id 2 --> Not Customer
// Id 3 --> Customer (Fantastic Co)

// CUSTOMERS AND THEIR IDS:
//   id: 1,
//   token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NTc3NzIxMTEsImV4cCI6MTU4OTMwODExMSwiYXVkIjoid3d3Lmluc3RhcGx5LmNvbSIsInN1YiI6ImphcW5rMTBAZ21haWwuY29tIiwiR2l2ZW5OYW1lIjoiSm9zw6kgQW50b25pbyIsIlN1cm5hbWUiOiJDdWVuY2EiLCJFbWFpbCI6ImphcW5rMTBAZ21haWwuY29tIiwiUm9sZSI6IkN1c3RvbWVyIiwiaWQiOiIxIn0.ldF4C3ia_SgZvdY9Ku-F-_YoeCBWWiadZqO65MsQNDg",
// 
//   id: 2,
//   token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NTc3NzQxMDEsImV4cCI6MTU4OTMxMDEwMSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXSwiaWQiOiIyIn0.NH1wG_SOqwha5UZys0YjA80M_3uhQoQG_vOWmpacXvg",
// 
//   id: 3,
//   token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NTc3NzIxMTEsImV4cCI6MTU4OTMwODExMSwiYXVkIjoid3d3Lmluc3RhcGx5LmNvbSIsInN1YiI6ImNvbnRhY3RAZmFudGFzdGljY28uY29tIiwiR2l2ZW5OYW1lIjoiRmFudGFzdGljIiwiU3VybmFtZSI6IkNvIiwiRW1haWwiOiJjb250YWN0QGZhbnRhc3RpY2NvLmNvbSIsIlJvbGUiOiJDdXN0b21lciIsImlkIjoiMyJ9.1uU55urTRIgEostBEsa2GGAKVZqW-eeB99YjKJczb2A"

const { decode } = require('../controllers/jwt');
const notCustomer = {
  "iss": "Online JWT Builder",
  "iat": 1557774101,
  "exp": 1589310101,
  "aud": "www.example.com",
  "sub": "jrocket@example.com",
  "GivenName": "Johnny",
  "Surname": "Rocket",
  "Email": "jrocket@example.com",
  "Role": [
      "Manager",
      "Project Administrator"
  ],
  "id": "2"
};
// const customer = 

const tokenForNotCustomer = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NTc3NzQxMDEsImV4cCI6MTU4OTMxMDEwMSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXSwiaWQiOiIyIn0.NH1wG_SOqwha5UZys0YjA80M_3uhQoQG_vOWmpacXvg';
const tokenForCustomer = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NTc3NzIxMTEsImV4cCI6MTU4OTMwODExMSwiYXVkIjoid3d3Lmluc3RhcGx5LmNvbSIsInN1YiI6ImphcW5rMTBAZ21haWwuY29tIiwiR2l2ZW5OYW1lIjoiSm9zw6kgQW50b25pbyIsIlN1cm5hbWUiOiJDdWVuY2EiLCJFbWFpbCI6ImphcW5rMTBAZ21haWwuY29tIiwiUm9sZSI6IkN1c3RvbWVyIiwiaWQiOiIxIn0.ldF4C3ia_SgZvdY9Ku-F-_YoeCBWWiadZqO65MsQNDg';
const invalidToken = 'zI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NTc3NTM1MTYsImV4cCI6MTU4OTI4OTUxNiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.OCX0SdYGnlEutBZe_3_od5Y6UP6zs9nkc5lDs_jA6mo';  

describe('\n** testing all from JWT Controller **', () => {

  it('decodes_a_valid_jwt_with_the_right_secret_for_a_user_which_is_not_a_customer', () => {
    expect(decode(tokenForNotCustomer)).toStrictEqual(notCustomer);
  });
  it('fails_when_decodes_an_invalid_jwt', () => {
    expect(decode(invalidToken)).toBeFalsy();
  });
});