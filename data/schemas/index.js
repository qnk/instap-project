const measuresSchema = `
      type QueryMeasures {
        date: Int!,
        values: [Float!]
      }
      type RootQuery {
        Measures(clientId: Int): [QueryMeasures]
        Measure(clientId: Int, date: Int): [Float!]
      }
      schema {
        query: RootQuery 
      }
    `;

module.exports = measuresSchema;