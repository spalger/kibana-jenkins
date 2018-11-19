import {
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiTitle,
} from '@elastic/eui';
import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';

const QUERY = gql`
  {
    jobsView(name: "Kibana") {
      name
      displayName
      url
      color
      inQueue
      labelExpression
    }
  }
`;

interface JobSummary {
  name: string;
  type: string;
  url: string;
  color: string;
}

export const JobsSummaryPage = () => (
  <Query query={QUERY}>
    {({ loading, error, data: { kibanaJobs } }) => {
      if (loading) {
        return <p>loading...</p>;
      }

      if (error) {
        throw error;
      }

      return (
        <>
          <EuiPageContentHeader>
            <EuiTitle>
              <h2>Jobs</h2>
            </EuiTitle>
          </EuiPageContentHeader>
          <EuiPageContentBody>
            <ul>
              {kibanaJobs.map((j: JobSummary) => (
                <li key={j.name}>
                  <a href={`#/job/${j.name}`}>
                    {j.name} - {j.color}
                  </a>
                </li>
              ))}
            </ul>
          </EuiPageContentBody>
        </>
      );
    }}
  </Query>
);
