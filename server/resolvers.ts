import { jobs } from './jobs';

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
export const resolvers = {
  Query: {
    jobs: () => jobs,
  },
};
