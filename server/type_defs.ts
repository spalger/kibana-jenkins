import { gql } from 'apollo-server';

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
export const typeDefs = gql`
  # This "Book" type can be used in other type declarations.
  type Job {
    id: ID!
    url: String!
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    jobs: [Job]
  }
`;
