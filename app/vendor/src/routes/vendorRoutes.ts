import { Router } from "express";
import vendorQueue from "@/vendor/brokers/vendorQueue";

const vendorRoutes = Router();

vendorRoutes.get("/create-order", vendorQueue.create);

export default vendorRoutes;
