import exampleRoute from './server/routes/example';

export default function(kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'jenkins',
    uiExports: {
      app: {
        title: 'Jenkins',
        description: 'Jenkins View in Kibana',
        main: 'plugins/jenkins/app',
      },
      styleSheetPaths: require('path').resolve(__dirname, 'public/app.scss'),
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    init(server) {
      // eslint-disable-line no-unused-vars
      // Add server routes and initialize the plugin here
      exampleRoute(server);
    },
  });
}
