import { Router } from "express";
import orderService from "@/gateway/services/orderService";
import isAuth from "@/gateway/middlewares/isAuth";

const orderRoutes = Router();

orderRoutes.post("/api/v1/order", isAuth, orderService.create);
orderRoutes.get("/api/v1/order", isAuth, orderService.list);

export default orderRoutes;
