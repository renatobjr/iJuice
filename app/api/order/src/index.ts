import { Server, ServerCredentials } from "@grpc/grpc-js";
import OrderService from "@/order/services/orderService";
import { OrderService as Service } from "@/order/generated/order";
import prismaConfig from "@/order/config/prismaConfig";

const server = new Server();

const ORDER_GRPC_SERVER = process.env.ORDER_GRPC_SERVER;

prismaConfig.connection().then(() => {
  server.addService(Service, OrderService);
  server.bindAsync(
    ORDER_GRPC_SERVER as string,
    ServerCredentials.createInsecure(),
    (err) => {
      if (err) throw err;

      console.log("[✔] Order Service gRPC Server is running on 50052");
    }
  );
});
