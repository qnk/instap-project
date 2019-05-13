const getCustomer = require('../controllers/customers').find;
const customerWithIdOne = {
  "id": 1, "measures": [{"date": 123456, "values": [25, 27.2, 28]}, {"date": 654321, "values": [30]}]
}

describe('\n** testing find from CUSTOMER Controller **', () => {
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
