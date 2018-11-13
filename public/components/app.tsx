import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageHeader,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import React from 'react';

import { Jobs } from '../model/jobs';

interface Props {
  jobs: Jobs;
}

export const App = ({ jobs }: Props) => (
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
          <EuiText>
            <pre>{JSON.stringify(jobs)}</pre>
          </EuiText>
        </EuiPageContentBody>
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
);
