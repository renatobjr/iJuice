import { CustomerClient } from "@/gateway/generated/customer";
import { credentials } from "@grpc/grpc-js";

const CUSTOMER_GRPC_SERVER = process.env.CUSTOMER_GRPC_SERVER;

const CustomerClientGRPC = new CustomerClient(
  CUSTOMER_GRPC_SERVER as string,
  credentials.createInsecure()
);

export default CustomerClientGRPC;
