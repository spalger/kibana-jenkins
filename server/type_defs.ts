import gql from 'graphql-tag';

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
export const typeDefs = gql`
  type JobSummary {
    name: ID!
    type: String!
    url: String!
    color: String!
  }

  type Query {
    kibanaJobs: [JobSummary]
  }
`;
