export default function(server) {
  server.route({
    path: '/api/jenkins/example',
    method: 'GET',
    handler() {
      return { time: new Date().toISOString() };
    },
  });
}
