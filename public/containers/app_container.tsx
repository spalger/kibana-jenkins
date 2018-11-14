import { ApolloClient } from 'apollo-client';
import React from 'react';
import { ApolloProvider } from 'react-apollo';

import { Jobs } from '../components/jobs';

interface Props {
  client: ApolloClient<any>;
}

export const AppContainer = ({ client }: Props) => (
  <ApolloProvider client={client}>
    <Jobs />
  </ApolloProvider>
);
