import { resolve } from 'path';
import { graphqlRoute } from './server/routes/graphql';

// tslint:disable-next-line no-default-export
export default function(kibana: any) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'jenkins',
    uiExports: {
      app: {
        title: 'Jenkins',
        description: 'Jenkins View in Kibana',
        main: 'plugins/jenkins/app',
      },
      styleSheetPaths: resolve(__dirname, 'public/app.scss'),
    },

    config(Joi: any) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    init(server: any) {
      server.route(graphqlRoute);
    },
  });
}
