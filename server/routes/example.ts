export default function(server: any) {
  server.route({
    path: '/api/jenkins/example',
    method: 'GET',
    handler() {
      return { time: new Date().toISOString() };
    },
  });
}
