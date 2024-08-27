import OrderClientGRPC from "@/gateway/config/orderServiceGRPC";
import { Handler } from "express";

const list: Handler = (req, res) => {
  let user = req.user;

  OrderClientGRPC.list({ user }, (err, response) => {
    if (err) {
      return res.error(500, err);
    }

    return res.success(200, response);
  });
};

export default {
  list,
};
