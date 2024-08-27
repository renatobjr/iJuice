import { Handler } from "express";
import CustomerClientGRPC from "@/gateway/config/customerServiceGRPC";

const isAuth: Handler = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.error(401, { details: "Need a token" });
    }

    let token = req.headers.authorization;

    await new Promise((resolve, reject) => [
      CustomerClientGRPC.isAuthorized({ token }, (err, response) => {
        if (err) {
          reject(err);
        }

        resolve(response);
      }),
    ]);

    next();
  } catch (error) {
    res.error(400, { details: "Unauthorized" });
  }
};

export default isAuth;
