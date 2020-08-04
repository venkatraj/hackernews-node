const Link = {
  postedBy: async (parent, args, ctx, info) => {
    return await ctx.prisma.link
      .findOne({
        where: {
          id: parent.id,
        },
      })
      .postedBy();
  },
  votes: async (parent, args, ctx, info) => {
    return await ctx.prisma.link
      .findOne({
        where: {
          id: parent.id,
        },
      })
      .votes();
  },
};

module.exports = Link;
