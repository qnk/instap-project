const graphqlHttp = require('express-graphql');
// const graphqlSchema = require('./graphql/schema');
// const graphqlResolver = require('./graphql/resolvers');
const { graphql, buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');

const graphqlController = function() {
    console.log('etra')
    return graphqlHttp({
        schema: buildSchema(`
            type QueryMeasures {
                date: Int!,
                values: [Float!]
            }
            type RootQuery {
                Measures(clientId: Int): [Int!]
                Measure(clientId: Int, date: Int): [Float!]
            }
            schema {
                query: RootQuery 
            }
        `),
        rootValue: {
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
        },
        graphiql: true,
        customFormatErrorFn(err) {
            if(!err.originalError) {
                return err;
            }
        // MORE LOGIC ABOUT ERROR MANAGEMENT
        }
    });
  }

  module.exports = graphqlController;