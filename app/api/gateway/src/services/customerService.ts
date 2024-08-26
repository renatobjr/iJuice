import CustomerClientGRPC from "@/gateway/config/customerServiceGRPC";
import { Handler } from "express";

const register: Handler = (req, res) => {
  const { name, email, password } = req.body;

  CustomerClientGRPC.register({ name, email, password }, (err, response) => {
    if (err) {
      return res.error(500, err);
    }

    return res.success(201, response);
  });
};

const login: Handler = (req, res) => {
  const { email, password } = req.body;

  CustomerClientGRPC.login({ email, password }, (err, response) => {
    if (err) {
      return res.error(500, err);
    }

    return res.success(200, response);
  });
};

export default {
  register,
  login,
};
