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

  type SubBuild {
    name: String
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
  }

  type Build {
    number: Int
    url: String
    subBuilds: [SubBuild]
  }

  type Job {
    name: ID!
    displayName: String
    url: String
    color: String
    inQueue: Boolean
    labelExpression: String
    builds: [Build]
    downstreamProjects: [JobSummary]
  }

  type Query {
    kibanaJobs: [JobSummary]
    job(name: String): Job
  }
`;
