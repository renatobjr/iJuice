import {
  OrderListResponse,
  OrderResponse,
  OrderServer,
} from "@/order/generated/order";
import orderRepository from "@/order/repositories/orderRepository";

const OrderService: OrderServer = {
  list: async (_call, callback) => {
    if (_call.request.user?.id) {
      let customer_id = _call.request.user.id;

      let dbOrders = await orderRepository.list(customer_id);
      let orders: OrderResponse[] = dbOrders.map((order) => ({
        id: order.id.toString(),
        customer_id: order.customer_id.toString(),
        product_id: order.product_id,
        quantity: order.quantity,
        total_value: order.total_value,
        withdraw_day: order.withdraw_day.toString(),
        withdraw_time: order.withdraw_time.toString(),
        status: order.status,
      }));

      callback(null, { orders });
    }
  },
  create: async (_call, callback) => {},
};

export default OrderService;
