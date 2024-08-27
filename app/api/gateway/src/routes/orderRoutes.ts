import { Router } from "express";
import orderService from "@/gateway/services/orderService";
import isAuth from "@/gateway/middlewares/isAuth";

const orderRoutes = Router();

orderRoutes.get("/api/v1/order", isAuth, orderService.list);

export default orderRoutes;
