import RabbitMQConfig from "@/vendor/config/rabbitMQConfig";
import { Channel } from "amqplib";

const ampqHost = "amqp://localhost";

const VendorQueue = {
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
    await channel
      .assertQueue(queue, {
        durable: false,
      })
      .then(() => {
        return channel.consume(queue, (message) => {
          if (message) {
            callback(JSON.parse(message.content.toString()));
            channel.ack(message);
          }
        });
      });
  },
};

export default VendorQueue;
