import { Server } from 'hapi';
import { resolve } from 'path';

import { createGraphqlRoutes, graphiqlRoute } from './server';

// tslint:disable-next-line no-default-export
export default function(kibana: any) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'jenkins',
    uiExports: {
      app: {
        title: 'Jenkins',
        description: 'Jenkins View in Kibana',
        main: 'plugins/jenkins/jenkins',
      },
      styleSheetPaths: resolve(__dirname, 'public/jenkins.scss'),
    },

    config(Joi: any) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    async init(server: Server) {
      server.route(graphiqlRoute);
      server.route(createGraphqlRoutes({ logFn: server.log }));
    },
  });
}
