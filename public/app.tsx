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

  // render react to DOM
  render(<AppContainer /> as any, domNode);

  // unmount react on controller destroy
  $scope.$on('$destroy', () => {
    unmountComponentAtNode(domNode);
  });
}

chrome.setRootController('jenkins', RootController);
