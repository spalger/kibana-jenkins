import { resolve } from 'path';
import exampleRoute from './server/routes/example';

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
      // eslint-disable-line no-unused-vars
      // Add server routes and initialize the plugin here
      exampleRoute(server);
    },
  });
}
