import { Handler } from "express";
import { HttpStatusCode } from "@/gateway/common/httpStatusCode";
import amqp from "amqplib/callback_api";

const ampqHost = process.env.RABBITMQ_SERVER as string;

const discoveryService: Handler = async (req, res) => {
  amqp.connect(ampqHost, (errorConn, connection) => {
    if (errorConn) {
      throw errorConn;
    }

    connection.createChannel((errorChannel, channel) => {
      if (errorChannel) {
        throw errorChannel;
      }

      channel.assertQueue(
        "",
        {
          exclusive: true,
        },
        function (errorQueue, q) {
          if (errorQueue) {
            throw errorQueue;
          }

          let correlationId = Math.random().toString() + Date.now().toString();

          channel.consume(
            q.queue,
            function (msg) {
              if (
                msg != null &&
                msg.properties.correlationId === correlationId
              ) {
                res.success(HttpStatusCode.OK, {
                  vendorsOnline: JSON.parse(msg.content.toString()),
                });
                setTimeout(function () {
                  connection.close();
                }, 500);
              }
            },
            { noAck: true }
          );

          channel.sendToQueue(
            "discoveryService",
            Buffer.from(JSON.stringify({ status: "retrive vendors" })),
            {
              correlationId: correlationId,
              replyTo: q.queue,
            }
          );
        }
      );
    });
  });
};

export default { discoveryService };
