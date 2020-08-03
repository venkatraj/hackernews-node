const { GraphQLServer } = require('graphql-yoga');
const typeDefs = `
type Query {
  info: String!
}
`;

const resolvers = {
  Query: {
    info: () => {
      return `This is API of hackernews clone`;
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log('Server is up and running on http://localhost:4000');
});
