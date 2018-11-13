import React from 'react';
import {
  EuiPage,
  EuiPageHeader,
  EuiTitle,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentBody,
  EuiText,
} from '@elastic/eui';

export const Main = ({ title }) => (
  <EuiPage>
    <EuiPageBody>
      <EuiPageHeader>
        <EuiTitle size="l">
          <h1>{title} Hello World!</h1>
        </EuiTitle>
      </EuiPageHeader>
      <EuiPageContent>
        <EuiPageContentHeader>
          <EuiTitle>
            <h2>Congratulations</h2>
          </EuiTitle>
        </EuiPageContentHeader>
        <EuiPageContentBody>
          <EuiText>
            <h3>You have successfully created your first Kibana Plugin!</h3>
            <p>
              The server time (via API call) is{' '}
              {this.state.time || 'NO API CALL YET'}
            </p>
          </EuiText>
        </EuiPageContentBody>
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
);
