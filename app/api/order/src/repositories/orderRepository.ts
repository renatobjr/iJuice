import { PrismaClient } from "@prisma/client";

type Product = {
  name: string;
  has_ice: boolean;
  has_sugar: boolean;
};

export type CreateOrder = {
  customer_id: number;
  vendor_id: string;
  host: string;
  quantity: number;
  products: Array<Product>;
  total_value: number;
  withdraw: Date;
};

const prisma = new PrismaClient();

const orderRepository = {
  create: async (order: CreateOrder) => {
    try {
      return await prisma.order.create({
        data: {
          customer_id: order.customer_id,
          vendor_id: order.vendor_id,
          host: order.host,
          quantity: order.quantity,
          total_value: order.total_value,
          withdraw: order.withdraw,
          products: {
            create: order.products,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  },
  list: async (customer_id: number) => {
    try {
      return await prisma.order.findMany({
        where: {
          customer_id: customer_id,
        },
        include: {
          products: true,
        },
        orderBy: {
          id: "desc",
        },
      });
    } catch (error) {
      throw error;
    }
  },
  setWithDrawCode: async (id: number, withdrawCode: string) => {
    try {
      await prisma.order.update({
        where: {
          id: id,
        },
        data: {
          withdraw_code: withdrawCode.toString(),
        },
      });
    } catch (error) {
      throw error;
    }
  },
};

export default orderRepository;
