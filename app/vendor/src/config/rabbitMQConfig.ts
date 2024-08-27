import { Channel, Connection, connect } from "amqplib";

const ampqHost = "amqp://localhost";

const RabbitMQConfig = async () => {
  try {
    let conection: Connection = await connect(ampqHost);
    let channel: Channel = await conection.createChannel();

    return channel;
  } catch (error: any) {
    throw new Error(error.message as string);
  }
};

export default RabbitMQConfig;
