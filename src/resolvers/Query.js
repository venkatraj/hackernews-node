const Query = {
  info: () => {
    return `This is API of hackernews clone`;
  },
  feed: async (parent, args, ctx) => {
    const where = args.filter
      ? {
          OR: [
            { description: { contains: args.filter } },
            { url: { contains: args.filter } },
          ],
        }
      : {};
    return await ctx.prisma.link.findMany({
      where,
      skip: args.skip,
      take: args.take,
    });
  },
  users: async (parent, args, ctx) => await ctx.prisma.user.findMany(),
  votes: async (parent, args, ctx) => await ctx.prisma.vote.findMany(),
};

module.exports = Query;
