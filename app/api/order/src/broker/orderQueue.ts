import amqp from "amqplib/callback_api";
import { CreateOrder } from "@/order/repositories/orderRepository";

const ampqHost = process.env.RABBITMQ_SERVER as string;

type VendorStatusResponse = {
  withdraw_code: string;
};

const OrderQueue = {
  sendToVendor: async (payload: CreateOrder): Promise<VendorStatusResponse> => {
    return new Promise((resolve, reject) => {
      amqp.connect(ampqHost, (errorConn, connection) => {
        if (errorConn) {
          return reject(errorConn);
        }

        connection.createChannel((errorChannel, channel) => {
          if (errorChannel) {
            return reject(errorChannel);
          }

          channel.assertQueue(
            "",
            {
              exclusive: true,
            },
            (errorQueue, q) => {
              if (errorQueue) {
                return reject(errorQueue);
              }

              const correlationId =
                Math.random().toString() + Date.now().toString();

              channel.consume(
                q.queue,
                function (msg) {
                  if (msg && msg.properties.correlationId === correlationId) {
                    connection.close();
                    resolve(JSON.parse(msg.content.toString()));
                  }
                },
                { noAck: true }
              );

              channel.sendToQueue(
                "orderProcessing",
                Buffer.from(
                  JSON.stringify({
                    customer_id: payload.customer_id,
                    vendor_id: payload.vendor_id,
                    quantity: payload.quantity,
                    products: payload.products,
                  })
                ),
                {
                  correlationId: correlationId,
                  replyTo: q.queue,
                }
              );
            }
          );
        });
      });
    });
  },
};

export default OrderQueue;
