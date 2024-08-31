import { Channel, Connection, connect } from "amqplib";

const ampqHost = process.env.RABBITMQ_SERVER as string;

const RabbitMQConfig = async () => {
  try {
    let conection: Connection = await connect(ampqHost);
    return conection;
  } catch (error: any) {
    throw new Error(error.message as string);
  }
};

export default RabbitMQConfig;
