// TODO: remember to create a .env file for docker compose injection
import express from "express";
import morgan from "morgan";
import handlerResponse from "@/gateway/middlewares/handlerResponse";
import GatewayQueue from "@/gateway/brokers/gatewayQueue";
import customerRoutes from "@/gateway/routes/customerRoutes";
import vendorRoutes from "@/gateway/routes/vendorRoutes";
import orderRoutes from "@/gateway/routes/orderRoutes";

const gateway = express();

gateway
  .use(express.json())
  .use(morgan("dev"))
  .use(handlerResponse)
  .use(customerRoutes)
  .use(vendorRoutes)
  .use(orderRoutes);

gateway
  .listen("3000", () => {
    console.log("[✔] Gateway gRPC Server is running on 3000");
  })
  .on("listening", async () => {
    await GatewayQueue.start().then(() => {
      console.log("[✔] Connected to RabbitMQ");
    });
  });
