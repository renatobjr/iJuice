import { DataSource } from "typeorm";
import { Customer } from "@/customer/entities/customerEntity";

const TypeORmConfig = new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [Customer],
  synchronize: true,
  logging: true,
});

export default TypeORmConfig;
