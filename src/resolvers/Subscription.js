const Subscription = {
  newLink: {
    subscribe: (parent, args, ctx, info) => {
      return ctx.pubsub.asyncIterator('NEW_LINK');
    },
    resolve: (payload) => {
      return payload;
    },
  },
};

module.exports = Subscription;
