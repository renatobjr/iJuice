import { Server, ServerCredentials } from "@grpc/grpc-js";
import CustomerService from "@/customer/services/customerService";
import { CustomerService as Service } from "@/customer/generated/customer";
import TypeORmConfig from "@/customer/config/typeORMConfig";

const server = new Server();

TypeORmConfig.initialize().then(() => {
  server.addService(Service, CustomerService);
  server.bindAsync(
    "localhost:50051",
    ServerCredentials.createInsecure(),
    (err) => {
      if (err) throw err;

      console.log("[✔] Customer Service gRPC Server is running on 50051");
    }
  );
});
