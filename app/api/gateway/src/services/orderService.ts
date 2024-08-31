import OrderClientGRPC from "@/gateway/config/orderServiceGRPC";
import { Handler } from "express";
import { HttpStatusCode } from "../common/httpStatusCode";

const create: Handler = async (req, res) => {
  const {
    customer_id,
    vendor_id,
    host,
    quantity,
    products,
    withdraw_day,
    withdraw_time,
    total_value,
  } = req.body;

  OrderClientGRPC.create(
    {
      customer_id,
      vendor_id,
      host,
      quantity,
      products,
      withdraw_day,
      withdraw_time,
      total_value,
    },
    (err, response) => {
      if (err) {
        return res.error(HttpStatusCode.NOT_FOUND, err);
      }

      return res.success(HttpStatusCode.CREATED, response);
    }
  );
};

const list: Handler = async (req, res) => {
  const customer_id = req.user.id;
  OrderClientGRPC.list({ customer_id }, (err, response) => {
    if (err) {
      return res.error(HttpStatusCode.NOT_FOUND, err);
    }
    return res.success(HttpStatusCode.OK, response);
  });
};

export default {
  create,
  list,
};
