const Vote = {
  link: async (parent, args, ctx, info) => {
    return await ctx.prisma.vote
      .findOne({
        where: {
          id: parent.id,
        },
      })
      .link();
  },
  user: async (parent, args, ctx, info) => {
    return await ctx.prisma.vote
      .findOne({
        where: {
          id: parent.id,
        },
      })
      .user();
  },
};

module.exports = Vote;
