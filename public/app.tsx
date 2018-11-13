import React from 'react';
// @ts-ignore
import { uiModules } from 'ui/modules';
import chrome from 'ui/chrome';
import { render, unmountComponentAtNode } from 'react-dom';

import 'ui/autoload/styles';
import { Main } from './components/main';

const app = uiModules.get('apps/jenkins');

app.config(($locationProvider: any, stateManagementConfigProvider: any) => {
  $locationProvider.html5Mode({
    enabled: false,
    requireBase: false,
    rewriteLinks: false,
  });

  stateManagementConfigProvider.disable()
});

function RootController($scope: any, $element: any) {
  const domNode = $element[0];

  // render react to DOM
  render(<Main title="jenkins" /> as any, domNode);

  // unmount react on controller destroy
  $scope.$on('$destroy', () => {
    unmountComponentAtNode(domNode);
  });
}

chrome.setRootController('jenkins', RootController);
