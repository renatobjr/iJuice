import { DataSource } from "typeorm";
import { Customer } from "@/customer/entities/customerEntity";

const TypeORmConfig = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "db_admin_customer",
  password: "r4oelJBJP9DO0FS0xm",
  database: "db_customer",
  entities: [Customer],
  synchronize: true,
  logging: true,
});

export default TypeORmConfig;
