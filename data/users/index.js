// Id 1 --> Customer (José Antonio Cuenca)
// Id 2 --> Not Customer
// Id 3 --> Customer (Fantastic Co)

const users = [{
  id: 1,
  token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NTc3NzIxMTEsImV4cCI6MTU4OTMwODExMSwiYXVkIjoid3d3Lmluc3RhcGx5LmNvbSIsInN1YiI6ImphcW5rMTBAZ21haWwuY29tIiwiR2l2ZW5OYW1lIjoiSm9zw6kgQW50b25pbyIsIlN1cm5hbWUiOiJDdWVuY2EiLCJFbWFpbCI6ImphcW5rMTBAZ21haWwuY29tIiwiUm9sZSI6IkN1c3RvbWVyIiwiaWQiOiIxIn0.ldF4C3ia_SgZvdY9Ku-F-_YoeCBWWiadZqO65MsQNDg",
},{
  id: 2,
  token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NTc3NzQxMDEsImV4cCI6MTU4OTMxMDEwMSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXSwiaWQiOiIyIn0.NH1wG_SOqwha5UZys0YjA80M_3uhQoQG_vOWmpacXvg",
}, {
  id: 3,
  token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NTc3NzIxMTEsImV4cCI6MTU4OTMwODExMSwiYXVkIjoid3d3Lmluc3RhcGx5LmNvbSIsInN1YiI6ImNvbnRhY3RAZmFudGFzdGljY28uY29tIiwiR2l2ZW5OYW1lIjoiRmFudGFzdGljIiwiU3VybmFtZSI6IkNvIiwiRW1haWwiOiJjb250YWN0QGZhbnRhc3RpY2NvLmNvbSIsIlJvbGUiOiJDdXN0b21lciIsImlkIjoiMyJ9.1uU55urTRIgEostBEsa2GGAKVZqW-eeB99YjKJczb2A"
}];

module.exports = users;