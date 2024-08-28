import { Server, ServerCredentials } from "@grpc/grpc-js";
import CustomerService from "@/customer/services/customerService";
import { CustomerService as Service } from "@/customer/generated/customer";
import TypeORmConfig from "@/customer/config/typeORMConfig";

const server = new Server();

const CUSTOMER_GRPC_SERVER = process.env.CUSTOMER_GRPC_SERVER;

TypeORmConfig.initialize().then(() => {
  server.addService(Service, CustomerService);
  server.bindAsync(
    CUSTOMER_GRPC_SERVER as string,
    ServerCredentials.createInsecure(),
    (err) => {
      if (err) throw err;

      console.log("[✔] Customer Service gRPC Server is running on 50051");
    }
  );
});
