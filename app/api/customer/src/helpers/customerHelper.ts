import customerRepository from "@/customer/repositories/customerRepository";
import { Customer as CustomerEntity } from "@/customer/entities/customerEntity";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

let secret = process.env.SECRET as string;

const CustomerHelper = {
  hasAccount: async (email: string): Promise<CustomerEntity> => {
    return customerRepository
      .findByEmail(email)
      .then((customer: CustomerEntity | null) => {
        return customer;
      })
      .catch((err) => {
        if (err) return err;
      });
  },
  createHashPassword: (password: string): string => {
    return bcryptjs.hashSync(password, 10);
  },
  comparePassword: async (password: string, hash: string): Promise<boolean> => {
    return await bcryptjs.compare(password, hash);
  },
  createToken: (id: number, email: string): string => {
    return jwt.sign({ id, email }, secret, { expiresIn: "24h" });
  },
  verifyToken: (token: string) => {
    return jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        throw err;
      }

      return decoded;
    });
  },
};

export default CustomerHelper;
