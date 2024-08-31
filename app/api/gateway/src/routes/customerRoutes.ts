import { Router } from "express";
import customerService from "@/gateway/services/customerService";
import isAuth from "@/gateway/middlewares/isAuth";

const customerRoutes = Router();

customerRoutes
  .post("/api/v1/customer", customerService.register)
  .get("/api/v1/customer", customerService.login)
  .post("/api/v1/customer/session", isAuth, (req, res) => {
    res.success(200, { customer: req.user });
  });

export default customerRoutes;
