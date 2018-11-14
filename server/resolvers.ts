import fetch from 'node-fetch';

interface JenkinsKibanaViewResp {
  _class: string;
  description: string | null;
  name: string;
  property: [];
  url: string;
  jobs: Array<{
    _class: string;
    name: string;
    url: string;
    color: string;
  }>;
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
  },
};
