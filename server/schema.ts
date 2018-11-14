import { makeExecutableSchema } from 'graphql-tools';

import { resolvers } from './resolvers';
import { typeDefs } from './type_defs';

export function createSchema(logFn: (tags: string[], msg: string) => void) {
  return makeExecutableSchema({
    resolvers,
    typeDefs,
    logger: {
      log: error => {
        logFn(
          ['error', 'jenkins', 'graphql'],
          error instanceof Error && error.stack ? error.stack : String(error)
        );
      },
    },
  });
}
