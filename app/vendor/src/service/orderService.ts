import orderRepository from "@/vendor/repositories/orderRepository";
import { OrderDocument } from "@/vendor/schemas/orders";

const orderService = {
  creareOrder: (order: OrderDocument) => {
    orderRepository.create(order);
  },
};

export default orderService;
