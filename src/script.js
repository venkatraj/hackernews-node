const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const main = async () => {
  const newLink = await prisma.link.create({
    data: {
      description: 'Fullstack GraphQL tutorial',
      url: 'https://howtographql.com',
    },
  });
  const allLinks = await prisma.link.findMany();
  console.log(allLinks);
};

main()
  .catch((e) => console.log(e))
  .finally(async () => {
    await prisma.disconnect();
  });
