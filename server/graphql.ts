/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { runHttpQuery } from 'apollo-server-core';
import * as ApolloServerEnv from 'apollo-server-env';

import Boom from 'boom';
import { Request, ResponseToolkit, ServerRoute } from 'hapi';

import { createSchema } from './schema';

interface Opts {
  logFn: (tags: string[], msg: string) => void;
}

export function createGraphqlRoutes({ logFn }: Opts) {
  const schema = createSchema(logFn);

  const realRequestCache = new WeakMap();

  async function handler(request: Request, h: ResponseToolkit) {
    try {
      const query =
        request.method === 'post'
          ? (request.payload as Record<string, any>)
          : (request.query as Record<string, any>);

      const options = {
        context: {
          req: {
            params: request.params,
            payload: request.payload,
            query: request.query,
          },
        },
        schema,
      };

      realRequestCache.set(options.context.req, request);

      const {
        graphqlResponse,
        responseInit: { headers = {} },
      } = await runHttpQuery([request], {
        method: request.method.toUpperCase(),
        options,
        query,
        request: (request.raw.req as unknown) as ApolloServerEnv.Request,
      });

      const resp = h.response(graphqlResponse);
      for (const [name, value] of Object.entries(headers)) {
        resp.header(name, value);
      }
      return resp;
    } catch (error) {
      if ('HttpQueryError' !== error.name) {
        const queryError = Boom.boomify(error);

        queryError.output.payload.message = error.message;

        return queryError;
      }

      if (error.isGraphQLError === true) {
        return h
          .response(error.message)
          .code(error.statusCode)
          .type('application/json');
      }

      const genericError = new Boom(error.message, {
        statusCode: error.statusCode,
      });

      if (error.headers) {
        Object.keys(error.headers).forEach(header => {
          genericError.output.headers[header] = error.headers[header];
        });
      }

      // Boom hides the error when status code is 500

      genericError.output.payload.message = error.message;

      throw genericError;
    }
  }

  return [
    {
      path: '/api/jenkins/graphql',
      method: 'GET',
      options: {
        handler,
      },
    },
    {
      path: '/api/jenkins/graphql',
      method: 'POST',
      options: {
        payload: {
          allow: 'application/json',
          output: 'data' as 'data',
          parse: true,
        },
        handler,
      },
    },
  ] as ServerRoute[];
}
