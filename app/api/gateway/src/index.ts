import express from "express";
import morgan from "morgan";
import handlerResponse from "@/gateway/middlewares/handlerResponse";
import customerRoutes from "@/gateway/routes/customerRoutes";

const gateway = express();

gateway
  .use(express.json())
  .use(morgan("dev"))
  .use(handlerResponse)
  .use(customerRoutes);

gateway.listen("3000", () => {
  console.log("[✔] Gateway gRPC Server is running on 3000");
});
