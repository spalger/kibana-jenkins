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

import { JobDetailPage } from './job_detail_page';
import { JobsSummaryPage } from './jobs_summary_page';

export const App = () => (
  <Router hashType="slash">
    <EuiPage>
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
    </EuiPage>
  </Router>
);
