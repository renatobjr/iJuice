import { Customer as CustomerEntity } from "@/customer/entities/customerEntity";
import { CustomerServer, TokenResponse } from "@/customer/generated/customer";
import CustomerRepository from "@/customer/repositories/customerRepository";
import CustomerHelper from "@/customer/helpers/customerHelper";
import { status } from "@grpc/grpc-js";

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

  isAuthorized: async (_call, callback) => {
    try {
      let isAuth = CustomerHelper.verifyToken(_call.request.token);
      if (isAuth !== null) {
        let { email } = isAuth as unknown as TokenResponse;

        await CustomerRepository.findByEmail(email)
          .then((customer) => {
            callback(null, {
              status: true,
              message: {
                id: customer?.id as number,
                email: customer?.email as string,
              },
            });
          })
          .catch((err) => {
            throw err;
          });
      }
    } catch (error) {
      callback({ code: status.CANCELLED, details: "Unauthorize" }, null);
    }
  },
};

export default CustomerService;
