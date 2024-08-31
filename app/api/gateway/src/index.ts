//TODO: Remember to install cors on services to accpet only requests from the gateway
import express from "express";
import morgan from "morgan";
import cors from "cors";
import handlerResponse from "@/gateway/middlewares/handlerResponse";
import GatewayQueue from "@/gateway/brokers/gatewayQueue";
import customerRoutes from "@/gateway/routes/customerRoutes";
import vendorRoutes from "@/gateway/routes/vendorRoutes";
import orderRoutes from "@/gateway/routes/orderRoutes";
import bodyParser from "body-parser";

const gateway = express();

gateway
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(morgan("dev"))
  .use(cors())
  .use(bodyParser.json())
  .use(handlerResponse)
  .use(customerRoutes)
  .use(vendorRoutes)
  .use(orderRoutes);

const PORT = process.env.GATEWAY_PORT;

gateway
  .listen(PORT, () => {
    console.log(`[✔] Gateway gRPC Server is running on ${PORT}`);
  })
  .on("listening", async () => {
    await GatewayQueue.start().then(async (channel) => {
      await channel.assertQueue("discoveryService", { durable: false });

      console.log("[✔] Connected to RabbitMQ");
    });
  });
