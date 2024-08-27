import { Router } from "express";
import customerService from "@/gateway/services/customerService";
import isAuth from "@/gateway/middlewares/isAuth";

const customerRoutes = Router();

customerRoutes
  .post("/api/v1/customer", customerService.register)
  .get("/api/v1/customer", customerService.login)
  .get("/api/v1/customer/:id", isAuth, (req, res) => {
    res.send("Authorized");
  });

export default customerRoutes;
