import vendorRepository from "@/vendor/repositories/vendorRepository";
import amqp from "amqplib/callback_api";

const ampqHost = process.env.RABBITMQ_SERVER as string;

const vendorIsOnline = async () => {
  let vendor = await vendorRepository.vendorIsOnline();

  if (vendor?.status) {
    amqp.connect(ampqHost, (errorConn, connection) => {
      if (errorConn) {
        throw errorConn;
      }

      connection.createChannel((errorChannel, channel) => {
        if (errorChannel) {
          throw errorChannel;
        }

        let queue = "discoveryService";

        channel.assertQueue(queue, { durable: false });
        channel.prefetch(1);

        channel.consume(queue, function reply(msg) {
          if (msg) {
            channel.sendToQueue(
              msg.properties.replyTo,
              Buffer.from(JSON.stringify(vendor)),
              {
                correlationId: msg.properties.correlationId,
              }
            );

            channel.ack(msg);
          }
        });
      });
    });
  }
};

export default vendorIsOnline;
