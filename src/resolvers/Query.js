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
    const links = await ctx.prisma.link.findMany({
      where,
      skip: args.skip,
      take: args.take,
      orderBy: args.orderBy,
    });
    // const count = await ctx.prisma.link.count({ where })
    return {
      links,
      count: links.length,
    };
  },
  users: async (parent, args, ctx) => await ctx.prisma.user.findMany(),
  votes: async (parent, args, ctx) => await ctx.prisma.vote.findMany(),
};

module.exports = Query;
