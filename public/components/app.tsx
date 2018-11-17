import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageHeader,
  EuiTitle,
} from '@elastic/eui';
import React from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import styled from 'styled-components';

import { JobDetailPage } from './job_detail_page';
import { JobsSummaryPage } from './jobs_summary_page';

const FullEuiPage = styled(EuiPage)`
  flex: 1 1 auto;
`;

export const App = () => (
  <Router hashType="slash">
    <FullEuiPage>
      <EuiPageBody>
        <EuiPageHeader>
          <EuiTitle size="l">
            <h1>Jenkins</h1>
          </EuiTitle>
        </EuiPageHeader>
        <EuiPageContent>
          <Switch>
            <Route exact path="/" component={JobsSummaryPage} />
            <Route exact path="/job/:name" component={JobDetailPage} />
            <Redirect to="/" />
          </Switch>
        </EuiPageContent>
      </EuiPageBody>
    </FullEuiPage>
  </Router>
);
