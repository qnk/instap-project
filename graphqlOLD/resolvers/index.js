const measuresSchema = function() {
  Measures: (clientId) => {
    const customer = _.filter(customers, { id: clientId.clientId });

    if(customer.length < 1) {
      return 0;
    }

    const measures =  customer[0].measures;
    return measures;
  },
  Measure: (measureQuery) => {
    const customer = _.filter(customers, { id: measureQuery.clientId });

    if(customer.length < 1) {
      return 0;
    }

    const measures =  customer[0].measures;
    const measure =  _.filter(measures, { date: measureQuery.date })[0];
    
    return measure.values;
  }
}

module.exports = measuresSchema;