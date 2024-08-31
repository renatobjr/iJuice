import { Handler } from "express";
import CustomerClientGRPC from "@/gateway/config/customerServiceGRPC";

type UserRequest = Express.Request["user"];

const isAuth: Handler = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.error(400, { details: "Need a token" });
    }

    let token = req.headers.authorization.split(" ")[1];

    let decodedToken = new Promise((resolve, reject) => {
      CustomerClientGRPC.isAuthorized({ token }, (err, response) => {
        if (err) {
          reject(err);
        }

        resolve(response);
      });
    });

    decodedToken
      .then((response: any) => {
        let user: UserRequest = response.message;

        req.user = {
          id: user.id,
          email: user.email,
          name: user.name,
        };

        next();
      })
      .catch(() => {
        return res.error(400, { details: "Unauthorized" });
      });
  } catch (error) {
    res.error(400, { details: "Unauthorized" });
  }
};

export default isAuth;
