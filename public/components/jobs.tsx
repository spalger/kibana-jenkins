import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageHeader,
  EuiTitle,
} from '@elastic/eui';
import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';

const QUERY = gql`
  {
    kibanaJobs {
      name
      type
      url
      color
    }
  }
`;

interface JobSummary {
  name: string;
  type: string;
  url: string;
  color: string;
}

export const Jobs = () => (
  <Query query={QUERY}>
    {({ loading, error, data: { kibanaJobs } }) => {
      if (loading) {
        return <p>loading...</p>;
      }

      if (error) {
        throw error;
      }

      return (
        <EuiPage>
          <EuiPageBody>
            <EuiPageHeader>
              <EuiTitle size="l">
                <h1>Jenkins</h1>
              </EuiTitle>
            </EuiPageHeader>
            <EuiPageContent>
              <EuiPageContentHeader>
                <EuiTitle>
                  <h2>Jobs</h2>
                </EuiTitle>
              </EuiPageContentHeader>
              <EuiPageContentBody>
                <ul>
                  {kibanaJobs.map((j: JobSummary) => (
                    <li key={j.name}>
                      <a href={j.url}>
                        {j.name} - {j.color}
                      </a>
                    </li>
                  ))}
                </ul>
              </EuiPageContentBody>
            </EuiPageContent>
          </EuiPageBody>
        </EuiPage>
      );
    }}
  </Query>
);
