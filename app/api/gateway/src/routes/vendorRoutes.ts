import { Router } from "express";
import GatewayQueue from "@/gateway/brokers/gatewayQueue";

const vendorRoutes = Router();

// TODO: Need to implement a set timeout for the request, when the request fails show vendor offline
// TODO: Need to refactor the code to remove the logic from a vendor service file
vendorRoutes.get("/api/v1/vendor", async (req, res) => {
  let channel = await GatewayQueue.start();
  await channel.assertQueue("discoveryService", { durable: false });

  channel.consume(
    "discoveryService",
    (message) => {
      if (message) {
        channel.sendToQueue(
          message.properties.replyTo,
          Buffer.from(JSON.stringify({ status: "success" })),
          {
            correlationId: message.properties.correlationId,
          }
        );
        channel.ack(message);

        if (!res.headersSent) {
          res.success(200, {
            vendorsOnline: JSON.parse(message.content.toString()),
          });
        }
      }
    },
    { noAck: false }
  );
});

export default vendorRoutes;
