import fetch from 'node-fetch';

interface JenkinsJobSummaryResp {
  _class: string;
  name: string;
  url: string;
  color: string;
}

interface JenkinsKibanaViewResp {
  _class: string;
  description: string | null;
  name: string;
  property: [];
  url: string;
  jobs: JenkinsJobSummaryResp[];
}

interface JenkinsJobBuildResp {
  _class: string;
  number: number;
  url: string;
  subBuilds?: Array<{
    abort: boolean;
    build: {
      _class: string;
    };
    buildNumber: number;
    duration: string;
    icon: string;
    jobName: string;
    multiJobBuild: boolean;
    parentBuildNumber: number;
    parentJobName: string;
    phaseName: string;
    result: string;
    retry: boolean;
    url: string;
  }>;
}

interface JenkinsJobResp {
  _class: string;
  actions: Array<{
    _class?: string;
  }>;
  description: string;
  displayName: string;
  displayNameOrNull: string | null;
  fullDisplayName: string;
  fullName: string;
  name: string;
  url: string;
  buildable: boolean;
  builds: JenkinsJobBuildResp[];
  color: string;
  firstBuild?: JenkinsJobBuildResp;
  healthReport: Array<{
    descrption: string;
    iconClassName: string;
    iconUrl: string;
    score: number;
  }>;
  inQueue: boolean;
  keepDependencies: boolean;
  lastBuild?: JenkinsJobBuildResp;
  lastCompletedBuild?: JenkinsJobBuildResp;
  lastFailedBuild?: JenkinsJobBuildResp;
  lastStableBuild?: JenkinsJobBuildResp;
  lastSuccessfulBuild?: JenkinsJobBuildResp;
  lastUnstableBuild?: JenkinsJobBuildResp;
  lastUnsuccessfulBuild?: JenkinsJobBuildResp;
  nextBuildNumber: number;
  property: Array<{
    _class: string;
  }>;
  queueItem?: unknown;
  concurrentBuild: boolean;
  downstreamProjects: JenkinsJobSummaryResp[];
  labelExpression: string;
  scm: {
    _class: string;
  };
  upstreamProjects: JenkinsJobSummaryResp[];
}

interface JobQueryParams {
  name: string;
}

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
export const resolvers = {
  Query: {
    kibanaJobs: async () =>
      fetch('https://kibana-ci.elastic.co/view/Kibana/api/json')
        .then(res => res.json())
        .then(({ jobs }: JenkinsKibanaViewResp) =>
          jobs.map(job => ({
            name: job.name,
            type: job._class,
            url: job.url,
            color: job.color,
          }))
        ),
    job: async (_: any, { name }: JobQueryParams) =>
      fetch(
        `https://kibana-ci.elastic.co/job/${encodeURIComponent(name)}/api/json`
      )
        .then(res => res.json())
        .then((job: JenkinsJobResp) => ({
          name,
          displayName: job.displayName || job.fullDisplayName,
          url: job.url,
          buildable: job.buildable,
          builds: (job.builds || []).map(b => ({
            number: b.number,
            url: b.url,
            subBuilds: (b.subBuilds || []).map(sb => ({
              name: sb.jobName,
              number: sb.buildNumber,
              abort: sb.abort,
              duration: sb.duration,
              icon: sb.icon,
              multiJobBuild: sb.multiJobBuild,
              parentBuildNumber: sb.parentBuildNumber,
              parentJobName: sb.parentJobName,
              phaseName: sb.phaseName,
              result: sb.result,
              retry: sb.retry,
              url: sb.url,
            })),
          })),
          color: job.color,
          inQueue: job.inQueue,
          downstreamProjects: job.downstreamProjects || [],
          labelExpression: job.labelExpression,
        })),
  },
};
