import { OrderClient } from "@/gateway/generated/order";
import { credentials } from "@grpc/grpc-js";

const OrderClientGRPC = new OrderClient(
  "localhost:50052",
  credentials.createInsecure()
);

export default OrderClientGRPC;
