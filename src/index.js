const { GraphQLServer } = require('graphql-yoga');

const links = [
  {
    id: 'link-0',
    description: 'Full stack tutorial for graphql',
    url: 'https://howtographql.com',
  },
];

let idCount = links.length;

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
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      const { id, description, url } = args;
      const linkIndex = links.findIndex((link) => link.id === id);
      if (linkIndex === -1) {
        throw new Error('Link does not exists');
      }
      if (description) {
        links[linkIndex].description = description;
      }
      if (url) {
        links[linkIndex].url = url;
      }
      return links[linkIndex];
    },
    deleteLink: (parent, args) => {
      const { id } = args;
      const linkIndex = links.findIndex((link) => link.id === id);
      if (linkIndex === -1) {
        throw new Error('Link does not exists');
      }

      return links.splice(linkIndex, 1)[0];
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
