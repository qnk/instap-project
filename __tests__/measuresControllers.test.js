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