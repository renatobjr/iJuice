import { Router } from "express";
import vendorService from "@/gateway/services/vendorService";

const vendorRoutes = Router();

vendorRoutes.get("/api/v1/vendor", vendorService.discoveryService);

export default vendorRoutes;
