const { GraphQLServer } = require('graphql-yoga');

const links = [
  {
    id: 'link-1',
    description: 'Full stack tutorial for graphql',
    url: 'https://howtographql.com',
  },
];

const resolvers = {
  Query: {
    info: () => {
      return `This is API of hackernews clone`;
    },
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});

server.start(() => {
  console.log('Server is up and running on http://localhost:4000');
});
