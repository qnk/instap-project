const { measureForADay, historyFromCustomer } = require('../services/measures');

const customerHistory = [{
  date: 123456,
  values: [25, 27.2, 28]
}, {
  date: 654321,
  values: [30]
}];

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