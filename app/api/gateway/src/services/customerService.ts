import { Handler } from "express";
import CustomerClientGRPC from "@/gateway/config/customerServiceGRPC";
import { HttpStatusCode } from "@/gateway/common/httpStatusCode";

const register: Handler = (req, res) => {
  const { name, email, password } = req.body;

  CustomerClientGRPC.register({ name, email, password }, (err, response) => {
    if (err) {
      return res.error(HttpStatusCode.BAD_REQUEST, err);
    }

    return res.success(HttpStatusCode.CREATED, response);
  });
};

const login: Handler = (req, res) => {
  const email: string = req.query.email as string;
  const password: string = req.query.password as string;

  CustomerClientGRPC.login({ email, password }, (err, response) => {
    if (err) {
      return res.error(HttpStatusCode.BAD_REQUEST, err);
    }

    return res.success(HttpStatusCode.OK, response);
  });
};

export default {
  register,
  login,
};
