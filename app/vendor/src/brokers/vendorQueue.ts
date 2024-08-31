import vendorRepository from "@/vendor/repositories/vendorRepository";
import amqp from "amqplib/callback_api";
import { OrderDocument } from "@/vendor/schemas/orders";
import orderService from "@/vendor/service/orderService";

const ampqHost = process.env.RABBITMQ_SERVER as string;

const VendorQueue = {
  fetchVendors: async () => {
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
  },
  create: async () => {
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

          let queue = "orderProcessing";

          channel.assertQueue(queue, { durable: false });
          channel.prefetch(1);

          channel.consume(queue, function reply(msg) {
            if (msg) {
              let withdraCode =
                Math.floor(Math.random() * 999999 - 100000) + 100000;

              channel.sendToQueue(
                msg.properties.replyTo,
                Buffer.from(
                  JSON.stringify({
                    status: true,
                    message: "Order created",
                    withdraw_code: withdraCode,
                  })
                ),
                {
                  correlationId: msg.properties.correlationId,
                }
              );

              let order = {
                customer_id: JSON.parse(msg.content.toString()).customer_id,
                withdraw_code: withdraCode.toString(),
                products: JSON.parse(msg.content.toString()).products,
                quantity: JSON.parse(msg.content.toString()).quantity,
              } as OrderDocument;

              orderService.creareOrder(order);

              channel.ack(msg);
            }
          });
        });
      });
    }
  },
};

export default VendorQueue;
