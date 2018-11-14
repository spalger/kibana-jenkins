import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps<{ name: string }> {}

const QUERY = gql`
  query Job($name: String!) {
    job(name: $name) {
      name
      displayName
      url
      color
      inQueue
      labelExpression
      builds {
        number
        url
        subBuilds {
          name
          number
          duration
          icon
          phaseName
          result
          url
        }
      }
    }
  }
`;

export const JobDetailPage = ({
  match: {
    params: { name },
  },
}: Props) => (
  <Query query={QUERY} variables={{ name }}>
    {({ loading, error, data: { job } }) => {
      if (loading) {
        return <p>Loading...</p>;
      }

      if (error) {
        throw error;
      }

      return (
        <>
          <pre>{JSON.stringify(job, null, 2)}</pre>
        </>
      );
    }}
  </Query>
);
