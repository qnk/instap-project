const getCustomer = require('../controllers/customers').get;
const customerWithIdOne = {
  "id": 1, "measures": [{"date": 123456, "values": [25, 27.2, 28]}, {"date": 654321, "values": [30]}]
}

describe('\n** testing getCustomer from CUSTOMER Controller **', () => {
  it('get_the_customer_with_its_measures_from_customer_with_id_1', () => {
    expect(getCustomer(1)).toStrictEqual(customerWithIdOne);
  });

  it('get_falsy_value_when_trying_to_get_a_customer_which_does_not_exist', () => {
    expect(getCustomer(9)).toBeFalsy();
  });

  it('get_falsy_value_when_passes_an_invalid_param_to_get_customer', () => {
    expect(getCustomer('hj')).toBeFalsy();
  });
});

// --------------------------

const allMeasuresForADate = require('../controllers/measures').all;

const measures = [{
  date: 123456,
  values: [25, 27.2, 28]
}, {
  date: 654321,
  values: [30]
}]

describe('\n** testing all from MEASURES Controller **', () => {
  it('filter_all_valid_measures_for_a_given_date', () => {
    expect(allMeasuresForADate(measures, 123456)).toStrictEqual(
      { date: 123456, values: [25, 27.2, 28]}
    )
  });

  it('get_falsy_value_when_trying_to_find_a_measure_whith_a_date_wich_does_not_exist', () => {
    expect(allMeasuresForADate(measures, 166456)).toBeFalsy();
  });

  it('get_falsy_value_when_passes_an_invalid_param_to_get_measures', () => {
    expect(allMeasuresForADate([], 123456)).toBeFalsy();
  });
});

// ---

const JwtController = require('../controllers/jwt');
const user = {
  "iss": "Online JWT Builder",
  "iat": 1557753516,
  "exp": 1589289516,
  "aud": "www.example.com",
  "sub": "jrocket@example.com",
  "GivenName": "Johnny",
  "Surname": "Rocket",
  "Email": "jrocket@example.com",
  "Role": [
      "Manager",
      "Project Administrator"
  ]
};

describe('\n** testing all from JWT Controller **', () => {
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NTc3NTM1MTYsImV4cCI6MTU4OTI4OTUxNiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.OCX0SdYGnlEutBZe_3_od5Y6UP6zs9nkc5lDs_jA6mo';
  const invalidToken = 'zI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NTc3NTM1MTYsImV4cCI6MTU4OTI4OTUxNiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.OCX0SdYGnlEutBZe_3_od5Y6UP6zs9nkc5lDs_jA6mo';  

  const nock = require('nock');

  it('decodes_a_valid_jwt_with_the_right_secret', () => {
    expect(JwtController.decode(token)).toStrictEqual(user);
  });
  it('fails_when_decodes_an_invalid_jwt', () => {
    expect(JwtController.decode(invalidToken)).toBeFalsy();
  });
});

const { measureForADay, historyFromCustomer } = require('../services/measures');

describe('\n** testing all from SERVICES **', () => {
  
  describe('--- Measures FOR A DAY:  ', () => {
    it('returns_valid_measures_for_a_valid_client-id_and_valid_date', () => {
      expect(measureForADay({clientId: 1, date: 123456})).toStrictEqual([25, 27.2, 28]);
    });
    it('returns_an_empty_array_for_an_unexisting_client-id', () => {
      expect(measureForADay({clientId: 99, date: 123456})).toStrictEqual([]);
    });
    it('returns_an_empty_array_for_an_unexisting_date', () => {
      expect(measureForADay({clientId: 99, date: 824456})).toStrictEqual([]);
    });
    it('returns_an_empty_array_for_an_unvalid_client-id', () => {
      expect(measureForADay({clientId: 'asd', date: 824456})).toStrictEqual([]);
    });
    it('returns_an_empty_array_for_an_unvalid_date', () => {
      expect(measureForADay({clientId: 1, date: 'sss'})).toStrictEqual([]);
    });
  });

  const customerHistory = [{
    date: 123456,
    values: [25, 27.2, 28]
  }, {
    date: 654321,
    values: [30]
  }];
  
  describe('--- Measures FOR CUSTOMER\'s HISTORY  ', () => {
    it('returns_valid_history_for_a_valid_client-id', () => {
      expect(historyFromCustomer(1)).toStrictEqual(customerHistory);
    });
    it('returns_an_empty_array_for_an_unexisting_client-id', () => {
      expect(historyFromCustomer(99)).toStrictEqual([]);
    });
    it('returns_an_empty_array_for_an_unvalid_client-id', () => {
      expect(historyFromCustomer('unvalid')).toStrictEqual([]);
    });
  });
});