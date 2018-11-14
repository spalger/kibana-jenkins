import * as GraphiQL from 'apollo-server-module-graphiql';
import { Request, ResponseToolkit } from 'hapi';
import Joi from 'joi';
import { parse as parseQueryString } from 'querystring';

import { getBasePath } from './lib/request';

export const graphiqlRoute = {
  path: '/graphiql/jenkins',
  method: 'GET',
  options: {
    validate: {
      query: Joi.object()
        .keys({
          query: Joi.string(),
          variables: Joi.string(),
          operationName: Joi.string(),
        })
        .default(),
    },

    async handler(request: Request, h: ResponseToolkit) {
      const query =
        typeof request.query === 'string'
          ? parseQueryString(request.query)
          : request.query;

      const html = await GraphiQL.resolveGraphiQLString(
        {
          query: query.query,
          variables: query.variables,
          operationName: query.operationName,
        },
        {
          endpointURL: `${getBasePath(request)}/api/jenkins/graphql`,
          passHeader: `'kbn-xsrf': 'foo'`,
        }
      );

      return h.response(html).type('text/html');
    },
  },
};
