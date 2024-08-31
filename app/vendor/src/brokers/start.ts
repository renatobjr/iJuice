import RabbitMQConfig from "../config/rabbitMQConfig";

const Start = {
  connect: async () => {
    return await RabbitMQConfig();
  },
  close: async () => {
    return await RabbitMQConfig().then((conn) => conn.close());
  },
};

export default Start;
