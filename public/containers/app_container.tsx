import ApolloClient, { InMemoryCache } from 'apollo-boost';
import gql from 'graphql-tag';
import React from 'react';
import chrome from 'ui/chrome';

import { App } from '../components/app';
import { Jobs } from '../model/jobs';

interface State {
  jobs?: Jobs;
}

export class AppContainer extends React.Component<{}, State> {
  public state: State = {};

  private client?: ApolloClient<InMemoryCache>;

  public componentDidMount() {
    this.client = new ApolloClient({
      uri: chrome.addBasePath('/api/jenkins/graphql'),
    });

    this.client
      .query<Jobs>({
        query: gql`
          {
            jobs {
              url
            }
          }
        `,
      })
      .then(result => {
        this.setState({
          jobs: result.data,
        });
      });
  }

  public render() {
    const { jobs } = this.state;

    if (!jobs) {
      return null;
    }

    return <App jobs={jobs} />;
  }
}
