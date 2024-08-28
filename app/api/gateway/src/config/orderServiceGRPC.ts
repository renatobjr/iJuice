import { OrderClient } from "@/gateway/generated/order";
import { credentials } from "@grpc/grpc-js";

const ORDER_GRPC_SERVER = process.env.ORDER_GRPC_SERVER;

const OrderClientGRPC = new OrderClient(
  ORDER_GRPC_SERVER as string,
  credentials.createInsecure()
);

export default OrderClientGRPC;
