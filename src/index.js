const { GraphQLServer, PubSub } = require('graphql-yoga');
const { PrismaClient } = require('@prisma/client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Subscription');
const Link = require('./resolvers/Link');
const User = require('./resolvers/User');
const Vote = require('./resolvers/Vote');

const pubsub = new PubSub();
const prisma = new PrismaClient();

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Link,
  User,
  Vote,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: (request) => {
    return {
      ...request,
      pubsub,
      prisma,
    };
  },
});

server.start(() => {
  console.log('Server is up and running on http://localhost:4000');
});
