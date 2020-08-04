const Subscription = {
  newLink: {
    subscribe: (parent, args, ctx, info) => {
      return ctx.pubsub.asyncIterator('NEW_LINK');
    },
    resolve: (payload) => {
      return payload;
    },
  },
  newVote: {
    subscribe: (parent, args, ctx, info) => {
      return ctx.pubsub.asyncIterator('NEW_VOTE');
    },
    resolve: (payload) => payload,
  },
};

module.exports = Subscription;
