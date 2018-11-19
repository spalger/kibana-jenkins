import { JenkinsApi, JenkinsJob, JenkinsView } from './jenkins_api';

type Resolver<P, A> = (
  obj: P,
  args: A,
  context: { api: JenkinsApi },
  info: unknown
) => Promise<any>;

interface Resolvers {
  [key: string]: {
    [key: string]: Resolver<any, any>;
  };
}

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
export const resolvers: Resolvers = {
  Job: {
    builds: async (job, _, { api }) => Promise.all(job.builds),
  } as {
    builds: Resolver<JenkinsJob, void>;
  },

  View: {
    jobs: async (view, _, { api }) =>
      Promise.all(view.jobs.map(j => api.getJob(j.name))),
  } as {
    jobs: Resolver<JenkinsView, void>;
  },

  Query: {
    job: async (_, { name }, { api }) => api.getJob(name),
    view: async (_, { name }, { api }) => api.getView(name),
  } as {
    job: Resolver<void, { name: string }>;
    view: Resolver<void, { name: string }>;
  },
};
