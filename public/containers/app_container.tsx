import { ApolloClient } from 'apollo-client';
import React from 'react';
import { ApolloProvider } from 'react-apollo';

import { App } from '../components/app';

interface Props {
  client: ApolloClient<any>;
}

export const AppContainer = ({ client }: Props) => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
