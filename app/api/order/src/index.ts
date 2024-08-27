import { Server, ServerCredentials } from "@grpc/grpc-js";
import OrderService from "@/order/services/orderService";
import { OrderService as Service } from "@/order/generated/order";
import prismaConfig from "@/order/config/prismaConfig";

const server = new Server();

prismaConfig.connection().then(() => {
  server.addService(Service, OrderService);
  server.bindAsync(
    "localhost:50052",
    ServerCredentials.createInsecure(),
    (err) => {
      if (err) throw err;

      console.log("[✔] Order Service gRPC Server is running on 50052");
    }
  );
});
