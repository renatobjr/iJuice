import { Customer as CustomerEntity } from "@/customer/entities/customerEntity";
import { IsNull } from "typeorm";
import TypeORmConfig from "@/customer/config/typeORMConfig";

const CustomerRepository = TypeORmConfig.getRepository(CustomerEntity);

const findByEmail = async (email: string) => {
  return await CustomerRepository.findOneBy({
    email: email,
    deleted_at: IsNull(),
  }).catch((err) => {
    throw new Error(err.message);
  });
};

const findById = async (id: string) => {
  return await CustomerRepository.findOneBy({
    id: parseInt(id),
    deleted_at: IsNull(),
  }).catch((err) => {
    throw new Error(err.message);
  });
};

const regiter = async (payload: Partial<CustomerEntity>) => {
  return await CustomerRepository.save({
    email: payload.email,
    name: payload.name,
    password: payload.password,
  }).catch((err) => {
    throw new Error(err.message);
  });
};

export default {
  findByEmail,
  findById,
  regiter,
};
