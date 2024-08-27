import RabbitMQConfig from "@/gateway/config/rabbitMQConfig";
import { Channel } from "amqplib";

const GatewayQueue = {
  start: async () => {
    return await RabbitMQConfig();
  },
  close: async () => {
    return await RabbitMQConfig().then((conn) => conn.close());
  },
  publishInQueue: async (channel: Channel, queue: string, message: any) => {
    let messageToBuffer = Buffer.from(JSON.stringify(message));
    return channel.sendToQueue(queue, messageToBuffer);
  },
  consumeQueue: async (
    channel: Channel,
    queue: string,
    callback: (message: any) => void
  ) => {
    return channel.consume(queue, (message) => {
      if (message) {
        callback(JSON.parse(message.content.toString()));
        channel.ack(message);
      }
    });
  },
};

export default GatewayQueue;
