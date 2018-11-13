export const graphqlRoute = {
  path: '/api/jenkins/graphql',
  method: 'GET',
  handler() {
    return { time: new Date().toISOString() };
  },
};
