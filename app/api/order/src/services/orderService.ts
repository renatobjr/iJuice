import {
  OrderListResponse,
  OrderResponse,
  OrderServer,
} from "@/order/generated/order";
import OrderRepository, {
  CreateOrder,
} from "@/order/repositories/orderRepository";
import { status } from "@grpc/grpc-js";
import OrderQueue from "../broker/orderQueue";

const OrderService: OrderServer = {
  create: async (_call, callback) => {
    try {
      const withdraw = `${_call.request.withdraw_day}T${_call.request.withdraw_time}:00`;

      let payload: CreateOrder = {
        ..._call.request,
        withdraw: new Date(withdraw),
        total_value: Number(_call.request.total_value),
      };

      let orderCreated = await OrderRepository.create(payload);
      let response = await OrderQueue.sendToVendor(payload);

      console.log(orderCreated, response);

      OrderRepository.setWithDrawCode(orderCreated.id, response.withdraw_code);

      callback(null, { status: true, message: response.withdraw_code });
    } catch (error) {
      console.error(error);
      callback(
        { code: status.CANCELLED, details: "It's not possible create order" },
        null
      );
    }
  },
  list: async (_call, callback) => {
    try {
      let customer_id = parseInt(_call.request.customer_id);

      const orders: any = await OrderRepository.list(customer_id);

      const orderResponses: any = orders.map((order: any) => {
        const dateObject = new Date(order.withdraw);

        const formattedDate = dateObject.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

        const formattedTime = dateObject.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, // Para hora no formato 24 horas
        });

        return {
          id: order.id,
          customer_id: order.customer_id,
          vendor_id: order.vendor_id,
          quantity: order.quantity,
          host: order.host,
          products: [...order.products],
          total_value: order.total_value,
          withdraw_day: formattedDate,
          withdraw_time: formattedTime,
          status: order.status,
          withdraw_code: order.withdraw_code,
        };
      });

      callback(null, { orders: orderResponses });
    } catch (error) {
      console.error(error);
      callback(
        { code: status.CANCELLED, details: "It's not possible list orders" },
        null
      );
    }
  },
};

export default OrderService;
