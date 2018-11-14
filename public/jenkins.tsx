import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import 'ui/autoload/styles';
import chrome from 'ui/chrome';

// @ts-ignore
import { uiModules } from 'ui/modules';

import { AppContainer } from './containers';

const app = uiModules.get('apps/jenkins');

app.config(($locationProvider: any, stateManagementConfigProvider: any) => {
  $locationProvider.html5Mode({
    enabled: false,
    requireBase: false,
    rewriteLinks: false,
  });

  stateManagementConfigProvider.disable();
});

function RootController($scope: any, $element: any) {
  const domNode = $element[0];

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({
      uri: chrome.addBasePath('/api/jenkins/graphql'),
      headers: {
        'kbn-version': chrome.getKibanaVersion(),
      },
    }),
  });

  // render react to DOM
  render(<AppContainer client={client} />, domNode);

  // unmount react on controller destroy
  $scope.$on('$destroy', () => {
    unmountComponentAtNode(domNode);
  });
}

chrome.setRootController('jenkins', RootController);
