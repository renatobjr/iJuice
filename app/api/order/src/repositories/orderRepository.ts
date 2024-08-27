import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const list = async (customer_id: string) => {
  return await prisma.order.findMany({
    where: {
      customer_id: {
        equals: parseInt(customer_id),
      },
    },
    orderBy: {
      status: "asc",
    },
  });
};

export default {
  list,
};
