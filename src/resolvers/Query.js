const Query = {
  info: () => {
    return `This is API of hackernews clone`;
  },
  feed: async (parent, args, ctx) => await ctx.prisma.link.findMany(),
  users: async (parent, args, ctx) => await ctx.prisma.user.findMany(),
  votes: async (parent, args, ctx) => await ctx.prisma.vote.findMany(),
};

module.exports = Query;
