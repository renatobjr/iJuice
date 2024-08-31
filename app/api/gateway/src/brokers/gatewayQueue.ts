import RabbitMQConfig from "@/gateway/config/rabbitMQConfig";

const GatewayQueue = {
  start: async () => {
    return await RabbitMQConfig();
  },
  close: async () => {
    return await RabbitMQConfig().then((conn) => conn.close());
  },
};

export default GatewayQueue;
