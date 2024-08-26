import { Customer as CustomerEntity } from "@/customer/entities/customerEntity";
import { CustomerServer } from "@/customer/generated/customer";
import CustomerRepository from "@/customer/repositories/customerRepository";
import CustomerHelper from "@/customer/helpers/customerHelper";

const CustomerService: CustomerServer = {
  login: async (_call, callback) => {
    try {
      let customer = await CustomerRepository.findByEmail(_call.request.email);

      if (!customer) {
        return callback({
          details: "Not found",
        });
      }

      let isPasswordValid = await CustomerHelper.comparePassword(
        _call.request.password,
        customer.password
      );

      if (!isPasswordValid) {
        return callback({
          details: "Unauthorized",
        });
      }

      let token = CustomerHelper.createToken(customer.id, customer.email);

      callback(null, { status: true, message: "token created", token: token });
    } catch (error) {
      callback({ details: "Internal Server Error" });
    }
  },
  register: async (_call, callback) => {
    try {
      let hasAccount = await CustomerHelper.hasAccount(_call.request.email);

      if (hasAccount) {
        return callback({
          details: "Bad Request",
        });
      }

      let hashedPassword = CustomerHelper.createHashPassword(
        _call.request.password
      );

      let payload: Partial<CustomerEntity> = {
        name: _call.request.name,
        email: _call.request.email,
        password: hashedPassword,
      };

      await CustomerRepository.regiter(payload);

      callback(null, { status: true, message: "created" });
    } catch (error) {
      callback({ details: "Internal Server Error" });
    }
  },
};

export default CustomerService;
