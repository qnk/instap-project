// const sum = require('./index.js');

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });

const nock = require('nock');

// describe('describe', () => {
  beforeAll(() => {
    const tested = nock('localhost:3000').post('/graphql');    
  });
  
  it('test_1', () => {
// console.log(tested);
    expect(1 + 2).toBe(3);
  })
// });
