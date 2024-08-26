import { CustomerClient } from "@/gateway/generated/customer";
import { credentials } from "@grpc/grpc-js";

const CustomerClientGRPC = new CustomerClient(
  "localhost:50051",
  credentials.createInsecure()
);

export default CustomerClientGRPC;
