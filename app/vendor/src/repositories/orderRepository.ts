import { Order } from "@/vendor/schemas/orders";
import { OrderDocument } from "@/vendor/schemas/orders";

const orderRepository = {
  create: async (order: OrderDocument) => {
    return await Order.create(order);
  },
};

export default orderRepository;
