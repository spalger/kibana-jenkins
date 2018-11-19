import gql from 'graphql-tag';

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
export const typeDefs = gql`
  type Build {
    id: String
    number: Int
    abort: Boolean
    duration: String
    icon: String
    multiJobBuild: Boolean
    parentBuildNumber: Int
    parentJobName: String
    phaseName: String
    result: String
    retry: Boolean
    url: String
    children: [Build]
  }

  type Job {
    id: ID!
    displayName: String
    url: String
    color: String
    inQueue: Boolean
    labelExpression: String
    builds: [Build]
    downstreamProjects: [Job]
  }

  type View {
    jobs: [Job]
  }

  type Query {
    view(id: String!): View
    job(id: String): Job
  }
`;
