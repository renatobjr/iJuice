import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const prismaConfig = {
  connection: async () => {
    try {
      await prisma.$connect();
      console.log("[✔] Prisma connected");
    } catch (error) {
      console.log("[x] Prisma failed to connect");
    }
  },
};

export default prismaConfig;
