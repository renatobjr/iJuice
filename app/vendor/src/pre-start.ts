import vendorRepository from "@/vendor/repositories/vendorRepository";
import { Channel } from "amqplib";

const vendorIsOnline = async (channel: Channel) => {
  let vendor = await vendorRepository.vendorIsOnline();

  if (vendor?.status) {
    const queue = "discoveryService";
    const replyQueue = await channel.assertQueue("", {
      exclusive: true,
    });
    let correlationId = vendor?.data?.map((vendor) => vendor._id).toString();

    return new Promise((resolve, reject) => {
      channel.consume(
        replyQueue.queue,
        (msg) => {
          if (msg != null && msg.properties.correlationId === correlationId) {
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(vendor)), {
              correlationId: correlationId,
              replyTo: replyQueue.queue,
            });

            resolve(msg);
          }
        },
        { noAck: true }
      );

      channel.sendToQueue(queue, Buffer.from(JSON.stringify(vendor)), {
        correlationId: correlationId,
        replyTo: replyQueue.queue,
      });
    });
  }
};

export default vendorIsOnline;
