const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

const Mutation = {
  post: async (parent, args, ctx) => {
    const userId = getUserId(ctx);
    const link = await ctx.prisma.link.create({
      data: {
        description: args.description,
        url: args.url,
        postedBy: {
          connect: {
            id: userId,
          },
        },
      },
    });
    ctx.pubsub.publish('NEW_LINK', link);
    return link;
  },
  updateLink: async (parent, args, ctx) => {
    const { id, description, url } = args;
    return await prisma.link.update({
      where: {
        id: parseInt(args.id),
      },
      data: {
        description,
        url,
      },
    });
  },
  deleteLink: async (parent, args, ctx) => {
    const { id } = args;
    return await prisma.link.delete({
      where: {
        id: parseInt(args.id),
      },
    });
  },
  signup: async (parent, args, ctx, info) => {
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.prisma.user.create({
      data: {
        ...args,
        password,
      },
    });
    const token = await jwt.sign({ userId: user.id }, APP_SECRET);
    return {
      token,
      user,
    };
  },
  login: async (parent, args, ctx, info) => {
    const user = await ctx.prisma.user.findOne({
      where: {
        email: args.email,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      throw new Error('Incorrect password');
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
      token,
      user,
    };
  },
  vote: async (parent, args, context, info) => {
    const userId = getUserId(context);
    const vote = await context.prisma.vote.findOne({
      where: {
        linkId_userId: {
          linkId: Number(args.linkId),
          userId: Number(userId),
        },
      },
    });

    if (Boolean(vote)) {
      // throw new Error('Already voted');
      console.log('Already voted');
      return;
    }

    const newVote = await context.prisma.vote.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        link: {
          connect: {
            id: Number(args.linkId),
          },
        },
      },
    });

    context.pubsub.publish('NEW_VOTE', newVote);
    return newVote;
  },
};

module.exports = Mutation;
