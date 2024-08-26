import { Router } from "express";
import customerService from "@/gateway/services/customerService";

const customerRoutes = Router();

customerRoutes
  .post("/api/v1/customer", customerService.register)
  .get("/api/v1/customer", customerService.login);

export default customerRoutes;
